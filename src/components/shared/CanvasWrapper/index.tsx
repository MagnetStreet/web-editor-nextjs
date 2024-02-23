import { Box } from '@mui/material';
import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';
import React, { useEffect, useState } from 'react';
import { Image, Layer, Rect, Stage } from 'react-konva';
import useImage from 'use-image';

import { getScaledCoordinates } from '@/utils/getScaledCoordinates';

import { PointCoordinates } from '@/types';
import DesignStudioItem from '@/types/DesignStudioItem';
import { TextBox } from '@/types/TextBox';
import View from '@/types/View';
const minZoom = 0;
const maxZoom = 100;

interface CanvasWrapperProps {
  documentInfo?: DesignStudioItem;
  activeView?: View;
  viewBlob?: Blob;
  zoom: number | number[];
  handleClickFontItem: (val: TextBox) => void;
}

const CanvasWrapper: React.FC<CanvasWrapperProps> = ({
  viewBlob,
  activeView,
  documentInfo,
  zoom,
  handleClickFontItem,
}) => {
  const stageRef = React.createRef<Konva.Stage>(); //I can get the attributes from the attrs{x,y, width, height} useRef
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [sceneImage, setSceneImage] = useState<JSX.Element | null>(null);
  const [imageHeight, setImageHeight] = useState(100);
  const [imageWidth, setImageWidth] = useState(0);

  useEffect(() => {
    if (!activeView) return;

    const adjustedZoom = Math.max(minZoom, Math.min(maxZoom, Number(zoom)));
    const scale = (adjustedZoom - minZoom) / (maxZoom - minZoom);

    // Calculate dynamic height based on the zoom percentage
    const newDynamicHeight = 0.3 + scale * 0.7; // Scale between 0.3 and 1.0
    setImageHeight(newDynamicHeight * activeView?.sceneCanvasHeight);
    // Calculate the image width based on the original aspect ratio and the scaled height
    const aspectRatio =
      activeView?.sceneCanvasWidth / activeView?.sceneCanvasHeight;
    const scaledImageWidth = aspectRatio * imageHeight;
    setImageWidth(scaledImageWidth);
  }, [activeView, imageHeight, imageUrl, zoom]);

  useEffect(() => {
    const createSceneImage = () => {
      const imageComponent = (
        <SceneImage
          imageUrl={imageUrl}
          imageWidth={imageWidth}
          imageHeight={imageHeight}
        />
      );
      setSceneImage(imageComponent);
    };
    createSceneImage();
  }, [imageUrl, imageHeight, imageWidth]);

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
    } else {
      console.error('Invalid image blob:', viewBlob);
    }

    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [viewBlob]);

  useEffect(() => {
    //Each time the Active view updates we need to update the click boxes
  }, [activeView]);

  const handleHover = (enter = false) => {
    //Necessary to add custom styling like hover cursor over the figures
    if (stageRef.current) {
      stageRef.current.container().style.cursor = enter ? 'pointer' : 'default';
    }
  };

  const createRectFromPoints = (
    originalCoordinates: PointCoordinates[],
    textBox: TextBox
  ) => {
    if (originalCoordinates.length === 0) return null;
    const scale = 0.3 + ((zoom as number) / 100) * 0.7;
    const coordinates = getScaledCoordinates(originalCoordinates, scale);
    const minX = Math.min(...coordinates.map((coord) => coord.x));
    const minY = Math.min(...coordinates.map((coord) => coord.y));
    const maxX = Math.max(...coordinates.map((coord) => coord.x));
    const maxY = Math.max(...coordinates.map((coord) => coord.y));

    const width = maxX - minX;
    const height = maxY - minY;

    return (
      <Rect
        x={minX}
        y={minY}
        width={width}
        height={height}
        fill='rgba(0, 0, 0, 0.3)'
        onClick={(e: KonvaEventObject<MouseEvent>) => {
          console.log(e.target, textBox);
          handleClickFontItem(textBox);
        }}
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
      />
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

  const SceneImage: React.FC<{
    imageUrl: string | null;
    imageWidth: number;
    imageHeight: number;
  }> = ({ imageUrl, imageWidth, imageHeight }) => {
    const [image] = useImage(imageUrl || '');
    return <Image image={image} width={imageWidth} height={imageHeight} />;
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        zIndex: 0,
        left: '50%',
        height: `${imageHeight}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {activeView && imageUrl && (
        <Stage
          ref={stageRef}
          width={activeView?.sceneCanvasWidth}
          height={imageHeight}
        >
          <Layer>{sceneImage && imageHeight ? sceneImage : null}</Layer>
          <Layer>{loadTextBoxes()}</Layer>
        </Stage>
      )}
    </Box>
  );
};

export default CanvasWrapper;
