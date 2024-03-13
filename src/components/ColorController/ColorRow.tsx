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
  const { swatchName, createdFromTextBox } = color;
  const colorName = useColorName(color);

  return (
    <ListItem className={styles.ColorRow} onClick={() => onClickHandler(color)}>
      <Stack direction='row' gap='8px'>
        <ColorCircle color={color} />
        <Stack>
          <Typography>{createdFromTextBox ? 'Text' : swatchName}</Typography>
          <Typography>{colorName}</Typography>
          {createdFromTextBox &&
            swatchName
              .split('\\')
              .sort((a, b) => b.length - a.length)
              .map((content, index) => (
                <Typography
                  variant='subtitle2'
                  key={`text-tag-${index}`}
                  className={`ellipsis ${index > 2 ? 'hidden' : ''}`}
                >
                  {index > 1 ? '...etc' : content}
                </Typography>
              ))}
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
