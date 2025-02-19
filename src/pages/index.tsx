import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/auth-context';

export default function Home() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/notes');
    } else {
      router.replace('/login');
    }
  }, [isAuthenticated, router]);

  return null;
}
