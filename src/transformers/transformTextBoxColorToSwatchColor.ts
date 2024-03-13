import SwatchColor from '@/types/SwatchColor';
import { TextStyleRange } from '@/types/TextBox';

export default function transformTextBoxColorToSwatchColor(
  textStyleRange: TextStyleRange,
  name: string
): SwatchColor {
  return {
    cyanValue: textStyleRange.fillColorC,
    origCyanValue: textStyleRange.fillColorC,
    magentaValue: textStyleRange.fillColorM,
    origMagentaValue: textStyleRange.fillColorM,
    yellowValue: textStyleRange.fillColorY,
    origYellowValue: textStyleRange.fillColorY,
    blackValue: textStyleRange.fillColorB,
    origBlackValue: textStyleRange.fillColorB,
    redValue: textStyleRange.fillColorR,
    origRedValue: textStyleRange.fillColorR,
    greenValue: textStyleRange.fillColorG,
    origGreenValue: textStyleRange.fillColorG,
    blueValue: textStyleRange.fillColorB,
    origBlueValue: textStyleRange.fillColorB,
    swatchName: name,
    colorSpace: 'CMYK',
    foilable: textStyleRange.fillSpotValue === '',
    modified: false,
    id: -1,
    place: -1,
    spotValue: textStyleRange.fillSpotValue,
    createdFromTextBox: true, //Always true in this case
  };
}
