import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import * as React from 'react';

import styles from './MainAppBar.module.scss';

import { CustomIcon } from '@/components/shared/CustomIcon';

interface DesktopInnerMenu {
  toggle: (val: boolean) => void;
}

const DesktopInnerMenu: React.FC<DesktopInnerMenu> = ({ toggle }) => {
  const handleOnClick = () => {
    //TODO Add logic here o handle redirect
    toggle(false);
  };

  return (
    <List
      disablePadding
      sx={{ paddingY: 0, minWidth: '285px' }}
      className={`${styles.innerMenu}`}
    >
      <ListItem disablePadding className={styles.innerMenu__list_item}>
        <Typography
          variant='h1'
          component='h2'
          sx={{ padding: 2, fontFamily: 'FS sally' }}
        >
          Main Menu
        </Typography>
      </ListItem>
      <Divider className={styles.innerMenu__divider} />
      <ListItem
        disablePadding
        className={styles.innerMenu__list_item}
        onClick={handleOnClick}
      >
        <ListItemButton>
          <ListItemIcon sx={{ minWidth: '26px' }}>
            <CustomIcon
              iconClass='fa-file-arrow-down-sharp-light'
              fontSizeOverWrite='16px'
            />
          </ListItemIcon>
          <ListItemText primary='Download' />
        </ListItemButton>
      </ListItem>
      <ListItem
        disablePadding
        className={styles.innerMenu__list_item}
        onClick={handleOnClick}
      >
        <ListItemButton>
          <ListItemIcon sx={{ minWidth: '26px' }}>
            <CustomIcon iconClass='fa-share-nodes' fontSizeOverWrite='16px' />
          </ListItemIcon>
          <ListItemText primary='Share' />
        </ListItemButton>
      </ListItem>
      <ListItem
        disablePadding
        className={styles.innerMenu__list_item}
        onClick={() => handleOnClick()}
      >
        <ListItemButton>
          <ListItemIcon sx={{ minWidth: '26px' }}>
            <CustomIcon
              iconClass='fa-folder-sharp-light'
              fontSizeOverWrite='16px'
            />
          </ListItemIcon>
          <ListItemText primary='My Projects' />
        </ListItemButton>
      </ListItem>
      <ListItem
        disablePadding
        className={`${styles.innerMenu__list_item} ${styles.innerMenu__list_item__highlight}`}
        onClick={() => handleOnClick}
      >
        <ListItemButton>
          <ListItemIcon sx={{ minWidth: '26px' }}>
            <Box position='relative'>
              <CustomIcon
                color='white'
                iconClass={`${styles.innerMenu__icon_exit_first} fa-square-check-sharp-light`}
                fontSizeOverWrite='16px'
              />
              <CustomIcon
                color='white'
                iconClass={`${styles.innerMenu__icon_exit_arrow} fa-arrow-right`}
                fontSizeOverWrite='12px'
              />
            </Box>
          </ListItemIcon>
          <ListItemText primary='Exit Design Studio' />
        </ListItemButton>
      </ListItem>
    </List>
  );
};

export default DesktopInnerMenu;
