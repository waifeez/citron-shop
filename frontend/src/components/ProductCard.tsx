import { Card, CardContent, CardMedia, Typography, Button, Box, Chip } from '@mui/material';
import type { Product } from '../types';
import { useAppDispatch } from '../store/hooks';
import { addToCart } from '../store/slices/cartSlice';

export function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const hasDiscount = product.discountPrice && product.discountPrice < product.price;

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        sx={{
          height: 160,
          bgcolor: 'grey.100',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Typography color="text.disabled">Фото товара</Typography>
      </CardMedia>

      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
        {product.isFeatured && <Chip label="Хит продаж" size="small" color="primary" sx={{ alignSelf: 'flex-start' }} />}

        <Typography variant="h6">{product.name}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
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

        <Button variant="contained" fullWidth onClick={() => dispatch(addToCart(product))}>
          В корзину
        </Button>
      </CardContent>
    </Card>
  );
}