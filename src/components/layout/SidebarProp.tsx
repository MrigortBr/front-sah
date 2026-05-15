"use client";

import React from "react";
import {
  Badge,
  Box,
  Chip,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SyncIcon from "@mui/icons-material/Sync";
import SendIcon from "@mui/icons-material/Send";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArticleIcon from "@mui/icons-material/Article";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import { Tecnico } from "@/types";
import { useTechnicianName } from "@/hooks/useTechnicians";

const SIDEBAR_W = 220;

export type SituacaoFilter =
  | "todas"
  | "Em análise"
  | "Enviada ao DRAC"
  | "Em diligência"
  | "Aprovada"
  | "Portaria Publicada";

interface Props {
  situacaoFilter: SituacaoFilter;
  onSituacaoFilter: (s: SituacaoFilter) => void;
  tecnicoFilter: number | null;
  onTecnicoFilter: (id: number | null) => void;
  technicians: Tecnico[];
  counts: Partial<Record<SituacaoFilter, number>>;
}

const SIT_ITEMS: { key: SituacaoFilter; label: string; icon: React.ReactNode; chipColor: string; chipBg: string }[] = [
  { key: "todas", label: "Todas", icon: <AssignmentIcon fontSize="small" />, chipColor: "", chipBg: "" },
  { key: "Em análise", label: "Em análise", icon: <SyncIcon fontSize="small" />, chipColor: "#7A5500", chipBg: "#FFF9E0" },
  { key: "Enviada ao DRAC", label: "No DRAC", icon: <SendIcon fontSize="small" />, chipColor: "#1565C0", chipBg: "#E3EEFF" },
  { key: "Em diligência", label: "Em diligência", icon: <WarningAmberIcon fontSize="small" />, chipColor: "#E65100", chipBg: "#FFF3E0" },
  { key: "Aprovada", label: "Aprovadas", icon: <CheckCircleOutlineIcon fontSize="small" />, chipColor: "#1B5E3B", chipBg: "#EAF4EF" },
  { key: "Portaria Publicada", label: "Portaria Publicada", icon: <ArticleIcon fontSize="small" />, chipColor: "#6A1B9A", chipBg: "#F3E5F5" },
];

function TecnicoItem({ tecnico }: { tecnico: Tecnico }) {
  return <>{useTechnicianName(tecnico)}</>;
}

export default function SidebarProp({
  situacaoFilter,
  onSituacaoFilter,
  tecnicoFilter,
  onTecnicoFilter,
  technicians,
  counts,
}: Props) {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: SIDEBAR_W,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: SIDEBAR_W,
          position: "relative",
          border: "none",
          borderRight: "1px solid",
          borderColor: "divider",
          height: "100%",
          overflow: "auto",
          py: 2.5,
        },
      }}
    >
      {/* Situação */}
      <Box sx={{ px: 1.5, mb: 3 }}>
        <Typography variant="caption" sx={{ px: 1, mb: 0.75, display: "block" }}>
          Situação
        </Typography>
        <List dense disablePadding>
          {SIT_ITEMS.map((item) => (
            <ListItemButton
              key={item.key}
              selected={situacaoFilter === item.key}
              onClick={() => onSituacaoFilter(item.key)}
              sx={{
                borderRadius: 2,
                mb: 0.25,
                "&.Mui-selected": {
                  bgcolor: "sah.verdeBg",
                  color: "primary.main",
                  fontWeight: 600,
                  "& .MuiListItemIcon-root": { color: "primary.main" },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 30, color: "text.secondary" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                slotProps={{ primary: { sx: { fontSize: "0.8125rem", fontWeight: situacaoFilter === item.key ? 600 : 500 } } }}
              />
              {item.key !== "todas" && counts[item.key] !== undefined && (
                <Chip
                  label={counts[item.key]}
                  size="small"
                  sx={{
                    height: 18,
                    fontSize: "0.6875rem",
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontWeight: 600,
                    bgcolor: item.chipBg || "#E4EBE6",
                    color: item.chipColor || "#6B7B6E",
                    "& .MuiChip-label": { px: 0.75 },
                  }}
                />
              )}
            </ListItemButton>
          ))}
        </List>
      </Box>

      {/* Técnico */}
      <Box sx={{ px: 1.5 }}>
        <Typography variant="caption" sx={{ px: 1, mb: 0.75, display: "block" }}>
          Técnico
        </Typography>
        <List dense disablePadding>
          <ListItemButton
            selected={tecnicoFilter === null}
            onClick={() => onTecnicoFilter(null)}
            sx={{
              borderRadius: 2,
              mb: 0.25,
              "&.Mui-selected": { bgcolor: "sah.verdeBg", color: "primary.main" },
            }}
          >
            <ListItemIcon sx={{ minWidth: 30 }}>
              <PeopleIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary="Todos"
              slotProps={{ primary: { sx: { fontSize: "0.8125rem", fontWeight: tecnicoFilter === null ? 600 : 500 } } }}
            />
          </ListItemButton>

          {technicians.map((t) => (
            <ListItemButton
              key={t.id}
              selected={tecnicoFilter === t.id}
              onClick={() => onTecnicoFilter(t.id)}
              sx={{
                borderRadius: 2,
                mb: 0.25,
                "&.Mui-selected": { bgcolor: "sah.verdeBg", color: "primary.main" },
              }}
            >
              <ListItemIcon sx={{ minWidth: 30 }}>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={`${t.name} ${t.surname}`}
                slotProps={{ primary: { sx: { fontSize: "0.8125rem", fontWeight: tecnicoFilter === t.id ? 600 : 500 } } }}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
