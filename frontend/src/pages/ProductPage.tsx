import { useParams, useNavigate } from 'react-router-dom';
import { Container, Grid, Box, Typography, Button, Chip } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addToCart } from '../store/slices/cartSlice';

export function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const product = useAppSelector((s) => s.products.items.find((p) => p.slug === slug));

  if (!product) {
    return (
      <Container sx={{ py: 6, textAlign: 'center' }}>
        <Typography variant="h5">Товар не найден</Typography>
        <Button sx={{ mt: 2 }} onClick={() => navigate('/catalog')}>
          Вернуться в каталог
        </Button>
      </Container>
    );
  }

  const hasDiscount = product.discountPrice && product.discountPrice < product.price;

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              height: 400,
              bgcolor: 'grey.100',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Typography color="text.disabled">Фото товара</Typography>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          {product.isFeatured && <Chip label="Хит продаж" color="primary" sx={{ mb: 2 }} />}

          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            {product.name}
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {product.description}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2, mb: 3 }}>
            <Typography variant="h4" color="primary.main">
              {product.effectivePrice} MDL
            </Typography>
            {hasDiscount && (
              <Typography variant="h6" sx={{ textDecoration: 'line-through' }} color="text.disabled">
                {product.price} MDL
              </Typography>
            )}
          </Box>

          <Typography variant="body2" sx={{ mb: 3 }}>
            {product.stockQuantity > 0 ? `В наличии: ${product.stockQuantity} шт.` : 'Нет в наличии'}
          </Typography>

          <Button
            variant="contained"
            size="large"
            disabled={product.stockQuantity === 0}
            onClick={() => dispatch(addToCart(product))}
          >
            Добавить в корзину
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}