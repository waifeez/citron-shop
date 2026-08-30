import { Container, Typography, Box, IconButton, Button, Divider } from '@mui/material';
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
      <Container sx={{ py: 6, textAlign: 'center' }}>
        <Typography variant="h5">Корзина пуста</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4, maxWidth: 700 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        Корзина
      </Typography>

      {lines.map((line) => (
        <Box key={line.product.id}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 2 }}>
            <Typography sx={{ flexGrow: 1 }}>{line.product.name}</Typography>

            <IconButton size="small" onClick={() => dispatch(decrement(line.product.id))}>
              <RemoveIcon fontSize="small" />
            </IconButton>
            <Typography>{line.quantity}</Typography>
            <IconButton size="small" onClick={() => dispatch(increment(line.product.id))}>
              <AddIcon fontSize="small" />
            </IconButton>

            <Typography sx={{ width: 90, textAlign: 'right' }}>
              {line.product.effectivePrice * line.quantity} MDL
            </Typography>

            <IconButton size="small" onClick={() => dispatch(removeFromCart(line.product.id))}>
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          </Box>
          <Divider />
        </Box>
      ))}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
        <Typography variant="h5">Итого: {total} MDL</Typography>
        <Button variant="outlined" color="error" onClick={() => dispatch(clearCart())}>
          Очистить корзину
        </Button>
      </Box>

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={() => navigate('/checkout')}>
        Оформить заказ
      </Button>
    </Container>
  );
}