import { useState, type FormEvent } from 'react';
import { Container, Typography, Box, TextField, Button, Divider, Alert, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { clearCart } from '../store/slices/cartSlice';
import { addOrder } from '../store/slices/ordersSlice';

export function CheckoutPage() {
  const lines = useAppSelector((s) => s.cart.lines);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [error, setError] = useState('');

  const total = lines.reduce((sum, l) => sum + l.product.effectivePrice * l.quantity, 0);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!fullName || !phone || !address || !city || !cardNumber || !cardExpiry || !cardCvc) {
      setError('Заполни все поля');
      return;
    }

    dispatch(
      addOrder({
        id: crypto.randomUUID(),
        orderNumber: `CIT-${Date.now().toString().slice(-8)}`,
        createdAt: new Date().toISOString(),
        items: lines.map((l) => ({
          productName: l.product.name,
          unitPrice: l.product.effectivePrice,
          quantity: l.quantity
        })),
        total,
        shippingFullName: fullName,
        shippingAddress: address,
        shippingCity: city
      })
    );

    dispatch(clearCart());
    navigate('/order-success');
  };

  if (lines.length === 0) {
    return (
      <Container sx={{ py: 6, textAlign: 'center' }}>
        <Typography variant="h5">Корзина пуста — нечего оформлять</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4, maxWidth: 600 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Оформление заказа
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Paper variant="outlined" sx={{ borderRadius: 3, p: 3 }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h6" color="primary.main">
            Доставка
          </Typography>
          <TextField label="Имя и фамилия" value={fullName} onChange={(e) => setFullName(e.target.value)} fullWidth />
          <TextField label="Телефон" value={phone} onChange={(e) => setPhone(e.target.value)} fullWidth />
          <TextField label="Город" value={city} onChange={(e) => setCity(e.target.value)} fullWidth />
          <TextField label="Адрес" value={address} onChange={(e) => setAddress(e.target.value)} fullWidth />

          <Divider sx={{ my: 1 }} />

          <Typography variant="h6" color="primary.main">
            Оплата картой
          </Typography>
          <TextField
            label="Номер карты"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="4242 4242 4242 4242"
            fullWidth
          />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="ММ/ГГ"
              value={cardExpiry}
              onChange={(e) => setCardExpiry(e.target.value)}
              placeholder="12/28"
              fullWidth
            />
            <TextField label="CVC" value={cardCvc} onChange={(e) => setCardCvc(e.target.value)} fullWidth />
          </Box>

          <Divider sx={{ my: 1 }} />

          <Typography variant="h5">Итого: {total} MDL</Typography>

          <Button type="submit" variant="contained" color="primary" size="large">
            Оплатить и оформить заказ
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}