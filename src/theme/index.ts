"use client";

import { createTheme, alpha } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    sah: {
      verde: string;
      verdeMed: string;
      verdeCla: string;
      verdeBg: string;
      amarelo: string;
      amarBg: string;
      laranja: string;
      larBg: string;
      roxo: string;
      roxoBg: string;
      cinzaF: string;
      cinzaB: string;
      cinzaT: string;
      texto: string;
    };
  }
  interface PaletteOptions {
    sah?: {
      verde: string;
      verdeMed: string;
      verdeCla: string;
      verdeBg: string;
      amarelo: string;
      amarBg: string;
      laranja: string;
      larBg: string;
      roxo: string;
      roxoBg: string;
      cinzaF: string;
      cinzaB: string;
      cinzaT: string;
      texto: string;
    };
  }
}

const SAH = {
  verde: "#1B5E3B",
  verdeMed: "#2E7D52",
  verdeCla: "#3DA06A",
  verdeBg: "#EAF4EF",
  amarelo: "#FFCD00",
  amarBg: "#FFF9E0",
  laranja: "#E65100",
  larBg: "#FFF3E0",
  roxo: "#6A1B9A",
  roxoBg: "#F3E5F5",
  cinzaF: "#F4F6F4",
  cinzaB: "#E4EBE6",
  cinzaT: "#6B7B6E",
  texto: "#1A2E20",
  azul: "#1565C0",
  azulCla: "#E3EEFF",
  erro: "#C0392B",
};

const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: SAH.verde,
      light: SAH.verdeCla,
      dark: SAH.verde,
      contrastText: "#fff",
    },
    secondary: {
      main: SAH.amarelo,
      contrastText: SAH.verde,
    },
    error: {
      main: SAH.erro,
    },
    warning: {
      main: SAH.laranja,
    },
    info: {
      main: SAH.azul,
    },
    success: {
      main: SAH.verdeCla,
    },
    background: {
      default: SAH.cinzaF,
      paper: "#FFFFFF",
    },
    text: {
      primary: SAH.texto,
      secondary: SAH.cinzaT,
    },
    divider: SAH.cinzaB,
    sah: SAH,
  },
  typography: {
    fontFamily: '"Sora", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700, letterSpacing: "-0.02em" },
    h2: { fontWeight: 700, letterSpacing: "-0.02em" },
    h3: { fontWeight: 700, letterSpacing: "-0.01em" },
    h4: { fontWeight: 700, letterSpacing: "-0.01em" },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
    subtitle1: { fontWeight: 600 },
    subtitle2: { fontWeight: 600 },
    body1: { fontSize: "0.875rem" },
    body2: { fontSize: "0.8125rem" },
    caption: {
      fontSize: "0.6875rem",
      fontWeight: 500,
      letterSpacing: "0.06em",
      textTransform: "uppercase" as const,
    },
    button: { fontFamily: '"Sora", sans-serif', fontWeight: 600, textTransform: "none" as const },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
          padding: "9px 20px",
        },
        containedPrimary: {
          "&:hover": {
            backgroundColor: SAH.verdeMed,
            transform: "translateY(-1px)",
            boxShadow: `0 4px 16px ${alpha(SAH.verde, 0.28)}`,
          },
          transition: "all 0.2s",
        },
      },
    },
    MuiTextField: {
      defaultProps: { size: "small" },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 10,
            backgroundColor: SAH.cinzaF,
            fontFamily: '"Sora", sans-serif',
            fontSize: "0.875rem",
            "& fieldset": { borderColor: SAH.cinzaB, borderWidth: "1.5px" },
            "&:hover fieldset": { borderColor: SAH.verdeCla },
            "&.Mui-focused fieldset": {
              borderColor: SAH.verdeMed,
              boxShadow: `0 0 0 3px ${alpha(SAH.verdeMed, 0.12)}`,
            },
            "&.Mui-focused": { backgroundColor: "#fff" },
          },
          "& label.Mui-focused": { color: SAH.verdeMed },
        },
      },
    },
    MuiSelect: {
      defaultProps: { size: "small" },
      styleOverrides: {
        root: {
          borderRadius: 10,
          backgroundColor: SAH.cinzaF,
          fontSize: "0.875rem",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          "& fieldset": { borderColor: SAH.cinzaB, borderWidth: "1.5px" },
          "&:hover fieldset": { borderColor: SAH.verdeCla },
          "&.Mui-focused fieldset": {
            borderColor: SAH.verdeMed,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: `1px solid ${SAH.cinzaB}`,
          boxShadow: "none",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 6, fontWeight: 600, fontSize: "0.6875rem" },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          "& th": {
            backgroundColor: SAH.cinzaF,
            color: SAH.cinzaT,
            fontSize: "0.6875rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            borderBottom: `1px solid ${SAH.cinzaB}`,
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: SAH.cinzaB,
          fontSize: "0.8125rem",
          padding: "12px 16px",
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:hover": { backgroundColor: alpha(SAH.verdeBg, 0.5) },
        },
      },
    },
    MuiDivider: {
      styleOverrides: { root: { borderColor: SAH.cinzaB } },
    },
    MuiTooltip: {
      defaultProps: { arrow: true },
    },
  },
});

export default theme;
export { SAH };
