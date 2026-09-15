import { useParams, useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button, Chip, Breadcrumbs, Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addToCart } from '../store/slices/cartSlice';
import { showToast } from '../store/slices/uiSlice';
import { PageHeader } from '../components/PageHeader';
import { ProductReviews } from '../components/ProductReviews';

function ProductHeroArt() {
  return (
    <Box
      sx={{
        height: 340,
        borderRadius: 3,
        bgcolor: '#FBFCF8',
        border: '2px solid rgba(30,122,76,0.12)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <svg viewBox="0 0 100 100" width="120" height="120" fill="none">
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
      <Box>
        <PageHeader title="Товар не найден" compact />
        <Container sx={{ py: 6, textAlign: 'center' }}>
          <Button variant="contained" onClick={() => navigate('/catalog')}>
            Вернуться в каталог
          </Button>
        </Container>
      </Box>
    );
  }

  const hasDiscount = product.discountPrice && product.discountPrice < product.price;

  const handleAddToCart = async () => {
    try {
      await dispatch(addToCart({ productId: product.id })).unwrap();
      dispatch(showToast(`«${product.name}» добавлен в корзину`));
    } catch {
      dispatch(showToast('Не удалось добавить товар — попробуй войти в аккаунт'));
    }
  };

  return (
    <Box>
      <PageHeader title={product.name} subtitle={product.categoryName} compact />

      <Container sx={{ py: 4 }}>
        <Breadcrumbs sx={{ mb: 3 }}>
          <MuiLink component={RouterLink} to="/catalog" underline="hover" color="inherit">
            Каталог
          </MuiLink>
          <Typography color="text.primary">{product.name}</Typography>
        </Breadcrumbs>

        <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          <Box sx={{ flex: '1 1 320px' }}>
            <ProductHeroArt />
          </Box>

          <Box sx={{ flex: '1 1 320px' }}>
            {product.isFeatured && <Chip label="Хит продаж" color="secondary" sx={{ mb: 2 }} />}

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
              onClick={handleAddToCart}
            >
              Добавить в корзину
            </Button>
          </Box>
        </Box>

        <ProductReviews productId={product.id} />
      </Container>
    </Box>
  );
}