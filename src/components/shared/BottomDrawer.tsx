import * as React from 'react';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

interface SampleProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  children: React.ReactNode;
}

const Sample: React.FC<SampleProps> = ({ open, setOpen, children }) => {
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <SwipeableDrawer
      anchor='bottom'
      open={open}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
      swipeAreaWidth={drawerBleeding}
      disableSwipeToOpen={false}
      ModalProps={{
        keepMounted: true,
      }}
      PaperProps={{
        sx: {
          height: 'fit-content',
          maxHeight: `calc(50% - ${drawerBleeding}px)`,
          overflow: 'scroll',
          paddingTop: '16px',
        },
      }}
    >
      <StyledBox
        sx={{
          px: 2,
          pb: 2,
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
          height: '100%',
          overflow: 'auto',
        }}
      >
        <Puller />
        {children}
      </StyledBox>
    </SwipeableDrawer>
  );
};

export default Sample;

const drawerBleeding = 56;
const StyledBox = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));
const Puller = styled('div')(({ theme }) => ({
  width: 40,
  height: 4,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));
