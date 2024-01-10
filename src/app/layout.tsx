'use client';
import { Container, ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import * as React from 'react';

import '@/styles/general.scss'; // Adjust the path accordingly

import MainAppBar from '@/components/shared/MainAppBar/MainAppBar';
import SideIconMenu from '@/components/shared/SideIconMenu/SideIconMenu';
import StyleStepper from '@/components/shared/StyleStepper/StyleStepper';

import customTheme from '@/styles/theme/customTheme';

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
          <MainAppBar title='Fairytale Wedding' subtitle='RSVP Card' />
          <SideIconMenu />
          <StyleStepper></StyleStepper>
          <Container>{children}</Container>
        </ThemeProvider>
      </body>
    </html>
  );
}
