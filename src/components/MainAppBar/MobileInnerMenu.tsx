import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import * as React from 'react';
import styles from './MainAppBar.module.scss';
import { CustomIcon } from '@/components/shared/CustomIcon';

interface MobileInnerMenuProps {
  toggleOrderSummary: (val: boolean, val2: boolean) => void;
  toggleMobileDrawer: (val: boolean) => void;
}

const MobileInnerMenu: React.FC<MobileInnerMenuProps> = ({
  toggleOrderSummary,
  toggleMobileDrawer,
}) => {
  return (
    <List
      className={styles.innerMenu}
      role='presentation'
      // onClick={toggleMobileDrawer(false)}
      // onKeyDown={toggleMobileDrawer(false)}
    >
      <Box
        className={styles.innerMenu__icon_exit}
        onClick={() => toggleMobileDrawer(false)}
      >
        <CustomIcon iconClass='fa-xmark-large' fontSizeOverWrite='16px' />
      </Box>
      <Stack className={styles.innerMenu__wrapper}>
        <Box>
          <ListItem disablePadding className={styles.innerMenu__list_item}>
            <Stack>
              <Typography
                variant='h2'
                component='h2'
                sx={{ fontFamily: 'FS sally' }}
              >
                Type of Product
              </Typography>
              <Typography
                variant='h1'
                component='h2'
                sx={{ fontFamily: 'FS sally' }}
              >
                Product Name
              </Typography>
            </Stack>
          </ListItem>
          <Divider className={styles.innerMenu__divider} />
          <ListItem>
            <Button
              onClick={() => {
                toggleOrderSummary(true, false);
              }}
            >
              A
            </Button>
          </ListItem>
          <List>
            <ListItem
              disablePadding
              className={styles.innerMenu__list_item}
              onClick={() => toggleMobileDrawer(false)}
            >
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: '26px' }}>
                  <CustomIcon
                    iconClass='fa-file-arrow-down-sharp-light'
                    fontSizeOverWrite='16px'
                  />
                </ListItemIcon>
                <ListItemText primary='Download2' />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              className={styles.innerMenu__list_item}
              onClick={() => toggleMobileDrawer(false)}
            >
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: '26px' }}>
                  <CustomIcon
                    iconClass='fa-share-nodes'
                    fontSizeOverWrite='16px'
                  />
                </ListItemIcon>
                <ListItemText primary='Share2' />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              className={styles.innerMenu__list_item}
              onClick={() => toggleMobileDrawer(false)}
            >
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: '26px' }}>
                  <CustomIcon
                    iconClass='fa-folder-sharp-light'
                    fontSizeOverWrite='16px'
                  />
                </ListItemIcon>
                <ListItemText primary='My Projects2' />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
        <ListItem
          disablePadding
          className={`${styles.innerMenu__list_item} ${styles.innerMenu__list_item__highlight}`}
          onClick={() => toggleMobileDrawer(false)}
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
            <ListItemText primary='Exit Design Studio2' />
          </ListItemButton>
        </ListItem>
      </Stack>
    </List>
  );
};

export default MobileInnerMenu;
