import { useState } from 'react';
import { Box, Button, Container, TextField, Typography, Alert, Link as MuiLink } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { setCredentials } from '../store/slices/authSlice';

export function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !password) {
      setError('Заполни все поля');
      return;
    }
    if (password.length < 6) {
      setError('Пароль должен быть не короче 6 символов');
      return;
    }

    dispatch(
      setCredentials({
        user: { id: '1', fullName, email, roles: ['Customer'] },
        token: 'fake-jwt-token'
      })
    );
    navigate('/');
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
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
        <Button type="submit" variant="contained" size="large">
          Зарегистрироваться
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