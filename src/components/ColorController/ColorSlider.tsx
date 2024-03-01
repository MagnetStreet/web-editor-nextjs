import { Slider, Stack, TextField } from '@mui/material';
import React from 'react';

interface ColorSliderProps {
  title: string;
  value: number;
  style: string;
  onChange: (value: number) => void;
}

const ColorSlider: React.FC<ColorSliderProps> = ({
  title,
  value,
  style,
  onChange,
}) => {
  const handleChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      onChange(newValue);
    }
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
  console.log('style', style);

  return (
    <Stack
      direction='column'
      sx={{
        width: '100%',
      }}
    >
      <div>{title}</div>
      <Stack direction='row' gap='16px'>
        <Slider
          max={100}
          min={0}
          value={value}
          onChange={handleChange}
          valueLabelDisplay='auto'
        />
        <TextField
          value={value}
          onChange={handleInputChange}
          disabled
          sx={{ maxWidth: '50px' }}
        />
      </Stack>
    </Stack>
  );
};

export default ColorSlider;
