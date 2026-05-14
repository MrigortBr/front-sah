'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function RootPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace(isAuthenticated() ? '/home' : '/login');
  }, [router]);
  return (
    <Box display="flex" alignItems="center" justifyContent="center" minHeight="100vh">
      <CircularProgress color="primary" />
    </Box>
  );
}
