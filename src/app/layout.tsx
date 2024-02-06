'use client';
import { Box, Stack, ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { Lato } from 'next/font/google';
import * as React from 'react';

import '@/fonts/font-awesome/style.scss';

import useScreenSize from '@/hooks/useScreenSize';

import FooterMenu from '@/components/FooterMenu/FooterMenu';
import MainAppBar from '@/components/MainAppBar/MainAppBar';

import customTheme from '@/styles/theme/customTheme';
import GenericModal from '@/components/shared/GenericModal';
import {
  GeneralControlsState,
  useGeneralControlsStore,
} from '@/stores/useGeneralControlsStore';
import { useEffect } from 'react';
import { postApiResponse } from '@/utils/shared/post-api-response';
import Notifications from '@/components/shared/Notifications';
import Navigation from '@/components/Navigation';
import BottomDrawer from '@/components/shared/BottomDrawer';
import LoadingLogo from '@/components/shared/LoadingLogo';

const lato = Lato({
  subsets: ['latin'],
  style: 'normal',
  weight: ['300', '400', '700'],
  variable: '--font-lato',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isDesktop } = useScreenSize();
  const {
    isInitialLoad,
    isBottomDrawerOpen,
    setInitialLoading,
    toggleBottomDrawer,
  } = useGeneralControlsStore<GeneralControlsState>((state) => state);

  useEffect(() => {
    setInitialLoading(false);
  }, []);

  return (
    <html lang='en'>
      <CssBaseline />
      <body>
        <ThemeProvider theme={customTheme}>
          {isInitialLoad ? (
            <LoadingLogo />
          ) : (
            <main className={`${lato.variable}`}>
              <MainAppBar
                title='Fairytale Wedding'
                subtitle='RSVP Card'
                hasNotifications={true}
              />
              <Notifications />
              {/* <GenericModal
                handleClose={() => setLoading(false)}
                isOpen={isLoading}
              >
                <p>IS LOADING</p>
              </GenericModal> */}
              <Stack direction='row'>
                <Stack width='100%' position='relative'>
                  {/* <StepperWrapper /> */}
                  <Navigation />
                  {children}
                  {isDesktop && <FooterMenu />}
                </Stack>
              </Stack>
              {!isDesktop && (
                <BottomDrawer
                  open={isBottomDrawerOpen}
                  setOpen={toggleBottomDrawer}
                >
                  <p>HEY LISTEN</p>
                </BottomDrawer>
              )}
            </main>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
