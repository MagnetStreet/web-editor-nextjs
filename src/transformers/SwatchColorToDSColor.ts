import { DSColor } from '@/types/ColorDSTypes';
import SwatchColor from '@/types/SwatchColor';

export default function transformToColorDSColor(swatch: SwatchColor): DSColor {
  return {
    name: swatch.swatchName,
    type: swatch.colorSpace,
    cmyk: [
      swatch.origCyanValue,
      swatch.origMagentaValue,
      swatch.origYellowValue,
      swatch.origBlackValue,
    ],
    rgb: [swatch.origRedValue, swatch.origGreenValue, swatch.origBlueValue],
    family: '', //TODO how we can get the family of a custom color?
    category: 'custom',
    spot: swatch.spotValue,
    foilColor: swatch.spotValue,
    gradientColors: '',
    availableInDS: false,
  };
}
