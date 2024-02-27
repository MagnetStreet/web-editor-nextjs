import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
} from '@mui/material';
import * as React from 'react';

import { SelectOption } from '@/types';

interface SelectProps {
  label?: string;
  value: string;
  onChange: (event: any) => void;
  options: SelectOption[];
}

export default function CustomSelect(props: SelectProps) {
  const { label, value, onChange, options } = props;
  return (
    <FormControl fullWidth>
      {label && <InputLabel>{label}</InputLabel>}
      <MuiSelect
        value={value}
        onChange={onChange}
        label={label}
        IconComponent={ExpandMoreIcon}
        sx={{
          height: '40px',
          borderRadius: 0, // Overwrite the border radius
        }}
        MenuProps={{
          style: {
            maxHeight: 300,
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
}
