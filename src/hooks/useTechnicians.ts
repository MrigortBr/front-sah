"use client";

import { useEffect, useState } from "react";
import { Tecnico } from "@/types";
import { getInfo } from "@/services/api";

export function useTechnicians() {
  const [technicians, setTechnicians] = useState<Tecnico[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    getInfo()
      .then((data) => {
        if (active) setTechnicians(data.technicians);
      })
      .catch(() => {
        if (active) {
          setError("Não foi possível carregar técnicos.");
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

  return { technicians, loading, error };
}

export function useTechnicianName(tecnico: Tecnico) {
  return `${tecnico.name} ${tecnico.surname}`;
}
