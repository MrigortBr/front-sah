'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Topbar from '@/components/layout/Topbar';
import { useFormData } from '@/contexts/FormDataContext';
import { SAH_COLORS } from '@/theme/theme';
import type { SituacaoId } from '@/types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Skeleton from '@mui/material/Skeleton';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import PersonOutlineIcon from "@mui/icons-material/PersonOutlineOutlined";

// ── Static situações ──────────────────────────────────────────
const SITUACOES = [
  { id: 'todas' as SituacaoId,             label: 'Todas',               count: undefined, color: undefined },
  { id: 'em_analise' as SituacaoId,        label: 'Em análise',          count: 9,  color: '#F57F17' },
  { id: 'no_drac' as SituacaoId,           label: 'Enviada ao DRAC',     count: 7,  color: SAH_COLORS.azul },
  { id: 'em_diligencia' as SituacaoId,     label: 'Em diligência',       count: 4,  color: SAH_COLORS.laranja },
  { id: 'aprovada' as SituacaoId,          label: 'Aprovadas',           count: 5,  color: SAH_COLORS.verdeCla },
  { id: 'portaria_publicada' as SituacaoId,label: 'Portaria Publicada',  count: 3,  color: SAH_COLORS.roxo },
];

// ── KPI config ────────────────────────────────────────────────
const KPIS = [
  { label: 'Em Análise',    value: 9,  delta: '3 aguardando +30 dias', warn: true,  accentColor: SAH_COLORS.amarelo },
  { label: 'No DRAC',       value: 7,  delta: 'aguardando retorno',    warn: false, accentColor: SAH_COLORS.azul },
  { label: 'Em Diligência', value: 4,  delta: 'prazo próximo do venc.', warn: true, accentColor: SAH_COLORS.laranja },
  { label: 'Aprovadas 2025',value: 8,  delta: '↑ 2 vs. mesmo período', warn: false, accentColor: SAH_COLORS.verdeCla },
];

// ── Mock proposals ────────────────────────────────────────────
const MOCK_PROPOSTAS = [
  { id: 1, cnes: '2077531', nome: 'A C Camargo Cancer Center',           uf: 'SP', municipio: 'São Paulo',   hab: 'CACON c/ Onco Ped.', situacao: 'aprovada' as SituacaoId,      tecnico: 'Igor Lins',        entrada: '15/01/2025' },
  { id: 2, cnes: '2084163', nome: 'Hospital Estadual de Diadema',        uf: 'SP', municipio: 'Diadema',     hab: 'Hosp. Geral Onco',   situacao: 'em_analise' as SituacaoId,    tecnico: 'Igor Lins',        entrada: '03/02/2025' },
  { id: 3, cnes: '2600536', nome: 'Hospital Regional de Araguaína',      uf: 'TO', municipio: 'Araguaína',   hab: 'UNACON c/ Radio',    situacao: 'em_diligencia' as SituacaoId, tecnico: 'Igor Lins',        entrada: '17/01/2025' },
  { id: 4, cnes: '2058790', nome: 'Hosp. Municipal Dr. Waldemar Tebaldi',uf: 'SP', municipio: 'Americana',   hab: 'UNACON',             situacao: 'no_drac' as SituacaoId,       tecnico: 'Igor Lins',        entrada: '22/02/2025' },
  { id: 5, cnes: '7400926', nome: 'Fund. Hospital Regional do Câncer',   uf: 'SP', municipio: 'Pres. Prudente',hab: 'CACON',            situacao: 'portaria_publicada' as SituacaoId, tecnico: 'Igor Lins', entrada: '10/12/2024' },
];

const SITUACAO_CHIP: Record<SituacaoId, { label: string; color: string; bg: string }> = {
  todas:              { label: 'Todas',              color: SAH_COLORS.cinzaT, bg: SAH_COLORS.cinzaF },
  em_analise:         { label: 'Em análise',         color: '#7A5500',         bg: SAH_COLORS.amarBg },
  no_drac:            { label: 'No DRAC',            color: SAH_COLORS.azul,   bg: SAH_COLORS.azulCla },
  em_diligencia:      { label: 'Em diligência',      color: SAH_COLORS.laranja,bg: SAH_COLORS.larBg },
  aprovada:           { label: 'Aprovada',           color: SAH_COLORS.verde,  bg: SAH_COLORS.verdeBg },
  portaria_publicada: { label: 'Portaria Publicada', color: SAH_COLORS.roxo,   bg: SAH_COLORS.roxoBg },
};

export default function PropostasPage() {
  const router = useRouter();
  const { data: formData, loading: formLoading } = useFormData();

  const [situacao,   setSituacao]   = useState<SituacaoId>('todas');
  const [tecnicoId,  setTecnicoId]  = useState<number | 'todos'>('todos');
  const [search,     setSearch]     = useState('');

  const filtered = MOCK_PROPOSTAS.filter((p) => {
    if (situacao !== 'todas' && p.situacao !== situacao) return false;
    if (tecnicoId !== 'todos') {
      const tech = formData?.technicians.find((t) => t.id === tecnicoId);
      if (tech && !p.tecnico.toLowerCase().includes(tech.name.toLowerCase())) return false;
    }
    if (search) {
      const q = search.toLowerCase();
      return p.nome.toLowerCase().includes(q) || p.cnes.includes(q) || p.municipio.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Topbar subtitle="Propostas SAIPS" />

      <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* ── Sidebar ─────────────────────────── */}
        <Box
          component="aside"
          sx={{
            width: 220, flexShrink: 0,
            bgcolor: '#fff', borderRight: `1px solid ${SAH_COLORS.cinzaB}`,
            display: 'flex', flexDirection: 'column',
            py: 2.5, overflowY: 'auto',
          }}
        >
          {/* Situação */}
          <Box sx={{ px: 1.5, mb: 3 }}>
            <Typography sx={{ fontSize: 10, fontWeight: 600, color: SAH_COLORS.cinzaT, textTransform: 'uppercase', letterSpacing: '.1em', px: 1, mb: .75 }}>
              Situação
            </Typography>
            <List dense disablePadding>
              {SITUACOES.map((s) => (
                <ListItemButton
                  key={s.id}
                  selected={situacao === s.id}
                  onClick={() => setSituacao(s.id)}
                  sx={{ px: 1.5 }}
                >
                  <ListItemText primary={s.label} />
                  {s.count !== undefined && (
                    <Chip
                      label={s.count}
                      size="small"
                      sx={{
                        height: 20, fontSize: 11, fontFamily: 'monospace', fontWeight: 600,
                        bgcolor: s.color ? `${s.color}22` : SAH_COLORS.cinzaF,
                        color:   s.color ?? SAH_COLORS.cinzaT,
                      }}
                    />
                  )}
                </ListItemButton>
              ))}
            </List>
          </Box>

          <Divider />

          {/* Técnicos */}
          <Box sx={{ px: 1.5, mt: 3 }}>
            <Typography sx={{ fontSize: 10, fontWeight: 600, color: SAH_COLORS.cinzaT, textTransform: 'uppercase', letterSpacing: '.1em', px: 1, mb: .75 }}>
              Técnico
            </Typography>
            <List dense disablePadding>
              <ListItemButton selected={tecnicoId === 'todos'} onClick={() => setTecnicoId('todos')} sx={{ px: 1.5 }}>
                <ListItemIcon sx={{ minWidth: 28 }}><PeopleAltOutlinedIcon sx={{ fontSize: 16 }} /></ListItemIcon>
                <ListItemText primary="Todos" />
              </ListItemButton>

              {formLoading
                ? [1, 2].map((i) => (
                    <Box key={i} sx={{ px: 1.5, py: .5 }}>
                      <Skeleton height={20} width="80%" />
                    </Box>
                  ))
                : formData?.technicians.map((t) => (
                    <ListItemButton
                      key={t.id}
                      selected={tecnicoId === t.id}
                      onClick={() => setTecnicoId(t.id)}
                      sx={{ px: 1.5 }}
                    >
                      <ListItemIcon sx={{ minWidth: 28 }}>
                        <PersonOutlineIcon sx={{ fontSize: 16 }} />
                      </ListItemIcon>
                      <ListItemText primary={t.fullName ?? `${t.name} ${t.surname}`} />
                    </ListItemButton>
                  ))}
            </List>
          </Box>
        </Box>

        {/* ── Main content ────────────────────── */}
        <Box component="main" sx={{ flex: 1, overflowY: 'auto', p: '32px 36px', bgcolor: SAH_COLORS.cinzaF }}>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 3.5 }}>
            <Box>
              <Typography variant="h5">Propostas SAIPS</Typography>
              <Typography sx={{ fontSize: 13, color: SAH_COLORS.cinzaT, mt: .375 }}>
                28 propostas em andamento · 2025
              </Typography>
            </Box>
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => router.push('/propostas/cadastro')}>
              Cadastrar nova proposta
            </Button>
          </Box>

          {/* KPIs */}
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 2, mb: 3.5 }}>
            {KPIS.map((k) => (
              <Card key={k.label} sx={{ position: 'relative', overflow: 'hidden', '&::after': { content: '""', position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, bgcolor: k.accentColor } }}>
                <CardContent sx={{ p: '20px 22px !important' }}>
                  <Typography sx={{ fontSize: 11, fontWeight: 600, color: SAH_COLORS.cinzaT, textTransform: 'uppercase', letterSpacing: '.08em', mb: 1.25 }}>
                    {k.label}
                  </Typography>
                  <Typography sx={{ fontSize: 36, fontWeight: 700, fontFamily: 'monospace', lineHeight: 1, mb: .5 }}>
                    {k.value}
                  </Typography>
                  <Typography sx={{ fontSize: 11, color: k.warn ? SAH_COLORS.laranja : SAH_COLORS.cinzaT }}>
                    {k.delta}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>

          {/* Table */}
          <Card>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: '18px 22px', borderBottom: `1px solid ${SAH_COLORS.cinzaB}` }}>
              <Typography sx={{ fontSize: 14, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
                Propostas
                <Chip label={`${filtered.length}`} size="small" sx={{ bgcolor: SAH_COLORS.verdeBg, color: SAH_COLORS.verde, fontFamily: 'monospace', fontWeight: 600 }} />
              </Typography>
              <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                <TextField
                  size="small" placeholder="Buscar..." value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  sx={{ width: 200 }}
                  slotProps={{
                    input: {
                      startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 16, color: SAH_COLORS.cinzaT }} /></InputAdornment>,
                    },
                  }}
                />
                <Button variant="outlined" size="small" startIcon={<DownloadIcon />} sx={{ borderColor: SAH_COLORS.cinzaB, color: SAH_COLORS.cinzaT, '&:hover': { borderColor: SAH_COLORS.verdeMed } }}>
                  Exportar
                </Button>
              </Box>
            </Box>

            <TableContainer component={Paper} elevation={0}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Estabelecimento</TableCell>
                    <TableCell>UF · Município</TableCell>
                    <TableCell>Habilitação</TableCell>
                    <TableCell>Situação</TableCell>
                    <TableCell>Técnico</TableCell>
                    <TableCell>Entrada</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filtered.map((p) => {
                    const chip = SITUACAO_CHIP[p.situacao];
                    return (
                      <TableRow key={p.id} hover>
                        <TableCell>
                          <Typography sx={{ fontSize: 13, fontWeight: 600 }}>{p.nome}</Typography>
                          <Typography sx={{ fontSize: 11, color: SAH_COLORS.cinzaT, fontFamily: 'monospace' }}>CNES {p.cnes}</Typography>
                        </TableCell>
                        <TableCell sx={{ fontSize: 13 }}>{p.uf} · {p.municipio}</TableCell>
                        <TableCell>
                          <Chip label={p.hab} size="small" sx={{ fontSize: 11, fontWeight: 600, bgcolor: SAH_COLORS.verdeBg, color: SAH_COLORS.verde }} />
                        </TableCell>
                        <TableCell>
                          <Chip label={chip.label} size="small" sx={{ fontSize: 11, fontWeight: 600, bgcolor: chip.bg, color: chip.color }} />
                        </TableCell>
                        <TableCell sx={{ fontSize: 13 }}>{p.tecnico}</TableCell>
                        <TableCell sx={{ fontSize: 13, fontFamily: 'monospace' }}>{p.entrada}</TableCell>
                      </TableRow>
                    );
                  })}

                  {filtered.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} align="center" sx={{ py: 5, color: SAH_COLORS.cinzaT, fontSize: 13 }}>
                        Nenhuma proposta encontrada.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
