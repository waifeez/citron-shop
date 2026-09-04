import { createTheme } from '@mui/material/styles';

// Citron — подарочный магазин. Палитра: глубокий лесной зелёный + тёплый
// шалфейный фон (мягче для глаз, чем чистый белый) + коралловый акцент
// для действий — даёт "подарочное" настроение вместо скучного моно-зелёного.
export const theme = createTheme({
  palette: {
    primary: { main: '#1F4D36', dark: '#153726', light: '#3C7259' },
    secondary: { main: '#E8735A' },
    background: { default: '#F4F7F1', paper: '#FFFFFF' },
    text: { primary: '#1C2A22', secondary: '#5B6B60' }
  },
  shape: { borderRadius: 16 },
  typography: {
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    h1: { fontFamily: "'Fraunces', serif", fontWeight: 600 },
    h2: { fontFamily: "'Fraunces', serif", fontWeight: 600 },
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
          boxShadow: '0 2px 14px rgba(31,77,54,0.08)',
          border: '1px solid rgba(31,77,54,0.08)'
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: { backgroundColor: '#F4F7F1' }
      }
    }
  }
});