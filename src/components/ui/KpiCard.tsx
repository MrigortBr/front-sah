"use client";

import React from "react";
import { Box, Card, Typography } from "@mui/material";

type KpiVariant = "analise" | "drac" | "diligencia" | "aprovadas";

const VARIANT_COLOR: Record<KpiVariant, string> = {
  analise: "#FFCD00",
  drac: "#1565C0",
  diligencia: "#E65100",
  aprovadas: "#3DA06A",
};

interface KpiCardProps {
  variant: KpiVariant;
  label: string;
  value: number | string;
  delta?: string;
  deltaType?: "up" | "warn" | "neu";
  icon?: string;
}

export default function KpiCard({
  variant,
  label,
  value,
  delta,
  deltaType = "neu",
  icon,
}: KpiCardProps) {
  const accentColor = VARIANT_COLOR[variant];

  const deltaColor =
    deltaType === "up"
      ? "#2E7D52"
      : deltaType === "warn"
      ? "#E65100"
      : "#6B7B6E";

  return (
    <Card
      sx={{
        p: "20px 22px",
        position: "relative",
        overflow: "hidden",
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 3,
          bgcolor: accentColor,
        },
      }}
    >
      {icon && (
        <Typography
          sx={{
            position: "absolute",
            top: 16,
            right: 18,
            fontSize: 28,
            opacity: 0.12,
            lineHeight: 1,
          }}
        >
          {icon}
        </Typography>
      )}
      <Typography
        variant="caption"
        sx={{ display: "block", color: "text.secondary", mb: 1.25 }}
      >
        {label}
      </Typography>
      <Typography
        sx={{
          fontFamily: '"IBM Plex Mono", monospace',
          fontSize: 36,
          fontWeight: 700,
          lineHeight: 1,
          mb: 0.5,
          color: "text.primary",
        }}
      >
        {value}
      </Typography>
      {delta && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Typography sx={{ fontSize: "0.6875rem", color: deltaColor }}>
            {delta}
          </Typography>
        </Box>
      )}
    </Card>
  );
}
