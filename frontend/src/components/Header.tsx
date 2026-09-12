import { AppBar, Toolbar, Container, Box, Typography, Button, Stack, Badge, IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutlineOutlined';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { logout } from '../store/slices/authSlice';
import { LemonLogo } from './LemonLogo';

function Logo() {
  return (
    <Stack direction="row" spacing={1.2} sx={{ alignItems: 'center' }}>
      <LemonLogo size={32} />
      <Typography variant="h6" sx={{ fontFamily: "'Fraunces', serif", fontWeight: 700, color: '#FFFFFF' }}>
        Citron
      </Typography>
    </Stack>
  );
}

export function Header() {
  const { user } = useAppSelector((s) => s.auth);
  const cartCount = useAppSelector((s) => s.cart.data.itemCount);
  const dispatch = useAppDispatch();

  return (
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: '#123420', boxShadow: 'none' }}>
      <Container>
        <Toolbar disableGutters sx={{ gap: 3, py: 0.5 }}>
          <Box component={RouterLink} to="/" sx={{ textDecoration: 'none' }}>
            <Logo />
          </Box>

          <Stack direction="row" spacing={1} sx={{ ml: 2, flexGrow: 1 }}>
            <Button
              component={RouterLink}
              to="/catalog"
              sx={{ color: '#FFFFFF', fontWeight: 600, '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
            >
              Каталог
            </Button>
            {user?.roles.includes('Admin') && (
              <>
                <Button
                  component={RouterLink}
                  to="/admin/products"
                  sx={{ color: '#FFFFFF', fontWeight: 600, '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
                >
                  Админка
                </Button>
                <Button
                  component={RouterLink}
                  to="/admin/orders"
                  sx={{ color: '#FFFFFF', fontWeight: 600, '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
                >
                  Заказы
                </Button>
              </>
            )}
          </Stack>

          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            {user ? (
              <>
                <Button
                  component={RouterLink}
                  to="/profile"
                  startIcon={<PersonOutlineIcon />}
                  sx={{ color: '#FFFFFF', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
                >
                  {user.fullName.split(' ')[0]}
                </Button>
                <Button
                  onClick={() => dispatch(logout())}
                  size="small"
                  sx={{ color: 'rgba(255,255,255,0.75)', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
                >
                  Выйти
                </Button>
              </>
            ) : (
              <Button
                component={RouterLink}
                to="/login"
                startIcon={<PersonOutlineIcon />}
                sx={{ color: '#FFFFFF', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
              >
                Войти
              </Button>
            )}

            <IconButton component={RouterLink} to="/cart">
              <Badge badgeContent={cartCount} color="secondary">
                <ShoppingBagOutlinedIcon sx={{ color: '#FFFFFF' }} />
              </Badge>
            </IconButton>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}