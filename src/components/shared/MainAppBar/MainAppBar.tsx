import { AppBar } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';

import styles from './MainAppBar.module.scss';

import { CustomIcon } from '@/components/shared/CustomIcon';

interface MainAppBarProps {
  title: string;
  subtitle: string;
}

const MainAppBar: React.FC<MainAppBarProps> = ({
  title = '',
  subtitle = '',
}) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position='static'
        elevation={0}
        className={styles.AppBarContainer}
      >
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            aria-label='menu'
            sx={{ mr: 3 }}
          >
            <CustomIcon iconClass='fa-bars-sharp-light' />
            <Box className={styles.notificationContainer}>
              <CustomIcon
                iconClass='fa-bell-light'
                hideTextInMobile
                fontSizeOverWrite='12px'
              />
            </Box>
          </IconButton>
          <Box className={styles.typoContainer}>
            <Typography variant='h2'>{subtitle}</Typography>
            <Typography variant='h1'>{title}</Typography>
          </Box>
          <Box className={styles.buttonContainer}>
            <Button
              color='primary'
              variant='outlined'
              startIcon={
                <CustomIcon iconClass='fa-eye-light' fontSizeOverWrite='18px' />
              }
            >
              preview
            </Button>
            <Button
              color='primary'
              variant='outlined'
              startIcon={
                <CustomIcon
                  iconClass='fa-floppy-disk-sharp-light'
                  fontSizeOverWrite='18px'
                />
              }
            >
              Save
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MainAppBar;
