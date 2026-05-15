"use client";

import React, { createContext, useCallback, useContext, useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface WorkDateContextValue {
  workDate: Date;
  setWorkDate: (d: Date) => void;
  workDateFormatted: string;  // "28/04/2025"
  workDateISO: string;        // "2025-04-28"
}

const WorkDateContext = createContext<WorkDateContextValue | null>(null);

export function WorkDateProvider({ children }: { children: React.ReactNode }) {
  const [workDate, setWorkDateState] = useState<Date>(() => new Date());

  const setWorkDate = useCallback((d: Date) => {
    setWorkDateState(d);
  }, []);

  const workDateFormatted = format(workDate, "dd/MM/yyyy", { locale: ptBR });
  const workDateISO = format(workDate, "yyyy-MM-dd");

  return (
    <WorkDateContext.Provider value={{ workDate, setWorkDate, workDateFormatted, workDateISO }}>
      {children}
    </WorkDateContext.Provider>
  );
}

export function useWorkDate() {
  const ctx = useContext(WorkDateContext);
  if (!ctx) throw new Error("useWorkDate must be used within WorkDateProvider");
  return ctx;
}
