"use client";

import { useEffect, useState } from "react";
import { Tecnico } from "@/types";
import { getTechnicians } from "@/services/api";

export function useTechnicians() {
  const [technicians, setTechnicians] = useState<Tecnico[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    getTechnicians()
      .then((data) => { if (active) setTechnicians(data); })
      .catch(() => {
        if (active) {
          // Fallback: usa dados do retorno.json mockado enquanto API não tem endpoint dedicado
          setTechnicians([{ id: 1, name: "Igor", surname: "Lins" }]);
          setError("Usando dados locais — endpoint de técnicos indisponível");
        }
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  return { technicians, loading, error };
}

export function useTechnicianName(tecnico: Tecnico) {
  return `${tecnico.name} ${tecnico.surname}`;
}
