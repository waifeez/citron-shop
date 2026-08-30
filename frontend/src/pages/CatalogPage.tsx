import { Container, Grid, Typography } from '@mui/material';
import { ProductCard } from '../components/ProductCard';
import { useAppSelector } from '../store/hooks';

export function CatalogPage() {
  const products = useAppSelector((s) => s.products.items.filter((p) => p.isActive));

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        Каталог товаров
      </Typography>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}