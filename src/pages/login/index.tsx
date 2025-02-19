'use client';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Link,
} from '@mui/material';
import { useState } from 'react';
import style from '../../styles/login/login.module.css';
import { useAuth } from '@/context/auth-context';

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const handleLogin = () => {
    login(email, password);
  };
  return (
    <section className={style.container}>
      <Container
        maxWidth="xs"
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <Typography variant="h5" align="center">
          Login
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
        >
          Login
        </Button>
        <Box textAlign="center">
          <Link href="/register" variant="body2">
            Don&apos;t have an account? Register
          </Link>
        </Box>
      </Container>
    </section>
  );
}
