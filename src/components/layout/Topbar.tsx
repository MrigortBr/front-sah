"use client";

import React, { useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ptBR } from "date-fns/locale";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "@/contexts/AuthContext";
import { useWorkDate } from "@/contexts/WorkDateContext";
import { useRouter } from "next/navigation";

export default function Topbar() {
  const { user, logout } = useAuth();
  const { workDate, setWorkDate, workDateFormatted } = useWorkDate();
  const router = useRouter();
  const [dateOpen, setDateOpen] = useState(false);
  const [tempDate, setTempDate] = useState<Date>(workDate);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleConfirmDate = () => {
    setWorkDate(tempDate);
    setDateOpen(false);
  };

  const initials = user
    ? `${user.nome[0]}${user.sobrenome[0]}`.toUpperCase()
    : "??";

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{ bgcolor: "primary.main", zIndex: (t) => t.zIndex.drawer + 1 }}
      >
        <Toolbar sx={{ minHeight: 56, px: 3.5, gap: 2 }}>
          {/* Brand */}
          <Stack direction="row" sx={{ alignItems: "center", gap: 1.5, flexGrow: 0 }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                bgcolor: "secondary.main",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: 13,
                fontWeight: 700,
                color: "primary.main",
                flexShrink: 0,
              }}
            >
              MS
            </Box>
            <Box>
              <Typography
                sx={{ fontSize: 14, fontWeight: 700, color: "#fff", lineHeight: 1.2 }}
              >
                SAH
              </Typography>
              <Typography
                sx={{
                  fontSize: 10,
                  color: "rgba(255,255,255,0.5)",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  lineHeight: 1,
                }}
              >
                Acompanhamento de Habilitações
              </Typography>
            </Box>
          </Stack>

          <Box sx={{ flexGrow: 1 }} />

          {/* Data de trabalho */}
          <Tooltip title="Alterar data de trabalho">
            <Button
              startIcon={<CalendarTodayIcon sx={{ fontSize: "14px !important" }} />}
              onClick={() => { setTempDate(workDate); setDateOpen(true); }}
              sx={{
                color: "rgba(255,255,255,0.85)",
                bgcolor: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "6px",
                fontSize: 12,
                fontFamily: '"IBM Plex Mono", monospace',
                px: 1.5,
                py: 0.625,
                minWidth: 0,
                "&:hover": { bgcolor: "rgba(255,255,255,0.18)", color: "#fff" },
              }}
            >
              {workDateFormatted}
            </Button>
          </Tooltip>

          {/* Usuário */}
          <Stack direction="row" sx={{ alignItems: "center", gap: 1 }}>
            <Avatar
              sx={{
                width: 30,
                height: 30,
                bgcolor: "rgba(255,255,255,0.2)",
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              {initials}
            </Avatar>
            <Box>
              <Typography sx={{ fontSize: 12, color: "rgba(255,255,255,0.9)", fontWeight: 600, lineHeight: 1.2 }}>
                {user ? `${user.nome} ${user.sobrenome}` : "—"}
              </Typography>
              <Typography
                sx={{
                  fontSize: 10,
                  color: "rgba(255,255,255,0.45)",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  lineHeight: 1,
                }}
              >
                {user?.perfil === "gestor" ? "Gestor" : "Técnico"} · {user?.setor ?? "DECAN"}
              </Typography>
            </Box>
          </Stack>

          {/* Logout */}
          <Tooltip title="Sair">
            <IconButton
              onClick={handleLogout}
              size="small"
              sx={{
                color: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "6px",
                p: 0.75,
                "&:hover": { bgcolor: "rgba(255,255,255,0.18)", color: "#fff" },
              }}
            >
              <LogoutIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      {/* Dialog de data de trabalho */}
      <Dialog open={dateOpen} onClose={() => setDateOpen(false)} maxWidth="xs">
        <DialogTitle sx={{ fontWeight: 700, fontSize: 16 }}>
          📅 Data de Trabalho
        </DialogTitle>
        <DialogContent sx={{ pt: 0 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Define a data de referência para registros e filtros da sessão.
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
            <DateCalendar
              value={tempDate}
              onChange={(d) => d && setTempDate(d)}
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setDateOpen(false)} color="inherit">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDate} variant="contained">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
