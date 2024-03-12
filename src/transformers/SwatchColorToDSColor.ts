import { getClosestMSColorsUsingCMYK } from '@/utils/color/colorHelper';

import { DSColor } from '@/types/ColorDSTypes';
import SwatchColor from '@/types/SwatchColor';

export default function transformToColorDSColor(
  swatch: SwatchColor,
  custom = false,
  useOriginalValues = false
): DSColor {
  const CMYKvalues: number[] = useOriginalValues
    ? [
        swatch.origCyanValue,
        swatch.origMagentaValue,
        swatch.origYellowValue,
        swatch.origBlackValue,
      ]
    : [
        swatch.cyanValue,
        swatch.magentaValue,
        swatch.yellowValue,
        swatch.blackValue,
      ];

  const RGBvalues: number[] = useOriginalValues
    ? [swatch.origRedValue, swatch.origGreenValue, swatch.origBlueValue]
    : [swatch.redValue, swatch.greenValue, swatch.blueValue];

  const closestColor = getClosestMSColorsUsingCMYK(
    CMYKvalues[0],
    CMYKvalues[1],
    CMYKvalues[2],
    CMYKvalues[3],
    true
  );

  return {
    name: custom
      ? `Custome-${closestColor?.family}-${closestColor?.name}`
      : swatch.swatchName,
    type: swatch.colorSpace,
    cmyk: [...CMYKvalues],
    rgb: [...RGBvalues],
    family: closestColor ? closestColor.family : '',
    category: closestColor ? closestColor.category : '',
    spot: swatch.spotValue,
    foilColor: swatch.spotValue,
    gradientColors: '',
    availableInDS: false,
  };
}
