import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import styles from './LateralContextualMenu.module.scss';

import useSideMenuStore, {
  SideMenuState,
} from '@/stores/useLateralContextualMenuStore';

interface IconObj {
  name: string;
  icon: ReactJSXElement;
}

const LateralContextualMenu = () => {
  const { activeLayoutName, setActiveLayoutName } =
    useSideMenuStore<SideMenuState>((state) => state);

  const items: Array<IconObj> = [
    {
      name: 'Layout',
      icon: <i className='fa-grid-2-sharp-light'></i>,
    },
    {
      name: 'Color',
      icon: <i className='fa-palette-light'></i>,
    },
    {
      name: 'Text',
      icon: <i className='fa-case-normal'></i>,
    },
    {
      name: 'Shape',
      icon: <i className='fa-objects-column-light'></i>,
    },
    {
      name: 'Elements',
      icon: <i className='fa-shapes-sharp-light'></i>,
    },
    {
      name: 'Images',
      icon: <i className='fa-image-sharp-light'></i>,
    },
  ];

  return (
    <Box className={styles.sideIconMenu}>
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
