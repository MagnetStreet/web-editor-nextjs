'use client';

import { Box } from '@mui/material';

import styles from './Editor.module.scss';

import useScreenSize from '@/hooks/useScreenSize';

import { ChangesController } from '@/components/ChangesController/ChangesController';
import OptionsFrame from '@/components/shared/OptionsFrame';
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

export default function EditorPage() {
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

  return (
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
          <OptionsFrame
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
          </OptionsFrame>
          <OptionsFrame
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
          </OptionsFrame>
        </>
      )}
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
  );
}
