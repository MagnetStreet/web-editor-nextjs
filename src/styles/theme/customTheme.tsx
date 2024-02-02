import { createTheme } from '@mui/material/styles';

const vars = {
  size: {
    sm: '12px',
    md: '16px',
    lg: '20px',
    xl: '24px',
  },
  colors: {
    primaryLight: '#2496FF',
    primaryColor: '#5471A8',
    highlighBackground: '#ccd4e5',
    highlighBackground2: '#E6EEFE',
    secondaryLight: '#618DE6',
    white: '#ffffff',
    black: '#000',
    gray1: '#CCCCCC',
    gray2: '#D9D9D9',
    gray3: '#CCCDCD',
    grayDark: '#70777F',
    grayLight: '#EFEFEF',
  },
};

const theme = createTheme({
  palette: {
    primary: {
      light: vars.colors.primaryLight,
      main: vars.colors.primaryColor,
    },
    secondary: {
      light: vars.colors.secondaryLight,
      main: vars.colors.white,
    },
    grey: {
      100: '#EFEFEF',
      200: '#CCCCCC',
      300: '#CCCDCD',
      400: '#70777F',
    },
    common: {
      white: vars.colors.white,
      black: vars.colors.black,
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
          fontSize: '20px',
        },
        h5: {
          fontFamily: {
            sans: ['var(--font-lato)'],
          },
          fontWeight: '700',
          fontSize: '18px',
        },
        subtitle1: {
          fontWeight: '700',
          fontFamily: {
            sans: ['var(--font-lato)'],
          },
          fontSize: '16px',
        },
        subtitle2: {
          fontFamily: {
            sans: ['var(--font-lato)'],
          },
          lineHeight: 'normal',
          fontSize: '14px',
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
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          boxShadow: '0px 4px 4px 0px #CBCBCB;',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: '6px',
          borderRadius: '100px',
          backgroundColor: vars.colors.highlighBackground2,
        },
        bar: {
          backgroundColor: vars.colors.secondaryLight,
        },
      },
    },
  },
  // You can also add other customizations to your theme here
});

export default customTheme;
