'use client';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { useAuth } from '@/contexts/AuthContext';
import { SAH_COLORS } from '@/theme/theme';
import LogoutIcon from '@mui/icons-material/Logout';

const ROLE_LABEL: Record<string, string> = {
  tecnico:  'Técnico · DECAN',
  consulta: 'Consulta · Leitura',
};

export default function Topbar({ subtitle }: { subtitle?: string }) {
  const { user, logout } = useAuth();

  return (
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: SAH_COLORS.verde, height: 56, zIndex: (t) => t.zIndex.drawer + 1 }}>
      <Toolbar sx={{ minHeight: '56px !important', px: '28px !important', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1 }}>
          <Box sx={{ width: 32, height: 32, bgcolor: SAH_COLORS.amarelo, borderRadius: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', fontSize: 13, fontWeight: 700, color: SAH_COLORS.verde }}>
            MS
          </Box>
          <Box>
            <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>
              SAH{subtitle ? ` · ${subtitle}` : ''}
            </Typography>
            <Typography sx={{ fontSize: 10, color: 'rgba(255,255,255,.5)', textTransform: 'uppercase', letterSpacing: '.05em' }}>
              Acompanhamento de Habilitações
            </Typography>
          </Box>
        </Box>

        {user && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Avatar sx={{ width: 30, height: 30, bgcolor: 'rgba(255,255,255,.2)', fontSize: 12, fontWeight: 700, color: '#fff' }}>
              {user.initials}
            </Avatar>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Typography sx={{ fontSize: 12, color: 'rgba(255,255,255,.9)', fontWeight: 600, lineHeight: 1.2 }}>{user.name}</Typography>
              <Typography sx={{ fontSize: 10, color: 'rgba(255,255,255,.45)', textTransform: 'uppercase', letterSpacing: '.06em' }}>
                {ROLE_LABEL[user.role] ?? user.role}
              </Typography>
            </Box>
          </Box>
        )}

        <Button
          onClick={logout}
          size="small"
          startIcon={<LogoutIcon sx={{ fontSize: '14px !important' }} />}
          sx={{ bgcolor: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.2)', color: 'rgba(255,255,255,.7)', fontSize: 11, px: 1.5, py: 0.625, '&:hover': { bgcolor: 'rgba(255,255,255,.18)', color: '#fff' } }}
        >
          Sair
        </Button>
      </Toolbar>
    </AppBar>
  );
}
