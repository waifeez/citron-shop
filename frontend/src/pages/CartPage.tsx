import { Container, Typography, Box, IconButton, Button, Divider, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { increment, decrement, removeFromCart, clearCart } from '../store/slices/cartSlice';

export function CartPage() {
  const lines = useAppSelector((s) => s.cart.lines);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const total = lines.reduce((sum: number, l) => sum + l.product.effectivePrice * l.quantity, 0);

  if (lines.length === 0) {
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
        {lines.map((line, i) => (
          <Box key={line.product.id}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 2, px: 2 }}>
              <Typography sx={{ flexGrow: 1, fontWeight: 500 }}>{line.product.name}</Typography>

              <IconButton size="small" onClick={() => dispatch(decrement(line.product.id))}>
                <RemoveIcon fontSize="small" />
              </IconButton>
              <Typography sx={{ minWidth: 20, textAlign: 'center' }}>{line.quantity}</Typography>
              <IconButton size="small" onClick={() => dispatch(increment(line.product.id))}>
                <AddIcon fontSize="small" />
              </IconButton>

              <Typography sx={{ width: 90, textAlign: 'right', fontWeight: 600 }} color="primary.main">
                {line.product.effectivePrice * line.quantity} MDL
              </Typography>

              <IconButton size="small" onClick={() => dispatch(removeFromCart(line.product.id))}>
                <DeleteOutlineIcon fontSize="small" />
              </IconButton>
            </Box>
            {i < lines.length - 1 && <Divider />}
          </Box>
        ))}
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
        <Typography variant="h5">Итого: {total} MDL</Typography>
        <Button variant="outlined" color="error" onClick={() => dispatch(clearCart())}>
          Очистить корзину
        </Button>
      </Box>

      <Button
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        sx={{ mt: 3 }}
        onClick={() => navigate('/checkout')}
      >
        Оформить заказ
      </Button>
    </Container>
  );
}