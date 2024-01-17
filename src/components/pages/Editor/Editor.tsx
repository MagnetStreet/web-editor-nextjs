'use client';

import { Box } from '@mui/material';

import { ChangesController } from '@/components/shared/ChangesController/ChangesController';
import { ViewSelector } from '@/components/shared/ViewSelector/ViewSelector';

import {
  GeneralControlsState,
  useGeneralControlsStore,
} from '@/stores/useGeneralControlsStore';
import useLateralContextualMenuStore, {
  LateralContextualMenuState,
} from '@/stores/useLateralContextualMenuStore';

export default function EditorPage() {
  const { activeLayoutName } =
    useLateralContextualMenuStore<LateralContextualMenuState>((state) => state);
  const { views, openView, setOpenView } =
    useGeneralControlsStore<GeneralControlsState>((state) => state);
  return (
    <Box position='relative'>
      Hello World the active layout is {activeLayoutName}
      <ChangesController />
      <Box
        position='absolute'
        sx={{
          top: '20px',
          right: '40px',
        }}
      >
        <ViewSelector
          views={views}
          openView={openView}
          setOpenView={setOpenView}
        />
      </Box>
    </Box>
  );
}
