import { createTheme } from '@mui/material/styles';
import sassVars from '@/styles/_colorVariables.module.scss';

const theme = createTheme({
  palette: {
    primary: {
      light: sassVars.teInfo,
      main: sassVars.brandColorDusty,
      contrastText: sassVars.brandColorWhite,
    },
    secondary: {
      light: sassVars.brandColorBrightBlue,
      main: sassVars.brandColorWhite,
    },
    warning: {
      main: sassVars.teWarning,
      dark: sassVars.brandColorYellow,
    },
    error: {
      main: sassVars.teError,
      dark: sassVars.brandColorWhite,
    },
    grey: {
      100: sassVars.brandcolorGrayLight,
      200: sassVars.brandColorLightGrey,
      300: sassVars.teLightGrey,
      400: sassVars.teGrey,
    },
    common: {
      white: sassVars.brandColorWhite,
      black: sassVars.teBlack,
    },
  },
});

const customTheme = createTheme(theme, {
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 980,
      lg: 1024,
      xl: 1200,
    },
  },
  typography: {},
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: 'var(--font-lato)',
          lineHeight: 'normal',
        },
        h1: {
          fontFamily: 'FS Sally',
          fontSize: '48px',
          [`@media (max-width: ${theme.breakpoints.values.md}px)`]: {
            fontSize: '40px',
          },
        },
        h2: {
          fontFamily: 'FS Sally',
          fontSize: '32px',
          [`@media (max-width: ${theme.breakpoints.values.md}px)`]: {
            fontSize: '28px',
          },
        },
        h3: {
          fontFamily: 'FS Sally',
          fontSize: '24px',
          [`@media (max-width: ${theme.breakpoints.values.md}px)`]: {
            fontSize: '16px',
          },
        },
        h4: {
          fontFamily: 'FS Sally',
          fontSize: '24px',
        },
        h5: {
          fontFamily: 'var(--font-lato)',
          fontWeight: '700',
          fontSize: '18px',
        },
        subtitle1: {
          fontWeight: '700',
          fontFamily: 'var(--font-lato)',
          fontSize: '16px',
        },
        subtitle2: {
          fontFamily: 'var(--font-lato)',
          lineHeight: 'normal',
          fontSize: '12px',
          [`@media (max-width: ${theme.breakpoints.values.md}px)`]: {
            fontSize: '10px',
          },
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        color: 'secondary',
      },
      root: {
        boxShadow: 'none',
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: {
            sans: ['var(--font-lato)'],
          },
          textTransform: 'capitalize',
          fontSize: '1rem',
          lineHeight: '20px',
          minHeight: '40px',
          padding: '8px 16px',
          borderRadius: '4px',
          borderColor: 'theme.palette.primary.main',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: '6px',
          borderRadius: '100px',
          backgroundColor: sassVars.brandColorIce,
        },
        bar: {
          backgroundColor: sassVars.brandColorBrightBlue,
        },
      },
    },
  },
  // You can also add other customizations to your theme here
});

export default customTheme;
