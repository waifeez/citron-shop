import { Box, Container, Typography } from '@mui/material';
import { ProductSilhouettes } from './ProductSilhouettes';

export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <Box sx={{ position: 'relative', bgcolor: '#123420', overflow: 'hidden', py: { xs: 5, md: 7 } }}>
      <ProductSilhouettes />
      <Container sx={{ position: 'relative', textAlign: 'center' }}>
        <Typography variant="h3" sx={{ color: '#fff', fontSize: { xs: 30, md: 40 } }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography sx={{ color: 'rgba(255,255,255,0.65)', mt: 1 }}>{subtitle}</Typography>
        )}
      </Container>
    </Box>
  );
}