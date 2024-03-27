import { Box, Paper } from '@mui/material';
import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';
import React, { createRef, RefObject, useEffect, useState } from 'react';
import { Image, Layer, Rect, Stage } from 'react-konva';
import useImage from 'use-image';

import useDebounce from '@/hooks/useDebounce';

import TransformerComponent from '@/components/CanvasWrapper/TransformerComponent';

import { getScaledCoordinates } from '@/utils/getScaledCoordinates';
import { getStylePositionsHelper } from '@/utils/getStylePositionsHelper';

import { Coordinates, PointCoordinates } from '@/types';
import DesignStudioItem from '@/types/DesignStudioItem';
import { CONTEXTUAL_MENU_OPTION } from '@/types/enum';
import { TextBox } from '@/types/TextBox';
import View from '@/types/View';

const minZoom = 0;
const maxZoom = 100;

interface CanvasWrapperProps {
  editorRef?: RefObject<any>;
  topFrameRef?: RefObject<any>;
  documentInfo?: DesignStudioItem;
  activeView?: View;
  position?: string;
  viewBlob?: Blob;
  isIsolatedMode: boolean;
  coordinates?: Coordinates;
  activeLayoutName?: CONTEXTUAL_MENU_OPTION;
  activeTextBox?: TextBox; //TODO we need active for each I think
  zoom: number | number[];
  resetCount: number;
  isDesktop: boolean;
  fitImage: () => void;
  setZoom: (val: number | number[]) => void;
  handleClickFontItem: (val: TextBox) => void;
}

const CanvasWrapper: React.FC<CanvasWrapperProps> = ({
  editorRef,
  topFrameRef,
  position,
  viewBlob,
  activeView,
  documentInfo,
  activeTextBox,
  isIsolatedMode,
  coordinates,
  zoom,
  isDesktop,
  resetCount,
  activeLayoutName,
  fitImage,
  setZoom,
  handleClickFontItem,
}) => {
  const stageRef = createRef<Konva.Stage>(); //I can get the attributes from the attrs{x,y, width, height} useRef
  const imageLayerRef = createRef<Konva.Layer>();
  const textBoxesLayerRef = createRef<Konva.Layer>();
  // Image State
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [sceneImage, setSceneImage] = useState<JSX.Element | null>(null);
  const [imageHeight, setImageHeight] = useState(100);
  const [imageWidth, setImageWidth] = useState(0);
  // Textboxes state
  const [isDragging, setIsDragging] = useState(false);
  const [boxes, setBoxes] = useState<any>(null);
  // Pitch Zoom state
  const [lastCenter, setLastCenter] = useState<{ x: number; y: number } | null>(
    null
  );
  const [lastDist, setLastDist] = useState<number>(0);

  const handleResize = () => {
    if (!activeView) return;
    // Code to execute on screen resize
    if (imageWidth >= window.innerWidth) {
      const paddingPercentage = 0.6; // 80% padding
      const fitWidth = window.innerWidth * paddingPercentage;
      let adjustedZoom = Number(zoom); //current zoom level;
      let scaledImageWidth = imageWidth;
      while (adjustedZoom > 0 && scaledImageWidth >= fitWidth) {
        adjustedZoom = adjustedZoom - 1;
        const scale = (adjustedZoom - minZoom) / (maxZoom - minZoom);
        // Calculate the new dimensions using the adjusted zoom level
        const newDynamicHeight = 0.3 + scale * 0.7; // Scale between 0.3 and 1.0
        const scaledImageHeight =
          newDynamicHeight * activeView?.sceneCanvasHeight;
        scaledImageWidth = (imageWidth / imageHeight) * scaledImageHeight;
      }
      // Update the zoom state with the new zoom level
      setZoom(adjustedZoom);
    }
    fitImage();
  };

  //Handles resize and recentering
  const debounceHandleResize = useDebounce(handleResize, 100);
  useEffect(() => {
    // Call handleResize immediately and attach it to the resize event
    debounceHandleResize();
    window.addEventListener('resize', debounceHandleResize);
    // Remove the event listener when the component unmounts or when the screen size changes
    return () => {
      window.removeEventListener('resize', debounceHandleResize);
    };
  }, [window.innerWidth, window.innerHeight]);

  // Handles the updates of the Blod prop
  useEffect(() => {
    const createUrl = async () => {
      try {
        if (viewBlob) {
          const url = URL.createObjectURL(viewBlob);
          setImageUrl(url);
        }
      } catch (error) {
        console.error('Error creating URL for image blob:', error);
      }
    };

    if (viewBlob instanceof Blob) {
      createUrl();
    }
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [viewBlob]);

  // Handles the updates of the zoom Controller
  useEffect(() => {
    if (!activeView) return;
    // Calculate dynamic height based on the zoom percentage
    let width = 0;
    let left = 0;
    let scaledImageWidth = 0;
    let scaledImageHeight = 0;
    if (isDesktop) {
      const newDynamicHeight = 0.5;
      scaledImageHeight = newDynamicHeight * activeView?.sceneCanvasHeight;
      setImageHeight(newDynamicHeight * activeView?.sceneCanvasHeight);
      // Calculate the image width based on the original aspect ratio and the scaled height
      const aspectRatio =
        activeView?.sceneCanvasWidth / activeView?.sceneCanvasHeight;
      const scaledImageWidth = aspectRatio * imageHeight;
      setImageWidth(scaledImageWidth);
    } else {
      // It should be 90% of the width of the screen
      // Calculate the width based on clientWidth 90%
      const containerWidth = window.innerWidth * 0.9; // 90% of the window width
      const containerHeight = activeView?.sceneCanvasHeight;
      const aspectRatio =
        activeView?.sceneCanvasWidth / activeView?.sceneCanvasHeight;

      // Calculate the height based on aspect ratio and width
      const newWidth = containerWidth;
      const newHeight = newWidth / aspectRatio;

      // Ensure that the new height is not greater than the container height
      scaledImageHeight = Math.min(containerHeight, newHeight);
      scaledImageWidth = scaledImageHeight * aspectRatio;

      setImageHeight(scaledImageHeight);
      setImageWidth(scaledImageWidth);
    }

    if (topFrameRef && topFrameRef.current) {
      const { width: frameWidth, left: frameLeft } =
        topFrameRef.current.getBoundingClientRect();
      width = frameWidth;
      left = frameLeft;
    }
    const topFramePosition = width + left;

    let offsetX = 0;
    let offsetY = 0;
    //Added this to prevent the img going behind the TopFrame
    if (topFramePosition >= offsetX && isDesktop) {
      offsetX = topFramePosition;
      offsetY = 15;
    } else {
      offsetX = (editorRef?.current.clientWidth - scaledImageWidth) / 2;
      offsetY = (editorRef?.current.clientHeight - scaledImageHeight) / 2;
      //offsetY = offsetY < 0 ? 0 : offsetY;
    }

    if (imageLayerRef.current) {
      imageLayerRef.current.setAttrs({
        x: offsetX,
        y: offsetY,
      });
      textBoxesLayerRef.current?.setAttrs({
        x: offsetX,
        y: offsetY,
      });
    }
  }, [activeView, imageHeight, zoom, resetCount]);

  // Handles the updates on the Image Url
  useEffect(() => {
    const createSceneImage = () => {
      const imageComponent = <SceneImage />;
      setSceneImage(imageComponent);
    };
    createSceneImage();
  }, [imageUrl, imageHeight, imageWidth]);

  // Handles the updates on textboxes after zoom or dragging
  useEffect(() => {
    if (!isDragging) {
      const res =
        !activeTextBox && activeLayoutName === CONTEXTUAL_MENU_OPTION.TEXT
          ? loadTextBoxes()
          : loadTransformer();
      setBoxes(res);
    }
  }, [
    isDragging,
    imageHeight,
    zoom,
    activeTextBox,
    activeLayoutName,
    resetCount,
  ]);

  //TODO handles the isolated mode
  useEffect(() => {
    // const quill = new Quill('#editor', {
    //   theme: 'snow',
    // });
    // console.log('quill', quill);
  }, [isIsolatedMode]);

  //Necessary to add custom styling like hover cursor over the figures
  const handleHover = (enter = false) => {
    if (stageRef.current) {
      stageRef.current.container().style.cursor = enter ? 'pointer' : 'default';
    }
  };

  // Touch Move function
  const handleTouchMove = (e: Konva.KonvaEventObject<TouchEvent>) => {
    e.evt.preventDefault();

    const touch1 = e.evt.touches[0];
    const touch2 = e.evt.touches[1];

    if (touch1 && touch2) {
      imageLayerRef.current?.stopDrag();

      const p1 = {
        x: touch1.clientX,
        y: touch1.clientY,
      };
      const p2 = {
        x: touch2.clientX,
        y: touch2.clientY,
      };

      if (!lastCenter) {
        setLastCenter(getCenter(p1, p2));
        return;
      }

      const newCenter = getCenter(p1, p2);
      const dist = getDistance(p1, p2);

      if (!lastDist) {
        setLastDist(dist);
      }

      const stage = imageLayerRef.current;
      if (!lastDist || dist === 0) {
        // Handle division by zero
        return;
      }

      if (stage) {
        const scale = stage.scaleX() * (dist / lastDist);
        // Calculate the adjusted zoom level based on the scale
        const adjustedZoom = (Number(zoom) / 100) * scale * 100;
        setZoom(adjustedZoom);
        //debouncedSetZoom(adjustedZoom);
      }
      setLastDist(dist);
      setLastCenter(newCenter);
    }
  };
  const handleTouchEnd = () => {
    setLastDist(0);
    setLastCenter(null);
  };
  const getCenter = (
    p1: { x: number; y: number },
    p2: { x: number; y: number }
  ) => {
    return {
      x: (p1.x + p2.x) / 2,
      y: (p1.y + p2.y) / 2,
    };
  };

  const getDistance = (
    p1: { x: number; y: number },
    p2: { x: number; y: number }
  ) => {
    return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
  };

  //Textboxes Only functions
  const createRectFromPoints = (
    originalCoordinates: PointCoordinates[],
    textBox: TextBox
  ) => {
    if (originalCoordinates.length === 0) return null;
    const coordinates = getScaledCoordinates(originalCoordinates, 0.5);
    const minX = Math.min(...coordinates.map((coord) => coord.x));
    const minY = Math.min(...coordinates.map((coord) => coord.y));
    const maxX = Math.max(...coordinates.map((coord) => coord.x));
    const maxY = Math.max(...coordinates.map((coord) => coord.y));

    const width = maxX - minX;
    const height = maxY - minY;

    // Adjust coordinates based on imageRef offset
    const offsetX = imageLayerRef.current?.x() || 0;
    const offsetY = imageLayerRef.current?.y() || 0;

    return (
      <Rect
        key={textBox.name}
        x={minX + offsetX}
        y={minY + offsetY}
        width={width}
        height={height}
        fill='rgba(0, 0, 0, 0.3)'
        onClick={(e: KonvaEventObject<MouseEvent>) => {
          handleClickFontItem(textBox);
        }}
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
      />
    );
  };

  const createTransformRectFromPoints = (
    originalCoordinates: PointCoordinates[]
  ) => {
    if (originalCoordinates.length === 0) return null;
    const coordinates = getScaledCoordinates(originalCoordinates, 0.5);
    const minX = Math.min(...coordinates.map((coord) => coord.x));
    const minY = Math.min(...coordinates.map((coord) => coord.y));
    const maxX = Math.max(...coordinates.map((coord) => coord.x));
    const maxY = Math.max(...coordinates.map((coord) => coord.y));

    const width = maxX - minX;
    const height = maxY - minY;

    // Adjust coordinates based on imageRef offset
    const offsetX = imageLayerRef.current?.x() || 0;
    const offsetY = imageLayerRef.current?.y() || 0;

    return (
      <>
        <Rect
          name='active-text-box'
          x={minX + offsetX}
          y={minY + offsetY}
          width={width}
          height={height}
          fill='rgba(255, 255, 255, 0.3)'
        />
        <TransformerComponent selectedShapeName='active-text-box' />
      </>
    );
  };

  const loadTextBoxes = () => {
    return documentInfo?.textBoxes
      .map((textbox) => {
        const textBoxName = textbox.name;
        const viewData = activeView?.viewData.find(
          (x) => x.name === textBoxName
        );
        if (!viewData) {
          return null;
        }
        return createRectFromPoints(viewData.viewBounds, textbox);
      })
      .filter((x) => x);
  };

  const loadTransformer = () => {
    const viewDataActiveTextBox = activeView?.viewData.find(
      (doc) => doc.name === activeTextBox?.name
    );
    //TODO we might need to do this same logic for each of elements types
    if (viewDataActiveTextBox && activeTextBox) {
      return createTransformRectFromPoints(viewDataActiveTextBox.viewBounds);
    }
  };

  const updateDragTexbox = (
    e: KonvaEventObject<DragEvent>,
    dragEvent: string
  ) => {
    // Manually trigger drag event on the parent image layer
    // We need this for "passdown" the drag event to the image in the back
    const imageLayer = imageLayerRef.current;
    if (imageLayer) {
      if ('dragend' === dragEvent) {
        imageLayer.startDrag();
      } else {
        imageLayer.stopDrag();
      }
      imageLayer.fire(dragEvent, e);
    }
  };

  // Image Only functions
  const updateDragStart = () => {
    if (!isDragging) {
      setBoxes(null);
    }
    setIsDragging(!isDragging);
  };

  // Styling
  const containerStyle = {
    ...getStylePositionsHelper(position, coordinates),
    zIndex: 0,
    height: `${editorRef?.current.clientHeight}px`,
    transform: 'translate(-50%, -50%)',
  };
  const paperStyle = {
    position: 'absolute',
    top: '%',
    zIndex: 99,
    left: '70%',
    height: `fit-content`,
    width: `fit-content`,
    transform: 'translate(-50%, -50%)',
  };
  const SceneImage: React.FC = () => {
    const [image] = useImage(imageUrl || '');
    return <Image image={image} width={imageWidth} height={imageHeight} />;
  };

  return (
    <>
      {editorRef && editorRef.current && (
        <Box sx={containerStyle}>
          {isIsolatedMode && (
            <Paper sx={{ ...paperStyle }}>
              {/* <div id='editor'> HEY LISTEN TODO HOW DOES the insert of the WISIGW work</div> */}
            </Paper>
          )}
          {activeView && imageUrl && (
            <Stage
              ref={stageRef}
              width={
                window.innerWidth < editorRef?.current.clientWidth
                  ? window.innerWidth
                  : editorRef?.current.clientWidth
              }
              height={
                window.innerHeight < editorRef?.current.clientHeight
                  ? window.innerHeight
                  : editorRef?.current.clientHeight
              }
              scaleX={0.3 + ((zoom as number) / 100) * (1.5 - 0.3)}
              scaleY={0.3 + ((zoom as number) / 100) * (1.5 - 0.3)}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <Layer
                ref={imageLayerRef}
                draggable
                onDragStart={updateDragStart}
                onDragEnd={updateDragStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {sceneImage && imageHeight ? sceneImage : null}
              </Layer>
              <Layer
                draggable
                onDragStart={(e) => updateDragTexbox(e, 'dragstart')}
                onDragEnd={(e) => updateDragTexbox(e, 'dragend')}
              >
                {boxes}
              </Layer>
            </Stage>
          )}
        </Box>
      )}
    </>
  );
};

export default CanvasWrapper;
