import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import GridViewIcon from '@mui/icons-material/GridView';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import InterestsOutlinedIcon from '@mui/icons-material/InterestsOutlined';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import PentagonOutlinedIcon from '@mui/icons-material/PentagonOutlined';
import TextFormatOutlinedIcon from '@mui/icons-material/TextFormatOutlined';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import * as React from 'react';

import styles from './SideIconMenu.module.scss';

const SideIconMenu = () => {
  return (
    <Box className={styles.sideIconMenu}>
      <Box className={styles.sideIconMenuInner}>
        <Box className={styles.iconContainer}>
          <GridViewIcon />
          <Typography variant='subtitle2'>Layout</Typography>
        </Box>
        <Box className={styles.iconContainer}>
          <PaletteOutlinedIcon />
          <Typography variant='subtitle2'>Color</Typography>
        </Box>
        <Box className={styles.iconContainer}>
          <TextFormatOutlinedIcon />
          <Typography variant='subtitle2'>Text</Typography>
        </Box>
        <Box className={styles.iconContainer}>
          <PentagonOutlinedIcon />
          <Typography variant='subtitle2'>Shape</Typography>
        </Box>
        <Box className={styles.iconContainer}>
          <InterestsOutlinedIcon />
          <Typography variant='subtitle2'>Elements</Typography>
        </Box>
        <Box className={styles.iconContainer}>
          <InsertPhotoOutlinedIcon />
          <Typography variant='subtitle2'>Images</Typography>
        </Box>
      </Box>
      <Box className={styles.helpContainer}>
        <ChatBubbleOutlineIcon />
        <Typography variant='subtitle2'>Help</Typography>
      </Box>
    </Box>
  );
};

export default SideIconMenu;
