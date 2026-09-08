import { useState, type FormEvent } from 'react';
import { Box, Button, Container, TextField, Typography, Alert, Link as MuiLink } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { setCredentials } from '../store/slices/authSlice';
import { fetchCart } from '../store/slices/cartSlice';
import { authApi } from '../api/authApi';

export function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName || !email || !password) {
      setError('Заполни все поля');
      return;
    }
    if (password.length < 6) {
      setError('Пароль должен быть не короче 6 символов');
      return;
    }

    setLoading(true);
    try {
      const response = await authApi.register(fullName, email, password);
      dispatch(setCredentials({ user: response.user, token: response.token }));
      dispatch(fetchCart());
      navigate('/');
    } catch (err: any) {
      setError(err?.response?.data?.message ?? 'Ошибка регистрации — возможно, email уже занят');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Регистрация
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="Имя" value={fullName} onChange={(e) => setFullName(e.target.value)} fullWidth />
        <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
        <TextField
          label="Пароль"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />
        <Button type="submit" variant="contained" size="large" disabled={loading}>
          {loading ? 'Регистрируем...' : 'Зарегистрироваться'}
        </Button>

        <Typography variant="body2" sx={{ textAlign: 'center' }}>
          Уже есть аккаунт?{' '}
          <MuiLink component={RouterLink} to="/login">
            Войти
          </MuiLink>
        </Typography>
      </Box>
    </Container>
  );
}