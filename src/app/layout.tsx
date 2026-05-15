import type { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme/theme';
import { AuthProvider } from '@/contexts/AuthContext';
import ThemeRegistry from "@/providers/ThemeRegistry";

export const metadata: Metadata = {
  title: 'SAH — Sistema de Acompanhamento de Habilitações',
  description: 'Gestão e monitoramento das habilitações oncológicas no SUS',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap" />
      </head>
      <body>
        <AppRouterCacheProvider>
          <ThemeRegistry>
            <AuthProvider>
              {children}
            </AuthProvider>
          </ThemeRegistry>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
