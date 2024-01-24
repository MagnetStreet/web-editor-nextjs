'use client';
import { Stack, ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { Lato } from 'next/font/google';
import * as React from 'react';

import '@/fonts/font-awesome/style.scss';

import useScreenSize from '@/hooks/useScreenSize';

import FooterMenu from '@/components/FooterMenu/FooterMenu';
import LateralContextualMenu from '@/components/LateralContextualMenu/LateralContextualMenu';
import MainAppBar from '@/components/MainAppBar/MainAppBar';
import StepperWrapper from '@/components/Stepper/StepperWrapper';

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
  return (
    <html lang='en'>
      <CssBaseline />
      <body>
        <ThemeProvider theme={customTheme}>
          <main className={`${lato.variable} font-sans`}>
            <MainAppBar
              title='Fairytale Wedding'
              subtitle='RSVP Card'
              hasNotifications={true}
            />
            <Stack direction='row'>
              {isDesktop && <LateralContextualMenu />}
              <Stack width='100%' position='relative'>
                <StepperWrapper />
                {children}
                {isDesktop && <FooterMenu />}
              </Stack>
            </Stack>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
