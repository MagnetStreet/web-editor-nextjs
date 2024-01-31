import {
  useGeneralControlsStore,
  GeneralControlsState,
} from '@/stores/useGeneralControlsStore';
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
const minZoom = 0;
const maxZoom = 100;

const Component = () => {
  const { zoom } = useGeneralControlsStore<GeneralControlsState>(
    (state) => state
  );

  const [dynamicHeight, setDynamicHeight] = useState(0);

  useEffect(() => {
    const adjustedZoom = Math.max(minZoom, Math.min(maxZoom, Number(zoom)));
    const scale = (adjustedZoom - minZoom) / (maxZoom - minZoom);
    const newDynamicHeight = 0.3 + scale * 0.7; // Scale between 0.3 and 1.0
    setDynamicHeight(newDynamicHeight * 100);
  }, [zoom]);

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
      <img
        src='/images/sample_big.png'
        alt='test'
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
    </Box>
  );
};

export default Component;
