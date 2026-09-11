import { Box, Container, Grid, Typography, Stack } from '@mui/material';
import { LemonLogo } from './LemonLogo';
import { ProductSilhouettes } from './ProductSilhouettes';

export function Footer() {
  return (
    <Box sx={{ position: 'relative', bgcolor: '#123420', color: 'white', mt: 8, py: 7, overflow: 'hidden' }}>
      <ProductSilhouettes />

      <Container sx={{ position: 'relative' }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 1 }}>
              <LemonLogo size={26} />
              <Typography variant="h6" sx={{ fontFamily: "'Fraunces', serif", color: '#F5D800' }}>
                Citron
              </Typography>
            </Stack>
            <Typography variant="body2" sx={{ opacity: 0.85 }}>
              Подарки, игрушки и аксессуары в Кишинёве.
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography sx={{ fontWeight: 600, mb: 1 }}>Покупателям</Typography>
            <Stack spacing={0.5}>
              <Typography variant="body2" sx={{ opacity: 0.85 }}>
                Доставка и оплата
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.85 }}>
                Возврат товара
              </Typography>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography sx={{ fontWeight: 600, mb: 1 }}>Контакты</Typography>
            <Stack spacing={0.5}>
              <Typography variant="body2" sx={{ opacity: 0.85 }}>
                Кишинёв, Молдова
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.85 }}>
                +373 XX XXX XXX
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}