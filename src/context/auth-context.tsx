import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { iUser } from '@/types/iUser';
import Swal from 'sweetalert2';
import registerRequest, { loginRequest } from '@/api/auth/auth-api';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  register: (user: iUser) => void;
  logout: () => void;
  user: iUser;
  setUser: (user: iUser) => void;
  token: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string>('');
  const [user, setUser] = useState<iUser>({});
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsAuthenticated(true);
  }, []);

  const login = async (email: string, password: string) => {
    const response = await loginRequest(email, password);
    const { success, message } = response;
    if (success) {
      setIsAuthenticated(true);
      setToken(message?.token);
      setUser(message?.user);
      router.push('/notes');
    } else {
      Swal.fire({
        title: 'Error!',
        text:
          typeof message === 'string'
            ? message
            : 'Error on login, try again later!',
        icon: 'error',
        confirmButtonText: 'Try again!',
      });
    }
  };

  const register = async (user: iUser) => {
    const response = await registerRequest(user);
    const { success, message } = response;
    if (success) {
      setIsAuthenticated(true);
      Swal.fire({
        text: typeof message === 'string' ? message : 'Succesfully registered!',
        icon: 'success',
        confirmButtonText: 'Cool!',
      });
      router.push('/login');
    } else {
      Swal.fire({
        title: 'Error!',
        text:
          typeof message === 'string'
            ? message
            : 'Error on registration, try again later!',
        icon: 'error',
        confirmButtonText: 'Try again!',
      });
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    router.push('/login');
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, register, token, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
