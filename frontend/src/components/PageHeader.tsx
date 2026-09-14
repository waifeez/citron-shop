import { Box, Container, Typography } from '@mui/material';
import { ProductSilhouettes } from './ProductSilhouettes';

export function PageHeader({
  title,
  subtitle,
  compact = false
}: {
  title: string;
  subtitle?: string;
  compact?: boolean;
}) {
  return (
    <Box sx={{ position: 'relative', bgcolor: '#123420', overflow: 'hidden', py: compact ? { xs: 3.5, md: 4.5 } : { xs: 5, md: 7 } }}>
      <ProductSilhouettes />
      <Container sx={{ position: 'relative', textAlign: 'center' }}>
        <Typography variant="h3" sx={{ color: '#fff', fontSize: compact ? { xs: 24, md: 30 } : { xs: 30, md: 40 } }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography sx={{ color: 'rgba(255,255,255,0.65)', mt: 1, fontSize: compact ? 13 : 14 }}>
            {subtitle}
          </Typography>
        )}
      </Container>
    </Box>
  );
}