import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import GridViewIcon from '@mui/icons-material/GridView';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import InterestsOutlinedIcon from '@mui/icons-material/InterestsOutlined';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import PentagonOutlinedIcon from '@mui/icons-material/PentagonOutlined';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import styles from './SideIconMenu.module.scss';

import useSideMenuStore, { SideMenuState } from '@/stores/useSideMenuStore';

interface IconObj {
  name: string;
  icon: JSX.Element;
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
      icon: <GridViewIcon />,
    },
    {
      name: 'Color',
      icon: <PaletteOutlinedIcon />,
    },
    {
      name: 'Text',
      icon: <FormatColorTextIcon />,
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
      icon: <InsertPhotoOutlinedIcon />,
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
