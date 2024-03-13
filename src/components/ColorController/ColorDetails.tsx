import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AlertColor,
  Box,
  Button,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import * as React from 'react';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';

import ColorCircle from '@/components/ColorController/ColorCircle';
import ColorList from '@/components/ColorController/ColorList';
import CustomColorPicker from '@/components/ColorController/CustomColorPicker';
import SwatchListSelector from '@/components/ColorController/SwatchListSelector';
import { CustomIcon } from '@/components/shared/CustomIcon';
import SearchBar from '@/components/shared/Form/SearchBar';

import {
  DesignStudioState,
  useDesignStudioStore,
} from '@/stores/useDesignStudioStore';
import {
  GeneralControlsState,
  useGeneralControlsStore,
} from '@/stores/useGeneralControlsStore';
import {
  useNotificationsState,
  useNotificationStore,
} from '@/stores/useNotificationStore';

import { standardColors } from '@/constants/colors-default';
import updateDocumentColorService from '@/services/updateDocumentColorService';
import transformToColorDSColor from '@/transformers/SwatchColorToDSColor';
import { getSimplifiedSwatchColors, rgbToHex } from '@/utils/color/colorHelper';

import { DSColor } from '@/types/ColorDSTypes';
import SwatchColor from '@/types/SwatchColor';

const ColorDetails: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [openStandardColorAcc, setOpenStandardColorAcc] =
    useState<boolean>(false);
  const [msFilteredColors, setFilteredColors] = useState<DSColor[]>([
    ...standardColors.swatches,
  ]);
  const [fileColors, setFileColors] = useState<DSColor[]>([]);

  const {
    activeSwatchColor,
    setIsLoading,
    setIsolatedMode,
    setActiveColorSwatch,
  } = useGeneralControlsStore<GeneralControlsState>((state) => state);

  const {
    productInfo,
    documentInfo,
    customColors,
    sessionId,
    documentId,
    templateId,
    sessionInformation,
    setDocumentInfo,
    setActiveView,
    setViewBlob,
  } = useDesignStudioStore<DesignStudioState>((state) => state);
  const { addNotification } = useNotificationStore<useNotificationsState>(
    (state) => state
  );
  const swatchName = activeSwatchColor ? activeSwatchColor.swatchName : '';
  const { m, y, c, k } = useMemo(
    () => getSimplifiedSwatchColors(activeSwatchColor),
    [activeSwatchColor]
  );

  const onSearchUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    if (documentInfo?.swatches) {
      const originalFileColors: DSColor[] = documentInfo?.swatches.map(
        (swatchColor) => transformToColorDSColor(swatchColor, false, true)
      );
      setFileColors(originalFileColors);
    }
  }, [documentInfo]);

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
    setIsolatedMode(false);
    setActiveColorSwatch(undefined, <SwatchListSelector />);
  };

  const handleSaveAction = async (color: SwatchColor) => {
    try {
      setIsLoading(true);
      const { updatedDocumentInfo, viewBlob, error } =
        await updateDocumentColorService(
          color,
          sessionId,
          documentId,
          templateId,
          productInfo,
          sessionInformation,
          activeSwatchColor,
          documentInfo
        );

      //Update the global state
      if (viewBlob instanceof Blob && updatedDocumentInfo && !error) {
        setViewBlob(viewBlob);
        setDocumentInfo(updatedDocumentInfo);
        setActiveView(updatedDocumentInfo?.views[0]);
      } else {
        throw Error('Error Saving the Color');
      }
    } catch (error) {
      console.log(error);
      addNotification({
        icon: 'fa-bell-light',
        severity: 'error' as AlertColor,
        body: (
          <Stack direction='row' gap='20px'>
            <Typography>Error Saving Color</Typography>
          </Stack>
        ),
      });
    } finally {
      setIsLoading(false);
      setIsolatedMode(false);
      setActiveColorSwatch(undefined, <SwatchListSelector />);
    }
  };

  const handleAddCustomColorClick = () => {
    setActiveColorSwatch(activeSwatchColor, <CustomColorPicker />);
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
      <Typography>File Colors</Typography>
      <ColorList colors={fileColors} handleSaveAction={handleSaveAction} />
      <Accordion
        expanded={searchText !== '' || openStandardColorAcc}
        onClick={() => setOpenStandardColorAcc(!openStandardColorAcc)}
      >
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
          <ColorList
            colors={msFilteredColors}
            handleSaveAction={handleSaveAction}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={
            <CustomIcon iconClass='fa-chevron-down' fontSizeOverWrite='16px' />
          }
          aria-controls='color-panel-content-3'
          id='color-panel-header-3'
        >
          <Typography>Custom Colors</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack direction='column' gap='15px'>
            <ColorList
              colors={customColors}
              handleSaveAction={handleSaveAction}
            />
            <Button
              variant='outlined'
              sx={{
                width: '80px',
              }}
              onClick={() => {
                handleAddCustomColorClick();
              }}
              endIcon={
                <CustomIcon
                  iconClass='fa-circle-plus-sharp-light'
                  fontSizeOverWrite='12px'
                />
              }
            >
              ADD
            </Button>
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
};

export default ColorDetails;
