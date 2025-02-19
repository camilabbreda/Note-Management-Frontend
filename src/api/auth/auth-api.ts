import { iUser } from '@/types/iUser';
import axios, { AxiosError } from 'axios';

export default async function registerRequest(body: iUser) {
  try {
    const response = await axios.post('/api/noteManagement/user', body, {
      params: {
        route: '/register',
      },
    });
    return response.data;
  } catch (error) {
    return (
      (
        (error as AxiosError).response?.data as {
          message: unknown;
          success: boolean;
        }
      )?.message ?? {
        success: false,
        message: 'An error occured, try again later.',
      }
    );
  }
}

export async function loginRequest(email: string, password: string) {
  try {
    const response = await axios.post(
      '/api/noteManagement/user',
      { email, password },
      {
        params: {
          route: '/login',
        },
      }
    );
    return response.data;
  } catch (error) {
    return (
      (
        (error as AxiosError).response?.data as {
          message: unknown;
          success: boolean;
        }
      )?.message ?? {
        success: false,
        message: 'An error occured, try again later.',
      }
    );
  }
}
