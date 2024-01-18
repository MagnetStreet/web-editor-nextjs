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

export default function EditorPage() {
  const { isDesktop } = useScreenSize();
  const { activeLayoutName } =
    useLateralContextualMenuStore<LateralContextualMenuState>((state) => state);
  const { views, openView, setOpenView } =
    useGeneralControlsStore<GeneralControlsState>((state) => state);
  return (
    <Box className={styles.editor}>
      Hello World the active layout is {activeLayoutName}
      <ChangesController />
      <Box
        position='absolute'
        sx={{
          top: '20px',
          right: '40px',
        }}
      >
        {isDesktop && (
          <ViewSelector
            views={views}
            openView={openView}
            setOpenView={setOpenView}
          />
        )}
      </Box>
    </Box>
  );
}
