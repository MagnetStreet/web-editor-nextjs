import { Box, Divider, Stack, Typography } from '@mui/material';
import * as React from 'react';
import { FC, useEffect, useMemo, useState } from 'react';

import ColorDetails from '@/components/ColorController/ColorDetails';
import ColorSlider from '@/components/ColorController/ColorSlider';
import { CustomIcon } from '@/components/shared/CustomIcon';

import {
  GeneralControlsState,
  useGeneralControlsStore,
} from '@/stores/useGeneralControlsStore';

import ColorConverter from '@/utils/color/ColorConverter';
import { getSimplifiedSwatchColors } from '@/utils/color/colorHelper';

import { CMYK } from '@/types/ColorClasses';
import SwatchColor from '@/types/SwatchColor';

const CustomColorPicker: FC = () => {
  const { activeSwatchColor, setActiveColorSwatch } =
    useGeneralControlsStore<GeneralControlsState>((state) => state);

  const [customColor, setCustomColor] = useState<SwatchColor>();
  const { r, g, b, m, y, c, k } = useMemo(
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
  } = useMemo(() => getSimplifiedSwatchColors(customColor), [customColor]);

  useEffect(() => {
    //Make a copy of the custom Color to be modified
    setCustomColor(activeSwatchColor);
  }, [activeSwatchColor]);

  const handleBackClick = () => {
    //Go back to Select Color details Prev select color
    setActiveColorSwatch(undefined, <ColorDetails />);
  };

  const sliderUpdate = (color: string, val: number) => {
    if (!customColor) {
      return;
    }
    switch (color) {
      case 'C':
        customColor.origCyanValue = val;
        break;
      case 'M':
        customColor.origMagentaValue = val;
        break;
      case 'Y':
        customColor.origYellowValue = val;
        break;
      case 'K':
        customColor.origBlackValue = val;
        break;
      default:
        // Default case if color doesn't match any specific case
        console.log('Unknown color:', color);
    }
    setCustomColor(customColor);
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
    gradientStyle =
      gradientStyle +
      "filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='START_HEX', endColorstr='END_HEX',GradientType=1 );"; /* IE6-9 */

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
      <Stack gap='8px'>
        <Typography>Color Options</Typography>
        {activeSwatchColor && customColor && (
          <Stack direction='row' gap='5px'>
            <Box
              id='old'
              sx={{
                height: '40px',
                width: '80px',
                backgroundColor: `rgb(${r}, ${g}, ${b})`,
              }}
            ></Box>
            <Box
              id='new'
              sx={{
                height: '40px',
                width: '80px',
                backgroundColor: `rgb(${r2}, ${g2}, ${b2})`,
              }}
            ></Box>
            New
          </Stack>
        )}
      </Stack>
      <Divider />
      <Stack>
        <ColorSlider
          title='Cyan'
          value={c2}
          style={getCyanSliderBGStyle(m2, y2, k2)}
          onChange={(val: number) => sliderUpdate('C', val)}
        />
        <ColorSlider
          title='Magenta'
          value={m2}
          style={getMagentaSliderBGStyle(c2, y2, k2)}
          onChange={(val: number) => sliderUpdate('M', val)}
        />
        <ColorSlider
          title='Yellow'
          value={y2}
          style={getYellowSliderBGStyle(c2, m2, k2)}
          onChange={(val: number) => sliderUpdate('Y', val)}
        />
        <ColorSlider
          title='Black'
          value={k2}
          style={getBlackSliderBGStyle(c2, m2, y2)}
          onChange={(val: number) => sliderUpdate('K', val)}
        />
      </Stack>
    </Stack>
  );
};

export default CustomColorPicker;