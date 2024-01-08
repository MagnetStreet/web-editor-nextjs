import { Container } from '@mui/material';
import GlobalStyles from '@mui/material/GlobalStyles';
import * as React from 'react';

import '@/styles/general.scss'; // Adjust the path accordingly

import { GLOBAL_STYLES } from '@/styles';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <GlobalStyles styles={GLOBAL_STYLES} />
      <body>
        <Container sx={{ pl: 0, pr: 0 }}>{children}</Container>
      </body>
    </html>
  );
}
