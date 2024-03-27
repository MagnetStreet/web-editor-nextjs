import { AlertColor, Box, Stack, Typography } from '@mui/material';
import * as React from 'react';
import { FC, useEffect } from 'react';

import sassVars from '@/styles/_colorVariables.module.scss';

import useScreenSize from '@/hooks/useScreenSize';

import { CustomIcon } from '@/components/shared/CustomIcon';
import HelpSection from '@/components/shared/HelpSection';

import {
  DesignStudioState,
  GeneralControlsState,
  useDesignStudioStore,
  useGeneralControlsStore,
  useNotificationsState,
  useNotificationStore,
} from '@/stores';
import {
  BottomDrawerState,
  useBottomDrawerStore,
} from '@/stores/useBottomDrawerStore';

import updateDocumentHistoryService from '@/services/updateDocumentHistoryService';
import { getStylePositionsHelper } from '@/utils/getStylePositionsHelper';

import { Coordinates } from '@/types';
import DesignStudioItem from '@/types/DesignStudioItem';

interface ChangesControllerProps {
  position?: string;
  coordinates?: Coordinates;
}

export const ChangesController: FC<ChangesControllerProps> = ({
  position = 'relative',
  coordinates,
}) => {
  const {
    productInfo,
    documentInfo,
    sessionId,
    documentId,
    templateId,
    sessionInformation,
    currentHistoryIndex,
    historyTracker,
    documentHistory,
    setDocumentInfoFromHistory,
    setActiveView,
    setViewBlob,
    undoDocumentInfo,
    redoDocumentInfo,
  } = useDesignStudioStore<DesignStudioState>((state) => state);
  const { addNotification } = useNotificationStore<useNotificationsState>(
    (state) => state
  );
  const { toggleBottomDrawer, setBottomDrawerTitle, setBottomDrawerComponent } =
    useBottomDrawerStore<BottomDrawerState>((state) => state);

  const { fitImage, setIsLoading } =
    useGeneralControlsStore<GeneralControlsState>((state) => state);
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

  const handleDocumentRedo = () => {
    redoDocumentInfo();
  };
  const handleDocumentUndo = () => {
    undoDocumentInfo();
  };
  const handleSaveActionFromHistory = async (
    historyDocument: DesignStudioItem
  ) => {
    try {
      setIsLoading(true);
      const { updatedDocumentInfo, viewBlob, error } =
        await updateDocumentHistoryService(
          sessionId,
          documentId,
          templateId,
          productInfo,
          sessionInformation,
          historyDocument
        );

      //Update the global state
      if (viewBlob instanceof Blob && updatedDocumentInfo && !error) {
        setViewBlob(viewBlob);
        setDocumentInfoFromHistory(updatedDocumentInfo);
        setActiveView(updatedDocumentInfo?.views[0]);
      } else {
        throw Error('Error Saving he history update');
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
    }
  };

  useEffect(() => {
    if (documentInfo) {
      handleSaveActionFromHistory(documentInfo);
    }
  }, [historyTracker]);

  return (
    <Stack spacing='12px' direction='column' sx={containerStyle}>
      <CustomIcon
        text='Undo'
        iconClass='fa-arrow-rotate-left-light'
        textSizes={{ ...iconSizes }}
        onClick={handleDocumentUndo}
        hideTextInMobile
        sx={{
          cursor: 'pointer',
          color:
            documentHistory.length > 1
              ? sassVars.brandColorDusty
              : sassVars.brandcolorGrayLight,
        }}
      />
      <CustomIcon
        text='Redo'
        iconClass='fa-arrow-rotate-right-light'
        hideTextInMobile
        onClick={handleDocumentRedo}
        textSizes={{ ...iconSizes }}
        sx={{
          cursor: 'pointer',
          color:
            currentHistoryIndex + 1 < documentHistory.length ||
            currentHistoryIndex === 0
              ? sassVars.brandColorDusty
              : sassVars.brandcolorGrayLight,
        }}
      />
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
        {isSmallScreen && (
          <CustomIcon
            iconClass='fa-comment-light'
            textSizes={{ ...iconSizes }}
            onClick={() => {
              setBottomDrawerTitle('Help');
              setBottomDrawerComponent(<HelpSection />);
              toggleBottomDrawer(true);
            }}
          />
        )}
      </Box>
    </Stack>
  );
};
