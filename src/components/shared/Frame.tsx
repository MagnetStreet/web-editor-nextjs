import { Paper, Stack, StackProps } from '@mui/material';
import * as React from 'react';
import { forwardRef, RefObject } from 'react';

import { getStylePositionsHelper } from '@/utils/getStylePositionsHelper';

import { Coordinates } from '@/types';

interface OptionsFrameProps {
  ref?: RefObject<any>;
  position?: string;
  coordinates?: Coordinates;
  className?: string;
  paperProps: StackProps;
  visible?: boolean;
  children: React.ReactNode;
}

const OptionsFrame = forwardRef<any, OptionsFrameProps>(
  (
    {
      children,
      position = 'relative',
      coordinates,
      className,
      visible = true,
      paperProps,
    },
    ref
  ) => {
    const containerStyle = {
      ...getStylePositionsHelper(position, coordinates),
      display: visible ? 'block' : 'none',
      zIndex: 1,
    };

    return (
      <Paper ref={ref} className={className} elevation={0} sx={containerStyle}>
        <Stack {...paperProps}>{children}</Stack>
      </Paper>
    );
  }
);

export default OptionsFrame;
