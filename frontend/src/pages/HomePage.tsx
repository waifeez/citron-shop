import { Container, Box, Typography, Button, Grid, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import { useAppSelector } from '../store/hooks';
import { ProductCard } from '../components/ProductCard';

function GiftIllustration() {
  return (
    <Box sx={{ width: '100%', maxWidth: 380, mx: 'auto' }}>
      <svg viewBox="0 0 260 240" width="100%" height="100%" fill="none">
        <path d="M20 40 L240 40 L230 75 L30 75 Z" fill="#F5D800" stroke="#153726" strokeWidth="4" strokeLinejoin="round" />
        <path d="M20 40 L74 40 L69 75 L30 75 Z" fill="#FFFFFF" stroke="#153726" strokeWidth="4" strokeLinejoin="round" />
        <path d="M128 40 L182 40 L179 75 L131 75 Z" fill="#FFFFFF" stroke="#153726" strokeWidth="4" strokeLinejoin="round" />

        <rect x="35" y="75" width="190" height="115" rx="8" fill="#FFFFFF" stroke="#153726" strokeWidth="4" />

        <rect x="95" y="115" width="70" height="55" rx="4" fill="#F5D800" stroke="#153726" strokeWidth="4" />
        <rect x="95" y="115" width="70" height="16" fill="#1E7A4C" stroke="#153726" strokeWidth="4" />
        <rect x="124" y="100" width="12" height="70" fill="#1E7A4C" stroke="#153726" strokeWidth="3" />
        <path d="M130 100c-14-10-30-6-26 6 3 8 18 6 26-6Z" fill="#1E7A4C" stroke="#153726" strokeWidth="3" />
        <path d="M130 100c14-10 30-6 26 6-3 8-18 6-26-6Z" fill="#1E7A4C" stroke="#153726" strokeWidth="3" />

        <path
          d="M188 150 L212 190 L217 172 L235 168 Z"
          fill="#1E7A4C"
          stroke="#153726"
          strokeWidth="4"
          strokeLinejoin="round"
        />

        <rect x="110" y="190" width="40" height="14" fill="#FFFFFF" stroke="#153726" strokeWidth="4" />
        <rect x="90" y="204" width="80" height="10" rx="4" fill="#F5D800" stroke="#153726" strokeWidth="4" />
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
        <Grid container spacing={6} sx={{ alignItems: 'center' }}>
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
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
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
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
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
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
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