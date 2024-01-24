import MailIcon from '@mui/icons-material/Mail';
import { AppBar } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useEffect, useRef, useState } from 'react';

import styles from './MainAppBar.module.scss';

import useScreenSize from '@/hooks/useScreenSize';

import DesktopInnerMenu from '@/components/MainAppBar/DesktopInnerMenu';
import PositionedMenu from '@/components/MainAppBar/PositionedMenu';
import { CustomIcon } from '@/components/shared/CustomIcon';
import MobileInnerMenu from '@/components/MainAppBar/MobileInnerMenu';
import { MenuItems } from '@/types';

interface MainAppBarProps {
  title: string;
  subtitle: string;
  hasNotifications: boolean;
}

const MainAppBar: React.FC<MainAppBarProps> = ({
  //TODO move thse to a store
  title = '',
  subtitle = '',
  hasNotifications = true, //TODO Add logic
}) => {
  const { isDesktop } = useScreenSize();
  const anchorRef = useRef<HTMLElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isOrderSummaryOpen, setIsOrderSummaryOpen] = useState<boolean>(false);

  useEffect(() => {
    // All this is to keeping the Menu open
    if (isDesktop && isMobileMenuOpen) {
      toggleDesktopMenu(true);
      toggleMobileDrawer(false);
    } else if (!isDesktop && isMenuOpen) {
      toggleDesktopMenu(false);
      toggleMobileDrawer(true);
    }
  }, [isDesktop]);

  const menuItems: MenuItems[] = [
    {
      icon: (
        <CustomIcon
          iconClass='fa-file-arrow-down-sharp-light'
          fontSizeOverWrite='16px'
        />
      ),
      label: 'Download',
      onClick: () => {
        //TODO Missing Implementation
        handleToggleMenuClick(false);
      },
    },
    {
      icon: <CustomIcon iconClass='fa-share-nodes' fontSizeOverWrite='16px' />,
      label: 'Share',
      onClick: () => {
        //TODO Missing Implementation
        handleToggleMenuClick(false);
      },
    },
    {
      icon: (
        <CustomIcon
          iconClass='fa-folder-sharp-light'
          fontSizeOverWrite='16px'
        />
      ),
      label: 'My Projects',
      onClick: () => {
        //TODO Missing Implementation
        handleToggleMenuClick(false);
      },
    },
    {
      icon: (
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
      ),
      isHighlight: true,
      label: 'Exit Design Studio',
      onClick: () => {
        //TODO Missing Implementation
        handleToggleMenuClick(false);
      },
    },
  ];

  const toggleDesktopMenu = (open: boolean) => {
    setIsMenuOpen(open);
  };

  const toggleMobileDrawer = (open: boolean) => {
    setIsMobileMenuOpen(open);
  };

  const closeMobileDrawer = () => {
    toggleMobileDrawer(false);
    toggleOrderSummary(false, false);
  };

  const handleToggleMenuClick = (open: boolean) => {
    if (isDesktop) {
      toggleDesktopMenu(open);
    } else {
      toggleMobileDrawer(open);
    }
  };

  const toggleOrderSummary = (open: boolean, shouldGobackIfClosed = false) => {
    if (!open && shouldGobackIfClosed) {
      toggleMobileDrawer(true);
    }
    setIsOrderSummaryOpen(open);
  };

  const mobileMenu2 = () => (
    <Box
      className={styles.mobileMenu}
      role='presentation'
      onClick={() => {
        toggleOrderSummary(false, true);
      }}
      onKeyDown={() => {
        toggleOrderSummary(false, true);
      }}
    >
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position='static'
        elevation={0}
        className={styles.AppBarContainer}
        ref={anchorRef}
      >
        <Toolbar
          sx={{
            justifyContent: 'space-between',
          }}
        >
          <IconButton
            size='large'
            edge='start'
            aria-label='menu'
            sx={{ mr: 3 }}
            onClick={() => handleToggleMenuClick(true)}
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
          {isDesktop && (
            <Box className={styles.typoContainer}>
              <Typography variant='h2'>{subtitle}</Typography>
              <Typography variant='h1'>{title}</Typography>
            </Box>
          )}
          <Box className={styles.buttonContainer}>
            {isDesktop && (
              <Button
                color='primary'
                variant='outlined'
                startIcon={
                  <CustomIcon
                    iconClass='fa-eye-light'
                    fontSizeOverWrite='18px'
                  />
                }
              >
                preview
              </Button>
            )}

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
        {/* First Mobile View - Main Mobile */}
        <Drawer
          anchor='left'
          open={isMobileMenuOpen}
          PaperProps={{
            sx: {
              width: '75%',
              borderRadius: '0',
            },
          }}
          onClose={() => {
            closeMobileDrawer();
          }}
        >
          <MobileInnerMenu
            menuItems={menuItems}
            typeOfProduct={title}
            productName={subtitle}
            toggleOrderSummary={toggleOrderSummary}
            toggleMobileDrawer={toggleMobileDrawer}
          />
        </Drawer>
        {/* Second Mobile View - Order Summary */}
        <Drawer
          anchor='left'
          open={isOrderSummaryOpen}
          PaperProps={{
            sx: {
              width: '75%',
              borderRadius: '0',
            },
          }}
          onClose={() => {
            closeMobileDrawer();
          }}
        >
          {mobileMenu2()}
        </Drawer>

        {/* Main Desktop Menu */}
        <PositionedMenu
          anchor={anchorRef}
          isOpen={isMenuOpen}
          toggle={toggleDesktopMenu}
        >
          <DesktopInnerMenu menuItems={menuItems} />
        </PositionedMenu>
      </AppBar>
    </Box>
  );
};

export default MainAppBar;
