import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useState } from 'react';
import style from '../../styles/login/login.module.css';
import { useAuth } from '@/context/auth-context';
import { iUser } from '@/types/iUser';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { INITIAL_USER_STATE } from '@/constants/reset-states';
import Swal from 'sweetalert2';

export default function Login() {
  const { register } = useAuth();
  const [user, setUser] = useState<iUser>(INITIAL_USER_STATE);
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [passwordsMatch, setPasswordsMatch] = useState<boolean | null>(null);

  const handleRegister = () => {
    if (user.firstName && user.lastName && user.email && user.password) {
      register(user);
    } else {
      Swal.fire({ text: 'Please, all the fields are required to be filled.' });
    }
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const confirmPass = e.target.value;
    setConfirmPassword(confirmPass);
    setPasswordsMatch(user.password === confirmPass);
  };

  const isFormValid =
    user.firstName &&
    user.lastName &&
    user.email &&
    user.password &&
    user.password === confirmPassword;

  return (
    <section className={style.container}>
      <Container
        maxWidth="xs"
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <Typography variant="h5" align="center">
          Register
        </Typography>
        <TextField
          label="First name"
          variant="outlined"
          required
          fullWidth
          value={user.firstName}
          onChange={(e) => setUser({ ...user, firstName: e.target.value })}
        />
        <TextField
          label="Last name"
          variant="outlined"
          required
          fullWidth
          value={user.lastName}
          onChange={(e) => setUser({ ...user, lastName: e.target.value })}
        />
        <TextField
          label="Email"
          variant="outlined"
          required
          fullWidth
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <TextField
          label="Password"
          type="password"
          required
          variant="outlined"
          fullWidth
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: { sm: 'row' },
          }}
        >
          <TextField
            label="Confirm password"
            type="password"
            required
            variant="outlined"
            fullWidth
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          {confirmPassword && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {passwordsMatch ? (
                <CheckIcon color="success" />
              ) : (
                <CloseIcon color="error" />
              )}
            </div>
          )}
        </Box>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleRegister}
          disabled={!isFormValid}
        >
          Create
        </Button>
      </Container>
    </section>
  );
}
