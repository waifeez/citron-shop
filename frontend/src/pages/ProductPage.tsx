import { useParams, useNavigate } from 'react-router-dom';
import { Container, Grid, Box, Typography, Button, Chip } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addToCart } from '../store/slices/cartSlice';
import { showToast } from '../store/slices/uiSlice';

function ProductHeroArt() {
  return (
    <Box
      sx={{
        height: 400,
        borderRadius: 3,
        bgcolor: '#FBFCF8',
        border: '2px solid rgba(30,122,76,0.12)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <svg viewBox="0 0 100 100" width="140" height="140" fill="none">
        <rect x="20" y="42" width="60" height="42" rx="3" fill="#F5D800" stroke="#153726" strokeWidth="3" />
        <rect x="20" y="42" width="60" height="12" fill="#1E7A4C" stroke="#153726" strokeWidth="3" />
        <rect x="45" y="34" width="10" height="50" fill="#1E7A4C" stroke="#153726" strokeWidth="2" />
      </svg>
    </Box>
  );
}

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
          <ProductHeroArt />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          {product.isFeatured && <Chip label="Хит продаж" color="secondary" sx={{ mb: 2 }} />}

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
            color="primary"
            size="large"
            disabled={product.stockQuantity === 0}
            onClick={() => {
              dispatch(addToCart(product));
              dispatch(showToast(`«${product.name}» добавлен в корзину`));
            }}
          >
            Добавить в корзину
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}