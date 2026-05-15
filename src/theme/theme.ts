import { createTheme } from '@mui/material/styles';
import { ptBR } from '@mui/material/locale';

// ── Palette tokens (matches sah_v2.html CSS vars) ─────────────
export const SAH_COLORS = {
  verde:    '#1B5E3B',
  verdeMed: '#2E7D52',
  verdeCla: '#3DA06A',
  verdeBg:  '#EAF4EF',
  amarelo:  '#FFCD00',
  amarBg:   '#FFF9E0',
  azul:     '#1565C0',
  azulCla:  '#E3EEFF',
  laranja:  '#E65100',
  larBg:    '#FFF3E0',
  roxo:     '#6A1B9A',
  roxoBg:   '#F3E5F5',
  cinzaF:   '#F4F6F4',
  cinzaB:   '#E4EBE6',
  cinzaT:   '#6B7B6E',
  texto:    '#1A2E20',
  erro:     '#C0392B',
};

const theme = createTheme(
  {
    palette: {
      primary: {
        main:        SAH_COLORS.verde,
        light:       SAH_COLORS.verdeCla,
        dark:        SAH_COLORS.verdeMed,
        contrastText: '#ffffff',
      },
      secondary: {
        main:        SAH_COLORS.amarelo,
        contrastText: SAH_COLORS.verde,
      },
      error:   { main: SAH_COLORS.erro },
      warning: { main: SAH_COLORS.laranja },
      info:    { main: SAH_COLORS.azul },
      success: { main: SAH_COLORS.verdeCla },
      background: {
        default: SAH_COLORS.cinzaF,
        paper:   '#ffffff',
      },
      text: {
        primary:   SAH_COLORS.texto,
        secondary: SAH_COLORS.cinzaT,
      },
      divider: SAH_COLORS.cinzaB,
    },
    typography: {
      fontFamily: "'Sora', 'Inter', sans-serif",
      h1: { fontWeight: 700, letterSpacing: '-0.02em' },
      h2: { fontWeight: 700, letterSpacing: '-0.02em' },
      h3: { fontWeight: 700, letterSpacing: '-0.01em' },
      h4: { fontWeight: 700, letterSpacing: '-0.01em' },
      h5: { fontWeight: 700 },
      h6: { fontWeight: 700 },
      subtitle1: { fontWeight: 600 },
      subtitle2: { fontWeight: 600 },
      button: { fontWeight: 600, textTransform: 'none' },
      caption: { fontWeight: 500 },
      overline: { fontWeight: 600, letterSpacing: '0.1em' },
    },
    shape: { borderRadius: 10 },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            fontWeight: 600,
            padding: '10px 20px',
            transition: 'all 0.2s',
          },
          containedPrimary: {
            '&:hover': {
              backgroundColor: SAH_COLORS.verdeMed,
              transform: 'translateY(-1px)',
              boxShadow: '0 4px 16px rgba(27,94,59,0.25)',
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            backgroundColor: SAH_COLORS.cinzaF,
            '&.Mui-focused': {
              backgroundColor: '#fff',
            },
            '& fieldset': { borderColor: SAH_COLORS.cinzaB },
            '&:hover fieldset': { borderColor: SAH_COLORS.verdeCla },
            '&.Mui-focused fieldset': { borderColor: SAH_COLORS.verdeMed },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            border: `1px solid ${SAH_COLORS.cinzaB}`,
            boxShadow: 'none',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: { fontWeight: 600 },
        },
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            '& .MuiTableCell-root': {
              backgroundColor: SAH_COLORS.cinzaF,
              fontWeight: 600,
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: SAH_COLORS.cinzaT,
            },
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            '&:hover': {
              backgroundColor: SAH_COLORS.cinzaF,
            },
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            marginBottom: 2,
            fontSize: '0.8125rem',
            fontWeight: 500,
            color: SAH_COLORS.cinzaT,
            '&:hover': {
              backgroundColor: SAH_COLORS.cinzaF,
              color: SAH_COLORS.texto,
            },
            '&.Mui-selected': {
              backgroundColor: SAH_COLORS.verdeBg,
              color: SAH_COLORS.verde,
              fontWeight: 600,
              '&:hover': { backgroundColor: SAH_COLORS.verdeBg },
            },
          },
        },
      },
    },
  },
  ptBR,
);

export default theme;
