'use client';

import { AlertColor, Box, Button, Stack } from '@mui/material';

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

export default function PageEditor({ dsInfo }: any) {
  const { isDesktop } = useScreenSize();
  const { activeLayoutName } =
    useLateralContextualMenuStore<LateralContextualMenuState>((state) => state);

  const {
    views,
    openView,
    isBottomDrawerOpen,
    isBottomFrameOpen,
    setOpenView,
    toggleBottomDrawer,
    toggleBottomFrame,
  } = useGeneralControlsStore<GeneralControlsState>((state) => state);

  //TODO delete this is just to test the notifications
  const { addNotification } = useNotificationStore<useNotificationsState>(
    (state) => state
  );
  // TODO end

  console.log('dsInfo', dsInfo);

  return (
    <Stack direction='row' position='relative'>
      <LateralContextualMenu />
      <Box className={styles.editor}>
        {/* 
          TODO delete this is just to test the notifications  
        */}
        <Button
          onClick={() => {
            addNotification({
              icon: 'fa-bell-light',
              severity: 'warning' as AlertColor,
              body: (
                <Box>
                  You have added <b>Raised Foils</b> to your order{' '}
                  <a>view summary</a>
                </Box>
              ),
            });
          }}
        >
          Show notification
        </Button>
        <Button onClick={() => toggleBottomDrawer(true)}>Open</Button>
        {/* 
          TODO delete this is just to test the notifications  
        */}
        <ChangesController
          position='absolute'
          coordinates={{
            top: '20%',
            right: isDesktop ? '20%' : '5%',
          }}
        />
        {isDesktop && (
          <>
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
        {!isDesktop && (
          <BottomDrawer open={isBottomDrawerOpen} setOpen={toggleBottomDrawer}>
            <p>HEY LISTEN</p>
          </BottomDrawer>
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
