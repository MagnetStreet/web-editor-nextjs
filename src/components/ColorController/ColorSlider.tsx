import { Slider, Stack, styled, TextField } from '@mui/material';
import React from 'react';

interface ColorSliderProps {
  title: string;
  value: number;
  style: string;
  tumbColor?: string;
  tumbFontColor?: string;
  onChange: (value: number) => void;
}

const ColorSlider: React.FC<ColorSliderProps> = ({
  title,
  value,
  style,
  tumbColor = '#CCC',
  tumbFontColor = '#fff',
  onChange,
}) => {
  const handleChange = (event: Event, newValue: number | number[]) => {
    onChange(newValue as number);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = parseInt(event.target.value, 10) || 0;
    if (newValue < 0) {
      newValue = 0;
    } else if (newValue > 100) {
      newValue = 100;
    }
    onChange(newValue);
  };
  //console.log('style', title, style);

  return (
    <Stack
      direction='column'
      sx={{
        width: '100%',
      }}
    >
      <div>{title}</div>
      <Stack direction='row' gap='16px' alignItems='center'>
        <GradientSlider
          max={100}
          min={0}
          value={value}
          gradientStyle={style}
          tumbColor={tumbColor}
          tumbFontColor={tumbFontColor}
          onChange={handleChange}
          valueLabelDisplay='auto'
        />
        <TextField
          value={value}
          type='number'
          onChange={handleInputChange}
          inputProps={{
            sx: {
              padding: '2px 0',
              textAlign: 'center',
              borderRadius: '4px',
              border: '1px solid #707070',
            },
          }}
          sx={{ maxWidth: '50px' }}
        />
      </Stack>
    </Stack>
  );
};

// Function to parse the background string and return it as an object
const parseBackgroundString = (
  backgroundString: string
): {
  [key: string]: string;
} => {
  const styleObject: {
    [key: string]: string;
  } = {};
  const backgroundProperties: string[] = backgroundString.split(';');
  backgroundProperties.forEach((property: string) => {
    const [key, value] = property.split(':');
    if (key && value) {
      styleObject[key.trim()] = value.trim();
    }
  });
  return styleObject;
};

const GradientSlider = styled(Slider)<{
  gradientStyle: string;
  tumbColor: string;
  tumbFontColor: string;
}>(({ gradientStyle, tumbColor, tumbFontColor }) => ({
  height: 17,
  '& .MuiSlider-track': {
    border: 'none',
    width: '0 !important',
  },
  '& .MuiSlider-rail': {
    opacity: '100% !important',
    borderRadius: '3px',
    ...parseBackgroundString(gradientStyle),
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&::before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    color: tumbFontColor,
    backgroundColor: tumbColor,
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&::before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
}));

export default ColorSlider;
