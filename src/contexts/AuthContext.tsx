'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { AuthUser, LoginCredentials } from '@/types';
import { getUserFromToken, isAuthenticated, login as authLogin, logout as authLogout } from '@/lib/auth';

interface AuthContextValue {
  user:    AuthUser | null;
  loading: boolean;
  login:   (credentials: LoginCredentials) => Promise<void>;
  logout:  () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user,    setUser]    = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated()) setUser(getUserFromToken());
    setLoading(false);
  }, []);

  async function login(credentials: LoginCredentials) {
    await authLogin(credentials);
    setUser(getUserFromToken());
    router.push('/home');
  }

  function logout() {
    authLogout();
    setUser(null);
    router.push('/login');
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
