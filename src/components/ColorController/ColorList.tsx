import { Button, Stack } from '@mui/material';
import * as React from 'react';
import { useEffect, useState } from 'react';

import ColorCircle from '@/components/ColorController/ColorCircle';

import transformToColorSwatch from '@/transformers/DSColorToSwatchColor';

import { DSColor } from '@/types/ColorDSTypes';
import SwatchColor from '@/types/SwatchColor';

interface ColorListProps {
  colors: DSColor[];
  handleSaveAction: (color: SwatchColor) => void;
}

const ColorList: React.FC<ColorListProps> = ({ colors, handleSaveAction }) => {
  const [showAll, setShowAll] = useState(false);
  const [colorList, setColorList] = useState<SwatchColor[]>([]);

  useEffect(() => {
    setColorList(
      colors.map((dsColor, index) => transformToColorSwatch(dsColor, index))
    );
  }, [colors]);

  return (
    <>
      <Stack id='color-list' gap='8px' direction='row' flexWrap='wrap'>
        {colorList &&
          colorList.slice(0, showAll ? colorList.length : 14).map((color) => {
            return (
              <ColorCircle
                key={`color-list-${color.swatchName}`}
                color={color}
                onSelected={handleSaveAction}
              />
            );
          })}
      </Stack>
      {!showAll && colorList.length > 14 && (
        <Button
          onClick={(e) => {
            e.stopPropagation();
            setShowAll(true);
          }}
          variant='text'
        >
          Show more
        </Button>
      )}
    </>
  );
};

export default ColorList;
