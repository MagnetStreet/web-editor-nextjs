'use client';
import { Stack, ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { Lato } from 'next/font/google';
import * as React from 'react';
import { useEffect } from 'react';

import '@/fonts/font-awesome/style.scss';

import useScreenSize from '@/hooks/useScreenSize';

import MainAppBar from '@/components/MainAppBar/MainAppBar';
import Navigation from '@/components/Navigation';
import BottomDrawer from '@/components/shared/BottomDrawer';
import GenericModal from '@/components/shared/GenericModal';
import LoadingLogo from '@/components/shared/LoadingLogo';
import Notifications from '@/components/shared/Notifications';

import {
  BottomDrawerState,
  useBottomDrawerStore,
} from '@/stores/useBottomDrawerStore';
import {
  GeneralControlsState,
  useGeneralControlsStore,
} from '@/stores/useGeneralControlsStore';

import customTheme from '@/styles/theme/customTheme';

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
  const { isInitialLoad, isLoading, setInitialLoading } =
    useGeneralControlsStore<GeneralControlsState>((state) => state);
  const {
    isBottomDrawerOpen,
    bottomDrawerTitle,
    toggleBottomDrawer,
    bottomDrawerComponent,
  } = useBottomDrawerStore<BottomDrawerState>((state) => state);

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
              <GenericModal isOpen={isLoading}>
                <LoadingLogo />
              </GenericModal>
              <Stack direction='row'>
                <Stack width='100%' position='relative'>
                  <Navigation />
                  {children}
                </Stack>
              </Stack>
              {!isDesktop && (
                <BottomDrawer
                  open={isBottomDrawerOpen}
                  setOpen={toggleBottomDrawer}
                  title={bottomDrawerTitle}
                >
                  {bottomDrawerComponent}
                </BottomDrawer>
              )}
            </main>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
