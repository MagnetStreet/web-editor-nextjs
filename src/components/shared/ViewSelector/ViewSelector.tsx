import { Box, Menu, MenuItem, Paper, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { useRef, useState } from 'react';

import styles from './ViewSelector.module.scss';

import { CustomIcon } from '@/components/shared/CustomIcon';

import { EditorView } from '@/types';

const ViewSelectorItem: React.FC<ViewSelectorItemProps> = ({
  index,
  isActive,
  displayName,
  tumbnailSrc,
  viewClickedHandle,
}) => {
  const rootClass = `
    ${styles.viewWrapper} 
    ${isActive ? styles.active : ''}
  `;
  return (
    <Stack
      className={rootClass}
      key={`view-selector-${index}`}
      onClick={() => viewClickedHandle(index)}
    >
      {isActive && (
        <Box className={styles.checkIcon}>
          <CustomIcon
            iconClass='fa-circle-check-solid'
            fontSizeOverWrite='14px'
          />
        </Box>
      )}
      <Box
        width={imageDimensions.width}
        height={imageDimensions.height}
        position='relative'
      >
        <Image src={tumbnailSrc} alt='Example Image' fill={true} sizes='100%' />
      </Box>
      <Typography>{displayName}</Typography>
    </Stack>
  );
};

export const ViewSelector: React.FC<ViewSelectorProps> = ({
  views,
  openView,
  isDesktop,
  setOpenView,
}) => {
  const elRef = useRef(null);
  const [open, setOpen] = useState(false);

  const viewClicked = (index: number) => {
    setOpenView(views[index]);
    if (open) {
      setOpen(false);
    }
  };

  const toggleDrawer =
    (newOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setOpen(newOpen);
    };

  return (
    <>
      {isDesktop ? (
        <Paper elevation={3} className={styles.viewSelector}>
          {views.map((view, index) => {
            const rootClass = `
              ${styles.viewWrapper} 
              ${index === openView.id ? styles.active : ''}
            `;
            return (
              <ViewSelectorItem
                key={`view-selector-mobile-${index}`}
                index={index}
                isActive={index === openView.id}
                displayName={view.displayName}
                tumbnailSrc={view.tumbnailSrc}
                viewClickedHandle={() => viewClicked(index)}
              />
            );
          })}
        </Paper>
      ) : (
        <Box className={styles.viewWrapperMobile} ref={elRef}>
          <Stack
            onClick={toggleDrawer(!open)}
            direction='row'
            className={styles.viewButtonMobile}
          >
            <Box className={styles.checkIconbtn}>
              <CustomIcon
                iconClass='fa-circle-check-solid'
                fontSizeOverWrite='14px'
              />
            </Box>
            <Typography fontSize='12px' lineHeight='normal'>
              {openView.displayName}
            </Typography>
            <CustomIcon
              iconClass={open ? 'fa-chevron-up' : 'fa-chevron-down'}
              fontSizeOverWrite='14px'
            />
          </Stack>
          <Menu
            id='view-selection-menu'
            className={styles.viewerMobileMenu}
            anchorEl={elRef.current}
            open={open}
            onClose={toggleDrawer(!open)}
            MenuListProps={{
              'aria-labelledby': 'view-selection-menu',
              className: styles.viewerMobileMenulist,
              sx: {
                display: 'flex',
                width: '100%',
                flexDirection: 'row',
              },
            }}
            PaperProps={{
              elevation: 0,
              className: styles.viewerMobilePaper,
            }}
          >
            {views.map((view, index) => {
              return (
                <MenuItem
                  key={`view-selector-mobile-${index}`}
                  onClick={() => toggleDrawer(!open)}
                >
                  <ViewSelectorItem
                    index={index}
                    isActive={index === openView.id}
                    displayName={view.displayName}
                    tumbnailSrc={view.tumbnailSrc}
                    viewClickedHandle={() => viewClicked(index)}
                  />
                </MenuItem>
              );
            })}
          </Menu>
        </Box>
      )}
    </>
  );
};

const imageDimensions = {
  width: 54,
  height: 75,
};

interface ViewSelectorItemProps {
  index: number;
  isActive: boolean;
  displayName: string;
  tumbnailSrc: string;
  viewClickedHandle: (x: number) => void;
}

export interface ViewSelectorProps {
  views: EditorView[];
  openView: EditorView;
  isDesktop: boolean;
  setOpenView: (x: EditorView) => void;
}
