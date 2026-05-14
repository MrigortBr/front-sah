import { jwtDecode } from 'jwt-decode';
import type { AuthTokenPayload, AuthUser, LoginCredentials } from '@/types';

const TOKEN_KEY = 'sah_token';

function buildMockJwt(payload: Omit<AuthTokenPayload, 'iat' | 'exp'>): string {
  const header    = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body      = btoa(JSON.stringify({ ...payload, iat: Date.now() / 1000, exp: Date.now() / 1000 + 86400 }));
  return `${header}.${body}.mock_signature`;
}

export async function login(credentials: LoginCredentials): Promise<void> {
  /* TODO: swap mock for real call
   * const res = await api.post<{ token: string }>('/login', credentials);
   * saveToken(res.data.token);
   */
  await new Promise((r) => setTimeout(r, 1000));
  saveToken(buildMockJwt({ sub: '1', name: 'Tayana Pinheiro', email: credentials.email, role: 'tecnico' }));
}

export function logout(): void {
  if (typeof window !== 'undefined') localStorage.removeItem(TOKEN_KEY);
}

export function saveToken(token: string): void {
  if (typeof window !== 'undefined') localStorage.setItem(TOKEN_KEY, token);
}

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function isAuthenticated(): boolean {
  const token = getToken();
  if (!token) return false;
  try {
    const { exp } = jwtDecode<AuthTokenPayload>(token);
    return exp * 1000 > Date.now();
  } catch { return false; }
}

export function getUserFromToken(): AuthUser | null {
  const token = getToken();
  if (!token) return null;
  try {
    const p = jwtDecode<AuthTokenPayload>(token);
    return { name: p.name, email: p.email, role: p.role, initials: p.name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('') };
  } catch { return null; }
}
