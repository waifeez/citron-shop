import { Container, Box, Typography, Button, Grid, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import { useAppSelector } from '../store/hooks';
import { ProductCard } from '../components/ProductCard';

function GiftIllustration() {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 360,
        aspectRatio: '1 / 1',
        mx: 'auto',
        position: 'relative'
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          bgcolor: 'primary.main',
          opacity: 0.08
        }}
      />
      <svg viewBox="0 0 240 240" width="100%" height="100%" style={{ position: 'relative' }}>
        <rect x="40" y="110" width="160" height="100" rx="10" fill="#1F4D36" />
        <rect x="40" y="110" width="160" height="30" fill="#153726" />
        <rect x="108" y="60" width="24" height="150" fill="#E8735A" />
        <rect x="40" y="130" width="160" height="20" fill="#E8735A" />
        <path
          d="M120 65 C95 40, 60 45, 65 70 C68 88, 100 85, 120 65 Z"
          fill="#E8735A"
        />
        <path
          d="M120 65 C145 40, 180 45, 175 70 C172 88, 140 85, 120 65 Z"
          fill="#E8735A"
        />
        <circle cx="120" cy="66" r="9" fill="#153726" />
      </svg>
    </Box>
  );
}

export function HomePage() {
  const featured = useAppSelector((s) =>
    s.products.items.filter((p) => p.isActive && p.isFeatured).slice(0, 3)
  );

  return (
    <Box>
      <Container sx={{ py: { xs: 6, md: 10 } }}>
        <Grid container spacing={6} alignItems="center">
          <Grid size={{ xs: 12, md: 7 }}>
            <Typography variant="h2" sx={{ mb: 2, lineHeight: 1.15 }}>
              Подарки, которые
              <br />
              запоминаются
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4, fontWeight: 400, maxWidth: 480 }}>
              Игрушки, аксессуары и подарки для любого повода — с бережной упаковкой
              и доставкой по всей Молдове.
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button component={RouterLink} to="/catalog" variant="contained" size="large">
                Смотреть каталог
              </Button>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <GiftIllustration />
          </Grid>
        </Grid>
      </Container>

      <Container sx={{ pb: { xs: 6, md: 8 } }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <CardGiftcardOutlinedIcon color="primary" fontSize="large" />
              <Box>
                <Typography sx={{ fontWeight: 600 }}>Подарочная упаковка</Typography>
                <Typography variant="body2" color="text.secondary">
                  На любой товар — бесплатно
                </Typography>
              </Box>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <LocalShippingOutlinedIcon color="primary" fontSize="large" />
              <Box>
                <Typography sx={{ fontWeight: 600 }}>Быстрая доставка</Typography>
                <Typography variant="body2" color="text.secondary">
                  По Кишинёву — за 1 день
                </Typography>
              </Box>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <VerifiedOutlinedIcon color="primary" fontSize="large" />
              <Box>
                <Typography sx={{ fontWeight: 600 }}>Гарантия качества</Typography>
                <Typography variant="body2" color="text.secondary">
                  Возврат в течение 14 дней
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      {featured.length > 0 && (
        <Container sx={{ pb: { xs: 6, md: 10 } }}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Хиты продаж
          </Typography>
          <Grid container spacing={3}>
            {featured.map((product) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
    </Box>
  );
}