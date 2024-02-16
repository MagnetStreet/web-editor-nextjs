import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';

import {
  GeneralControlsState,
  useGeneralControlsStore,
} from '@/stores/useGeneralControlsStore';
const minZoom = 0;
const maxZoom = 100;

interface ZoomWrapperProps {
  imageBlob: Blob;
}

const ZoomWrapper: React.FC<ZoomWrapperProps> = ({ imageBlob }) => {
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
        src={imageUrl}
        alt='test'
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
    </Box>
  );
};

export default ZoomWrapper;
