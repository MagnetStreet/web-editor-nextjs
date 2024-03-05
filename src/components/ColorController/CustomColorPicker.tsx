import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import * as React from 'react';
import { FC, useEffect, useMemo, useState } from 'react';

import ColorDetails from '@/components/ColorController/ColorDetails';
import ColorSlider from '@/components/ColorController/ColorSlider';
import { CustomIcon } from '@/components/shared/CustomIcon';

import {
  DesignStudioState,
  useDesignStudioStore,
} from '@/stores/useDesignStudioStore';
import {
  GeneralControlsState,
  useGeneralControlsStore,
} from '@/stores/useGeneralControlsStore';

import transformToColorDSColor from '@/transformers/SwatchColorToDSColor';
import ColorConverter from '@/utils/color/ColorConverter';
import { getSimplifiedSwatchColors } from '@/utils/color/colorHelper';

import { CMYK } from '@/types/ColorClasses';
import SwatchColor from '@/types/SwatchColor';

const CustomColorPicker: FC = () => {
  const { activeSwatchColor, setActiveColorSwatch } =
    useGeneralControlsStore<GeneralControlsState>((state) => state);
  const { addCustomColor } = useDesignStudioStore<DesignStudioState>(
    (state) => state
  );

  const [customColor, setCustomColor] = useState<SwatchColor>();

  const { r, g, b } = useMemo(
    () => getSimplifiedSwatchColors(activeSwatchColor),
    [activeSwatchColor]
  );

  const {
    r: r2,
    g: g2,
    b: b2,
    m: m2,
    y: y2,
    c: c2,
    k: k2,
  } = useMemo(() => {
    return getSimplifiedSwatchColors(customColor);
  }, [customColor]);

  const sliderUpdate = (color: string, val: number) => {
    if (!customColor) {
      return;
    }
    const updatedCustomColor = { ...customColor };
    switch (color) {
      case 'C':
        updatedCustomColor.origCyanValue = val;
        break;
      case 'M':
        updatedCustomColor.origMagentaValue = val;
        break;
      case 'Y':
        updatedCustomColor.origYellowValue = val;
        break;
      case 'K':
        updatedCustomColor.origBlackValue = val;
        break;
      default:
        // Default case if color doesn't match any specific case
        // Although this shouldn't happen
        console.log('Unknown color:', color);
    }
    //Complete update the other properties
    const newCMYK = new CMYK(
      updatedCustomColor.origCyanValue,
      updatedCustomColor.origMagentaValue,
      updatedCustomColor.origYellowValue,
      updatedCustomColor.origBlackValue
    );
    const updatedRGB = ColorConverter._CMYKtoRGB(newCMYK);
    updatedCustomColor.origRedValue = updatedRGB.r;
    updatedCustomColor.origBlueValue = updatedRGB.b;
    updatedCustomColor.origGreenValue = updatedRGB.g;
    setCustomColor(updatedCustomColor);
  };

  useEffect(() => {
    //Make a copy of the custom Color to be modified
    setCustomColor(activeSwatchColor);
  }, [activeSwatchColor]);

  const handleBackClick = () => {
    //Go back to Select Color details Prev select color
    setActiveColorSwatch(activeSwatchColor, <ColorDetails />);
  };
  const addCustomColorClick = () => {
    if (customColor) {
      setActiveColorSwatch(customColor, <ColorDetails />);
      addCustomColor(transformToColorDSColor(customColor, custom));
    }
  };

  const getCyanSliderBGStyle = function (
    m_value: number,
    y_value: number,
    k_value: number
  ) {
    const sliderStartCMYK = new CMYK(0, m_value, y_value, k_value);
    const sliderEndCMYK = new CMYK(100, m_value, y_value, k_value);
    return getSliderGradientStyle(sliderStartCMYK, sliderEndCMYK);
  };

  const getMagentaSliderBGStyle = function (
    c_value: number,
    y_value: number,
    k_value: number
  ) {
    const sliderStartCMYK = new CMYK(c_value, 0, y_value, k_value);
    const sliderEndCMYK = new CMYK(c_value, 100, y_value, k_value);
    return getSliderGradientStyle(sliderStartCMYK, sliderEndCMYK);
  };

  const getYellowSliderBGStyle = function (
    c_value: number,
    m_value: number,
    k_value: number
  ) {
    const sliderStartCMYK = new CMYK(c_value, m_value, 0, k_value);
    const sliderEndCMYK = new CMYK(c_value, m_value, 100, k_value);
    return getSliderGradientStyle(sliderStartCMYK, sliderEndCMYK);
  };

  const getBlackSliderBGStyle = function (
    c_value: number,
    m_value: number,
    y_value: number
  ) {
    const sliderStartCMYK = new CMYK(c_value, m_value, y_value, 0);
    const sliderEndCMYK = new CMYK(c_value, m_value, y_value, 100);
    return getSliderGradientStyle(sliderStartCMYK, sliderEndCMYK);
  };

  const getSliderGradientStyle = (
    sliderStartCMYK: CMYK,
    sliderEndCMYK: CMYK
  ) => {
    const sliderStartRGBEq = ColorConverter._CMYKtoRGB(sliderStartCMYK);
    const sliderEndRGBEq = ColorConverter._CMYKtoRGB(sliderEndCMYK);

    const startR = sliderStartRGBEq.r;
    const startG = sliderStartRGBEq.g;
    const startB = sliderStartRGBEq.b;
    const endR = sliderEndRGBEq.r;
    const endG = sliderEndRGBEq.g;
    const endB = sliderEndRGBEq.b;

    const startRGB = 'rgb(' + startR + ',' + startG + ',' + startB + ')';
    const endRGB = 'rgb(' + endR + ',' + endG + ',' + endB + ')';

    const startHex =
      '#' +
      ((1 << 24) + (startR << 16) + (startG << 8) + startB)
        .toString(16)
        .slice(1);
    const endHex =
      '#' +
      ((1 << 24) + (endR << 16) + (endG << 8) + endB).toString(16).slice(1);

    const defaultColor = '#CCCCCC';
    let gradientStyle = 'background: ' + defaultColor + ';';
    gradientStyle =
      gradientStyle +
      'background: -moz-linear-gradient(left, START_COLOR 0%, END_COLOR 100%);'; /* FF3.6+ */
    gradientStyle =
      gradientStyle +
      'background: -webkit-gradient(linear, left top, right top, color-stop(0%,START_COLOR), color-stop(100%,END_COLOR));'; /* Chrome,Safari4+ */
    gradientStyle =
      gradientStyle +
      'background: -webkit-linear-gradient(left, START_COLOR 0%,END_COLOR 100%);'; /* Chrome10+,Safari5.1+ */
    gradientStyle =
      gradientStyle +
      'background: -o-linear-gradient(left, START_COLOR 0%,END_COLOR 100%);'; /* Opera 11.10+ */
    gradientStyle =
      gradientStyle +
      'background: -ms-linear-gradient(left, START_COLOR 0%,END_COLOR 100%);'; /* IE10+ */
    gradientStyle =
      gradientStyle +
      'background: linear-gradient(to right, START_COLOR 0%,END_COLOR 100%);'; /* W3C */

    gradientStyle = gradientStyle.replace(/START_COLOR/g, startRGB);
    gradientStyle = gradientStyle.replace(/END_COLOR/g, endRGB);

    gradientStyle = gradientStyle.replace(/START_HEX/g, startHex);
    gradientStyle = gradientStyle.replace(/END_HEX/g, endHex);

    return gradientStyle;
  };

  return (
    <Stack
      gap='16px'
      sx={{
        padding: '16px',
        width: '400px',
      }}
    >
      <Stack direction='row' justifyContent='space-between'>
        <CustomIcon
          iconClass='fa-arrow-left'
          fontSizeOverWrite='18px'
          onClick={handleBackClick}
        />
        <Typography color='principal'>Custom Color</Typography>
        <CustomIcon iconClass='' fontSizeOverWrite='18px' />
      </Stack>
      <Stack
        direction='row'
        gap='9px'
        sx={{
          borderRadius: '6px',
          border: '1px solid #BDB5B5',
          background: '#F3F2F2',
          padding: '8px 8px 11px',
        }}
      >
        <CustomIcon
          iconClass='fa-circle-exclamation'
          color='danger'
          fontSizeOverWrite='16px'
        />
        <Typography fontSize='12px'>
          *Color may vary upon printing depending on your screen configuration
        </Typography>
      </Stack>
      <Stack gap='8px'>
        <Typography>Color Options</Typography>
        {activeSwatchColor && customColor && (
          <Stack
            direction='row'
            justifyContent='flex-start'
            alignItems='center'
          >
            <Box
              id='old'
              sx={{
                height: '40px',
                maxWidth: '90px',
                width: '90px',
                borderRadius: '4px 0 0 4px',
                borderRight: `1px solid rgb(${r2}, ${g2}, ${b2})`,
                backgroundColor: `rgb(${r}, ${g}, ${b})`,
              }}
            ></Box>
            <Box
              id='new'
              sx={{
                height: '40px',
                maxWidth: '90px',
                width: '90px',
                borderRadius: '0 4px 4px 0',
                backgroundColor: `rgb(${r2}, ${g2}, ${b2})`,
              }}
            ></Box>
            <Typography
              color='#70777F'
              sx={{
                paddingLeft: '10px',
              }}
            >
              New
            </Typography>
          </Stack>
        )}
      </Stack>
      <Divider />
      <Stack>
        <ColorSlider
          title='Cyan'
          value={c2}
          tumbcolor='#0A9FE4'
          style={getCyanSliderBGStyle(m2, y2, k2)}
          onChange={(val: number) => sliderUpdate('C', val)}
        />
        <ColorSlider
          title='Magenta'
          value={m2}
          tumbcolor='#E51480'
          style={getMagentaSliderBGStyle(c2, y2, k2)}
          onChange={(val: number) => sliderUpdate('M', val)}
        />
        <ColorSlider
          title='Yellow'
          value={y2}
          tumbcolor='#FFED12'
          tumbfontcolor='#000'
          style={getYellowSliderBGStyle(c2, m2, k2)}
          onChange={(val: number) => sliderUpdate('Y', val)}
        />
        <ColorSlider
          title='Black'
          tumbcolor='#1D1D0D'
          value={k2}
          style={getBlackSliderBGStyle(c2, m2, y2)}
          onChange={(val: number) => sliderUpdate('K', val)}
        />
      </Stack>
      <Stack direction='row' justifyContent='space-between' gap='17px'>
        <Button
          variant='outlined'
          sx={{ width: '50%' }}
          onClick={handleBackClick}
        >
          Cancel
        </Button>
        <Button
          variant='contained'
          sx={{ width: '50%' }}
          onClick={addCustomColorClick}
        >
          Apply
        </Button>
      </Stack>
    </Stack>
  );
};

export default CustomColorPicker;
