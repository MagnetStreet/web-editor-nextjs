import { Paper, Stack, StackProps } from '@mui/material';
import * as React from 'react';

import { getStylePositionsHelper } from '@/utils/shared/getStylePositionsHelper';

import { Coordinates } from '@/types';

interface OptionsFrameProps {
  position?: string;
  coordinates?: Coordinates;
  className?: string;
  paperProps: StackProps;
  visible?: boolean;
  children: React.ReactNode;
}

const OptionsFrame: React.FC<OptionsFrameProps> = ({
  children,
  position = 'relative',
  coordinates,
  className,
  visible = true,
  paperProps,
}) => {
  const containerStyle = {
    ...getStylePositionsHelper(position, coordinates),
    display: visible ? 'block' : 'none',
  };
  return (
    <Paper className={className} elevation={0} sx={containerStyle}>
      <Stack {...paperProps}>{children}</Stack>
    </Paper>
  );
};

export default OptionsFrame;
