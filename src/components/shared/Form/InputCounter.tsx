import { MenuItem, Stack, styled, Typography, useTheme } from '@mui/material';
import * as React from 'react';

interface InputCounterProps {
  value: number;
  options: number[];
  helpText?: string;
  onChange: (newVal: number) => void;
  //These two are overwrittes for simple one step increseases
  handleIncrement?: () => void;
  handleDecrement?: () => void;
}

const StyledButton = styled('button')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  line-height: 1.5;
  border: 1px solid;
  border-radius: 999px;
  border-color: ${grey[200]};
  background: ${grey[50]};
  color: ${grey[900]};
  width: 32px;
  height: 32px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    cursor: pointer;
    background: ${blue[500]};
    border-color: ${blue[400]};
    color: ${grey[50]};
  }

  &:focus-visible {
    outline: 0;
  }

  &.increment {
    order: 1;
  }
`
);

const StyledSelect = styled('select')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
`
);

const blue = {
  100: '#daecff',
  200: '#b6daff',
  300: '#66b2ff',
  400: '#3399ff',
  500: '#007fff',
  600: '#0072e5',
  700: '#0059B2',
  800: '#004c99',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const InputCounter: React.FC<InputCounterProps> = ({
  value,
  options,
  helpText,
  onChange,
  handleIncrement,
  handleDecrement,
}) => {
  const theme = useTheme();
  const handleChange = (event: any): void => {
    onChange(Number(event.target.value));
  };
  const onClickMinus = (): void => {
    if (handleDecrement) {
      handleDecrement();
    } else {
      onChange(value - 1);
    }
  };
  const onClickPlus = (): void => {
    if (handleIncrement) {
      handleIncrement();
    } else {
      onChange(value + 1);
    }
  };

  return (
    <Stack direction='column'>
      <Stack direction='row'>
        <StyledButton theme={theme} onClick={onClickMinus}>
          -
        </StyledButton>
        <StyledSelect
          theme={theme}
          id='input-counter'
          value={value}
          onChange={handleChange}
        >
          {options.map((size: number) => {
            return (
              <MenuItem key={`font-size-${size}`} value={size}>
                {size}
              </MenuItem>
            );
          })}
        </StyledSelect>
        <StyledButton onClick={onClickPlus}>+</StyledButton>
      </Stack>
      <Typography>{helpText}</Typography>
    </Stack>
  );
};

export default InputCounter;
