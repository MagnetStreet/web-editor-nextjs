import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import * as React from 'react';

import styles from './LateralContextualMenu.module.scss';

import { IconObj } from '@/types';

interface LateralContextualMenuProps {
  items: Array<IconObj>;
  activeLayoutName: string;
  isIsolatedModeActive: boolean;
  setActiveLayoutName: (val: string) => void;
}

const LateralContextualMenu: React.FC<LateralContextualMenuProps> = ({
  items,
  activeLayoutName,
  isIsolatedModeActive,
  setActiveLayoutName,
}) => {
  return (
    <Box
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
            onClick={() => setActiveLayoutName(item.name)}
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
