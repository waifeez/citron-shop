import { Box, Container, Grid, Typography, Stack } from '@mui/material';

export function Footer() {
  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'white', mt: 8, py: 6 }}>
      <Container>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant="h6" sx={{ fontFamily: "'Fraunces', serif", mb: 1, color: '#F5D800' }}>
              Citron
            </Typography>
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