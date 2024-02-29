import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import * as React from 'react';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';

import ColorCircle from '@/components/ColorController/ColorCircle';
import ColorList from '@/components/ColorController/ColorList';
import SwatchListSelector from '@/components/ColorController/SwatchListSelector';
import { CustomIcon } from '@/components/shared/CustomIcon';
import SearchBar from '@/components/shared/Form/SearchBar';

import {
  GeneralControlsState,
  useGeneralControlsStore,
} from '@/stores/useGeneralControlsStore';

import { standardColors } from '@/constants/colors-default';
import { getSimplifiedSwatchColors, rgbToHex } from '@/utils/color/colorHelper';

import { DSColor } from '@/types/ColorDSTypes';

const ColorDetails: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [msFilteredColors, setFilteredColors] = useState<DSColor[]>([
    ...standardColors.swatches,
  ]);
  const { activeSwatchColor, setTopFrameComponent, setActiveColorSwatch } =
    useGeneralControlsStore<GeneralControlsState>((state) => state);
  const swatchName = activeSwatchColor ? activeSwatchColor.swatchName : '';
  const { b, r, g, m, y, c, k } = useMemo(
    () => getSimplifiedSwatchColors(activeSwatchColor),
    [activeSwatchColor]
  );

  const onSearchUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  useEffect(() => {
    setFilteredColors(
      standardColors.swatches.filter((color) => searchByColorOrHex(color))
    );
  }, [searchText]);

  const searchByColorOrHex = (color: DSColor) => {
    // Search by color name
    const nameMatch = color.name
      .toLowerCase()
      .includes(searchText.toLowerCase());
    // Search by family
    const familyMatch = color.family
      ? color.family.toLowerCase().includes(searchText.toLowerCase())
      : false;

    // Convert RGB values to hexadecimal format
    const hexValue = rgbToHex(color.rgb[0], color.rgb[1], color.rgb[2]);
    // Check if the hexadecimal representation includes the search text
    return nameMatch || familyMatch || hexValue.includes(searchText);
  };

  const handleBackClick = () => {
    //Reset to Color List and clear up
    setActiveColorSwatch(undefined, <SwatchListSelector />);
  };

  return (
    <Stack
      gap='16px'
      sx={{
        padding: '16px',
        width: '400px',
      }}
    >
      <Stack direction='row' justifyContent='space-between'>
        <CustomIcon
          iconClass='fa-arrow-left'
          fontSizeOverWrite='18px'
          onClick={handleBackClick}
        />
        <Typography color='principal'>Color Options</Typography>
        <CustomIcon iconClass='' fontSizeOverWrite='18px' />
      </Stack>
      <Stack gap='8px'>
        <Typography>Color Options</Typography>
        {activeSwatchColor && (
          <Stack direction='row' justifyContent='space-between'>
            <Stack direction='row' gap='16px'>
              <ColorCircle color={activeSwatchColor} />
              <Box>
                <Typography>{swatchName}</Typography>
                <Typography>Color Name</Typography>
              </Box>
            </Stack>
            <Stack direction='row' gap='8px'>
              <Stack gap='8px'>
                <Typography>C</Typography>
                <Typography>{c}</Typography>
              </Stack>
              <Stack gap='8px'>
                <Typography>M</Typography>
                <Typography>{m}</Typography>
              </Stack>
              <Stack gap='8px'>
                <Typography>Y</Typography>
                <Typography>{y}</Typography>
              </Stack>
              <Stack gap='8px'>
                <Typography>K</Typography>
                <Typography>{k}</Typography>
              </Stack>
            </Stack>
          </Stack>
        )}
      </Stack>
      <Divider />
      <SearchBar
        placeHolder='Search by color, hex'
        value={searchText}
        onChange={onSearchUpdate}
      />
      <Accordion>
        <AccordionSummary
          expandIcon={
            <CustomIcon iconClass='fa-chevron-down' fontSizeOverWrite='16px' />
          }
          aria-controls='color-panel-content-1'
          id='color-panel-header-1'
        >
          <Typography>File Colors</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ColorList colors={msFilteredColors} />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={
            <CustomIcon iconClass='fa-chevron-down' fontSizeOverWrite='16px' />
          }
          aria-controls='color-panel-content-2'
          id='color-panel-header-2'
        >
          <Typography>Standard Colors</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ColorList colors={msFilteredColors} />
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
};

export default ColorDetails;
