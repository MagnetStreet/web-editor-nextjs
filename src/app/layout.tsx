'use client';
import { Box, Stack, ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { Lato } from 'next/font/google';
import * as React from 'react';

import '@/fonts/font-awesome/style.scss';

import FooterMenu from '@/components/shared/FooterMenu/FooterMenu';
import MainAppBar from '@/components/shared/MainAppBar/MainAppBar';
import SideIconMenu from '@/components/shared/SideIconMenu/SideIconMenu';
import StepperWrapper from '@/components/shared/Stepper/StepperWrapper';

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
  return (
    <html lang='en'>
      <CssBaseline />
      <body>
        <ThemeProvider theme={customTheme}>
          <main className={`${lato.variable} font-sans`}>
            <MainAppBar title='Fairytale Wedding' subtitle='RSVP Card' />
            <Stack direction='row'>
              <SideIconMenu />
              <Stack width='100%' position='relative'>
                <StepperWrapper />
                <Box
                  sx={{
                    height: '100%',
                    //Make this grow to take all screen available
                    backgroundColor: customTheme.palette.grey[100],
                  }}
                >
                  {children}
                </Box>
                <FooterMenu />
              </Stack>
            </Stack>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
