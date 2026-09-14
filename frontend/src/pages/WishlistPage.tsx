import { useEffect } from 'react';
import { Container, Typography, Box, Button, Card, CardContent, IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchWishlist, removeFromWishlist } from '../store/slices/wishlistSlice';
import { addToCart } from '../store/slices/cartSlice';
import { showToast } from '../store/slices/uiSlice';
import { PageHeader } from '../components/PageHeader';
import type { WishlistItem } from '../api/wishlistApi';

export function WishlistPage() {
  const { user } = useAppSelector((s) => s.auth);
  const items = useAppSelector((s) => s.wishlist.items);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) dispatch(fetchWishlist());
  }, [user, dispatch]);

  if (!user) {
    return (
      <Box>
        <PageHeader title="Избранное" compact />
        <Container sx={{ py: 6, textAlign: 'center' }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Нужно войти в аккаунт
          </Typography>
          <Button variant="contained" onClick={() => navigate('/login')}>
            Войти
          </Button>
        </Container>
      </Box>
    );
  }

  return (
    <Box>
      <PageHeader title="Избранное" subtitle={`${items.length} товар(ов)`} compact />

      <Container sx={{ py: 4, maxWidth: 700 }}>
        {items.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              Ты пока ничего не добавил в избранное
            </Typography>
            <Button variant="contained" onClick={() => navigate('/catalog')}>
              В каталог
            </Button>
          </Box>
        ) : (
          items.map((item: WishlistItem) => (
            <Card key={item.productId} sx={{ mb: 2 }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography sx={{ flexGrow: 1, fontWeight: 500 }}>{item.productName}</Typography>

                <Typography sx={{ fontWeight: 600 }} color="primary.main">
                  {item.effectivePrice} MDL
                </Typography>

                <IconButton
                  color="primary"
                  disabled={!item.inStock}
                  onClick={async () => {
                    try {
                      await dispatch(addToCart({ productId: item.productId })).unwrap();
                      dispatch(showToast(`«${item.productName}» добавлен в корзину`));
                    } catch {
                      dispatch(showToast('Не удалось добавить товар'));
                    }
                  }}
                >
                  <ShoppingCartOutlinedIcon />
                </IconButton>

                <IconButton onClick={() => dispatch(removeFromWishlist(item.productId))}>
                  <DeleteOutlineIcon />
                </IconButton>
              </CardContent>
            </Card>
          ))
        )}
      </Container>
    </Box>
  );
}