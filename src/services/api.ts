import axios from "axios";
import {
  ApiResponse,
  CnesEstabelecimento,
  Diligencia,
  InfoResponse,
  Proposta,
  Tecnico,
  TipoHabilitacao,
} from "@/types";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:2000",
  headers: { "Content-Type": "application/json" },
});

// Request interceptor — injeta token quando existir
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("sah_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor — redireciona para login em 401
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("sah_token");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

// ─── Info (tipos de habilitação + diligências) ────────────────────────────────

export async function getInfo(): Promise<{
  tipoHabilitacao: TipoHabilitacao[];
  diligencia: Diligencia[];
  technicians: Tecnico[];
}> {
  const res = await api.get<ApiResponse<{ info: InfoResponse; technicians: Tecnico[]; cnes: CnesEstabelecimento[] }>>(
    "/proposals/info"
  );
  return {
    tipoHabilitacao: res.data.data.info.tipoHabilitacao,
    diligencia: res.data.data.info.diligencia,
    technicians: res.data.data.technicians,
  };
}

// ─── Técnicos ─────────────────────────────────────────────────────────────────

export async function getTechnicians(): Promise<Tecnico[]> {
  const res = await api.get<ApiResponse<{ technicians: Tecnico[] }>>("/technicians");
  return res.data.data.technicians;
}

// ─── CNES ─────────────────────────────────────────────────────────────────────

export async function getCnes(cnes: string): Promise<CnesEstabelecimento | null> {
  try {
    const res = await api.get<ApiResponse<{ cnes: CnesEstabelecimento }>>(`/cnes/${cnes}`);
    return res.data.data.cnes;
  } catch {
    return null;
  }
}

// ─── Propostas ────────────────────────────────────────────────────────────────

export async function getPropostas(): Promise<Proposta[]> {
  const res = await api.get<ApiResponse<{ proposals: Proposta[] }>>("/proposals");
  return res.data.data.proposals;
}

export async function createProposta(data: Proposta): Promise<Proposta> {
  const res = await api.post<ApiResponse<{ proposal: Proposta }>>("/proposals", data);
  return res.data.data.proposal;
}

export async function updateProposta(id: number, data: Partial<Proposta>): Promise<Proposta> {
  const res = await api.put<ApiResponse<{ proposal: Proposta }>>(`/proposals/${id}`, data);
  return res.data.data.proposal;
}

export default api;
