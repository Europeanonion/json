import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          margin: '8px',
          borderRadius: '12px',
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          position: 'fixed',
          bottom: 0,
          width: '100%',
          borderTop: '1px solid rgba(0, 0, 0, 0.12)',
        },
      },
    },
  },
});