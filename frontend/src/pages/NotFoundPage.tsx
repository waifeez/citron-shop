import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function LostGiftArt() {
  // Та же "outline"-стилистика: коробка с оторвавшейся крышкой — намёк на "потерялись".
  return (
    <svg viewBox="0 0 200 180" width="220" height="200" fill="none">
      <rect x="55" y="90" width="90" height="65" rx="5" fill="#F5D800" stroke="#153726" strokeWidth="4" />
      <rect x="55" y="90" width="90" height="18" fill="#1E7A4C" stroke="#153726" strokeWidth="4" />
      <rect x="93" y="70" width="14" height="85" fill="#1E7A4C" stroke="#153726" strokeWidth="3" />

      {/* Крышка съехала набок */}
      <rect
        x="30"
        y="35"
        width="70"
        height="16"
        rx="4"
        fill="#F5D800"
        stroke="#153726"
        strokeWidth="4"
        transform="rotate(-18 65 43)"
      />

      {/* Вопросительный знак вместо банта */}
      <text x="90" y="80" fontSize="34" fontWeight="700" fill="#1E7A4C" fontFamily="'Fraunces', serif">
        ?
      </text>
    </svg>
  );
}

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Container sx={{ py: 10, textAlign: 'center' }}>
      <Box sx={{ mb: 3 }}>
        <LostGiftArt />
      </Box>
      <Typography variant="h3" sx={{ mb: 1 }}>
        Страница потерялась
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Похоже, этой страницы не существует — но в каталоге точно есть что-то интересное.
      </Typography>
      <Button variant="contained" size="large" onClick={() => navigate('/')}>
        На главную
      </Button>
    </Container>
  );
}