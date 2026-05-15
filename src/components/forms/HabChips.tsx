"use client";

import React from "react";
import { Box, Chip, Stack, Typography } from "@mui/material";
import { TipoHabilitacao } from "@/types";
import { SAH } from "@/theme";

interface Props {
  tipos: TipoHabilitacao[];
  selected: string[];
  onChange: (codes: string[]) => void;
}

export default function HabChips({ tipos, selected, onChange }: Props) {
  const toggle = (codigo: string) => {
    onChange(
      selected.includes(codigo)
        ? selected.filter((c) => c !== codigo)
        : [...selected, codigo]
    );
  };

  const selectedTipos = tipos.filter((t) => selected.includes(t.codigo));

  return (
    <Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {tipos.map((t) => {
          const isSelected = selected.includes(t.codigo);
          return (
            <Chip
              key={t.codigo}
              label={t.codigo}
              onClick={() => toggle(t.codigo)}
              variant={isSelected ? "filled" : "outlined"}
              sx={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: "0.8125rem",
                fontWeight: 700,
                cursor: "pointer",
                ...(isSelected
                  ? {
                      bgcolor: SAH.verde,
                      color: "#fff",
                      borderColor: SAH.verde,
                      "&:hover": { bgcolor: SAH.verdeMed },
                    }
                  : {
                      bgcolor: SAH.cinzaF,
                      borderColor: SAH.cinzaB,
                      color: SAH.texto,
                      "&:hover": { borderColor: SAH.verdeCla, bgcolor: SAH.verdeBg },
                    }),
              }}
            />
          );
        })}
      </Box>

      {selectedTipos.length > 0 && (
        <Box
          sx={{
            mt: 2,
            p: 1.5,
            bgcolor: SAH.verdeBg,
            borderRadius: 2,
            border: `1px solid ${SAH.cinzaB}`,
          }}
        >
          <Typography variant="caption" sx={{ display: "block", mb: 1 }}>
            Habilitação(ões) selecionada(s)
          </Typography>
          <Stack spacing={0.75}>
            {selectedTipos.map((t) => (
              <Box key={t.codigo} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography
                  sx={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: SAH.verde,
                    bgcolor: "#fff",
                    px: 0.75,
                    py: 0.25,
                    borderRadius: 1,
                    border: `1px solid ${SAH.cinzaB}`,
                    flexShrink: 0,
                  }}
                >
                  {t.codigo}
                </Typography>
                <Typography sx={{ fontSize: "0.8125rem", color: SAH.texto }}>
                  {t.descricao}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
}
