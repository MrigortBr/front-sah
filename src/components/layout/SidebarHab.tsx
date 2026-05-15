"use client";

import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import RadioactiveIcon from "@mui/icons-material/Dangerous";
import MapIcon from "@mui/icons-material/Map";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const SIDEBAR_W = 220;

export type HabFilter = "todas" | "CACON" | "UNACON" | "Hosp. Geral Onco" | "Radioterapia";
export type UFFilter = "todas" | "SP" | "MG" | "RJ" | "BA" | string;

const HAB_ITEMS: { key: HabFilter; label: string; icon: React.ReactNode }[] = [
  { key: "todas", label: "Todos", icon: <GridViewIcon fontSize="small" /> },
  { key: "CACON", label: "CACON", icon: <AccountBalanceIcon fontSize="small" /> },
  { key: "UNACON", label: "UNACON", icon: <LocalHospitalIcon fontSize="small" /> },
  { key: "Hosp. Geral Onco", label: "Hosp. Geral Onco", icon: <MedicalServicesIcon fontSize="small" /> },
  { key: "Radioterapia", label: "Radioterapia", icon: <RadioactiveIcon fontSize="small" /> },
];

const UF_ITEMS: { key: UFFilter; label: string }[] = [
  { key: "todas", label: "Todos" },
  { key: "SP", label: "SP" },
  { key: "MG", label: "MG" },
  { key: "RJ", label: "RJ" },
  { key: "BA", label: "BA" },
];

interface Props {
  habFilter: HabFilter;
  onHabFilter: (h: HabFilter) => void;
  ufFilter: UFFilter;
  onUFFilter: (uf: UFFilter) => void;
}

export default function SidebarHab({ habFilter, onHabFilter, ufFilter, onUFFilter }: Props) {
  const activeStyle = {
    "&.Mui-selected": {
      bgcolor: "sah.verdeBg",
      color: "primary.main",
      fontWeight: 600,
      "& .MuiListItemIcon-root": { color: "primary.main" },
    },
  };

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
      <Box sx={{ px: 1.5, mb: 3 }}>
        <Typography variant="caption" sx={{ px: 1, mb: 0.75, display: "block" }}>
          Visualizar por
        </Typography>
        <List dense disablePadding>
          {HAB_ITEMS.map((item) => (
            <ListItemButton
              key={item.key}
              selected={habFilter === item.key}
              onClick={() => onHabFilter(item.key)}
              sx={{ borderRadius: 2, mb: 0.25, ...activeStyle }}
            >
              <ListItemIcon sx={{ minWidth: 30, color: "text.secondary" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                slotProps={{ primary: { sx: { fontSize: "0.8125rem" } } }}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>

      <Box sx={{ px: 1.5 }}>
        <Typography variant="caption" sx={{ px: 1, mb: 0.75, display: "block" }}>
          UF
        </Typography>
        <List dense disablePadding>
          {UF_ITEMS.map((item) => (
            <ListItemButton
              key={item.key}
              selected={ufFilter === item.key}
              onClick={() => onUFFilter(item.key)}
              sx={{ borderRadius: 2, mb: 0.25, ...activeStyle }}
            >
              <ListItemIcon sx={{ minWidth: 30, color: "text.secondary" }}>
                {item.key === "todas" ? (
                  <MapIcon fontSize="small" />
                ) : (
                  <LocationOnIcon fontSize="small" />
                )}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                slotProps={{ primary: { sx: { fontSize: "0.8125rem" } } }}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
