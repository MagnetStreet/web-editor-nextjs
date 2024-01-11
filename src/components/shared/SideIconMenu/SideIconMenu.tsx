import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import InterestsOutlinedIcon from '@mui/icons-material/InterestsOutlined';
import PentagonOutlinedIcon from '@mui/icons-material/PentagonOutlined';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import styles from './SideIconMenu.module.scss';

import useSideMenuStore, { SideMenuState } from '@/stores/useSideMenuStore';

interface IconObj {
  name: string;
  icon: ReactJSXElement;
}

const SideIconMenu = () => {
  const { activeLayoutName, setActiveLayoutName } =
    useSideMenuStore<SideMenuState>((state) => ({
      activeLayoutName: state.activeLayoutName,
      setActiveLayoutName: state.setActiveLayoutName,
    }));

  const items: Array<IconObj> = [
    {
      name: 'Layout',
      icon: <i className='fa-grid-2-sharp-light'></i>,
    },
    {
      name: 'Color',
      icon: <i className='fa-case-normal'></i>,
    },
    {
      name: 'Text',
      icon: <i className='fa-case-normal'></i>,
    },
    {
      name: 'Shape',
      icon: <PentagonOutlinedIcon />,
    },
    {
      name: 'Elements',
      icon: <InterestsOutlinedIcon />,
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
        <ChatBubbleOutlineIcon />
        <Typography variant='subtitle2'>Help</Typography>
      </Box>
    </Box>
  );
};

export default SideIconMenu;
