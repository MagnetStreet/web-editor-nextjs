import { Box } from '@mui/material';
import Konva from 'konva';
import React, { useEffect, useState } from 'react';
import { Image, Layer, Rect, Stage } from 'react-konva';
import useImage from 'use-image';

import {
  GeneralControlsState,
  useGeneralControlsStore,
} from '@/stores/useGeneralControlsStore';
const minZoom = 0;
const maxZoom = 100;

interface CanvasWrapperProps {
  imageBlob: Blob;
}

const CanvasWrapper: React.FC<CanvasWrapperProps> = ({ imageBlob }) => {
  const stageRef = React.createRef<Konva.Stage>();
  const { zoom } = useGeneralControlsStore<GeneralControlsState>(
    (state) => state
  );
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [dynamicHeight, setDynamicHeight] = useState(0);

  useEffect(() => {
    const adjustedZoom = Math.max(minZoom, Math.min(maxZoom, Number(zoom)));
    const scale = (adjustedZoom - minZoom) / (maxZoom - minZoom);
    const newDynamicHeight = 0.3 + scale * 0.7; // Scale between 0.3 and 1.0
    setDynamicHeight(newDynamicHeight * 100);
  }, [zoom]);

  useEffect(() => {
    const createUrl = async () => {
      try {
        const url = URL.createObjectURL(imageBlob);
        setImageUrl(url);
      } catch (error) {
        console.error('Error creating URL for image blob:', error);
      }
    };

    if (imageBlob instanceof Blob) {
      createUrl();
    } else {
      console.error('Invalid image blob:', imageBlob);
    }

    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageBlob]);

  const [color, setColor] = useState('red');
  const handleClick = (e) => {
    const color = Konva.Util.colorToRGBA(Konva.Util.getRandomColor());
    color!.a = 0.1;
    setColor(color);
    console.log(e.target); //I can get the attributes from the attrs{x,y, width, height}
  };

  const LionImage = () => {
    const [image] = useImage('./images/sample_big.png');
    return <Image image={image} />;
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        zIndex: 0,
        left: '50%',
        height: `${dynamicHeight}vh`,
        width: '100%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      {stageRef && (
        <Stage ref={stageRef} width={500} height={500}>
          <Layer>
            <LionImage />
          </Layer>
          <Layer>
            <Rect
              x={20}
              y={50}
              width={100}
              height={100}
              fill='rgba(0, 0, 0, 0.5)'
              onClick={handleClick}
            />
          </Layer>
        </Stage>
      )}
      xxx
      {/* <img
        src={imageUrl}
        alt='test'
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      /> */}
    </Box>
  );
};

export default CanvasWrapper;
