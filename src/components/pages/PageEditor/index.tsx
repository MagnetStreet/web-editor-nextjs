'use client';

import { Box, Stack } from '@mui/material';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';

import styles from './Editor.module.scss';

import useScreenSize from '@/hooks/useScreenSize';

import ZoomControl from '@/components/CanvasWrapper/ZoomControl';
import { ChangesController } from '@/components/ChangesController/ChangesController';
import LateralContextualMenu from '@/components/LateralContextualMenu';
import Frame from '@/components/shared/Frame';
import OrderSummaryList from '@/components/shared/OrderSummary/OrderSummaryList';
import TextControllerWrapper from '@/components/TextController';

import {
  DesignStudioState,
  useDesignStudioStore,
} from '@/stores/useDesignStudioStore';
import {
  GeneralControlsState,
  useGeneralControlsStore,
} from '@/stores/useGeneralControlsStore';

import { getDocumentInfoAndView } from '@/services/getDocumentInfo';
import { getDocumentView } from '@/services/getDocumentView';
import { setUpSessionData } from '@/services/setUpSessionData';

import DesignStudioItem from '@/types/DesignStudioItem';
import ProductInformation from '@/types/ProductInformation';
import { TextBox } from '@/types/TextBox';

const Canvas = dynamic(() => import('@/components/CanvasWrapper'), {
  ssr: false,
});

export interface EditorPageServerData {
  productInfo?: ProductInformation;
  visitorInfo?: any; //TODO FIX
  isTest?: boolean; //TODO remove
  documentInformationMock?: DesignStudioItem;
}

const PageEditor: React.FC<EditorPageServerData> = ({
  visitorInfo,
  productInfo,
  isTest = false,
  documentInformationMock,
}) => {
  const { isDesktop } = useScreenSize();
  const {
    zoom,
    isBottomFrameOpen,
    topFrameComponent,
    isIsolatedModeActive,
    activeTextBox,
    setIsLoading,
    toggleBottomFrame,
    setZoom,
    setActiveTextBox,
    setIsolatedMode,
  } = useGeneralControlsStore<GeneralControlsState>((state) => state);
  const {
    documentInfo,
    activeView,
    viewBlob,
    setProductInfo,
    setVisitorInfo,
    setDocumentId,
    setSessionInfo,
    setDocumentInfo,
    setSessionId,
    setTemplateId,
    setActiveView,
    setViewBlob,
  } = useDesignStudioStore<DesignStudioState>((state) => state);

  // //TODO delete this is just to test the notifications
  // const { addNotification } = useNotificationStore<useNotificationsState>(
  //   (state) => state
  // );

  // const notificationSample = () => {
  //   return (
  //     <Button
  //       onClick={() => {
  //         addNotification({
  //           icon: 'fa-bell-light',
  //           severity: 'warning' as AlertColor,
  //           body: (
  //             <Stack direction='row' gap='20px'>
  //               <Typography>
  //                 You have added <b>Raised Foils</b> to your order
  //               </Typography>
  //               <Typography
  //                 color={theme.palette.primary.main}
  //                 onClick={() => {
  //                   //TODO add missing implementation
  //                 }}
  //               >
  //                 view summary
  //               </Typography>
  //             </Stack>
  //           ),
  //         });
  //       }}
  //     >
  //       Show notification
  //     </Button>
  //   );
  // };
  // // TODO end

  const handleClickFontItem = (textbox: TextBox) => {
    console.log('Clicked element of type Text', textbox);
    setIsolatedMode(true);
    setActiveTextBox(textbox, <TextControllerWrapper />);
  };

  useEffect(() => {
    if (visitorInfo && productInfo && !isTest) {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const sessionSetUpResponse = await setUpSessionData(
            visitorInfo,
            productInfo
          );
          setSessionInfo(sessionSetUpResponse);
          console.log('sessionSetUpResponse', sessionSetUpResponse);
          const { documentInfo, documentId, sessionId, templateId } =
            await getDocumentInfoAndView(productInfo, sessionSetUpResponse);
          const { viewBlob } = await getDocumentView(
            sessionSetUpResponse,
            documentInfo,
            productInfo
          );
          console.log('documentInfo', documentInfo);
          console.log('viewBlob', viewBlob);
          if (documentInfo) {
            setProductInfo(productInfo);
            setVisitorInfo(visitorInfo);
            setDocumentId(documentId);
            setSessionId(sessionId);
            setTemplateId(templateId);
            setDocumentInfo(documentInfo);
            setActiveView(documentInfo?.views[0]);
          }
          if (viewBlob instanceof Blob) {
            setViewBlob(viewBlob);
          }
        } catch (error) {
          console.log('error!!!:', error);
        } finally {
          setIsLoading(false);
        }
      };
      console.log('RENDERING SERVER DATA');
      fetchData();
    } else {
      //TODO This will get remove after testing is done
      console.log('RENDERING TEST DATA');
      console.log('documentInformationMock', documentInformationMock);
      if (documentInformationMock) {
        setDocumentInfo(documentInformationMock);
        setActiveView(documentInformationMock?.views[0]);
        const fetchImageAsBlob = async () => {
          const response = await fetch('./images/sample_big.png');
          const blob = await response.blob();
          console.log('Blob', blob);
          setViewBlob(blob);
        };

        fetchImageAsBlob();
      }
    }
  }, [visitorInfo, productInfo]);

  return (
    <Stack direction='row' position='relative'>
      <LateralContextualMenu />
      <Box className={`${styles.editor} ${styles.editor__isolated_active}`}>
        {/*
          TODO delete this is just to test the notifications 
           {notificationSample()} 
        */}

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
              visible={!!topFrameComponent}
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
              {topFrameComponent}
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
          position='absolute'
          zoom={zoom}
          viewBlob={viewBlob}
          documentInfo={documentInfo}
          activeView={activeView}
          activeTextBox={activeTextBox}
          isIsolatedMode={isIsolatedModeActive}
          handleClickFontItem={handleClickFontItem}
          coordinates={{
            top: '50%',
            left: '70%',
          }}
        />
      </Box>
    </Stack>
  );
};

export default PageEditor;
