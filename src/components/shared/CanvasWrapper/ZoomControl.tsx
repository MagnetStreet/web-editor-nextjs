import { Slider, Stack, Typography, useTheme } from '@mui/material';
import * as React from 'react';

import { getStylePositionsHelper } from '@/utils/getStylePositionsHelper';

import { Coordinates } from '@/types';

interface ZoomControlProps {
  zoom: number;
  position?: string;
  coordinates?: Coordinates;
  setZoom: (val: number) => void;
}

const ZoomControl: React.FC<ZoomControlProps> = ({
  zoom,
  position = 'relative',
  coordinates,
  setZoom,
}) => {
  const theme = useTheme();
  const containerStyle = {
    zIndex: 1,
    borderRadius: '8px',
    padding: { xs: '12px 4px', md: '12px 8px' },
    alignItems: 'center',
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.secondary.main,
    ...getStylePositionsHelper(position, coordinates),
  };

  return (
    <Stack spacing='12px' direction='column' sx={containerStyle}>
      <Typography>{zoom}%</Typography>
      <Slider
        size='small'
        aria-label='Zoom'
        value={zoom}
        orientation='vertical'
        valueLabelDisplay='auto'
        sx={{
          width: '4px',
          height: '165px',
        }}
        onChange={(
          event: Event,
          value: number | number[],
          activeThumb: number
        ) => setZoom(value as number)}
      />
      <Typography>Zoom</Typography>
    </Stack>
  );
};

export default ZoomControl;
