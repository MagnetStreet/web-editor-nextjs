import { DSColor } from '@/types/ColorDSTypes';
import SwatchColor from '@/types/SwatchColor';

export default function transformToColorSwatch(
  ds: DSColor,
  index: number
): SwatchColor {
  return {
    swatchName: ds.name,
    yellowValue: ds.cmyk[2],
    origMagentaValue: ds.cmyk[1],
    blackValue: ds.cmyk[3],
    redValue: ds.rgb[0],
    origGreenValue: ds.rgb[1],
    origRedValue: ds.rgb[0],
    cyanValue: ds.cmyk[0],
    colorSpace: 'CMYK', //TODO to be defined
    foilable: ds.category === 'foil',
    magentaValue: ds.cmyk[1],
    origBlueValue: ds.rgb[2],
    origYellowValue: ds.cmyk[2],
    modified: false,
    blueValue: ds.rgb[2],
    origCyanValue: ds.cmyk[0],
    id: index,
    place: index,
    greenValue: ds.rgb[1],
    origBlackValue: ds.cmyk[3],
    spotValue: ds.spot,
  };
}
