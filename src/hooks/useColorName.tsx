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
    const { b, r, g, m, y, c, k } = getSimplifiedSwatchColors(color);
    //getMSColorNameBySpotValue();
    const result = getDisplayNameForColor(r, g, b, c, m, y, k, true);
    setColorName(result);
  };

  return colorName;
}

export default useColorName;
