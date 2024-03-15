import { ListItem, Stack } from '@mui/material';
import * as React from 'react';

import styles from './color.module.scss';

import ColorCircle from '@/components/ColorController/ColorCircle';
import ColorName from '@/components/ColorController/ColorName';
import { CustomIcon } from '@/components/shared/CustomIcon';

import SwatchColor from '@/types/SwatchColor';

interface ColorRowProps {
  color: SwatchColor;
  onClickHandler: (color: SwatchColor) => void;
}

const ColorRow: React.FC<ColorRowProps> = ({ color, onClickHandler }) => {
  return (
    <ListItem
      id='color-row'
      className={styles.ColorRow}
      onClick={() => onClickHandler(color)}
    >
      <Stack direction='row' gap='8px'>
        <ColorCircle color={color} />
        <ColorName color={color} />
      </Stack>
      <Stack direction='row' gap='24px'>
        {/* <CustomIcon
          iconClass='fa-comment-light'
          fontSizeOverWrite='18px'
          onClick={() => {
            //TODO Add implementation
          }}
        /> */}
        <CustomIcon iconClass='fa-pen-light' fontSizeOverWrite='18px' />
      </Stack>
    </ListItem>
  );
};

export default ColorRow;
