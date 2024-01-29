'use client';

import { Box, Button, Stack } from '@mui/material';

import styles from './Editor.module.scss';

import useScreenSize from '@/hooks/useScreenSize';

import { ChangesController } from '@/components/ChangesController/ChangesController';
import Frame from '@/components/shared/Frame';
import { ViewSelector } from '@/components/ViewSelector/ViewSelector';

import {
  GeneralControlsState,
  useGeneralControlsStore,
} from '@/stores/useGeneralControlsStore';
import useLateralContextualMenuStore, {
  LateralContextualMenuState,
} from '@/stores/useLateralContextualMenuStore';
import useStepperStore, { StepperState } from '@/stores/useStepperStore';
import OrderSummaryList from '@/components/shared/OrderSummary/OrderSummaryList';
import LateralContextualMenu from '@/components/LateralContextualMenu/LateralContextualMenu';
import ZoomWrapper from '@/components/shared/ZoomWrapper';

export default function PageEditor({ dsInfo }: any) {
  const { isDesktop } = useScreenSize();
  const { activeLayoutName } =
    useLateralContextualMenuStore<LateralContextualMenuState>((state) => state);

  const {
    views,
    openView,
    isBottomFrameOpen,
    setOpenView,
    setIsBottomFrameOpen,
  } = useGeneralControlsStore<GeneralControlsState>((state) => state);
  const { activeSubStep, activeStep } = useStepperStore<StepperState>(
    (state) => state
  );

  console.log('dsInfo', dsInfo);

  return (
    <Stack direction='row' position='relative'>
      <LateralContextualMenu />
      <Box className={styles.editor}>
        Hello World the active layout is {activeLayoutName}
        Hello World the active Step and SubStep are {activeStep} and
        {activeSubStep}
        <ChangesController
          position='absolute'
          coordinates={{
            top: '20%',
            right: '25%',
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
              <OrderSummaryList onClose={() => setIsBottomFrameOpen(false)} />
            </Frame>
          </>
        )}
        <ZoomWrapper />
        <ViewSelector
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
        />
      </Box>
    </Stack>
  );
}
