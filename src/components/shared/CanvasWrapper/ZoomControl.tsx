import { Slider, Stack, Typography, useTheme } from '@mui/material';
import * as React from 'react';

import useDebounce from '@/hooks/useDebounce';

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
  const [localZoom, setLocalZoom] = React.useState(zoom);
  const debouncedSetZoom = useDebounce(setZoom, 300);
  const containerStyle = {
    zIndex: 1,
    borderRadius: '8px',
    padding: { xs: '12px 4px', md: '12px 8px' },
    alignItems: 'center',
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.secondary.main,
    ...getStylePositionsHelper(position, coordinates),
  };

  const handleZoomChange = (
    event: Event,
    value: number | number[],
    activeThumb: number
  ) => {
    setLocalZoom(value as number);
    debouncedSetZoom(value as number); // Call the debounced function
  };

  return (
    <Stack spacing='12px' direction='column' sx={containerStyle}>
      <Typography>{localZoom}%</Typography>
      <Slider
        size='small'
        aria-label='Zoom'
        value={localZoom}
        orientation='vertical'
        valueLabelDisplay='auto'
        sx={{
          width: '4px',
          height: '165px',
        }}
        onChange={handleZoomChange}
        // onChange={(
        //   event: Event,
        //   value: number | number[],
        //   activeThumb: number
        // ) => setZoom(value as number)}
      />
      <Typography>Zoom</Typography>
    </Stack>
  );
};

export default ZoomControl;
