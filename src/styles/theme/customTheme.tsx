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
  typography: {
    fontSize: 16,
    lineHeight: 'normal',
    h1: {
      color: vars.colors.black,
      fontFamily: 'FS Sally',
      fontSize: vars.size.xl,
      fontWeight: 400,
      lineHeight: 'normal',
    },
    h2: {
      color: vars.colors.black,
      fontFamily: {
        sans: ['var(--font-lato)'],
      },
      fontSize: vars.size.md,
      fontWeight: 700,
      lineHeight: 'normal',
    },
    h3: {
      color: vars.colors.grayDark,
      fontFamily: {
        sans: ['var(--font-lato)'],
      },
      fontSize: vars.size.sm,
      textTransform: 'uppercase',
      fontWeight: 400,
    },
    subtitle2: {
      color: vars.colors.grayDark,
      fontSize: vars.size.sm,
    },
    // Define your other typography variants here...
  },
  components: {
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
  },
  // You can also add other customizations to your theme here
});

export default customTheme;
