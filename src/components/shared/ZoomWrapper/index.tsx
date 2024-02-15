import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';

import {
  GeneralControlsState,
  useGeneralControlsStore,
} from '@/stores/useGeneralControlsStore';
const minZoom = 0;
const maxZoom = 100;

interface ZoomWrapperProps {
  imageBlob: string;
}

const ZoomWrapper: React.FC<ZoomWrapperProps> = ({ imageBlob }) => {
  const { zoom } = useGeneralControlsStore<GeneralControlsState>(
    (state) => state
  );
  const [imageSrc, setImageSrc] = useState<string>('');
  const [dynamicHeight, setDynamicHeight] = useState(0);

  useEffect(() => {
    const adjustedZoom = Math.max(minZoom, Math.min(maxZoom, Number(zoom)));
    const scale = (adjustedZoom - minZoom) / (maxZoom - minZoom);
    const newDynamicHeight = 0.3 + scale * 0.7; // Scale between 0.3 and 1.0
    setDynamicHeight(newDynamicHeight * 100);
  }, [zoom]);

  useEffect(() => {
    //TODO fIX this logic
    // if (imageBlob) {
    //   if (typeof imageBlob === 'string') {
    //     fetch(imageBlob) // Fetch the Blob data if imageBlob is a URL
    //       .then((response) => response.blob())
    //       .then((blob) => {
    //         const reader = new FileReader();
    //         reader.onload = () => {
    //           setImageSrc(reader.result as string);
    //         };
    //         reader.readAsDataURL(blob);
    //       })
    //       .catch((error) => console.error('Failed to fetch image:', error));
    //   } else {
    //     console.error('imageBlob is not a valid Blob:', imageBlob);
    //   }
    // }
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
        src={imageSrc}
        alt='test'
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
    </Box>
  );
};

export default ZoomWrapper;
