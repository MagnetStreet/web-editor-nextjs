import { ListItem, Stack, Typography } from '@mui/material';
import * as React from 'react';
import { useEffect, useState } from 'react';

import styles from './color.module.scss';

import ColorCircle from '@/components/ColorController/ColorCircle';
import { CustomIcon } from '@/components/shared/CustomIcon';

import {
  getDisplayNameForColor,
  getSimplifiedSwatchColors,
} from '@/utils/color/colorHelper';

import SwatchColor from '@/types/SwatchColor';

interface ColorRowProps {
  color: SwatchColor;
  onClick: () => void;
  onHover: () => void;
}

const ColorRow: React.FC<ColorRowProps> = ({ color, onClick, onHover }) => {
  const [colorName, setColorName] = useState<string>('');
  const { swatchName } = color;

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

  return (
    <ListItem className={styles.ColorRow}>
      <Stack direction='row' gap='8px'>
        <ColorCircle color={color} />
        <Stack>
          <Typography>{swatchName}</Typography>
          <Typography>{colorName}</Typography>
        </Stack>
      </Stack>
      <Stack direction='row' gap='24px'>
        <CustomIcon
          iconClass='fa-comment-light'
          fontSizeOverWrite='18px'
          onClick={() => {
            //TODO Add implementation
          }}
        />
        <CustomIcon
          iconClass='fa-pen-light'
          fontSizeOverWrite='18px'
          onClick={() => {
            //TODO Add implementation
          }}
        />
      </Stack>
    </ListItem>
  );
};

export default ColorRow;
