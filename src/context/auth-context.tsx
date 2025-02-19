'use server';
import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { iUser } from '@/types/iUser';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import Swal from 'sweetalert2';
import registerRequest, { loginRequest } from '@/api/auth/auth-api';
import webserver from '@/server/web-servers';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  register: (user: iUser) => void;
  logout: () => void;
  user: iUser;
  setUser: (user: iUser) => void;
  token: string;
  setToken: (token: string) => void;
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
    if (token) {
      setIsAuthenticated(true);
    } else {
      const cookiesToken = Cookies.get('token');
      if (cookiesToken) {
        const decode = jwt.decode(cookiesToken) as jwt.JwtPayload;
        const userToken = decode?.data as iUser;
        if (userToken && userToken._id) {
          console.log('setei token');
          webserver.token = cookiesToken;
          setToken(cookiesToken);
          setUser(userToken);
        } else {
          Cookies.remove('token', { path: '/' });
          router.push('/login');
        }
      } else {
        router.push('/login');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await loginRequest(email, password);
    const { success, message } = response;
    if (success && message?.token) {
      setIsAuthenticated(true);
      setToken(message.token);
      setUser(message.user);
      Cookies.set('token', message.token, {
        expires: 1,
        path: '/',
        secure: process.env.ENVIRONMENT === 'PRD',
        sameSite: 'Strict',
      });
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
    setIsAuthenticated(false);
    setToken('');
    router.push('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        register,
        token,
        user,
        setUser,
        setToken,
      }}
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
