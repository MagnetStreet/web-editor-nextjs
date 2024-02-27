import { Stack, Typography } from '@mui/material';
import * as React from 'react';
import { FC, useEffect, useState } from 'react';

import InputCounter from '@/components/shared/Form/InputCounter';
import FormSection from '@/components/shared/Form/Section';

import FONT_SIZES from '@/constants/fonts-default.json';
import deepCopy from '@/utils/shared/deepCopy';
import getOptionsForSelect from '@/utils/shared/select-utils';

import { SelectOption } from '@/types';
import { FontOptions } from '@/types/Font';
import { TextBox } from '@/types/TextBox';

interface TextSizeProps {
  activeTextBox: TextBox;
  handleUpdate: (val: TextBox) => void;
}

const TextSize: FC<TextSizeProps> = ({ activeTextBox, handleUpdate }) => {
  const [activeFont, setActiveFont] = useState<FontOptions | null>(null);
  const [minValue, setMinValue] = useState<number>(0);
  const [availablePointSizes, setAvailablePointSizes] = useState<
    SelectOption[]
  >([]);

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
          : availableFontSizes[0];

      setActiveFont(activeFont);
      setAvailablePointSizes(getOptionsForSelect(availableFontSizes));
      setMinValue(minVal);
    } else {
      setAvailablePointSizes(getOptionsForSelect(fontSizes));
      setMinValue(fontSizes[0]);
    }
  }, [activeTextBox]);

  const updatedText = (newVal: number) => {
    const updatedTextProps = deepCopy(activeTextBox);
    updatedTextProps.contentFormatted[0].textStyleRanges[0].pointSize = newVal;
    handleUpdate(updatedTextProps);
  };

  const handleDecrement = () => {
    const curr = activeTextBox.contentFormatted[0].textStyleRanges[0].pointSize;
    const index = availablePointSizes.findIndex(
      (index) => index.value === curr
    );

    if (index) {
      const prevVal = availablePointSizes[index - 1];
      if (prevVal && prevVal.value >= minValue) {
        updatedText(prevVal.value);
      }
    }
  };

  const handleIncrement = () => {
    const curr = activeTextBox.contentFormatted[0].textStyleRanges[0].pointSize;
    const index = availablePointSizes.findIndex(
      (index) => index.value === curr
    );

    if (index > -1 && index + 1 < availablePointSizes.length) {
      const prevVal = availablePointSizes[index + 1];
      if (prevVal && prevVal.value >= minValue) {
        updatedText(prevVal.value);
      }
    }
  };

  return (
    <Stack>
      <Typography color='primary' variant='h6'>
        Text Size
      </Typography>
      <FormSection>
        <InputCounter
          options={availablePointSizes}
          helpText={`${minValue}pt print minimun`}
          value={activeTextBox.contentFormatted[0].textStyleRanges[0].pointSize}
          handleDecrement={handleDecrement}
          handleIncrement={handleIncrement}
          onChange={(val: number) => updatedText(val)}
        />
      </FormSection>
    </Stack>
  );
};

export default TextSize;
