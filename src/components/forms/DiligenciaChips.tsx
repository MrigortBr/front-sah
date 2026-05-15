"use client";

import React from "react";
import { Box, Chip, Stack, Typography } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { Diligencia } from "@/types";
import { SAH } from "@/theme";

interface Props {
  diligencias: Diligencia[];
  selected: number[];
  onChange: (ids: number[]) => void;
}

export default function DiligenciaChips({ diligencias, selected, onChange }: Props) {
  const toggle = (id: number) => {
    onChange(
      selected.includes(id) ? selected.filter((d) => d !== id) : [...selected, id]
    );
  };

  const selectedItems = diligencias.filter((d) => selected.includes(d.id));

  return (
    <Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {diligencias.map((d) => {
          const isSelected = selected.includes(d.id);
          return (
            <Chip
              key={d.id}
              label={d.title}
              onClick={() => toggle(d.id)}
              variant={isSelected ? "filled" : "outlined"}
              size="small"
              sx={{
                cursor: "pointer",
                fontSize: "0.75rem",
                height: "auto",
                py: 0.5,
                "& .MuiChip-label": { whiteSpace: "normal", textAlign: "left" },
                ...(isSelected
                  ? {
                      bgcolor: "#FFF3E0",
                      color: SAH.laranja,
                      borderColor: "#FFCC80",
                      fontWeight: 600,
                      "&:hover": { bgcolor: "#FFE0B2" },
                    }
                  : {
                      bgcolor: SAH.cinzaF,
                      borderColor: SAH.cinzaB,
                      color: SAH.texto,
                      "&:hover": { borderColor: "#FFCC80", bgcolor: "#FFF9E0" },
                    }),
              }}
            />
          );
        })}
      </Box>

      {selectedItems.length > 0 && (
        <Box
          sx={{
            mt: 2,
            p: 1.5,
            bgcolor: "#FFF9E0",
            border: `1.5px solid #FFCC80`,
            borderRadius: 2,
          }}
        >
          <Typography
            variant="caption"
            sx={{ color: "#7A3800", display: "block", mb: 0.75 }}
          >
            Diligências selecionadas
          </Typography>
          <Stack spacing={0.5}>
            {selectedItems.map((d) => (
              <Box
                key={d.id}
                sx={{ display: "flex", alignItems: "flex-start", gap: 0.75 }}
              >
                <WarningAmberIcon
                  sx={{ fontSize: 14, color: SAH.laranja, mt: "2px", flexShrink: 0 }}
                />
                <Typography sx={{ fontSize: "0.8125rem" }}>{d.title}</Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
}
