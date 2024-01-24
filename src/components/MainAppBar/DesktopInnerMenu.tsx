import {
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
import { MenuItems } from '@/types';

interface DesktopInnerMenu {
  menuItems: MenuItems[];
}

const DesktopInnerMenu: React.FC<DesktopInnerMenu> = ({ menuItems }) => {
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
      {menuItems.map((item) => (
        <ListItem
          key={`menu-item-${item.label}`}
          disablePadding
          className={`${styles.innerMenu__list_item} ${
            item.isHighlight ? styles.innerMenu__list_item__highlight : ''
          }`}
          onClick={item.onClick}
        >
          <ListItemButton>
            <ListItemIcon sx={{ minWidth: '26px' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default DesktopInnerMenu;
