'use client';
import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Topbar from '@/components/layout/Topbar';
import { useFormData } from '@/contexts/FormDataContext';
import { SAH_COLORS } from '@/theme/theme';
import type { CadastroFormValues, CnesData } from '@/types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Chip from '@mui/material/Chip';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import InputAdornment from '@mui/material/InputAdornment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ptBR } from 'date-fns/locale/pt-BR';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

// ── CNES mock database ────────────────────────────────────────
const CNES_DB: Record<string, CnesData> = {
  '2084163': { nome: 'Hospital Estadual de Diadema – Hospital Serraria', cnpj: '46.374.500/0136-87', natureza: 'PÚBLICA',                     gestao: 'Estadual',  uf: 'SP', ibge_mun: '351380', municipio: 'Diadema',        regiao: 'GRANDE ABC',           ibge_reg: '35015', macro: 'RRAS1'  },
  '2080273': { nome: 'Hospital Estadual Mário Covas de Santo André',      cnpj: '46.374.500/0144-97', natureza: 'PÚBLICA',                     gestao: 'Estadual',  uf: 'SP', ibge_mun: '354780', municipio: 'Santo André',    regiao: 'GRANDE ABC',           ibge_reg: '35015', macro: 'RRAS1'  },
  '2077531': { nome: 'A C Camargo Cancer Center',                          cnpj: '60.961.968/0001-06', natureza: 'PRIVADA SEM FINS LUCRATIVOS', gestao: 'Municipal', uf: 'SP', ibge_mun: '355030', municipio: 'São Paulo',      regiao: 'SÃO PAULO',            ibge_reg: '35016', macro: 'RRAS6'  },
  '2078015': { nome: 'HC da FMUSP – Hospital das Clínicas São Paulo',      cnpj: '56.577.059/0001-00', natureza: 'PRIVADA SEM FINS LUCRATIVOS', gestao: 'Estadual',  uf: 'SP', ibge_mun: '355030', municipio: 'São Paulo',      regiao: 'SÃO PAULO',            ibge_reg: '35016', macro: 'RRAS6'  },
  '2083086': { nome: 'Hospital Amaral Carvalho',                           cnpj: '50.753.755/0001-35', natureza: 'PRIVADA SEM FINS LUCRATIVOS', gestao: 'Estadual',  uf: 'SP', ibge_mun: '352530', municipio: 'Jaú',           regiao: 'VALE DAS CACHOEIRAS',  ibge_reg: '35133', macro: 'RRAS13' },
  '2600536': { nome: 'Hospital Regional de Araguaína',                     cnpj: '25.053.117/0053-95', natureza: 'PÚBLICA',                     gestao: 'Estadual',  uf: 'TO', ibge_mun: '170210', municipio: 'Araguaína',     regiao: 'MÉDIO NORTE ARAGUAIA', ibge_reg: '17001', macro: 'Macrorregião Norte' },
};

// ── Anchor sections ───────────────────────────────────────────
const SECTIONS = [
  { id: 'sec-estabelecimento', label: 'Estabelecimento' },
  { id: 'sec-habilitacao',     label: 'Habilitação Solicitada' },
  { id: 'sec-historico',       label: 'Histórico de Habilitação' },
  { id: 'sec-financeiro',      label: 'Dados Financeiros' },
  { id: 'sec-tecnico',         label: 'Responsável Técnico' },
  { id: 'sec-diligencia',      label: 'Documentação / Diligência' },
];

const EMPTY_FORM: CadastroFormValues = {
  cnes: '', nomeEstabelecimento: '', cnpj: '', naturezaJuridica: '', gestao: '',
  uf: '', ibgeMunicipio: '', nomeMunicipio: '', regiaoSaude: '', ibgeRegiao: '', macrorregiao: '',
  aceleradores: '', habilitacoesSelecionadas: [],
  anoprimeiraHabilitacao: '', codigos1aAlteracao: '', ano1aAlteracao: '',
  codigos2aAlteracao: '', ano2aAlteracao: '', codigos3aAlteracao: '',
  tecnicoId: '', dataTrabalho: null, previsaoMensal: '',
  diligenciasSelecionadas: [], observacoes: '',
};

function Section({ id, title, desc, dot, children }: { id: string; title: string; desc?: string; dot?: string; children: React.ReactNode }) {
  return (
    <Box id={id} sx={{ bgcolor: '#fff', borderRadius: 2, border: `1px solid ${SAH_COLORS.cinzaB}`, p: '24px 28px', mb: 3, scrollMarginTop: '80px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: desc ? .5 : 2.5 }}>
        {dot && <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: dot, flexShrink: 0 }} />}
        <Typography sx={{ fontSize: 14, fontWeight: 700 }}>{title}</Typography>
      </Box>
      {desc && <Typography sx={{ fontSize: 12, color: SAH_COLORS.cinzaT, mb: 2.5 }}>{desc}</Typography>}
      {children}
    </Box>
  );
}

function FormGrid({ cols = 2, children }: { cols?: number; children: React.ReactNode }) {
  return <Box sx={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 2 }}>{children}</Box>;
}

export default function CadastroPage() {
  const router       = useRouter();
  const { data: fd } = useFormData();

  const [form,        setForm]        = useState<CadastroFormValues>(EMPTY_FORM);
  const [cnesLoading, setCnesLoading] = useState(false);
  const [cnesStatus,  setCnesStatus]  = useState<{ type: 'success' | 'warning' | 'idle'; msg: string }>({ type: 'idle', msg: '' });
  const [cnesFound,   setCnesFound]   = useState(false);
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);
  const [toast,       setToast]       = useState(false);
  const cnesTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleCnesInput(val: string) {
    const v = val.replace(/\D/g, '').slice(0, 7);
    setForm((f) => ({ ...f, cnes: v }));
    setCnesFound(false);
    setCnesStatus({ type: 'idle', msg: '' });
    clearTimeout(cnesTimerRef.current ?? undefined);

    if (v.length < 7) return;

    setCnesLoading(true);
    setCnesStatus({ type: 'idle', msg: 'Consultando banco do CNES…' });

    cnesTimerRef.current = setTimeout(() => {
      setCnesLoading(false);
      const data = CNES_DB[v];
      if (data) {
        setForm((f) => ({ ...f, nomeEstabelecimento: data.nome, cnpj: data.cnpj, naturezaJuridica: data.natureza, gestao: data.gestao, uf: data.uf, ibgeMunicipio: data.ibge_mun, nomeMunicipio: data.municipio, regiaoSaude: data.regiao, ibgeRegiao: data.ibge_reg, macrorregiao: data.macro }));
        setCnesFound(true);
        setCnesStatus({ type: 'success', msg: '✓ Estabelecimento encontrado' });
      } else {
        setCnesFound(true);
        setCnesStatus({ type: 'warning', msg: '⚠ CNES não encontrado — preencha manualmente.' });
      }
    }, 900);
  }

  function toggleHab(codigo: string) {
    setForm((f) => ({ ...f, habilitacoesSelecionadas: f.habilitacoesSelecionadas.includes(codigo) ? f.habilitacoesSelecionadas.filter((c) => c !== codigo) : [...f.habilitacoesSelecionadas, codigo] }));
  }

  function toggleDiligencia(id: number) {
    setForm((f) => ({ ...f, diligenciasSelecionadas: f.diligenciasSelecionadas.includes(id) ? f.diligenciasSelecionadas.filter((d) => d !== id) : [...f.diligenciasSelecionadas, id] }));
  }

  function scrollToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveSection(id);
  }

  function handleScroll() {
    for (const sec of [...SECTIONS].reverse()) {
      const el = document.getElementById(sec.id);
      if (el && el.getBoundingClientRect().top <= 100) { setActiveSection(sec.id); return; }
    }
  }

  function handleSubmit() {
    // TODO: PUT /form/:id
    setToast(true);
    setTimeout(() => router.push('/propostas'), 1500);
  }

  const habConsolidado = form.habilitacoesSelecionadas
    .map((c) => { const t = fd?.info.tipoHabilitacao.find((h) => h.codigo === c); return t ? `${c} — ${t.descricao}` : c; })
    .join(' | ');

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Topbar subtitle="Nova Proposta" />
        <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

          {/* ── Anchor sidebar ──────────────── */}
          <Box component="aside" sx={{ width: 220, flexShrink: 0, bgcolor: '#fff', borderRight: `1px solid ${SAH_COLORS.cinzaB}`, display: 'flex', flexDirection: 'column', py: 2.5, overflowY: 'auto' }}>
            <Typography sx={{ fontSize: 10, fontWeight: 600, color: SAH_COLORS.cinzaT, textTransform: 'uppercase', letterSpacing: '.1em', px: 2.5, mb: 1 }}>
              Etapas de Preenchimento
            </Typography>
            <List dense disablePadding sx={{ px: 1.5 }}>
              {SECTIONS.map((s, i) => (
                <ListItemButton key={s.id} selected={activeSection === s.id} onClick={() => scrollToSection(s.id)} sx={{ px: 1.5, gap: 1.25 }}>
                  <Box sx={{ width: 20, height: 20, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, fontFamily: 'monospace', bgcolor: activeSection === s.id ? SAH_COLORS.verde : SAH_COLORS.cinzaF, color: activeSection === s.id ? '#fff' : SAH_COLORS.cinzaT }}>
                    {i + 1}
                  </Box>
                  <ListItemText primary={s.label} primaryTypographyProps={{ fontSize: 12.5 }} />
                </ListItemButton>
              ))}
            </List>
          </Box>

          {/* ── Form ────────────────────────── */}
          <Box component="main" onScroll={handleScroll} sx={{ flex: 1, overflowY: 'auto', p: '32px 36px', bgcolor: SAH_COLORS.cinzaF }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 3.5 }}>
              <Box>
                <Button size="small" startIcon={<ArrowBackIcon />} onClick={() => router.push('/propostas')} sx={{ color: SAH_COLORS.cinzaT, p: 0, mb: .75, fontSize: 12, '&:hover': { bgcolor: 'transparent', color: SAH_COLORS.verde } }}>
                  Voltar às propostas
                </Button>
                <Typography variant="h5">Cadastrar Nova Proposta</Typography>
                <Typography sx={{ fontSize: 13, color: SAH_COLORS.cinzaT, mt: .375 }}>
                  Preencha os dados abaixo para registrar uma nova proposta de habilitação.
                </Typography>
              </Box>
            </Box>

            {/* 1. Estabelecimento */}
            <Section id="sec-estabelecimento" title="Estabelecimento" dot={SAH_COLORS.verde}>
              <Box sx={{ bgcolor: SAH_COLORS.cinzaF, border: `1.5px solid ${SAH_COLORS.cinzaB}`, borderRadius: 2, p: '18px 20px', mb: 2.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 2.5 }}>
                  <TextField label="CNES *" size="small" value={form.cnes} onChange={(e) => handleCnesInput(e.target.value)} placeholder="0000000" sx={{ width: 180 }} helperText="7 dígitos — dados preenchidos automaticamente"
                    slotProps={{ input: { endAdornment: cnesLoading ? <InputAdornment position="end"><CircularProgress size={14} /></InputAdornment> : cnesStatus.type === 'success' ? <InputAdornment position="end"><CheckCircleOutlineIcon sx={{ color: SAH_COLORS.verdeMed, fontSize: 18 }} /></InputAdornment> : undefined } }}
                  />
                  <Typography sx={{ fontSize: 12, pb: 3.5, color: cnesStatus.type === 'success' ? SAH_COLORS.verdeMed : cnesStatus.type === 'warning' ? SAH_COLORS.laranja : SAH_COLORS.cinzaT, fontWeight: cnesStatus.type !== 'idle' ? 600 : 400 }}>
                    {cnesStatus.msg}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ opacity: cnesFound ? 1 : .4, pointerEvents: cnesFound ? 'auto' : 'none', transition: 'opacity .3s' }}>
                <Typography sx={{ fontSize: 11, fontWeight: 600, color: SAH_COLORS.cinzaT, textTransform: 'uppercase', letterSpacing: '.08em', mb: 2, mt: 1 }}>Dados do Estabelecimento</Typography>
                <FormGrid cols={1}><TextField label="Nome do Estabelecimento" value={form.nomeEstabelecimento} slotProps={{ input: { readOnly: true } }} size="small" /></FormGrid>
                <Box mt={2} />
                <FormGrid>
                  <TextField label="CNPJ"             value={form.cnpj}             slotProps={{ input: { readOnly: true } }} size="small" />
                  <TextField label="Natureza Jurídica" value={form.naturezaJuridica}  slotProps={{ input: { readOnly: true } }} size="small" />
                  <TextField label="Gestão"            value={form.gestao}            slotProps={{ input: { readOnly: true } }} size="small" />
                  <TextField label="Nº Aceleradores / Cobaltos" type="number" value={form.aceleradores} onChange={(e) => setForm((f) => ({ ...f, aceleradores: e.target.value === '' ? '' : Number(e.target.value) }))} size="small" helperText="Único campo a preencher manualmente" slotProps={{ htmlInput: { min: 0 } }} />
                </FormGrid>
                <Typography sx={{ fontSize: 11, fontWeight: 600, color: SAH_COLORS.cinzaT, textTransform: 'uppercase', letterSpacing: '.08em', mb: 2, mt: 3 }}>Localização</Typography>
                <FormGrid cols={3}>
                  <TextField label="UF"               value={form.uf}            slotProps={{ input: { readOnly: true } }} size="small" />
                  <TextField label="IBGE do Município" value={form.ibgeMunicipio} slotProps={{ input: { readOnly: true } }} size="small" />
                  <TextField label="Nome do Município" value={form.nomeMunicipio} slotProps={{ input: { readOnly: true } }} size="small" />
                  <TextField label="Região de Saúde"   value={form.regiaoSaude}   slotProps={{ input: { readOnly: true } }} size="small" />
                  <TextField label="IBGE Região"        value={form.ibgeRegiao}    slotProps={{ input: { readOnly: true } }} size="small" />
                  <TextField label="Macrorregião"       value={form.macrorregiao}  slotProps={{ input: { readOnly: true } }} size="small" />
                </FormGrid>
              </Box>
            </Section>

            {/* 2. Habilitação */}
            <Section id="sec-habilitacao" title="Habilitação Solicitada" dot={SAH_COLORS.amarelo} desc="Selecione o(s) código(s). Múltiplas seleções são permitidas.">
              <Typography sx={{ fontSize: 12, fontWeight: 600, mb: .5 }}>Código(s) <Box component="span" sx={{ color: SAH_COLORS.erro }}>*</Box></Typography>
              <Typography sx={{ fontSize: 11, color: SAH_COLORS.cinzaT, mb: 1.75 }}>Clique no código — o nome aparece abaixo automaticamente.</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {fd?.info.tipoHabilitacao.map((h) => {
                  const sel = form.habilitacoesSelecionadas.includes(h.codigo);
                  return (
                    <Chip key={h.codigo} label={h.codigo} onClick={() => toggleHab(h.codigo)} sx={{ fontFamily: 'monospace', fontWeight: 700, fontSize: 13, border: `1.5px solid ${sel ? SAH_COLORS.verde : SAH_COLORS.cinzaB}`, bgcolor: sel ? SAH_COLORS.verde : SAH_COLORS.cinzaF, color: sel ? '#fff' : SAH_COLORS.texto, cursor: 'pointer', '&:hover': { bgcolor: sel ? SAH_COLORS.verdeMed : '#f0f7f3', borderColor: SAH_COLORS.verde } }} />
                  );
                })}
              </Box>
              {form.habilitacoesSelecionadas.length > 0 && (
                <Box sx={{ bgcolor: SAH_COLORS.cinzaF, borderRadius: 1.5, p: 1.5, mb: 2.5 }}>
                  <Typography sx={{ fontSize: 11, fontWeight: 600, color: SAH_COLORS.cinzaT, textTransform: 'uppercase', letterSpacing: '.08em', mb: 1 }}>Selecionada(s)</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: .75 }}>
                    {form.habilitacoesSelecionadas.map((c) => {
                      const t = fd?.info.tipoHabilitacao.find((h) => h.codigo === c);
                      return (
                        <Box key={c} sx={{ display: 'flex', alignItems: 'center', gap: 1.25, p: '8px 12px', bgcolor: SAH_COLORS.verdeBg, border: `1px solid ${SAH_COLORS.cinzaB}`, borderRadius: 1.5 }}>
                          <Typography sx={{ fontFamily: 'monospace', fontWeight: 700, color: SAH_COLORS.verde, minWidth: 40, fontSize: 12 }}>{c}</Typography>
                          <Typography sx={{ fontSize: 12 }}>{t?.descricao}</Typography>
                        </Box>
                      );
                    })}
                  </Box>
                </Box>
              )}
              <TextField fullWidth label="Habilitação(ões) — texto consolidado" value={habConsolidado} slotProps={{ input: { readOnly: true } }} size="small" helperText="Preenchido automaticamente conforme código(s) selecionado(s)" />
            </Section>

            {/* 3. Histórico */}
            <Section id="sec-historico" title="Histórico de Habilitação" dot={SAH_COLORS.cinzaT} desc="Preencher somente se houver histórico anterior.">
              <FormGrid>
                <TextField label="Ano da Primeira Habilitação" type="number" size="small" placeholder="Ex: 1999" value={form.anoprimeiraHabilitacao} onChange={(e) => setForm((f) => ({ ...f, anoprimeiraHabilitacao: e.target.value }))} slotProps={{ htmlInput: { min: 1990, max: 2030 } }} />
                <TextField label="Códigos 1ª Alteração"   size="small" placeholder="Ex: 17.01 e 17.04" value={form.codigos1aAlteracao}  onChange={(e) => setForm((f) => ({ ...f, codigos1aAlteracao: e.target.value }))} />
                <TextField label="Ano da 1ª Alteração"    type="number" size="small" placeholder="Ex: 2007" value={form.ano1aAlteracao}   onChange={(e) => setForm((f) => ({ ...f, ano1aAlteracao: e.target.value }))} />
                <TextField label="Códigos 2ª Alteração"   size="small" placeholder="Ex: 17.07 e 17.08" value={form.codigos2aAlteracao}  onChange={(e) => setForm((f) => ({ ...f, codigos2aAlteracao: e.target.value }))} />
                <TextField label="Ano da 2ª Alteração"    type="number" size="small" placeholder="Ex: 2013" value={form.ano2aAlteracao}   onChange={(e) => setForm((f) => ({ ...f, ano2aAlteracao: e.target.value }))} />
                <TextField label="Códigos 3ª Alteração"   size="small" placeholder="Ex: 17.07, 17.08 e 17.09" value={form.codigos3aAlteracao} onChange={(e) => setForm((f) => ({ ...f, codigos3aAlteracao: e.target.value }))} />
              </FormGrid>
            </Section>

            {/* 4. Financeiro */}
            <Section id="sec-financeiro" title="Dados Financeiros" dot={SAH_COLORS.azul}>
              <FormGrid>
                <TextField label="Previsão Financeira Mensal (R$)" size="small" placeholder="0,00" value={form.previsaoMensal} onChange={(e) => setForm((f) => ({ ...f, previsaoMensal: e.target.value }))} slotProps={{ input: { startAdornment: <InputAdornment position="start">R$</InputAdornment> } }} />
                <TextField label="Previsão Financeira Anual (R$)" size="small" value={form.previsaoMensal ? `R$ ${(parseFloat(form.previsaoMensal.replace(/\./g, '').replace(',', '.')) * 12).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : ''} slotProps={{ input: { readOnly: true } }} helperText="Calculado automaticamente (mensal × 12)" />
              </FormGrid>
            </Section>

            {/* 5. Técnico */}
            <Section id="sec-tecnico" title="Responsável Técnico" dot={SAH_COLORS.roxo}>
              <FormGrid>
                <TextField label="Técnico Responsável *" select size="small" value={form.tecnicoId} onChange={(e) => setForm((f) => ({ ...f, tecnicoId: Number(e.target.value) }))}>
                  <MenuItem value=""><em>Selecione…</em></MenuItem>
                  {fd?.technicians.map((t) => <MenuItem key={t.id} value={t.id}>{t.fullName ?? `${t.name} ${t.surname}`}</MenuItem>)}
                </TextField>
                <DatePicker label="Data de Trabalho *" value={form.dataTrabalho} onChange={(d) => setForm((f) => ({ ...f, dataTrabalho: d }))} slotProps={{ textField: { size: 'small', helperText: 'Data em que a proposta foi recebida para análise' } }} />
              </FormGrid>
            </Section>

            {/* 6. Diligência */}
            <Section id="sec-diligencia" title="Documentação / Diligência" dot={SAH_COLORS.laranja} desc="Marque os documentos já recebidos ou em análise.">
              <FormGroup>
                {fd?.info.diligencia.map((d) => (
                  <FormControlLabel key={d.id} sx={{ mb: .5, alignItems: 'flex-start' }}
                    control={<Checkbox size="small" checked={form.diligenciasSelecionadas.includes(d.id)} onChange={() => toggleDiligencia(d.id)} sx={{ color: SAH_COLORS.cinzaB, '&.Mui-checked': { color: SAH_COLORS.verde } }} />}
                    label={<Typography sx={{ fontSize: 13 }}><Box component="span" sx={{ fontFamily: 'monospace', fontWeight: 700, color: SAH_COLORS.cinzaT, mr: .75 }}>{String(d.id).padStart(2, '0')}.</Box>{d.title}</Typography>}
                  />
                ))}
              </FormGroup>
              <Divider sx={{ my: 2.5 }} />
              <TextField fullWidth multiline rows={3} label="Observações" size="small" placeholder="Descreva pendências, observações ou histórico relevante…" value={form.observacoes} onChange={(e) => setForm((f) => ({ ...f, observacoes: e.target.value }))} />
            </Section>

            {/* Action bar */}
            <Box sx={{ position: 'sticky', bottom: 0, bgcolor: '#fff', borderTop: `1px solid ${SAH_COLORS.cinzaB}`, px: 0, py: 2, mt: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => router.push('/propostas')} sx={{ borderColor: SAH_COLORS.cinzaB, color: SAH_COLORS.cinzaT }}>
                ← Cancelar
              </Button>
              <Box sx={{ display: 'flex', gap: 1.5 }}>
                <Button variant="outlined" startIcon={<SaveOutlinedIcon />} sx={{ borderColor: SAH_COLORS.cinzaB, color: SAH_COLORS.cinzaT }}>
                  Salvar rascunho
                </Button>
                <Button variant="contained" endIcon={<SendOutlinedIcon />} onClick={handleSubmit}>
                  Enviar proposta
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>

        <Snackbar open={toast} autoHideDuration={3000} onClose={() => setToast(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
          <Alert severity="success" sx={{ fontWeight: 600 }}>Proposta enviada com sucesso!</Alert>
        </Snackbar>
      </Box>
    </LocalizationProvider>
  );
}
