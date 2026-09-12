import { Container, Box, Typography, Button, Grid, Stack, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import { useAppSelector } from '../store/hooks';
import { ProductCard } from '../components/ProductCard';
import { LemonLogo } from '../components/LemonLogo';
import { ProductSilhouettes } from '../components/ProductSilhouettes';

function FeatureBadgeIcon({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        width: 56,
        height: 56,
        borderRadius: '50%',
        bgcolor: 'rgba(245,216,0,0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}
    >
      {children}
    </Box>
  );
}

function HeroAndFeatures() {
  return (
    <Box sx={{ position: 'relative', bgcolor: '#123420', overflow: 'hidden' }}>
      <ProductSilhouettes />

      <Container sx={{ position: 'relative', pt: { xs: 10, md: 16 }, pb: { xs: 8, md: 12 }, textAlign: 'center' }}>
        <Stack direction="row" spacing={1} sx={{ justifyContent: 'center', mb: 2 }}>
          <Typography sx={{ color: 'rgba(255,255,255,0.55)', fontSize: 11, letterSpacing: '0.06em' }}>
            MOLDOVA
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.25)' }}>|</Typography>
          <Typography sx={{ color: 'secondary.main', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em' }}>
            CHISINAU
          </Typography>
        </Stack>

        <Box sx={{ mb: 1.5 }}>
          <LemonLogo size={64} />
        </Box>

        <Typography variant="h2" sx={{ color: '#fff', fontSize: { xs: 40, md: 56 }, mb: 3 }}>
          Citron
        </Typography>

        <Stack direction="row" spacing={1.5} sx={{ justifyContent: 'center', flexWrap: 'wrap', mb: 4, rowGap: 1.5 }}>
          <Button component={RouterLink} to="/catalog" variant="contained" color="secondary" size="large">
            Смотреть каталог
          </Button>
          <Button
            component={RouterLink}
            to="/catalog"
            variant="outlined"
            size="large"
            sx={{ color: '#fff', borderColor: 'rgba(255,255,255,0.35)', '&:hover': { borderColor: '#fff' } }}
          >
            Подарочные наборы
          </Button>
        </Stack>

        <Stack direction="row" spacing={4} sx={{ justifyContent: 'center', flexWrap: 'wrap', rowGap: 2, mb: { xs: 6, md: 9 } }}>
          <Box>
            <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: 11 }}>Игрушки</Typography>
            <Typography sx={{ color: '#fff', fontSize: 13, fontWeight: 600 }}>120+ товаров</Typography>
          </Box>
          <Box>
            <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: 11 }}>Антистресс</Typography>
            <Typography sx={{ color: '#fff', fontSize: 13, fontWeight: 600 }}>40+ товаров</Typography>
          </Box>
          <Box>
            <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: 11 }}>Аксессуары</Typography>
            <Typography sx={{ color: '#fff', fontSize: 13, fontWeight: 600 }}>80+ товаров</Typography>
          </Box>
          <Box>
            <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: 11 }}>Доставка</Typography>
            <Typography sx={{ color: '#fff', fontSize: 13, fontWeight: 600 }}>от 500 MDL</Typography>
          </Box>
        </Stack>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.13)', mb: { xs: 6, md: 8 } }} />

        <Grid container spacing={5}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Stack spacing={2} sx={{ alignItems: 'center' }}>
              <FeatureBadgeIcon>
                <CardGiftcardOutlinedIcon sx={{ color: 'secondary.main' }} fontSize="large" />
              </FeatureBadgeIcon>
              <Box>
                <Typography sx={{ fontWeight: 600, color: '#fff', mb: 0.5 }}>Подарочная упаковка</Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                  На любой товар — бесплатно
                </Typography>
              </Box>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Stack spacing={2} sx={{ alignItems: 'center' }}>
              <FeatureBadgeIcon>
                <LocalShippingOutlinedIcon sx={{ color: 'secondary.main' }} fontSize="large" />
              </FeatureBadgeIcon>
              <Box>
                <Typography sx={{ fontWeight: 600, color: '#fff', mb: 0.5 }}>Быстрая доставка</Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                  По Кишинёву — за 1 день
                </Typography>
              </Box>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Stack spacing={2} sx={{ alignItems: 'center' }}>
              <FeatureBadgeIcon>
                <VerifiedOutlinedIcon sx={{ color: 'secondary.main' }} fontSize="large" />
              </FeatureBadgeIcon>
              <Box>
                <Typography sx={{ fontWeight: 600, color: '#fff', mb: 0.5 }}>Гарантия качества</Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                  Возврат в течение 14 дней
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export function HomePage() {
  const featured = useAppSelector((s) =>
    s.products.items.filter((p) => p.isActive && p.isFeatured).slice(0, 3)
  );

  return (
    <Box>
      <HeroAndFeatures />

      {featured.length > 0 && (
        <>
          <Box sx={{ borderTop: '3px dashed rgba(18,52,32,0.15)' }} />
          <Container sx={{ py: { xs: 6, md: 10 } }}>
            <Typography
              sx={{ color: 'primary.main', fontWeight: 700, fontSize: 12, letterSpacing: '0.08em', mb: 1 }}
            >
              ВЫБОР ПОКУПАТЕЛЕЙ
            </Typography>
            <Typography variant="h4" sx={{ mb: 4 }}>
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
        </>
      )}
    </Box>
  );
}