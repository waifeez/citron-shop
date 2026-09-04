import { Card, CardContent, CardMedia, Typography, Button, Box, Chip, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../types';
import { useAppDispatch } from '../store/hooks';
import { addToCart } from '../store/slices/cartSlice';

function ProductPlaceholderArt() {
  return (
    <svg viewBox="0 0 100 100" width="56" height="56" fill="none">
      <rect x="20" y="42" width="60" height="42" rx="3" fill="#F5D800" stroke="#153726" strokeWidth="3" />
      <rect x="20" y="42" width="60" height="12" fill="#1E7A4C" stroke="#153726" strokeWidth="3" />
      <rect x="45" y="34" width="10" height="50" fill="#1E7A4C" stroke="#153726" strokeWidth="2" />
    </svg>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const hasDiscount = product.discountPrice && product.discountPrice < product.price;

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardActionArea onClick={() => navigate(`/product/${product.slug}`)}>
        <CardMedia
          sx={{
            height: 160,
            bgcolor: '#FBFCF8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderBottom: '2px solid rgba(30,122,76,0.10)'
          }}
        >
          <ProductPlaceholderArt />
        </CardMedia>

        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {product.isFeatured && (
            <Chip label="Хит продаж" size="small" color="secondary" sx={{ alignSelf: 'flex-start' }} />
          )}
          <Typography variant="h6">{product.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
            <Typography variant="h6" color="primary.main">
              {product.effectivePrice} MDL
            </Typography>
            {hasDiscount && (
              <Typography variant="body2" sx={{ textDecoration: 'line-through' }} color="text.disabled">
                {product.price} MDL
              </Typography>
            )}
          </Box>
        </CardContent>
      </CardActionArea>

      <Box sx={{ p: 2, pt: 0 }}>
        <Button variant="contained" color="primary" fullWidth onClick={() => dispatch(addToCart(product))}>
          В корзину
        </Button>
      </Box>
    </Card>
  );
}