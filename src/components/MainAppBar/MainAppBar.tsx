import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { AppBar, MenuItem } from '@mui/material';
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

import PositionedMenu from '@/components/MainAppBar/PositionedMenu';
import { CustomIcon } from '@/components/shared/CustomIcon';

interface MainAppBarProps {
  title: string;
  subtitle: string;
}

const MainAppBar: React.FC<MainAppBarProps> = ({
  title = '',
  subtitle = '',
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
      toggleMobileDrawer(false)(undefined);
    } else if (!isDesktop && isMenuOpen) {
      toggleDesktopMenu(false);
      toggleMobileDrawer(true)(undefined);
    }
  }, [isDesktop]);

  const toggleDesktopMenu = (open: boolean) => {
    setIsMenuOpen(open);
  };

  const toggleMobileDrawer =
    (open: boolean) => (event?: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setIsMobileMenuOpen(open);
    };

  const handleOpenMenuClick =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (isDesktop) {
        toggleDesktopMenu(open);
      } else {
        toggleMobileDrawer(open)(event);
      }
    };

  const toggleOrderSummary = (open: boolean, shouldGobackIfClosed = false) => {
    if (!open && shouldGobackIfClosed) {
      toggleMobileDrawer(true)(undefined);
    }
    setIsOrderSummaryOpen(open);
  };

  const mobileMenu = () => (
    <Box
      className={styles.mobileMenu}
      role='presentation'
      onClick={toggleMobileDrawer(false)}
      onKeyDown={toggleMobileDrawer(false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem>
          <Button
            onClick={() => {
              toggleOrderSummary(true, false);
            }}
          >
            A
          </Button>
        </ListItem>
      </List>
    </Box>
  );

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
      <List>
        {['The other menu', 'Starred', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
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
            onClick={handleOpenMenuClick(true)}
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
            toggleMobileDrawer(false)(undefined);
            toggleOrderSummary(false, false);
          }}
        >
          {mobileMenu()}
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
            toggleMobileDrawer(false)(undefined);
            toggleOrderSummary(false, false);
          }}
        >
          {mobileMenu2()}
        </Drawer>

        {/* Main Desktop Menu */}
        <PositionedMenu
          anchor={anchorRef}
          isOpen={isMenuOpen}
          toggle={handleOpenMenuClick}
        >
          <MenuItem onClick={handleOpenMenuClick(false)}>Profile</MenuItem>
          <MenuItem onClick={handleOpenMenuClick(false)}>My account</MenuItem>
          <MenuItem onClick={handleOpenMenuClick(false)}>Logout</MenuItem>
        </PositionedMenu>
      </AppBar>
    </Box>
  );
};

export default MainAppBar;
