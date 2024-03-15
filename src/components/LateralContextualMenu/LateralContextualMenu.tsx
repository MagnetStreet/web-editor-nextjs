import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import * as React from 'react';

import styles from './LateralContextualMenu.module.scss';

import { IconObj } from '@/types';
import { CONTEXTUAL_MENU_OPTION } from '@/types/enum';

interface LateralContextualMenuProps {
  items: Array<IconObj>;
  activeLayoutName: CONTEXTUAL_MENU_OPTION;
  isIsolatedModeActive: boolean;
  setActiveLayoutName: (val: CONTEXTUAL_MENU_OPTION) => void;
}

const LateralContextualMenu: React.FC<LateralContextualMenuProps> = ({
  items,
  activeLayoutName,
  isIsolatedModeActive,
  setActiveLayoutName,
}) => {
  return (
    <Box
      id='lateral-contextual-menu'
      className={`${styles.sideIconMenu} ${
        isIsolatedModeActive ? styles.sideIconMenu__isActive : ''
      }`}
    >
      <Box className={styles.sideIconMenuInner}>
        {items.map((item, index) => (
          <Box
            key={index}
            className={`${styles.iconContainer} ${
              activeLayoutName === item.name ? styles.active : ''
            }`}
            onClick={() =>
              setActiveLayoutName(item.name as CONTEXTUAL_MENU_OPTION)
            }
          >
            {item.icon}
            <Typography variant='subtitle2'>{item.name}</Typography>
          </Box>
        ))}
      </Box>
      <Box className={styles.helpContainer}>
        <i className=' fa-comment-light'></i>
        <Typography variant='subtitle2'>Help</Typography>
      </Box>
    </Box>
  );
};

export default LateralContextualMenu;
