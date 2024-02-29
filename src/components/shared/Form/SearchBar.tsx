import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import * as React from 'react';
import { ChangeEvent } from 'react';

import { CustomIcon } from '@/components/shared/CustomIcon';

interface SearchProps {
  placeHolder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchProps> = ({ placeHolder, value, onChange }) => {
  return (
    <FormControl sx={{ p: 1, width: '100%' }} variant='outlined'>
      <InputLabel htmlFor='outlined-adornment-password'>
        {placeHolder}
      </InputLabel>
      <OutlinedInput
        id='outlined-adornment-password'
        type='text'
        onChange={onChange}
        value={value}
        endAdornment={
          <InputAdornment position='start'>
            <CustomIcon
              iconClass='fa-magnifying-glass'
              fontSizeOverWrite='16px'
            />
          </InputAdornment>
        }
        label={placeHolder}
      />
    </FormControl>
  );
};

export default SearchBar;
