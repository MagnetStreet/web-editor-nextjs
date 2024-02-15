import { SxProps } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import * as React from 'react';

const DefaultStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  p: 4,
};

interface GenericModalProps {
  handleClose?: () => void;
  children: React.ReactNode;
  styleProp?: SxProps;
  isOpen: boolean;
}

const GenericModal: React.FC<GenericModalProps> = ({
  children,
  styleProp,
  isOpen,
  handleClose,
}) => {
  const mergedStyle: SxProps = { ...DefaultStyle, ...styleProp };

  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      open={isOpen}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={isOpen}>
        <Box sx={mergedStyle}>{children}</Box>
      </Fade>
    </Modal>
  );
};

export default GenericModal;
