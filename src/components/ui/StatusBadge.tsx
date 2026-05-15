"use client";

import React from "react";
import { Chip, ChipProps } from "@mui/material";
import { SituacaoProposta } from "@/types";

const STATUS_MAP: Record<
  SituacaoProposta,
  { label: string; color: ChipProps["color"]; sx?: object }
> = {
  "Em análise": {
    label: "Em análise",
    color: "warning",
    sx: { bgcolor: "#FFF9E0", color: "#7A5500", border: "none" },
  },
  "Enviada ao DRAC": {
    label: "No DRAC",
    color: "info",
    sx: { bgcolor: "#E3EEFF", color: "#1565C0", border: "none" },
  },
  "Em diligência": {
    label: "Em diligência",
    color: "warning",
    sx: { bgcolor: "#FFF3E0", color: "#E65100", border: "none" },
  },
  "Aprovada": {
    label: "Aprovada",
    color: "success",
    sx: { bgcolor: "#EAF4EF", color: "#1B5E3B", border: "none" },
  },
  "Portaria Publicada": {
    label: "Portaria Publicada",
    color: "secondary",
    sx: { bgcolor: "#F3E5F5", color: "#6A1B9A", border: "none" },
  },
  "Enviada ao MS": {
    label: "Enviada ao MS",
    color: "default",
    sx: { bgcolor: "#E4EBE6", color: "#6B7B6E", border: "none" },
  },
  "Rejeitada": {
    label: "Rejeitada",
    color: "error",
    sx: { bgcolor: "#FEE2E2", color: "#C0392B", border: "none" },
  },
  "Rejeitada por não atendimento à diligência": {
    label: "Rej. diligência",
    color: "error",
    sx: { bgcolor: "#FEE2E2", color: "#C0392B", border: "none" },
  },
  "Proposta excluída": {
    label: "Excluída",
    color: "default",
    sx: { bgcolor: "#E4EBE6", color: "#6B7B6E", border: "none" },
  },
  "Proposta concluída": {
    label: "Concluída",
    color: "success",
    sx: { bgcolor: "#EAF4EF", color: "#1B5E3B", border: "none" },
  },
};

interface StatusBadgeProps {
  situacao: SituacaoProposta;
  size?: ChipProps["size"];
}

export default function StatusBadge({ situacao, size = "small" }: StatusBadgeProps) {
  const cfg = STATUS_MAP[situacao] ?? {
    label: situacao,
    color: "default" as ChipProps["color"],
    sx: {},
  };

  return (
    <Chip
      label={cfg.label}
      size={size}
      sx={{
        fontWeight: 600,
        fontSize: "0.6875rem",
        fontFamily: '"IBM Plex Mono", monospace',
        ...cfg.sx,
      }}
    />
  );
}
