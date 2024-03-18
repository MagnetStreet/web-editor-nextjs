import {
  Button,
  Divider,
  Slider,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import * as React from 'react';

import useDebounce from '@/hooks/useDebounce';

import { CustomIcon } from '@/components/shared/CustomIcon';

import { getStylePositionsHelper } from '@/utils/getStylePositionsHelper';

import { Coordinates } from '@/types';

interface ZoomControlProps {
  zoom: number;
  position?: string;
  coordinates?: Coordinates;
  setZoom: (val: number) => void;
  fitImage: () => void;
}

const ZoomControl: React.FC<ZoomControlProps> = ({
  zoom,
  position = 'relative',
  coordinates,
  setZoom,
  fitImage,
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
  const buttonStyle = {
    marginRight: '-12px !important',
    minWidth: '20px',
    padding: 0,
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
      />
      <Typography>Zoom</Typography>
      <Divider
        sx={{
          height: '1px',
          width: '100%',
        }}
      />
      <Button
        onClick={() => {
          fitImage();
        }}
        sx={buttonStyle}
        startIcon={
          <CustomIcon
            iconClass='fa-arrows-maximize-light'
            fontSizeOverWrite='25px'
          />
        }
      ></Button>
    </Stack>
  );
};

export default ZoomControl;
