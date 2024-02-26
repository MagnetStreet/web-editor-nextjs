import { Box, Stack, Typography } from '@mui/material';
import * as React from 'react';
import { FC, useEffect, useState } from 'react';

import InputCounter from '@/components/shared/Form/InputCounter';

import FONT_SIZES from '@/constants/fonts-default.json';
import deepCopy from '@/utils/shared/deepCopy';

import { FontOptions } from '@/types/Font';
import { TextBox } from '@/types/TextBox';

interface TextSizeProps {
  activeTextBox: TextBox;
  handleUpdate: (val: TextBox) => void;
}

const TextSize: FC<TextSizeProps> = ({ activeTextBox, handleUpdate }) => {
  const [activeFont, setActiveFont] = useState<FontOptions | null>(null);
  const [minValue, setMinValue] = useState<number>(0);
  const [availablePointSizes, setAvailablePointSizes] = useState<number[]>([]);

  useEffect(() => {
    const { fonts, fontSizes } = FONT_SIZES;
    const activeFontProps = fonts.find(
      (x) =>
        x.faceName === activeTextBox.contentFormatted[0].textStyleRanges[0].font
    );
    if (activeFontProps) {
      const availableFontSizes = fontSizes.filter(
        (x: number) =>
          activeFontProps.minPointSize && x >= activeFontProps?.minPointSize
      );
      //TODO check if its foil do I need to use the other one?
      const minVal =
        activeFontProps && activeFontProps.minPointSize
          ? activeFontProps.minPointSize
          : availablePointSizes[0];

      setActiveFont(activeFont);
      setAvailablePointSizes(availableFontSizes);
      setMinValue(minVal);
    } else {
      setAvailablePointSizes(fontSizes);
      setMinValue(availablePointSizes[0]);
    }
  }, [activeTextBox]);

  const updatedText = (newVal: number) => {
    const updatedTextProps = deepCopy(activeTextBox);
    updatedTextProps.contentFormatted[0].textStyleRanges[0].pointSize = newVal;
    console.log('updatedTextProps', updatedTextProps);
    //handleUpdate(updatedTextProps);
  };

  return (
    <Stack>
      <Typography>Text Size</Typography>
      <Box>
        <InputCounter
          options={availablePointSizes}
          helpText={`${minValue}pt print minimun`}
          value={activeTextBox.contentFormatted[0].textStyleRanges[0].pointSize}
          onChange={(val: number) => updatedText(val)}
        />
      </Box>
    </Stack>
  );
};

export default TextSize;
