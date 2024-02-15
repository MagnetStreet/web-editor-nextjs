import { AppBar, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useEffect, useRef, useState } from 'react';

import styles from './MainAppBar.module.scss';

import useScreenSize from '@/hooks/useScreenSize';

import DesktopInnerMenu from '@/components/MainAppBar/DesktopInnerMenu';
import MobileInnerMenu from '@/components/MainAppBar/MobileInnerMenu';
import PositionedMenu from '@/components/MainAppBar/PositionedMenu';
import { CustomIcon } from '@/components/shared/CustomIcon';
import OrderSummaryButton from '@/components/shared/OrderSummary/OrderSummaryButton';
import OrderSummaryList from '@/components/shared/OrderSummary/OrderSummaryList';

import {
  GeneralControlsState,
  useGeneralControlsStore,
} from '@/stores/useGeneralControlsStore';

import { MenuItem } from '@/types';

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
  const theme = useTheme();
  const { isDesktop } = useScreenSize();
  const anchorRef = useRef<HTMLElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isOrderSummaryOpen, setIsOrderSummaryOpen] = useState<boolean>(false);
  //TODO unify the isBottomFrameOpen with the isOrderSummaryOpen
  const { isBottomFrameOpen, toggleBottomFrame } =
    useGeneralControlsStore<GeneralControlsState>((state) => state);

  useEffect(() => {
    // All this is to keeping the Menu open
    if (isDesktop && (isMobileMenuOpen || isOrderSummaryOpen)) {
      toggleDesktopMenu(true);
      closeMobileDrawer();
    } else if (!isDesktop && isMenuOpen) {
      toggleDesktopMenu(false);
      toggleMobileDrawer(true);
    }
  }, [isDesktop]);

  const menuItems: MenuItem[] = [
    {
      icon: (
        <CustomIcon
          color={theme.palette.primary.main}
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
      icon: (
        <CustomIcon
          iconClass='fa-share-nodes'
          fontSizeOverWrite='16px'
          color={theme.palette.primary.main}
        />
      ),
      label: 'Share',
      onClick: () => {
        //TODO Missing Implementation
        handleToggleMenuClick(false);
      },
    },
    {
      icon: (
        <CustomIcon
          color={theme.palette.primary.main}
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
            paddingX: { xs: '16px' },
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
            <CustomIcon
              iconClass='fa-bars-sharp-light'
              fontSizeOverWrite='40px'
            />
            <Box className={styles.notificationContainer}>
              <CustomIcon
                iconClass='fa-bell-light'
                hideTextInMobile
                fontSizeOverWrite='12px'
              />
            </Box>
          </IconButton>
          <Box className={styles.typoContainer}>
            <Typography variant='subtitle2'>{subtitle}</Typography>
            <Typography variant='h3'>{title}</Typography>
          </Box>
          <Box className={styles.buttonContainer}>
            {isDesktop && (
              <>
                <OrderSummaryButton
                  total='$2000.00'
                  isOpen={isBottomFrameOpen}
                  onClick={() => toggleBottomFrame(!isBottomFrameOpen)}
                />
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
              </>
            )}

            <Button
              color='primary'
              variant={isDesktop ? 'outlined' : 'text'}
              startIcon={
                <CustomIcon
                  iconClass='fa-floppy-disk-sharp-light'
                  fontSizeOverWrite={isDesktop ? '18px' : '26px'}
                />
              }
            >
              {isDesktop ? 'Save' : ''}
            </Button>
          </Box>
        </Toolbar>
        {/* First Mobile View - Main Mobile */}
        <Drawer
          anchor='left'
          open={isMobileMenuOpen}
          PaperProps={{
            sx: {
              minWidth: '75%',
              width: 'fit-content',
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
              minWidth: '75%',
              width: 'fit-content',
              borderRadius: '0',
            },
          }}
          onClose={() => {
            closeMobileDrawer();
          }}
        >
          <OrderSummaryList onClose={() => toggleOrderSummary(false)} />
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
