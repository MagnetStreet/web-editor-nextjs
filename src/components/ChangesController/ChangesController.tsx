import { Box, Stack } from '@mui/material';
import * as React from 'react';
import { FC } from 'react';

import sassVars from '@/styles/_colorVariables.module.scss';

import useScreenSize from '@/hooks/useScreenSize';

import { CustomIcon } from '@/components/shared/CustomIcon';
import HelpSection from '@/components/shared/HelpSection';

import { GeneralControlsState, useGeneralControlsStore } from '@/stores';
import {
  BottomDrawerState,
  useBottomDrawerStore,
} from '@/stores/useBottomDrawerStore';

import { getStylePositionsHelper } from '@/utils/getStylePositionsHelper';

import { Coordinates } from '@/types';

interface ChangesControllerProps {
  position?: string;
  coordinates?: Coordinates;
}

export const ChangesController: FC<ChangesControllerProps> = ({
  position = 'relative',
  coordinates,
}) => {
  const { toggleBottomDrawer, setBottomDrawerTitle, setBottomDrawerComponent } =
    useBottomDrawerStore<BottomDrawerState>((state) => state);

  const { fitImage } = useGeneralControlsStore<GeneralControlsState>(
    (state) => state
  );
  const { isMobile, isTablet } = useScreenSize();
  const isSmallScreen = isMobile || isTablet;
  const iconSizes = { xs: '20px', sm: '20px', md: '24px', lg: '30px' };

  const containerStyle = {
    zIndex: 1,
    borderRadius: '100px',
    padding: { xs: '12px 4px', md: '12px' },
    alignItems: 'center',
    color: sassVars.brandColorDusty,
    backgroundColor: sassVars.brandColorWhite,
    maxWidth: isMobile ? '32px' : '60px',
    boxShadow: '0px 4px 4px 0px #CBCBCB',
    ...getStylePositionsHelper(position, coordinates),
  };

  return (
    <Stack spacing='12px' direction='column' sx={containerStyle}>
      <CustomIcon
        text='Undo'
        iconClass='fa-arrow-rotate-left-light'
        textSizes={{ ...iconSizes }}
        hideTextInMobile
      />
      <CustomIcon
        text='Redo'
        iconClass='fa-arrow-rotate-right-light'
        hideTextInMobile
        textSizes={{ ...iconSizes }}
      />
      {isSmallScreen && (
        <CustomIcon
          iconClass='fa-arrows-rotate-light'
          textSizes={{ ...iconSizes }}
        />
      )}
      {isSmallScreen && (
        <>
          <CustomIcon iconClass='fa-eye-light' textSizes={{ ...iconSizes }} />
          <CustomIcon
            onClick={() => {
              fitImage();
            }}
            iconClass='fa-arrows-maximize-light'
            textSizes={{ ...iconSizes }}
          />
        </>
      )}
      <Box
        paddingY='6px'
        sx={{
          borderTop: `1px solid ${sassVars.teLightGrey}`,
        }}
      >
        {isSmallScreen ? (
          <CustomIcon
            iconClass='fa-comment-light'
            textSizes={{ ...iconSizes }}
            onClick={() => {
              setBottomDrawerTitle('Help');
              setBottomDrawerComponent(<HelpSection />);
              toggleBottomDrawer(true);
            }}
          />
        ) : (
          <CustomIcon
            iconClass='fa-arrows-rotate-light'
            hideTextInMobile
            text='Reset'
            textSizes={{ ...iconSizes }}
          />
        )}
      </Box>
    </Stack>
  );
};
