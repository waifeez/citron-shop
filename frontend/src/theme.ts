import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: { main: '#1E7A4C', dark: '#123420', light: '#4FAE7C' },
    secondary: { main: '#F5D800', dark: '#D9BE00', light: '#FFE94D', contrastText: '#153726' },
    background: { default: '#FBFCF8', paper: '#FFFFFF' },
    text: { primary: '#16241C', secondary: '#5B6B60' }
  },
  shape: { borderRadius: 16 },
  typography: {
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    h1: { fontFamily: "'Fraunces', serif", fontWeight: 700 },
    h2: { fontFamily: "'Fraunces', serif", fontWeight: 700 },
    h3: { fontFamily: "'Fraunces', serif", fontWeight: 600 },
    h4: { fontFamily: "'Fraunces', serif", fontWeight: 600 },
    h5: { fontFamily: "'Fraunces', serif", fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 999, paddingLeft: 22, paddingRight: 22 }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 14px rgba(30,122,76,0.10)',
          border: '2px solid rgba(30,122,76,0.12)'
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        colorPrimary: { backgroundColor: '#F5D800', color: '#153726', fontWeight: 600 }
      }
    }
  }
});