'use client';

import {
  AlertColor,
  Box,
  Button,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';

import styles from './Editor.module.scss';

import useScreenSize from '@/hooks/useScreenSize';

import { ChangesController } from '@/components/ChangesController/ChangesController';
import Frame from '@/components/shared/Frame';
import {
  GeneralControlsState,
  useGeneralControlsStore,
} from '@/stores/useGeneralControlsStore';
import useLateralContextualMenuStore, {
  LateralContextualMenuState,
} from '@/stores/useLateralContextualMenuStore';
import OrderSummaryList from '@/components/shared/OrderSummary/OrderSummaryList';
import LateralContextualMenu from '@/components/LateralContextualMenu/LateralContextualMenu';
import ZoomWrapper from '@/components/shared/ZoomWrapper';

import {
  useNotificationsState,
  useNotificationStore,
} from '@/stores/useNotificationStore';
import BottomDrawer from '@/components/shared/BottomDrawer';
import { useState } from 'react';
import ZoomControl from '@/components/shared/ZoomWrapper/ZoomControl';

export default function PageEditor({ dsInfo }: any) {
  const theme = useTheme();
  const { isDesktop } = useScreenSize();

  const {
    isBottomFrameOpen,
    zoom,
    toggleBottomDrawer,
    toggleBottomFrame,
    setZoom,
  } = useGeneralControlsStore<GeneralControlsState>((state) => state);

  //TODO delete this is just to test the notifications
  const { addNotification } = useNotificationStore<useNotificationsState>(
    (state) => state
  );

  const notificationSample = () => {
    return (
      <Button
        onClick={() => {
          addNotification({
            icon: 'fa-bell-light',
            severity: 'warning' as AlertColor,
            body: (
              <Stack direction='row' gap='20px'>
                <Typography>
                  You have added <b>Raised Foils</b> to your order
                </Typography>
                <Typography
                  color={theme.palette.primary.main}
                  onClick={() => {
                    //TODO add missing implementation
                  }}
                >
                  view summary
                </Typography>
              </Stack>
            ),
          });
        }}
      >
        Show notification
      </Button>
    );
  };
  // TODO end

  console.log('dsInfo', dsInfo);

  return (
    <Stack direction='row' position='relative'>
      <LateralContextualMenu />
      <Box className={styles.editor}>
        {/* 
          TODO delete this is just to test the notifications  
        */}
        {notificationSample()}
        <Button onClick={() => toggleBottomDrawer(true)}>Open</Button>
        {/* 
          TODO delete this is just to test the notifications  
        */}
        <ChangesController
          position='absolute'
          coordinates={{
            top: '15%',
            right: '1%',
          }}
        />
        {isDesktop && (
          <>
            <ZoomControl
              position='absolute'
              zoom={zoom as number}
              setZoom={setZoom}
              coordinates={{
                top: '45%',
                right: '1%',
              }}
            />
            <Frame
              position='absolute'
              coordinates={{
                top: 12,
                left: 16,
              }}
              paperProps={{
                sx: {
                  width: 'fit-content',
                },
              }}
            >
              <p>Interchangebale content top left</p>
            </Frame>
            <Frame
              position='absolute'
              visible={isBottomFrameOpen}
              coordinates={{
                bottom: 100,
                right: 175,
              }}
              paperProps={{
                sx: {
                  width: 'fit-content',
                },
              }}
            >
              <OrderSummaryList onClose={() => toggleBottomFrame(false)} />
            </Frame>
          </>
        )}
        <ZoomWrapper />
        {/* <ViewSelector
          position='absolute'
          coordinates={{
            top: isDesktop ? '20px' : 0,
            right: isDesktop ? '40px' : 0,
            left: isDesktop ? 'unset' : 0,
          }}
          views={views}
          openView={openView}
          setOpenView={setOpenView}
          isDesktop={isDesktop}
        /> */}
      </Box>
    </Stack>
  );
}
