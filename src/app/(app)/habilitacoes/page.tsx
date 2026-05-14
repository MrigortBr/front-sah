'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Topbar from '@/components/layout/Topbar';
import { SAH_COLORS } from '@/theme/theme';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
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
import Chip from '@mui/material/Chip';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const HAB_FILTERS = [
  { id: 'todos',   label: 'Todos' },
  { id: 'cacon',   label: 'CACON' },
  { id: 'unacon',  label: 'UNACON' },
  { id: 'hosp',    label: 'Hosp. Geral Onco' },
  { id: 'radio',   label: 'Radioterapia' },
];

const UF_FILTERS = [
  { id: 'todos', label: 'Todos' },
  { id: 'SP',    label: 'SP' },
  { id: 'MG',    label: 'MG' },
  { id: 'RJ',    label: 'RJ' },
  { id: 'BA',    label: 'BA' },
];

const KPIS = [
  { label: 'Total Ativo',  value: 312, delta: '↑ 8 novos em 2025',  up: true,  accent: SAH_COLORS.verdeCla },
  { label: 'CACON',        value: 48,  delta: '15,4% do total',      up: false, accent: SAH_COLORS.azul },
  { label: 'UNACON',       value: 204, delta: '65,4% do total',      up: false, accent: SAH_COLORS.amarelo },
  { label: 'Aceleradores', value: 287, delta: '↑ 12 este ano',       up: true,  accent: SAH_COLORS.laranja },
];

const MOCK_HABS = [
  { id: 1, nome: 'A C Camargo Cancer Center',         cnes: '2077531', uf: 'SP', mun: 'São Paulo',        hab: 'CACON c/ Onco Ped.', gestao: 'Municipal', acel: 4, desde: 1999 },
  { id: 2, nome: 'HC da FMUSP – Hospital das Clínicas', cnes: '2078015', uf: 'SP', mun: 'São Paulo',      hab: 'CACON c/ Onco Ped.', gestao: 'Estadual',  acel: 4, desde: 1999 },
  { id: 3, nome: 'Hospital Amaral Carvalho',           cnes: '2083086', uf: 'SP', mun: 'Jaú',             hab: 'CACON c/ Onco Ped.', gestao: 'Estadual',  acel: 4, desde: 1999 },
  { id: 4, nome: 'Hospital Heliópolis – UGA I',        cnes: '2066572', uf: 'SP', mun: 'São Paulo',        hab: 'UNACON c/ Radio',    gestao: 'Estadual',  acel: 2, desde: 1999 },
  { id: 5, nome: 'Hospital Regional de Araguaína',     cnes: '2600536', uf: 'TO', mun: 'Araguaína',        hab: 'UNACON c/ Radio',    gestao: 'Estadual',  acel: 1, desde: 2003 },
  { id: 6, nome: 'Hospital Estadual de Diadema',       cnes: '2084163', uf: 'SP', mun: 'Diadema',          hab: 'Hosp. Geral Onco',   gestao: 'Estadual',  acel: 0, desde: 2008 },
];

const HAB_CHIP_COLOR = (hab: string): { bg: string; color: string } => {
  if (hab.includes('CACON'))  return { bg: SAH_COLORS.verdeBg, color: SAH_COLORS.verde };
  if (hab.includes('UNACON')) return { bg: SAH_COLORS.azulCla, color: SAH_COLORS.azul };
  return { bg: SAH_COLORS.cinzaF, color: SAH_COLORS.cinzaT };
};

export default function HabilitacoesPage() {
  const router = useRouter();
  const [habFilter, setHabFilter] = useState('todos');
  const [ufFilter,  setUfFilter]  = useState('todos');
  const [search,    setSearch]    = useState('');

  const filtered = MOCK_HABS.filter((h) => {
    if (ufFilter !== 'todos' && h.uf !== ufFilter) return false;
    if (habFilter === 'cacon'  && !h.hab.includes('CACON'))  return false;
    if (habFilter === 'unacon' && !h.hab.includes('UNACON')) return false;
    if (habFilter === 'hosp'   && !h.hab.includes('Hosp'))   return false;
    if (habFilter === 'radio'  && !h.hab.includes('Radio'))  return false;
    if (search) {
      const q = search.toLowerCase();
      return h.nome.toLowerCase().includes(q) || h.cnes.includes(q) || h.mun.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Topbar subtitle="Habilitações Ativas" />

      <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Sidebar */}
        <Box
          component="aside"
          sx={{
            width: 220, flexShrink: 0,
            bgcolor: '#fff', borderRight: `1px solid ${SAH_COLORS.cinzaB}`,
            display: 'flex', flexDirection: 'column',
            py: 2.5, overflowY: 'auto',
          }}
        >
          <Box sx={{ px: 1.5, mb: 3 }}>
            <Typography sx={{ fontSize: 10, fontWeight: 600, color: SAH_COLORS.cinzaT, textTransform: 'uppercase', letterSpacing: '.1em', px: 1, mb: .75 }}>
              Visualizar por
            </Typography>
            <List dense disablePadding>
              {HAB_FILTERS.map((f) => (
                <ListItemButton key={f.id} selected={habFilter === f.id} onClick={() => setHabFilter(f.id)} sx={{ px: 1.5 }}>
                  <ListItemText primary={f.label} />
                </ListItemButton>
              ))}
            </List>
          </Box>
          <Divider />
          <Box sx={{ px: 1.5, mt: 3 }}>
            <Typography sx={{ fontSize: 10, fontWeight: 600, color: SAH_COLORS.cinzaT, textTransform: 'uppercase', letterSpacing: '.1em', px: 1, mb: .75 }}>
              UF
            </Typography>
            <List dense disablePadding>
              {UF_FILTERS.map((f) => (
                <ListItemButton key={f.id} selected={ufFilter === f.id} onClick={() => setUfFilter(f.id)} sx={{ px: 1.5 }}>
                  <ListItemText primary={f.label} />
                </ListItemButton>
              ))}
            </List>
          </Box>
        </Box>

        {/* Main */}
        <Box component="main" sx={{ flex: 1, overflowY: 'auto', p: '32px 36px', bgcolor: SAH_COLORS.cinzaF }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 3.5 }}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: .375 }}>
                <Button
                  size="small" startIcon={<ArrowBackIcon />}
                  onClick={() => router.push('/home')}
                  sx={{ color: SAH_COLORS.cinzaT, p: 0, minWidth: 0, fontSize: 12, '&:hover': { bgcolor: 'transparent', color: SAH_COLORS.verde } }}
                >
                  Início
                </Button>
              </Box>
              <Typography variant="h5">Habilitações Ativas</Typography>
              <Typography sx={{ fontSize: 13, color: SAH_COLORS.cinzaT, mt: .375 }}>
                312 estabelecimentos · atualizado em 28/04/2025
              </Typography>
            </Box>
            <Button variant="outlined" startIcon={<DownloadIcon />} sx={{ borderColor: SAH_COLORS.cinzaB, color: SAH_COLORS.cinzaT }}>
              Exportar
            </Button>
          </Box>

          {/* KPIs */}
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 2, mb: 3.5 }}>
            {KPIS.map((k) => (
              <Card key={k.label} sx={{ position: 'relative', overflow: 'hidden', '&::after': { content: '""', position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, bgcolor: k.accent } }}>
                <CardContent sx={{ p: '20px 22px !important' }}>
                  <Typography sx={{ fontSize: 11, fontWeight: 600, color: SAH_COLORS.cinzaT, textTransform: 'uppercase', letterSpacing: '.08em', mb: 1.25 }}>
                    {k.label}
                  </Typography>
                  <Typography sx={{ fontSize: 36, fontWeight: 700, fontFamily: 'monospace', lineHeight: 1, mb: .5 }}>
                    {k.value}
                  </Typography>
                  <Typography sx={{ fontSize: 11, color: k.up ? SAH_COLORS.verdeMed : SAH_COLORS.cinzaT }}>
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
                Estabelecimentos
                <Chip label={`${filtered.length} ativos`} size="small" sx={{ bgcolor: SAH_COLORS.verdeBg, color: SAH_COLORS.verde, fontFamily: 'monospace', fontWeight: 600 }} />
              </Typography>
              <TextField
                size="small" placeholder="Buscar..." value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{ width: 200 }}
                slotProps={{ input: { startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 16, color: SAH_COLORS.cinzaT }} /></InputAdornment> } }}
              />
            </Box>
            <TableContainer component={Paper} elevation={0}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Estabelecimento</TableCell>
                    <TableCell>UF · Município</TableCell>
                    <TableCell>Habilitação</TableCell>
                    <TableCell>Gestão</TableCell>
                    <TableCell align="center">Acel.</TableCell>
                    <TableCell>Desde</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filtered.map((h) => {
                    const chip = HAB_CHIP_COLOR(h.hab);
                    return (
                      <TableRow key={h.id} hover>
                        <TableCell>
                          <Typography sx={{ fontSize: 13, fontWeight: 600 }}>{h.nome}</Typography>
                          <Typography sx={{ fontSize: 11, color: SAH_COLORS.cinzaT, fontFamily: 'monospace' }}>CNES {h.cnes}</Typography>
                        </TableCell>
                        <TableCell sx={{ fontSize: 13 }}>{h.uf} · {h.mun}</TableCell>
                        <TableCell>
                          <Chip label={h.hab} size="small" sx={{ fontSize: 11, fontWeight: 600, bgcolor: chip.bg, color: chip.color }} />
                        </TableCell>
                        <TableCell sx={{ fontSize: 13 }}>{h.gestao}</TableCell>
                        <TableCell align="center" sx={{ fontSize: 13, fontFamily: 'monospace' }}>{h.acel}</TableCell>
                        <TableCell sx={{ fontSize: 13, fontFamily: 'monospace' }}>{h.desde}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
