import { getClosestMSColorsUsingCMYK } from '@/utils/color/colorHelper';

import { DSColor } from '@/types/ColorDSTypes';
import SwatchColor from '@/types/SwatchColor';

export default function transformToColorDSColor(swatch: SwatchColor): DSColor {
  const closestColor = getClosestMSColorsUsingCMYK(
    swatch.origCyanValue,
    swatch.origMagentaValue,
    swatch.origYellowValue,
    swatch.origBlackValue,
    true
  );

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
    family: closestColor ? closestColor.family : '',
    category: 'custom',
    spot: swatch.spotValue,
    foilColor: swatch.spotValue,
    gradientColors: '',
    availableInDS: false,
  };
}
