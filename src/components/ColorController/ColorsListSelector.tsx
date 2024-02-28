import { Stack, Typography } from '@mui/material';
import * as React from 'react';
import { useEffect, useState } from 'react';

import styles from './color.module.scss';

import ColorRow from '@/components/ColorController/ColorRow';

import {
  DesignStudioState,
  useDesignStudioStore,
} from '@/stores/useDesignStudioStore';

import SwatchColor from '@/types/SwatchColor';

const ColorListSelector: React.FC = () => {
  const { documentInfo } = useDesignStudioStore<DesignStudioState>(
    (state) => state
  );
  const [swatches, setSwatches] = useState<SwatchColor[]>();

  useEffect(() => {
    if (documentInfo && documentInfo.swatches) {
      setSwatches([...documentInfo.swatches]);
    }
  }, [documentInfo]);

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
            onClick={function (): void {
              throw new Error('Function not implemented.');
            }}
            onHover={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
        ))}
    </Stack>
  );
};

export default ColorListSelector;
