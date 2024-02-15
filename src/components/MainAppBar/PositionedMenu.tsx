import { PopoverOrigin } from '@mui/material';
import Menu from '@mui/material/Menu';
import * as React from 'react';

import { Coordinates } from '@/types';

interface MainAppBarProps {
  anchor: React.MutableRefObject<HTMLElement | null>;
  isOpen: boolean;
  children: React.ReactNode;
  toggle: (val: boolean) => void;
  origin?: PopoverOrigin;
  coordinates?: Coordinates;
}

const PositionedMenu: React.FC<MainAppBarProps> = ({
  anchor,
  isOpen,
  toggle,
  origin = {
    vertical: 'bottom',
    horizontal: 'left',
  },
  coordinates = {
    top: 49,
    left: -20,
  },
  children,
}) => {
  const containerStyle = {
    ...coordinates,
  };
  return (
    <Menu
      id='positioned-menu'
      aria-labelledby='positioned-button'
      anchorEl={anchor.current}
      open={isOpen}
      onClose={() => toggle(false)}
      anchorOrigin={{ ...origin }}
      transformOrigin={{ ...origin }}
      sx={containerStyle}
      slotProps={{
        paper: {
          sx: {
            '& .MuiList-root': {
              paddingY: 0,
            },
            ...containerStyle,
          },
        },
      }}
    >
      {children}
    </Menu>
  );
};

export default PositionedMenu;
