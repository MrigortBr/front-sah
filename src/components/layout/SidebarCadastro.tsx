"use client";

import React from "react";
import { Box, Divider, Stack, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { CADASTRO_STEPS } from "@/types";
import { SAH } from "@/theme";

const SIDEBAR_W = 240;

interface Props {
  currentStep: number;           // 1-based, currently active section
  completedSteps: Set<number>;   // step numbers already filled
}

export default function SidebarCadastro({ currentStep, completedSteps }: Props) {
  return (
    <Box
      sx={{
        width: SIDEBAR_W,
        flexShrink: 0,
        bgcolor: "background.paper",
        borderRight: "1px solid",
        borderColor: "divider",
        height: "100%",
        overflow: "auto",
      }}
    >
      <Box
        sx={{
          px: 2.5,
          py: 2,
          borderBottom: "1px solid",
          borderColor: "divider",
          mb: 1.5,
        }}
      >
        <Typography
          variant="caption"
          sx={{ color: "text.secondary", display: "block", mb: 0.25 }}
        >
          Nova proposta
        </Typography>
        <Typography sx={{ fontSize: 13, fontWeight: 700 }}>
          Etapas de preenchimento
        </Typography>
      </Box>

      <Stack spacing={0} sx={{ px: 1.5, pb: 2 }}>
        {CADASTRO_STEPS.map((step, idx) => {
          const isActive = currentStep === step.number;
          const isDone = completedSteps.has(step.number);
          const isUpcoming = !isActive && !isDone;

          return (
            <Box key={step.number} sx={{ display: "flex", gap: 1.5, py: 1.25, px: 1 }}>
              {/* Bullet */}
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                <Box
                  sx={{
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: 11,
                    fontWeight: 700,
                    flexShrink: 0,
                    ...(isActive && {
                      bgcolor: "primary.main",
                      color: "#fff",
                      boxShadow: `0 0 0 3px ${SAH.verdeBg}`,
                    }),
                    ...(isDone && {
                      bgcolor: SAH.verdeBg,
                      color: "primary.main",
                      border: `2px solid ${SAH.verdeMed}`,
                    }),
                    ...(isUpcoming && {
                      bgcolor: SAH.cinzaF,
                      color: SAH.cinzaT,
                      border: `1.5px solid ${SAH.cinzaB}`,
                    }),
                  }}
                >
                  {isDone ? <CheckIcon sx={{ fontSize: 14 }} /> : step.number}
                </Box>

                {/* Connector line */}
                {idx < CADASTRO_STEPS.length - 1 && (
                  <Box
                    sx={{
                      width: 2,
                      flex: 1,
                      minHeight: 16,
                      mt: 0.5,
                      bgcolor: isDone ? SAH.verdeCla : SAH.cinzaB,
                      borderRadius: 1,
                    }}
                  />
                )}
              </Box>

              {/* Label */}
              <Box sx={{ pt: 0.25 }}>
                <Typography
                  sx={{
                    fontSize: "0.8125rem",
                    fontWeight: isActive ? 700 : isDone ? 600 : 500,
                    color: isActive
                      ? "primary.main"
                      : isDone
                      ? "text.primary"
                      : "text.secondary",
                    lineHeight: 1.3,
                  }}
                >
                  {step.label}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.6875rem",
                    color: "text.secondary",
                    mt: 0.25,
                    lineHeight: 1.4,
                  }}
                >
                  {step.desc}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}
