import { Stack } from '@mui/material';
import * as React from 'react';
import { useEffect, useState } from 'react';

import ColorCircle from '@/components/ColorController/ColorCircle';

import transformToColorSwatch from '@/transformers/DSColorToSwatchColor';

import { DSColor } from '@/types/ColorDSTypes';
import SwatchColor from '@/types/SwatchColor';

interface ColorListProps {
  colors: DSColor[];
  handleSaveAction: () => void;
}

const ColorList: React.FC<ColorListProps> = ({ colors, handleSaveAction }) => {
  const [colorList, setColorList] = useState<SwatchColor[]>([]);

  useEffect(() => {
    setColorList(
      colors.map((dsColor, index) => transformToColorSwatch(dsColor, index))
    );
  }, [colors]);

  return (
    <Stack gap='8px' direction='row' flexWrap='wrap'>
      {colorList &&
        colorList.map((color) => {
          return (
            <ColorCircle
              key={`color-list-${color.swatchName}`}
              color={color}
              onSelected={handleSaveAction}
            />
          );
        })}
    </Stack>
  );
};

export default ColorList;
