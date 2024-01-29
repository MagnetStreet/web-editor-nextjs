import { Box } from '@mui/material';
import * as React from 'react';
import {
  TransformWrapper,
  TransformComponent,
  useControls,
} from 'react-zoom-pan-pinch';

interface SampleProps {
  img?: string;
}

const ZoomWrapper: React.FC<SampleProps> = ({ img }) => {
  const Controls = () => {
    const { zoomIn, zoomOut, resetTransform } = useControls();
    return (
      <>
        <button onClick={() => zoomIn()}>Zoom In</button>
        <button onClick={() => zoomOut()}>Zoom Out</button>
        <button onClick={() => resetTransform()}>Reset</button>
      </>
    );
  };
  return (
    <Box>
      <TransformWrapper>
        <Controls />
        <TransformComponent>
          <img
            src='https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
            alt='test'
            width='100%'
          />
        </TransformComponent>
      </TransformWrapper>
    </Box>
  );
};

export default ZoomWrapper;
