import { Stack, Typography } from '@mui/material';
import * as React from 'react';
import { useEffect, useState } from 'react';

import styles from './color.module.scss';

import useScreenSize from '@/hooks/useScreenSize';

import ColorDetails from '@/components/ColorController/ColorDetails';
import ColorRow from '@/components/ColorController/ColorRow';

import {
  BottomDrawerState,
  useBottomDrawerStore,
} from '@/stores/useBottomDrawerStore';
import {
  DesignStudioState,
  useDesignStudioStore,
} from '@/stores/useDesignStudioStore';
import {
  GeneralControlsState,
  useGeneralControlsStore,
} from '@/stores/useGeneralControlsStore';

import { extractSwatchColorsFromTextBoxes } from '@/utils/color/colorHelper';

import SwatchColor from '@/types/SwatchColor';

const SwatchListSelector: React.FC = () => {
  const { isDesktop } = useScreenSize();
  const { documentInfo } = useDesignStudioStore<DesignStudioState>(
    (state) => state
  );
  const { setBottomDrawerComponent, toggleBottomDrawer } =
    useBottomDrawerStore<BottomDrawerState>((state) => state);
  const { setIsolatedMode, setActiveColorSwatch } =
    useGeneralControlsStore<GeneralControlsState>((state) => state);
  const [swatches, setSwatches] = useState<SwatchColor[]>();

  useEffect(() => {
    const swatches = [];
    if (documentInfo && documentInfo.swatches) {
      swatches.push(...documentInfo.swatches);
    }
    if (documentInfo && documentInfo.textBoxes) {
      const textBoxColors = extractSwatchColorsFromTextBoxes(
        documentInfo.textBoxes
      );
      swatches.push(...textBoxColors);
    }
    setSwatches([...swatches]);
  }, [documentInfo]);

  const handleColorBoxSelected = (color: SwatchColor) => {
    if (!isDesktop) {
      setBottomDrawerComponent(<ColorDetails />);
      setActiveColorSwatch(color, <ColorDetails />);
      toggleBottomDrawer(true);
    } else {
      setIsolatedMode(true);
      setActiveColorSwatch(color, <ColorDetails />);
    }
  };

  return (
    <Stack id='swatch-list-selector' className={styles.ColorList}>
      {isDesktop && (
        <Typography className={styles.ColorList__header}>
          Current Colors
        </Typography>
      )}
      {swatches &&
        swatches.map((swatch) => (
          <ColorRow
            key={swatch.id}
            color={swatch}
            onClickHandler={handleColorBoxSelected}
          />
        ))}
    </Stack>
  );
};

export default SwatchListSelector;
