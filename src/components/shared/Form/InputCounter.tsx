import { Stack, styled, Typography, useTheme } from '@mui/material';
import * as React from 'react';

import CustomSelect from '@/components/shared/Form/CustomSelect';

import { SelectOption } from '@/types';

interface InputCounterProps {
  value: number;
  options: SelectOption[];
  helpText?: string;
  onChange: (newVal: number) => void;
  //These two are overwrittes for simple one step increseases
  handleIncrement?: () => void;
  handleDecrement?: () => void;
}

const StyledButton = styled('button')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 34px;
  box-sizing: border-box;
  line-height: 1.5;
  border: 1px solid;
  border-radius: 999px;
  border-radius: 8px 0px 0px 8px;
  border-color: #5471A8;
  background: white;
  color: #5471A8;
  width: 40px;
  height: 40px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    cursor: pointer;
    background: #5471A8;
    border-color: #E6EEFE;
    color: white;
  }

  &:focus-visible {
    outline: 0;
  }

  &.increment {
    order: 1;
    border-radius: 0 8px 8px 0;
  }
`
);

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
    onChange(event.target.value);
  };
  const onClickMinus = (event: any): void => {
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
    <Stack direction='column' sx={{ width: '100%' }}>
      <Stack direction='row'>
        <StyledButton theme={theme} onClick={onClickMinus}>
          -
        </StyledButton>
        <CustomSelect
          value={value.toString()}
          onChange={handleChange}
          options={options}
        />
        <StyledButton className='increment' onClick={onClickPlus}>
          +
        </StyledButton>
      </Stack>
      <Typography variant='subtitle2'>{helpText}</Typography>
    </Stack>
  );
};

export default InputCounter;
