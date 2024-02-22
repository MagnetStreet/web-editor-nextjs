'use client';

import {
  AlertColor,
  Box,
  Button,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';

import styles from './Editor.module.scss';

import useScreenSize from '@/hooks/useScreenSize';

import { ChangesController } from '@/components/ChangesController/ChangesController';
import LateralContextualMenu from '@/components/LateralContextualMenu/LateralContextualMenu';
import ZoomControl from '@/components/shared/CanvasWrapper/ZoomControl';
import Frame from '@/components/shared/Frame';
import OrderSummaryList from '@/components/shared/OrderSummary/OrderSummaryList';

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

import { getSessionData } from '@/utils/getSessionData';

import { EditorPageServerData } from '@/types/pageData';

const Canvas = dynamic(() => import('@/components/shared/CanvasWrapper'), {
  ssr: false,
});

const PageEditor: React.FC<EditorPageServerData> = ({
  visitorInfo,
  productInfo,
}) => {
  const theme = useTheme();
  const { isDesktop } = useScreenSize();
  const { zoom, isBottomFrameOpen, setIsLoading, toggleBottomFrame, setZoom } =
    useGeneralControlsStore<GeneralControlsState>((state) => state);
  const {
    documentInfo,
    activeView,
    viewBlob,
    setDocumentInfo,
    setActiveView,
    setViewBlob,
  } = useDesignStudioStore<DesignStudioState>((state) => state);

  //TODO delete this is just to test the notifications
  const { addNotification } = useNotificationStore<useNotificationsState>(
    (state) => state
  );

  const notificationSample = () => {
    return (
      <Button
        onClick={() => {
          addNotification({
            icon: 'fa-bell-light',
            severity: 'warning' as AlertColor,
            body: (
              <Stack direction='row' gap='20px'>
                <Typography>
                  You have added <b>Raised Foils</b> to your order
                </Typography>
                <Typography
                  color={theme.palette.primary.main}
                  onClick={() => {
                    //TODO add missing implementation
                  }}
                >
                  view summary
                </Typography>
              </Stack>
            ),
          });
        }}
      >
        Show notification
      </Button>
    );
  };
  // TODO end

  useEffect(() => {
    if (visitorInfo && productInfo) {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const { viewBlob, documentInfo } = await getSessionData(
            visitorInfo,
            productInfo
          );
          console.log('documentInfo', documentInfo);
          console.log('viewBlob', viewBlob);
          if (documentInfo) {
            setDocumentInfo(documentInfo);
            setActiveView(documentInfo?.views[0]);
          }
          if (viewBlob instanceof Blob) {
            setViewBlob(viewBlob);
          }
        } catch (error) {
          console.log('error:', error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, [visitorInfo, productInfo]);

  return (
    <Stack direction='row' position='relative'>
      <LateralContextualMenu />
      <Box className={styles.editor}>
        {/*
          TODO delete this is just to test the notifications  
        */}
        {notificationSample()}

        <ChangesController
          position='absolute'
          coordinates={{
            top: '15%',
            right: '1%',
          }}
        />
        {isDesktop && (
          <>
            <ZoomControl
              position='absolute'
              zoom={zoom as number}
              setZoom={setZoom}
              coordinates={{
                top: '45%',
                right: '1%',
              }}
            />
            <Frame
              position='absolute'
              coordinates={{
                top: 12,
                left: 16,
              }}
              paperProps={{
                sx: {
                  width: 'fit-content',
                },
              }}
            >
              <p>Interchangebale content top left</p>
            </Frame>
            <Frame
              position='absolute'
              visible={isBottomFrameOpen}
              coordinates={{
                bottom: 100,
                right: 175,
              }}
              paperProps={{
                sx: {
                  width: 'fit-content',
                },
              }}
            >
              <OrderSummaryList onClose={() => toggleBottomFrame(false)} />
            </Frame>
          </>
        )}
        <Canvas
          zoom={zoom}
          viewBlob={viewBlob}
          documentInfo={documentInfo}
          activeView={activeView}
        />
      </Box>
    </Stack>
  );
};

export default PageEditor;
