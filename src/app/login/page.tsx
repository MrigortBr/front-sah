'use client';
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { SAH_COLORS } from '@/theme/theme';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Alert from '@mui/material/Alert';
import PersonOutlineIcon from "@mui/icons-material/PersonOutlineOutlined";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function LoginPage() {
  const { login } = useAuth();
  const [perfil,     setPerfil]     = useState<'tecnico' | 'consulta'>('tecnico');
  const [email,      setEmail]      = useState('');
  const [senha,      setSenha]      = useState('');
  const [showSenha,  setShowSenha]  = useState(false);
  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState('');
  const [emailError, setEmailError] = useState('');
  const [senhaError, setSenhaError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEmailError(''); setSenhaError(''); setError('');
    let ok = true;
    if (!email.trim()) { setEmailError('Informe seu e-mail institucional.'); ok = false; }
    if (!senha.trim()) { setSenhaError('Informe sua senha.');                ok = false; }
    if (!ok) return;
    setLoading(true);
    try {
      await login({ email, password: senha });
    } catch {
      setError('Credenciais inválidas. Verifique e tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 460px' } }}>
      {/* ── Left panel ─────────────────────── */}
      <Box sx={{ position: 'relative', background: SAH_COLORS.verde, display: { xs: 'none', md: 'flex' }, flexDirection: 'column', justifyContent: 'space-between', p: '48px 56px', overflow: 'hidden' }}>
        <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'radial-gradient(circle, rgba(255,255,255,.12) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 80% 60% at 10% 110%, rgba(255,205,0,.15) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 90% -10%, rgba(61,160,106,.25) 0%, transparent 55%)' }} />
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 7 }}>
            <Box sx={{ width: 44, height: 44, bgcolor: SAH_COLORS.amarelo, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 20, color: SAH_COLORS.verde, fontFamily: 'monospace' }}>MS</Box>
            <Box>
              <Typography sx={{ fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,.9)', lineHeight: 1.3 }}>Ministério da Saúde</Typography>
              <Typography sx={{ fontSize: 11, color: 'rgba(255,255,255,.55)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Departamento de Atenção Especializada</Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: 'rgba(255,205,0,.18)', border: '1px solid rgba(255,205,0,.35)', color: SAH_COLORS.amarelo, fontSize: 10, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', px: 1.5, py: 0.625, borderRadius: 20, mb: 3 }}>
            <Box component="span" sx={{ width: 6, height: 6, bgcolor: SAH_COLORS.amarelo, borderRadius: '50%', animation: 'pulse 2s ease-in-out infinite', '@keyframes pulse': { '0%,100%': { opacity: 1, transform: 'scale(1)' }, '50%': { opacity: .5, transform: 'scale(.8)' } } }} />
            Sistema em operação
          </Box>
          <Typography variant="h2" sx={{ color: '#fff', fontSize: 'clamp(28px,3vw,42px)', mb: 2 }}>
            SAH<br /><Box component="span" sx={{ color: SAH_COLORS.amarelo }}>Oncologia</Box>
          </Typography>
          <Typography sx={{ fontSize: 14, color: 'rgba(255,255,255,.6)', lineHeight: 1.75, maxWidth: 380, fontWeight: 300 }}>
            Sistema de Acompanhamento de Habilitações — gestão e monitoramento das habilitações oncológicas e novos serviços no SUS.
          </Typography>
        </Box>
        <Box sx={{ position: 'relative', zIndex: 1, pt: 5, borderTop: '1px solid rgba(255,255,255,.1)', display: 'flex', gap: 5 }}>
          {[{ num: '300+', label: 'Estabelecimentos' }, { num: '27', label: 'Unidades da Federação' }, { num: '43', label: 'Campos monitorados' }].map((s) => (
            <Box key={s.label}>
              <Typography sx={{ fontSize: 28, fontWeight: 700, color: '#fff', fontFamily: 'monospace', lineHeight: 1, mb: .5 }}>{s.num}</Typography>
              <Typography sx={{ fontSize: 11, color: 'rgba(255,255,255,.45)', textTransform: 'uppercase', letterSpacing: '.08em', fontWeight: 500 }}>{s.label}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* ── Right panel ────────────────────── */}
      <Paper elevation={0} square sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', p: { xs: '40px 32px', md: '56px 52px' }, position: 'relative', '&::before': { content: '""', position: 'absolute', top: 0, left: 0, width: 4, height: '100%', background: `linear-gradient(180deg, ${SAH_COLORS.amarelo}, ${SAH_COLORS.verdeCla})` } }}>
        <Typography sx={{ fontSize: 11, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: SAH_COLORS.verdeMed, mb: 1 }}>Acesso restrito</Typography>
        <Typography variant="h4" sx={{ mb: .75 }}>Entrar no sistema</Typography>
        <Typography sx={{ fontSize: 13, color: SAH_COLORS.cinzaT, mb: 4, lineHeight: 1.6 }}>Use seu login institucional para acessar o SAH.</Typography>

        <Typography sx={{ fontSize: 12, fontWeight: 600, mb: 1.25 }}>Perfil de acesso <Box component="span" sx={{ color: SAH_COLORS.erro }}>*</Box></Typography>
        <ToggleButtonGroup exclusive value={perfil} onChange={(_, v) => { if (v) setPerfil(v); }} sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.25, mb: 3.5 }}>
          {[{ value: 'tecnico', Icon: ScienceOutlinedIcon, label: 'Técnico', desc: 'DECAN / MS' }, { value: 'consulta', Icon: MenuBookOutlinedIcon, label: 'Consulta', desc: 'Somente leitura' }].map(({ value, Icon, label, desc }) => (
            <ToggleButton key={value} value={value} sx={{ borderRadius: '10px !important', border: `1.5px solid ${SAH_COLORS.cinzaB} !important`, bgcolor: SAH_COLORS.cinzaF, p: 2, textAlign: 'left', justifyContent: 'flex-start', gap: 1.5, '&.Mui-selected': { bgcolor: '#EAF4EF', border: `1.5px solid ${SAH_COLORS.verdeMed} !important`, boxShadow: '0 0 0 3px rgba(46,125,82,.1)' } }}>
              <Box sx={{ width: 38, height: 38, borderRadius: 2, bgcolor: perfil === value ? SAH_COLORS.verdeMed : SAH_COLORS.verde, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
                <Icon fontSize="small" />
              </Box>
              <Box>
                <Typography sx={{ fontSize: 13, fontWeight: 600, color: SAH_COLORS.texto }}>{label}</Typography>
                <Typography sx={{ fontSize: 11, color: SAH_COLORS.cinzaT }}>{desc}</Typography>
              </Box>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          {error && <Alert severity="error" sx={{ mb: 2, fontSize: 13 }}>{error}</Alert>}
          <TextField fullWidth label="E-mail" type="email" placeholder="usuario@saude.gov.br" value={email} onChange={(e) => setEmail(e.target.value)} error={!!emailError} helperText={emailError} sx={{ mb: 2.5 }}
            slotProps={{ input: { startAdornment: <InputAdornment position="start"><PersonOutlineIcon sx={{ color: SAH_COLORS.cinzaT, fontSize: 18 }} /></InputAdornment> } }}
          />
          <TextField fullWidth label="Senha" type={showSenha ? 'text' : 'password'} placeholder="••••••••" value={senha} onChange={(e) => setSenha(e.target.value)} error={!!senhaError} helperText={senhaError} sx={{ mb: 0.5 }}
            slotProps={{ input: { startAdornment: <InputAdornment position="start"><LockOutlinedIcon sx={{ color: SAH_COLORS.cinzaT, fontSize: 18 }} /></InputAdornment>, endAdornment: <InputAdornment position="end"><IconButton size="small" onClick={() => setShowSenha((v) => !v)} edge="end">{showSenha ? <VisibilityOffOutlinedIcon fontSize="small" /> : <VisibilityOutlinedIcon fontSize="small" />}</IconButton></InputAdornment> } }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
            <Typography component="a" href="#" sx={{ fontSize: 12, color: SAH_COLORS.verdeMed, fontWeight: 500, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Esqueceu a senha?</Typography>
          </Box>
          <Button type="submit" variant="contained" fullWidth disabled={loading} endIcon={loading ? <CircularProgress size={16} color="inherit" /> : <ArrowForwardIcon />} sx={{ py: 1.75, fontSize: 14 }}>
            {loading ? 'Entrando…' : 'Entrar no sistema'}
          </Button>
        </Box>

        <Box sx={{ mt: 3.5, pt: 2.25, borderTop: `1px solid ${SAH_COLORS.cinzaB}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography sx={{ fontSize: 10, color: '#b0bdb4', fontFamily: 'monospace' }}>SAH v2.0 · 2025</Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {['Suporte', 'Manual', 'Privacidade'].map((l) => (
              <Typography key={l} component="a" href="#" sx={{ fontSize: 11, color: SAH_COLORS.cinzaT, textDecoration: 'none', '&:hover': { color: SAH_COLORS.verde } }}>{l}</Typography>
            ))}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
