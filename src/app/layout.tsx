'use client';
import { Button, Stack, ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { Lato } from 'next/font/google';
import * as React from 'react';

import '@/fonts/font-awesome/style.scss';

import useScreenSize from '@/hooks/useScreenSize';

import FooterMenu from '@/components/FooterMenu/FooterMenu';
import MainAppBar from '@/components/MainAppBar/MainAppBar';
import StepperWrapper from '@/components/Stepper/StepperWrapper';

import customTheme from '@/styles/theme/customTheme';
import GenericModal from '@/components/shared/GenericModal';
import { useGeneralControlsStore } from '@/stores/useGeneralControlsStore';
import { useEffect } from 'react';
import { postApiResponse } from '@/utils/shared/post-api-response';
import Notifications from '@/components/shared/Notifications';

const lato = Lato({
  subsets: ['latin'],
  style: 'normal',
  weight: ['300', '400', '700'],
  variable: '--font-lato',
});

const LoadingLogo = () => (
  <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <img
      src='/images/TE_Logo_Animation-just-the-mark-loading_100.gif'
      alt='Loading...'
      style={{ width: '100px', height: '100px' }}
    />
  </div>
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isDesktop } = useScreenSize();
  const { isInitialLoad, isLoading, setLoading, setInitialLoading } =
    useGeneralControlsStore();

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
            <main className={`${lato.variable} font-sans`}>
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
                  <StepperWrapper />
                  {children}
                  {isDesktop && <FooterMenu />}
                </Stack>
              </Stack>
            </main>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
