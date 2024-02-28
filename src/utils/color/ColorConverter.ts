import {
  convertCmykToRgb,
  convertRgbToCmyk,
  isCMYK,
  isHSV,
  isRGB,
} from './colorHelper';

import { CMYK, HSV, LAB, RGB } from '@/types/ColorFormat';

const ColorConverter = {
  _RGBtoHSV: function (RGB: RGB): HSV {
    const result: HSV = { h: 0, s: 0, v: 0 };

    const r = RGB.r / 255;
    const g = RGB.g / 255;
    const b = RGB.b / 255;

    const minVal = Math.min(r, g, b);
    const maxVal = Math.max(r, g, b);
    const delta = maxVal - minVal;

    result.v = maxVal;

    if (delta === 0) {
      result.h = 0;
      result.s = 0;
    } else {
      result.s = delta / maxVal;
      const del_R = ((maxVal - r) / 6 + delta / 2) / delta;
      const del_G = ((maxVal - g) / 6 + delta / 2) / delta;
      const del_B = ((maxVal - b) / 6 + delta / 2) / delta;

      if (r === maxVal) {
        result.h = del_B - del_G;
      } else if (g === maxVal) {
        result.h = 1 / 3 + del_R - del_B;
      } else if (b === maxVal) {
        result.h = 2 / 3 + del_G - del_R;
      }

      if (result.h < 0) {
        result.h += 1;
      }
      if (result.h > 1) {
        result.h -= 1;
      }
    }

    result.h = Math.round(result.h * 360);
    result.s = Math.round(result.s * 100);
    result.v = Math.round(result.v * 100);

    return result;
  },

  _HSVtoRGB: function (HSV: HSV): RGB {
    const result: RGB = { r: 0, g: 0, b: 0 };

    const h = HSV.h / 360;
    const s = HSV.s / 100;
    const v = HSV.v / 100;

    if (s === 0) {
      result.r = v * 255;
      result.g = v * 255;
      result.b = v * 255;
    } else {
      const var_h = h * 6;
      const var_i = Math.floor(var_h);
      const var_1 = v * (1 - s);
      const var_2 = v * (1 - s * (var_h - var_i));
      const var_3 = v * (1 - s * (1 - (var_h - var_i)));

      let var_r, var_g, var_b;

      if (var_i === 0) {
        var_r = v;
        var_g = var_3;
        var_b = var_1;
      } else if (var_i === 1) {
        var_r = var_2;
        var_g = v;
        var_b = var_1;
      } else if (var_i === 2) {
        var_r = var_1;
        var_g = v;
        var_b = var_3;
      } else if (var_i === 3) {
        var_r = var_1;
        var_g = var_2;
        var_b = v;
      } else if (var_i === 4) {
        var_r = var_3;
        var_g = var_1;
        var_b = v;
      } else {
        var_r = v;
        var_g = var_1;
        var_b = var_2;
      }

      result.r = var_r * 255;
      result.g = var_g * 255;
      result.b = var_b * 255;

      result.r = Math.round(result.r);
      result.g = Math.round(result.g);
      result.b = Math.round(result.b);
    }

    return result;
  },

  _CMYKtoRGB: function (CMYK: CMYK): RGB {
    const result: RGB = { r: 0, g: 0, b: 0 };

    const rgbArray = convertCmykToRgb(CMYK.c, CMYK.m, CMYK.y, CMYK.k);
    result.r = rgbArray[0];
    result.g = rgbArray[1];
    result.b = rgbArray[2];

    return result;
  },

  _RGBtoCMYK: function (RGB: RGB): CMYK {
    const result: CMYK = { c: 0, m: 0, y: 0, k: 0 };

    const cmykArray = convertRgbToCmyk(RGB.r, RGB.g, RGB.b);
    result.c = cmykArray[0];
    result.m = cmykArray[1];
    result.y = cmykArray[2];
    result.k = cmykArray[3];

    return result;
  },

  toRGB: function (o: any): RGB {
    if (isRGB(o)) {
      return o;
    }
    if (isHSV(o)) {
      return this._HSVtoRGB(o);
    }
    if (isCMYK(o)) {
      return this._CMYKtoRGB(o);
    }
    throw new Error('Invalid input toRGB');
  },

  toHSV: function (o: any): HSV {
    if (isHSV(o)) {
      return o;
    }
    if (isRGB(o)) {
      return this._RGBtoHSV(o);
    }
    if (isCMYK(o)) {
      return this._RGBtoHSV(this._CMYKtoRGB(o));
    }
    throw new Error('Invalid input toHSV');
  },

  toCMYK: function (o: any): CMYK {
    if (isCMYK(o)) {
      return o;
    }
    if (isRGB(o)) {
      return this._RGBtoCMYK(o);
    }
    if (isHSV(o)) {
      return this._RGBtoCMYK(this._HSVtoRGB(o));
    }
    throw new Error('Invalid input toCMYK');
  },

  _RGBtoLAB: function (RGB: RGB): LAB {
    const XYZ = this._RGBtoXYZ(RGB.r, RGB.g, RGB.b);
    const colX = XYZ[0];
    const colY = XYZ[1];
    const colZ = XYZ[2];

    const LAB = this._XYZtoLAB(colX, colY, colZ);

    return LAB;
  },

  _RGBtoXYZ: function (R: number, G: number, B: number): number[] {
    //TODO check why in the old code this was set as this parseFloat(B / 255);
    let var_R = R / 255; // R from 0 to 255
    let var_G = G / 255; // G from 0 to 255
    let var_B = B / 255; // B from 0 to 255

    if (var_R > 0.04045) {
      var_R = Math.pow((var_R + 0.055) / 1.055, 2.4);
    } else {
      var_R = var_R / 12;
    }
    if (var_G > 0.04045) {
      var_G = Math.pow((var_G + 0.055) / 1.055, 2.4);
    } else {
      var_G = var_G / 12;
    }
    if (var_B > 0.04045) {
      var_B = Math.pow((var_B + 0.055) / 1.055, 2.4);
    } else {
      var_B = var_B / 12;
    }

    const X = var_R * 0.436052025 + var_G * 0.385081593 + var_B * 0.143087414;
    const Y = var_R * 0.222491598 + var_G * 0.71688606 + var_B * 0.060621486;
    const Z = var_R * 0.013929122 + var_G * 0.097097002 + var_B * 0.71418547;
    return [X, Y, Z];
  },

  _XYZtoLAB: function (x: number, y: number, z: number): LAB {
    const ref_X = 0.964221;
    const ref_Y = 1.0;
    const ref_Z = 0.825211;
    const eps = 216 / 24389;
    const k = 24389 / 27;

    let var_X = x / ref_X;
    let var_Y = y / ref_Y;
    let var_Z = z / ref_Z;

    if (var_X > eps) {
      var_X = Math.pow(var_X, 1 / 3);
    } else {
      var_X = (k * var_X + 16) / 116;
    }
    if (var_Y > eps) {
      var_Y = Math.pow(var_Y, 1 / 3);
    } else {
      var_Y = (k * var_Y + 16) / 116;
    }
    if (var_Z > eps) {
      var_Z = Math.pow(var_Z, 1 / 3);
    } else {
      var_Z = (k * var_Z + 16) / 116;
    }

    const CIE_L = Math.ceil(2.55 * (116 * var_Y - 16) + 0.5);
    const CIE_a = Math.ceil(500 * (var_X - var_Y) + 0.5);
    const CIE_b = Math.ceil(200 * (var_Y - var_Z) + 0.5);

    return { L: CIE_L, a: CIE_a, b: CIE_b };
  },
};

export default ColorConverter;
