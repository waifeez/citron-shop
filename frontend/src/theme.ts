import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: { main: '#E8871E', dark: '#C46A0B', light: '#F5A93F' },
    secondary: { main: '#2E7D5B' },
    background: { default: '#FFFBF5' }
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: "'Manrope', 'Segoe UI', sans-serif",
    button: { textTransform: 'none', fontWeight: 600 }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 999, paddingLeft: 20, paddingRight: 20 }
      }
    }
  }
});