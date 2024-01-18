'use client';

import { Box } from '@mui/material';

import styles from './Editor.module.scss';

import useScreenSize from '@/hooks/useScreenSize';

import { ChangesController } from '@/components/shared/ChangesController/ChangesController';
import { ViewSelector } from '@/components/shared/ViewSelector/ViewSelector';

import {
  GeneralControlsState,
  useGeneralControlsStore,
} from '@/stores/useGeneralControlsStore';
import useLateralContextualMenuStore, {
  LateralContextualMenuState,
} from '@/stores/useLateralContextualMenuStore';
import useStepperStore, { StepperState } from '@/stores/useStepperStore';

export default function EditorPage() {
  const { isDesktop } = useScreenSize();
  const { activeLayoutName } =
    useLateralContextualMenuStore<LateralContextualMenuState>((state) => state);
  const { views, openView, setOpenView } =
    useGeneralControlsStore<GeneralControlsState>((state) => state);
  const { activeSubStep, activeStep } = useStepperStore<StepperState>(
    (state) => state
  );
  return (
    <Box className={styles.editor}>
      Hello World the active layout is {activeLayoutName}
      Hello World the active Step and SubStep are {activeStep} and
      {activeSubStep}
      <ChangesController />
      <Box
        position='absolute'
        sx={{
          top: isDesktop ? '20px' : 0,
          right: isDesktop ? '40px' : 0,
          left: isDesktop ? 'unset' : 0,
        }}
      >
        <ViewSelector
          views={views}
          openView={openView}
          setOpenView={setOpenView}
          isDesktop={isDesktop}
        />
      </Box>
    </Box>
  );
}
