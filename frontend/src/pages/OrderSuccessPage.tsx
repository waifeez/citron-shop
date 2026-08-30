import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function OrderSuccessPage() {
  const navigate = useNavigate();

  return (
    <Container sx={{ py: 8, textAlign: 'center' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
        Заказ оформлен!
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Спасибо за покупку. Мы свяжемся с тобой для подтверждения доставки.
      </Typography>
      <Button variant="contained" onClick={() => navigate('/catalog')}>
        Продолжить покупки
      </Button>
    </Container>
  );
}