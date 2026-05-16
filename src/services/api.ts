import axios from "axios";
import {
  ApiResponse,
  CnesEstabelecimento,
  Diligencia,
  InfoResponse,
  Proposta,
  Tecnico,
  TipoHabilitacao,
  PropostaSimples,
} from "@/types";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:2000",
  headers: { "Content-Type": "application/json" },
});

// Request interceptor — injeta token quando existir (sem prefixo Bearer)
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("sah_token");
    if (token) config.headers.Authorization = token;
  }
  return config;
});

// Response interceptor — redireciona para login em 401
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("sah_token");
      localStorage.removeItem("sah_user");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

// ─── Auth ────────────────────────────────────────────────────────────────────

export async function loginUser(
  email: string,
  password: string,
  remember = true
): Promise<string> {
  const res = await api.post<ApiResponse<{ jwt: string }>>(
    "/login",
    { email, password, remember }
  );
  return res.data.data.jwt;
}

export async function logoutUser(): Promise<void> {
  try {
    await api.delete("/loggout");
  } catch {
    // ignora erros de rede; limpar localStorage é suficiente
  }
}

// ─── Info (tipos de habilitação + diligências + técnicos + CNES list) ─────────

export async function getInfo(): Promise<{
  tipoHabilitacao: TipoHabilitacao[];
  diligencia: Diligencia[];
  technicians: Tecnico[];
  cnesList: { cnes: string; nomeEstabelecimento: string }[];
}> {
  const res = await api.get<
    ApiResponse<{
      typeHab: TipoHabilitacao[];
      diligencia: Diligencia[];
      technicians: Tecnico[];
      cnes: { cnes: string; nomeEstabelecimento: string }[];
    }>
  >("/proposal");
  const d = res.data.data;
  return {
    tipoHabilitacao: d.typeHab ?? [],
    diligencia: d.diligencia ?? [],
    technicians: d.technicians ?? [],
    cnesList: d.cnes ?? [],
  };
}

// ─── CNES ─────────────────────────────────────────────────────────────────────

const CNES_API = "https://apidadosabertos.saude.gov.br/v1";

export async function getCnes(cnes: string): Promise<CnesEstabelecimento | null> {
  try {
    const res = await axios.get<{
      total: number;
      itens: {
        codigo_cnes: string;
        nome_razao_social: string;
        cnpj_estabelecimento?: string;
        descricao_natureza_juridica_estabelecimento?: string;
        descricao_tipo_gestao?: string;
        sigla_uf?: string;
        codigo_municipio_ibge?: string | number;
        nome_municipio?: string;
        descricao_regiao_saude?: string;
        codigo_regiao_saude?: string | number;
        descricao_macro_regiao_saude?: string;
      }[];
    }>(`${CNES_API}/cnes/estabelecimentos`, {
      params: { codigo_cnes: cnes.padStart(7, "0"), limit: 1, offset: 0 },
    });

    const item = res.data?.itens?.[0];
    if (!item) return null;

    return {
      cnes: item.codigo_cnes,
      nomeEstabelecimento: item.nome_razao_social,
      cnpj: item.cnpj_estabelecimento,
      naturezaJuridica: item.descricao_natureza_juridica_estabelecimento,
      gestao: item.descricao_tipo_gestao,
      uf: item.sigla_uf,
      ibgeMunicipio: item.codigo_municipio_ibge != null ? String(item.codigo_municipio_ibge) : undefined,
      nomeMunicipio: item.nome_municipio,
      regiaoSaude: item.descricao_regiao_saude,
      ibgeRegiao: item.codigo_regiao_saude != null ? String(item.codigo_regiao_saude) : undefined,
      macrorregiao: item.descricao_macro_regiao_saude,
    };
  } catch {
    return null;
  }
}

// ─── Propostas ────────────────────────────────────────────────────────────────

// Retorna lista simplificada para a tela de listagem
export async function getPropostas(): Promise<PropostaSimples[]> {
  const res = await api.get<
    ApiResponse<
      {
        id_habilitacao: number;
        nome_estabelecimento: string;
        cnes_estabelecimento: string;
        uf_estabelecimento: string;
        tecnico: string | null;
        situacao: string;
        tipohabilitacao: { id: number; codigo: string; descricao: string; categoria: string }[];
        inicio_saips: string;
      }[]
    >
  >("/proposal/simpleForms");

  return (res.data.data ?? []).map((h) => ({
    id: h.id_habilitacao,
    cnes: h.cnes_estabelecimento,
    nome: h.nome_estabelecimento,
    uf: h.uf_estabelecimento,
    cod: h.tipohabilitacao?.[0]?.codigo ?? "",
    hab: h.tipohabilitacao?.[0]?.descricao ?? "",
    situacao: h.situacao,
    tecnico: h.tecnico,
    entrada: h.inicio_saips
      ? new Date(h.inicio_saips).toLocaleDateString("pt-BR")
      : "",
  }));
}

// Retorna proposta completa por ID
export async function getPropostaById(id: number): Promise<Proposta> {
  const res = await api.get<ApiResponse<Proposta>>(`/proposal/list/${id}`);
  return res.data.data;
}

// Cria nova proposta
export async function createProposta(data: Proposta): Promise<void> {
  await api.put("/proposal", toBodyExpected(data));
}

// Atualiza proposta existente
export async function updateProposta(
  id: number,
  data: Partial<Proposta>
): Promise<void> {
  await api.patch(`/proposal/${id}`, toBodyExpected(data as Proposta));
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function toBodyExpected(data: Proposta) {
  return {
    saips: data.saips ?? "",
    nup: data.nup,
    situacao: data.situacao,
    tipo_financiamento: data.tipoFinanciamento ?? "",
    tecnico_responsavel_id: data.tecnicoId,
    numero_portaria: data.numPortaria ?? "",
    inicio_saips: data.dataInicioSaips
      ? new Date(data.dataInicioSaips).toISOString()
      : new Date().toISOString(),
    entrada_decan: data.dataEntradaDecan
      ? new Date(data.dataEntradaDecan).toISOString()
      : new Date().toISOString(),
    envio_drac: data.dataEnvioDrac
      ? new Date(data.dataEnvioDrac).toISOString()
      : new Date().toISOString(),
    inpacto_mensal: data.impactoMensal ?? 0,
    parcela_unica: data.parcelaUnica ?? 0,
    cnes: data.cnes,
    numero_aceleradores: data.numAceleradores ?? 0,
    tipohabilitacao: data.codigosHabilitacao ?? [],
    diligencia: data.diligencias ?? [],
    hitorico: (data.historicoAlteracoes ?? []).map((h, i) => ({
      sequencia: String(i + 1),
      anoAlteracao: String(h.ano ?? ""),
      codigos: h.codigos ?? "",
    })),
  };
}

export default api;
