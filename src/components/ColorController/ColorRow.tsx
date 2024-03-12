import { ListItem, Stack, Typography } from '@mui/material';
import * as React from 'react';

import styles from './color.module.scss';

import useColorName from '@/hooks/useColorName';

import ColorCircle from '@/components/ColorController/ColorCircle';
import { CustomIcon } from '@/components/shared/CustomIcon';

import SwatchColor from '@/types/SwatchColor';

interface ColorRowProps {
  color: SwatchColor;
  onClickHandler: (color: SwatchColor) => void;
}

const ColorRow: React.FC<ColorRowProps> = ({ color, onClickHandler }) => {
  const { swatchName } = color;
  const colorName = useColorName(color);

  return (
    <ListItem className={styles.ColorRow} onClick={() => onClickHandler(color)}>
      <Stack direction='row' gap='8px'>
        <ColorCircle color={color} />
        <Stack>
          <Typography>{swatchName}</Typography>
          <Typography>{colorName}</Typography>
        </Stack>
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
