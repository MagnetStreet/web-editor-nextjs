import { useEffect, useState } from 'react';

import {
  getDisplayNameForColor,
  getSimplifiedSwatchColors,
} from '@/utils/color/colorHelper';

import SwatchColor from '@/types/SwatchColor';

function useColorName(color: SwatchColor) {
  const [colorName, setColorName] = useState<string>('');

  useEffect(() => {
    getColorName();
  }, [color]);

  const getColorName = () => {
    // TODO this function needs to mimic this result
    // if(isTextSwatch){
    //   colorSwatchName.innerHTML = '<div class="colorName">'+ ((this.colorSpace.toUpperCase() === 'SPOT')? getMSColorNameBySpotValue(this.spotValue) : getDisplayNameForColor(null, null, null, c, m, y, k, true)) +'</div>' + this.swatchName;
    // } else {
    //   var description = (this.swatchName.indexOf('|') > -1 && this.swatchName.split('|').length == 2) ? this.swatchName.split('|')[0] + '<span class="extraDescription">(' + this.swatchName.split('|')[1].trim() + ')</span>' : this.swatchName;
    //   colorSwatchName.innerHTML = description + '<div class="colorName">'+ ((this.colorSpace.toUpperCase() === 'SPOT')? getMSColorNameBySpotValue(this.spotValue) : getDisplayNameForColor(null, null, null, c, m, y, k, true)) +'</div>';
    // }
    const { b, r, g, m, y, c, k } = getSimplifiedSwatchColors(color);
    //getMSColorNameBySpotValue();
    const result = getDisplayNameForColor(r, g, b, c, m, y, k, true);
    setColorName(result);
  };

  return colorName;
}

export default useColorName;
