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
      main: vars.colors.white,
    },
    grey: {
      100: '#EFEFEF',
      200: '#CCCCCC',
      300: '#70777F',
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
    h1: {
      color: vars.colors.black,
      fontFamily: 'FS Sally',
      fontSize: vars.size.xl,
      fontWeight: 400,
      lineHeight: 'normal',
    },
    h2: {
      color: vars.colors.black,
      fontFamily: 'Lato',
      fontSize: vars.size.md,
      fontWeight: 400,
      lineHeight: 'normal',
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
          fontFamily: 'FS Sally',
          textTransform: 'capitalize',
          fontSize: '1rem',
          lineHeight: '20px',
          minHeight: '44px',
          padding: '8px 16px',
          borderRadius: '8px',
          borderColor: 'theme.palette.primary.main',
        },
      },
    },
  },
  // You can also add other customizations to your theme here
});

export default customTheme;
