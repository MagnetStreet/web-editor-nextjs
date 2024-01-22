import { PopoverOrigin } from '@mui/material';
import Menu from '@mui/material/Menu';
import * as React from 'react';

interface MainAppBarProps {
  anchor: React.MutableRefObject<HTMLElement | null>;
  isOpen: boolean;
  children: React.ReactNode;
  toggle: (val: boolean) => void;
  origin?: PopoverOrigin;
}

const PositionedMenu: React.FC<MainAppBarProps> = ({
  anchor,
  isOpen,
  toggle,
  origin = {
    vertical: 'bottom',
    horizontal: 'left',
  },
  children,
}) => {
  return (
    <Menu
      id='positioned-menu'
      aria-labelledby='positioned-button'
      anchorEl={anchor.current}
      open={isOpen}
      onClose={() => toggle(false)}
      anchorOrigin={{ ...origin }}
      transformOrigin={{ ...origin }}
    >
      {children}xxx
    </Menu>
  );
};

export default PositionedMenu;
