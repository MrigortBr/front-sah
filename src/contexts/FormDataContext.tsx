'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '@/lib/api';
import type { ApiResponse, FormListData, Technician } from '@/types';

interface FormDataContextValue {
  data:    FormListData | null;
  loading: boolean;
  error:   string | null;
  refresh: () => Promise<void>;
}

const FormDataContext = createContext<FormDataContextValue | undefined>(undefined);

// ── STATIC FALLBACK (same data as the mock JSON) ──────────────
// Used while API is unavailable / not yet integrated.
const STATIC_FALLBACK: FormListData = {
  info: {
    tipoHabilitacao: [
      { codigo: '17.04', descricao: 'Serviço Isolado de Radioterapia',            categoria: 'Não Definido' },
      { codigo: '17.06', descricao: 'UNACON',                                      categoria: 'Não Definido' },
      { codigo: '17.07', descricao: 'UNACON com Serviço de Radioterapia',          categoria: 'Não Definido' },
      { codigo: '17.08', descricao: 'UNACON com Serviço de Hematologia',           categoria: 'Não Definido' },
      { codigo: '17.09', descricao: 'UNACON com Serviço de Oncologia Pediátrica',  categoria: 'Não Definido' },
      { codigo: '17.10', descricao: 'UNACON Exclusiva de Hematologia',             categoria: 'Não Definido' },
      { codigo: '17.11', descricao: 'UNACON Exclusiva de Oncologia Pediátrica',    categoria: 'Não Definido' },
      { codigo: '17.12', descricao: 'CACON',                                        categoria: 'Não Definido' },
      { codigo: '17.13', descricao: 'CACON com Serviço de Oncologia Pediátrica',   categoria: 'Não Definido' },
      { codigo: '17.14', descricao: 'Hospital Geral com Cirurgia Oncológica',      categoria: 'Não Definido' },
      { codigo: '17.15', descricao: 'Serviço de Radioterapia de Complexo Hospitalar', categoria: 'Não Definido' },
    ],
    diligencia: [
      { id: 1,  title: 'Deliberação CIB' },
      { id: 2,  title: 'Link do Plano de Atenção para o Diagnóstico e o Tratamento do Câncer' },
      { id: 3,  title: 'Relatório de vistoria realizada pela Vigilância Sanitária' },
      { id: 4,  title: 'Relatório do gestor sobre a necessidade dos serviços de saúde' },
      { id: 5,  title: 'Termo de compromisso' },
      { id: 6,  title: 'Cálculo de previsão financeira' },
      { id: 7,  title: 'Declaração do responsável técnico médico' },
      { id: 8,  title: 'Licença de operação emitida pela CNEN' },
      { id: 9,  title: 'Formulário de Classificação e Verificação dos critérios mínimos para habilitação' },
      { id: 10, title: 'Parecer conclusivo do gestor' },
      { id: 11, title: 'Licença Sanitária' },
    ],
  },
  technicians: [
    { id: 1, name: 'Igor', surname: 'Lins' },
  ],
  cnes: [
    { cnes: '0000477', nomeEstabelecimento: 'Hospital Recife' },
  ],
};

function normalizeTechnicians(techs: Technician[]): Technician[] {
  return techs.map((t) => ({ ...t, fullName: `${t.name} ${t.surname}` }));
}

export function FormDataProvider({ children }: { children: React.ReactNode }) {
  const [data,    setData]    = useState<FormListData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get<ApiResponse<FormListData>>('/form/list');
      const d   = res.data.data;
      setData({ ...d, technicians: normalizeTechnicians(d.technicians) });
    } catch {
      // API not reachable — use static fallback so UI still works
      setData({ ...STATIC_FALLBACK, technicians: normalizeTechnicians(STATIC_FALLBACK.technicians) });
      setError('API indisponível — usando dados estáticos de fallback.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  return (
    <FormDataContext.Provider value={{ data, loading, error, refresh: load }}>
      {children}
    </FormDataContext.Provider>
  );
}

export function useFormData() {
  const ctx = useContext(FormDataContext);
  if (!ctx) throw new Error('useFormData must be used inside <FormDataProvider>');
  return ctx;
}
