import { AppBar, Toolbar, Container, Box, Typography, Button, Stack, Badge, IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutlineOutlined';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { logout } from '../store/slices/authSlice';

function Logo() {
  return (
    <Stack direction="row" spacing={1.2} alignItems="center">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        {/* Лимон: овальное тело с двумя лёгкими "носиками" по краям и листиком сверху */}
        <ellipse cx="16" cy="17" rx="12" ry="9.5" fill="#E8735A" />
        <path d="M4 17c0-1 1-1.6 2.2-1.2 1 .4 1 2 0 2.4C5 18.6 4 18 4 17Z" fill="#E8735A" />
        <path d="M28 17c0-1-1-1.6-2.2-1.2-1 .4-1 2 0 2.4 1.2.4 2.2-.2 2.2-1.2Z" fill="#E8735A" />
        <path
          d="M17 8c1-3 4-4.5 6.5-3.7-1 2.3-3.6 4-6.5 3.7Z"
          fill="#1F4D36"
        />
      </svg>
      <Typography
        variant="h6"
        sx={{ fontFamily: "'Fraunces', serif", fontWeight: 600, color: '#FFFFFF' }}
      >
        Citron
      </Typography>
    </Stack>
  );
}

export function Header() {
  const { user } = useAppSelector((s) => s.auth);
  const cartCount = useAppSelector((s) => s.cart.lines.reduce((sum, l) => sum + l.quantity, 0));
  const dispatch = useAppDispatch();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{ bgcolor: 'primary.main' }}
    >
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
              <Button
                component={RouterLink}
                to="/admin/products"
                sx={{ color: '#FFFFFF', fontWeight: 600, '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
              >
                Админка
              </Button>
            )}
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
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