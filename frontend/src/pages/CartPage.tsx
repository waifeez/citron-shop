import { useEffect } from 'react';
import { Container, Typography, Box, IconButton, Button, Divider, Paper, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchCart, updateCartItem, removeCartItem } from '../store/slices/cartSlice';

export function CartPage() {
  const cart = useAppSelector((s) => s.cart.data);
  const status = useAppSelector((s) => s.cart.status);
  const { user } = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) dispatch(fetchCart());
  }, [user, dispatch]);

  if (!user) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Нужно войти в аккаунт
        </Typography>
        <Button variant="contained" onClick={() => navigate('/login')}>
          Войти
        </Button>
      </Container>
    );
  }

  if (status === 'loading' && cart.items.length === 0) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress color="primary" />
      </Container>
    );
  }

  if (cart.items.length === 0) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5" sx={{ mb: 1 }}>
          Корзина пуста
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Загляни в каталог — там точно что-нибудь понравится
        </Typography>
        <Button variant="contained" onClick={() => navigate('/catalog')}>
          В каталог
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4, maxWidth: 700 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Корзина
      </Typography>

      <Paper variant="outlined" sx={{ borderRadius: 3, overflow: 'hidden' }}>
        {cart.items.map((item, i) => (
          <Box key={item.id}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 2, px: 2 }}>
              <Typography sx={{ flexGrow: 1, fontWeight: 500 }}>{item.productName}</Typography>

              <IconButton
                size="small"
                onClick={() => dispatch(updateCartItem({ productId: item.productId, quantity: item.quantity - 1 }))}
              >
                <RemoveIcon fontSize="small" />
              </IconButton>
              <Typography sx={{ minWidth: 20, textAlign: 'center' }}>{item.quantity}</Typography>
              <IconButton
                size="small"
                onClick={() => dispatch(updateCartItem({ productId: item.productId, quantity: item.quantity + 1 }))}
                disabled={item.quantity >= item.availableStock}
              >
                <AddIcon fontSize="small" />
              </IconButton>

              <Typography sx={{ width: 90, textAlign: 'right', fontWeight: 600 }} color="primary.main">
                {item.lineTotal} MDL
              </Typography>

              <IconButton size="small" onClick={() => dispatch(removeCartItem(item.productId))}>
                <DeleteOutlineIcon fontSize="small" />
              </IconButton>
            </Box>
            {i < cart.items.length - 1 && <Divider />}
          </Box>
        ))}
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
        <Typography variant="h5">Итого: {cart.total} MDL</Typography>
      </Box>

      <Button variant="contained" color="primary" size="large" fullWidth sx={{ mt: 3 }} onClick={() => navigate('/checkout')}>
        Оформить заказ
      </Button>
    </Container>
  );
}