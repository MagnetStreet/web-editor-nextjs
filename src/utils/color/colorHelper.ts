import {
  foilColors,
  standardColors,
  transparentColor,
} from '@/constants/colors-default';
import {
  cmykToRgbLUTEncoded,
  rgbToCmykLUTEncoded,
} from '@/constants/encodedColorTables';

import { DSColor } from '@/types/ColorDSTypes';
import { CMYK, HSV, RGB } from '@/types/ColorFormat';
import SwatchColor from '@/types/SwatchColor';

const msColors = {
  name: 'All Colors',
  colors: [
    ...standardColors.swatches,
    ...foilColors.swatches,
    ...transparentColor.swatches,
  ] as DSColor[],
};
const msStandardColors = {
  name: 'All Colors',
  colors: [...standardColors.swatches] as DSColor[],
};
export function getSimplifiedSwatchColors(color: SwatchColor) {
  return {
    b: Math.round(color.origBlueValue),
    r: Math.round(color.origRedValue),
    g: Math.round(color.origGreenValue),
    m: Math.round(color.origMagentaValue),
    y: Math.round(color.origYellowValue),
    c: Math.round(color.origCyanValue),
    k: Math.round(color.origBlackValue),
  };
}

export function getMSColorNameBySpotValue(spotValue: string) {
  let colorMatchName = '',
    colorMatch = null;
  for (let i = 0; i < msColors.colors.length; i = i + 1) {
    const msColor = msColors.colors[i];
    //rgbMatch
    if (
      msColor.spot !== undefined &&
      msColor.spot !== null &&
      msColor.spot == spotValue
    ) {
      colorMatch = msColor;
      break;
    }

    if (colorMatch !== null) {
      break;
    }
  }

  if (colorMatch !== null) {
    colorMatchName = colorMatch.name;
  }
  return colorMatchName;
}

export function getDisplayNameForColor(
  r?: number,
  g?: number,
  b?: number,
  c?: number,
  m?: number,
  y?: number,
  k?: number,
  standardColorsOnly = false
) {
  let colorDisplayDescription = '';
  const msColorMatch = getMSColorByRGBorCMYK_noConversions(
    r,
    g,
    b,
    c,
    m,
    y,
    k,
    standardColorsOnly
  );

  if (msColorMatch != null && msColorMatch.name != null) {
    colorDisplayDescription = msColorMatch.name;
  } else if (
    c !== undefined &&
    m !== undefined &&
    y !== undefined &&
    k !== undefined
  ) {
    colorDisplayDescription =
      'CMYK (' + c + ', ' + m + ', ' + y + ', ' + k + ')';
  }
  return colorDisplayDescription;
}

function getMSColorByBackgroundRGB(rgbString: string) {
  //not only direct RGB comparison, but also CMYK Eq, which might be the same for RGBs that are very close
  let colorMatch = null;
  for (let i = 0; i < msColors.colors.length; i++) {
    const color = msColors.colors[i];
    if (rgbString.replace(/ /g, '') === 'rgb(' + color.rgb.join(', ') + ')') {
      colorMatch = color;
      break;
    }
  }
  return colorMatch;
}

function getCMYKValuesFromDisplayName(displayName: string) {
  if (displayName && displayName.indexOf('CMYK') > -1) {
    const desc = displayName.replace(/ /g, '');
    const cmykList = desc.replace('CMYK(', '').replace(')', '').split(',');
    if (cmykList.length === 4) {
      return {
        c: cmykList[0],
        m: cmykList[1],
        y: cmykList[2],
        k: cmykList[3],
      };
    }
  }
  return null;
}

function getLuma(color: any) {
  const rgb =
    typeof color === 'string'
      ? color.replace('rgb(', '').replace(')', '').split(',')
      : color;
  const luma =
    0.2126 * Number(rgb[0]) + 0.7152 * Number(rgb[1]) + 0.0722 * Number(rgb[2]);
  return luma;
}

function needContrastingColor(color: any, transitionPoint?: number): boolean {
  const transitionAt: number =
    transitionPoint === undefined ? 215 : transitionPoint;
  let luma = 0;

  if (color !== null && color !== undefined) {
    luma = getLuma(color);
  }

  return luma >= transitionAt;
}

function getContrastingColor(color: any, transitionPoint?: number) {
  const darkerBgStyle = 'rgb(103, 103, 103)';
  const lighterBgStyle = 'rgb(248, 248, 248)';
  return needContrastingColor(color, transitionPoint)
    ? darkerBgStyle
    : lighterBgStyle;
}

function getMSColorByRGBorCMYK_noConversions(
  r?: number,
  g?: number,
  b?: number,
  c?: number,
  m?: number,
  y?: number,
  k?: number,
  standardColorsOnly = false
) {
  //A more eager matching approach to catch any possible overlap with standard colors
  let colorMatch = null;
  const msUsedColors = standardColorsOnly ? msStandardColors : msColors;

  for (let i = 0; i < msUsedColors.colors.length; i++) {
    const msColor = msUsedColors.colors[i];
    // RGB match
    if (r === msColor.rgb[0] && g === msColor.rgb[1] && b === msColor.rgb[2]) {
      colorMatch = msColor;
      break;
    }
    if (
      c === msColor.cmyk[0] &&
      m === msColor.cmyk[1] &&
      y === msColor.cmyk[2] &&
      k === msColor.cmyk[3]
    ) {
      colorMatch = msColor;
      break;
    }
  }

  return colorMatch;
}

export function isRGB(obj: any): obj is RGB {
  return typeof obj === 'object' && 'r' in obj && 'g' in obj && 'b' in obj;
}

export function isHSV(obj: any): obj is HSV {
  return typeof obj === 'object' && 'h' in obj && 's' in obj && 'v' in obj;
}

export function isCMYK(obj: any): obj is CMYK {
  return (
    typeof obj === 'object' &&
    'c' in obj &&
    'm' in obj &&
    'y' in obj &&
    'k' in obj
  );
}

export function convertCmykToRgb(c: number, m: number, y: number, k: number) {
  c = Math.round(c / 10);
  m = Math.round(m / 10);
  y = Math.round(y / 10);
  k = Math.round(k / 10);

  const dataIndex = (c * 11 * 11 * 11 + m * 11 * 11 + y * 11 + k) * 3;
  const decodedLUT = base64Decode(cmykToRgbLUTEncoded);

  const rgb = [];
  rgb[0] = decodedLUT.charCodeAt(dataIndex + 0);
  rgb[1] = decodedLUT.charCodeAt(dataIndex + 1);
  rgb[2] = decodedLUT.charCodeAt(dataIndex + 2);

  return rgb;
}

export function convertRgbToCmyk(r: number, g: number, b: number) {
  r = Math.round(r / 10);
  g = Math.round(g / 10);
  b = Math.round(b / 10);

  const dataIndex = (r * 27 * 27 + g * 27 + b) * 4;
  const decodedLUT = base64Decode(rgbToCmykLUTEncoded);

  const cmyk = [];
  cmyk[0] = decodedLUT.charCodeAt(dataIndex + 0);
  cmyk[1] = decodedLUT.charCodeAt(dataIndex + 1);
  cmyk[2] = decodedLUT.charCodeAt(dataIndex + 2);
  cmyk[3] = decodedLUT.charCodeAt(dataIndex + 3);

  return cmyk;
}

export function base64Decode(data: string) {
  const b64 =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  let o1,
    o2,
    o3,
    h1,
    h2,
    h3,
    h4,
    bits,
    i = 0,
    ac = 0,
    dec = '';
  const tmp_arr = [];

  if (!data) {
    return data;
  }

  data += '';

  do {
    // unpack four hexets into three octets using index points in b64
    h1 = b64.indexOf(data.charAt(i++));
    h2 = b64.indexOf(data.charAt(i++));
    h3 = b64.indexOf(data.charAt(i++));
    h4 = b64.indexOf(data.charAt(i++));

    bits = (h1 << 18) | (h2 << 12) | (h3 << 6) | h4;

    o1 = (bits >> 16) & 0xff;
    o2 = (bits >> 8) & 0xff;
    o3 = bits & 0xff;

    if (h3 == 64) {
      tmp_arr[ac++] = String.fromCharCode(o1);
    } else if (h4 == 64) {
      tmp_arr[ac++] = String.fromCharCode(o1, o2);
    } else {
      tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
    }
  } while (i < data.length);

  dec = tmp_arr.join('');

  return dec;
}
