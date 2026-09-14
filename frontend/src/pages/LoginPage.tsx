import { useState, type FormEvent } from 'react';
import { Box, Button, Container, TextField, Typography, Alert, Link as MuiLink, Paper } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { setCredentials } from '../store/slices/authSlice';
import { fetchCart } from '../store/slices/cartSlice';
import { authApi } from '../api/authApi';
import { LemonLogo } from '../components/LemonLogo';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Заполни оба поля');
      return;
    }

    setLoading(true);
    try {
      const response = await authApi.login(email, password);
      dispatch(setCredentials({ user: response.user, token: response.token }));
      dispatch(fetchCart());
      navigate('/');
    } catch {
      setError('Неверный email или пароль');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ bgcolor: '#FBFCF8', minHeight: '70vh', display: 'flex', alignItems: 'center', py: 6 }}>
      <Container maxWidth="xs">
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <LemonLogo size={48} />
          <Typography variant="h4" sx={{ mt: 1.5 }}>
            С возвращением
          </Typography>
          <Typography color="text.secondary" sx={{ fontSize: 14 }}>
            Войди, чтобы продолжить покупки
          </Typography>
        </Box>

        <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
            <TextField
              label="Пароль"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
            <Button type="submit" variant="contained" size="large" disabled={loading}>
              {loading ? 'Входим...' : 'Войти'}
            </Button>

            <Typography variant="body2" sx={{ textAlign: 'center' }}>
              Нет аккаунта?{' '}
              <MuiLink component={RouterLink} to="/register">
                Зарегистрироваться
              </MuiLink>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}