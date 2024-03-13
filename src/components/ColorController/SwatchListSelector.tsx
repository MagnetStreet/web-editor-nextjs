import { Stack, Typography } from '@mui/material';
import * as React from 'react';
import { useEffect, useState } from 'react';

import styles from './color.module.scss';

import ColorDetails from '@/components/ColorController/ColorDetails';
import ColorRow from '@/components/ColorController/ColorRow';

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
  const { documentInfo } = useDesignStudioStore<DesignStudioState>(
    (state) => state
  );
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
    setIsolatedMode(true);
    setActiveColorSwatch(color, <ColorDetails />);
  };

  return (
    <Stack className={styles.ColorList}>
      <Typography className={styles.ColorList__header}>
        Current Colors
      </Typography>
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
