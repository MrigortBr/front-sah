'use client';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Topbar from '@/components/layout/Topbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import { SAH_COLORS } from '@/theme/theme';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const MODULES = [
  {
    href: '/habilitacoes', icon: <LocalHospitalOutlinedIcon sx={{ fontSize: 28 }} />,
    title: 'Habilitações Ativas', desc: 'Consulte e gerencie os estabelecimentos com habilitação oncológica vigente no SUS.',
    meta: '312 estabelecimentos ativos', color: SAH_COLORS.verdeMed, bgIcon: SAH_COLORS.verdeBg, shadow: 'rgba(27,94,59,.15)',
  },
  {
    href: '/propostas', icon: <AssignmentOutlinedIcon sx={{ fontSize: 28 }} />,
    title: 'Propostas SAIPS', desc: 'Acompanhe as propostas de habilitação em tramitação e cadastre novos pedidos.',
    meta: '28 propostas em andamento', color: SAH_COLORS.azul, bgIcon: SAH_COLORS.azulCla, shadow: 'rgba(21,101,192,.15)',
  },
];

function getGreeting(name: string) {
  const h = new Date().getHours();
  return `${h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite'}, ${name.split(' ')[0]} 👋`;
}

export default function HomePage() {
  const router   = useRouter();
  const { user } = useAuth();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Topbar />
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: '48px 24px', gap: 4 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" sx={{ mb: 0.75 }}>
            {user ? getGreeting(user.name) : 'Bem-vindo 👋'}
          </Typography>
          <Typography sx={{ fontSize: 14, color: SAH_COLORS.cinzaT }}>Selecione o módulo que deseja acessar</Typography>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '340px 340px' }, gap: 2.5 }}>
          {MODULES.map((mod) => (
            <Card key={mod.href} sx={{ border: `2px solid ${SAH_COLORS.cinzaB}`, borderRadius: 2, position: 'relative', transition: 'all .25s', '&:hover': { transform: 'translateY(-4px)', borderColor: mod.color, boxShadow: `0 12px 40px ${mod.shadow}` }, '&::before': { content: '""', position: 'absolute', top: 0, left: 0, right: 0, height: 4, borderRadius: '16px 16px 0 0', bgcolor: mod.color } }}>
              <CardActionArea onClick={() => router.push(mod.href)} sx={{ p: '32px 28px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}>
                <Box sx={{ width: 52, height: 52, borderRadius: 1.75, bgcolor: mod.bgIcon, display: 'flex', alignItems: 'center', justifyContent: 'center', color: mod.color }}>{mod.icon}</Box>
                <Box>
                  <Typography variant="h6" sx={{ mb: .75 }}>{mod.title}</Typography>
                  <Typography sx={{ fontSize: 13, color: SAH_COLORS.cinzaT, lineHeight: 1.6 }}>{mod.desc}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, fontSize: 12, fontWeight: 600, color: mod.color, mt: .5 }}>
                  {mod.meta}
                  <ArrowForwardIcon sx={{ fontSize: 16, opacity: .6, transition: 'all .2s', '.MuiCardActionArea-root:hover &': { opacity: 1, transform: 'translateX(4px)' } }} />
                </Box>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
