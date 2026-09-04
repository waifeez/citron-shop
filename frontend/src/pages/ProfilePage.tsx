import { Container, Typography, Box, Divider, Paper } from '@mui/material';
import { useAppSelector } from '../store/hooks';

export function ProfilePage() {
  const { user } = useAppSelector((s) => s.auth);
  const orders = useAppSelector((s) => s.orders.history);

  if (!user) {
    return (
      <Container sx={{ py: 6, textAlign: 'center' }}>
        <Typography variant="h5">Нужно войти в аккаунт</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4, maxWidth: 700 }}>
      <Typography variant="h4" sx={{ mb: 1 }}>
        {user.fullName}
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        {user.email}
      </Typography>

      <Typography variant="h5" sx={{ mb: 2 }}>
        История заказов
      </Typography>

      {orders.length === 0 && <Typography color="text.secondary">Заказов пока нет</Typography>}

      {orders.map((order) => (
        <Paper key={order.id} sx={{ p: 2, mb: 2, borderRadius: 3 }} variant="outlined">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography sx={{ fontWeight: 600 }}>№ {order.orderNumber}</Typography>
            <Typography color="text.secondary">
              {new Date(order.createdAt).toLocaleDateString('ru-RU')}
            </Typography>
          </Box>

          <Divider sx={{ mb: 1 }} />

          {order.items.map((item, i) => (
            <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2">
                {item.productName} × {item.quantity}
              </Typography>
              <Typography variant="body2">{item.unitPrice * item.quantity} MDL</Typography>
            </Box>
          ))}

          <Divider sx={{ my: 1 }} />

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ fontWeight: 600 }}>Итого</Typography>
            <Typography sx={{ fontWeight: 600 }} color="primary.main">
              {order.total} MDL
            </Typography>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Доставка: {order.shippingAddress}, {order.shippingCity}
          </Typography>
        </Paper>
      ))}
    </Container>
  );
}