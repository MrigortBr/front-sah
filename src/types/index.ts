// ─── Habilitação ──────────────────────────────────────────────────────────────

export interface TipoHabilitacao {
  codigo: string;
  descricao: string;
  categoria: string;
}

// ─── Diligência ───────────────────────────────────────────────────────────────

export interface Diligencia {
  id: number;
  title: string;
}

// ─── Técnico ──────────────────────────────────────────────────────────────────

export interface Tecnico {
  id: number;
  name: string;
  surname: string;
}

// ─── CNES ─────────────────────────────────────────────────────────────────────

export interface CnesEstabelecimento {
  cnes: string;
  nomeEstabelecimento: string;
  cnpj?: string;
  naturezaJuridica?: string;
  gestao?: string;
  uf?: string;
  ibgeMunicipio?: string;
  nomeMunicipio?: string;
  regiaoSaude?: string;
  ibgeRegiao?: string;
  macrorregiao?: string;
  numAceleradores?: number;
}

// ─── Situação (estático conforme decisão) ─────────────────────────────────────

export type SituacaoProposta =
  | "Enviada ao MS"
  | "Em análise"
  | "Em diligência"
  | "Rejeitada"
  | "Rejeitada por não atendimento à diligência"
  | "Aprovada"
  | "Portaria Publicada"
  | "Enviada ao DRAC"
  | "Proposta excluída"
  | "Proposta concluída";

export const SITUACOES: SituacaoProposta[] = [
  "Enviada ao MS",
  "Em análise",
  "Em diligência",
  "Rejeitada",
  "Rejeitada por não atendimento à diligência",
  "Aprovada",
  "Portaria Publicada",
  "Enviada ao DRAC",
  "Proposta excluída",
  "Proposta concluída",
];

export type TipoFinanciamento = "CHARR" | "MAC" | "FAEC" | "MAC e FAEC" | "Não há ônus para o MS";

export const TIPOS_FINANCIAMENTO: TipoFinanciamento[] = [
  "CHARR",
  "MAC",
  "FAEC",
  "MAC e FAEC",
  "Não há ônus para o MS",
];

// ─── Proposta ─────────────────────────────────────────────────────────────────

export interface HistoricoHabilitacao {
  ano?: number;
  codigos?: string;
}

export interface Proposta {
  id?: number;
  // Etapa 1 — Identificação
  saips?: string;
  nup: string;
  situacao: SituacaoProposta;
  tipoFinanciamento?: TipoFinanciamento;
  tecnicoId: number;
  numPortaria?: string;
  diligencias: number[];
  dataInicioSaips?: string;
  dataEntradaDecan?: string;
  dataEnvioDrac?: string;
  dataTrabalho?: string;
  // Etapa 2 — Financeiro
  impactoMensal?: number;
  impactoAnual?: number;
  parcelaUnica?: number;
  // Etapa 3+4 — Estabelecimento e Localização
  cnes: string;
  nomeEstabelecimento?: string;
  cnpj?: string;
  naturezaJuridica?: string;
  gestao?: string;
  numAceleradores?: number;
  uf?: string;
  ibgeMunicipio?: string;
  nomeMunicipio?: string;
  regiaoSaude?: string;
  ibgeRegiao?: string;
  macrorregiao?: string;
  // Etapa 5 — Habilitação
  codigosHabilitacao: string[];
  // Etapa 6 — Histórico
  historicoFirstYear?: number;
  historicoFirstCodigos?: string;
  historicoAlteracoes?: HistoricoHabilitacao[];
}

// ─── Info da API ──────────────────────────────────────────────────────────────

export interface InfoResponse {
  tipoHabilitacao: TipoHabilitacao[];
  diligencia: Diligencia[];
}

export interface ApiResponse<T> {
  message: string;
  description: string;
  data: T;
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export type PerfilUsuario = "tecnico" | "gestor";

export interface Usuario {
  id: number;
  nome: string;
  sobrenome: string;
  perfil: PerfilUsuario;
  setor: string;
}

// ─── Habilitação Ativa ────────────────────────────────────────────────────────

export interface HabilitacaoAtiva {
  cnes: string;
  nome: string;
  uf: string;
  municipio: string;
  habilitacao: string;
  codigoHab: string;
  gestao: string;
  aceleradores: number;
  desde: number;
}

// ─── Step do Cadastro ─────────────────────────────────────────────────────────

export interface CadastroStep {
  number: number;
  label: string;
  desc: string;
}

export const CADASTRO_STEPS: CadastroStep[] = [
  { number: 1, label: "Identificação do Processo", desc: "SAIPS, NUP, situação, diligência" },
  { number: 2, label: "Impacto Financeiro", desc: "Mensal, anual, parcela única" },
  { number: 3, label: "Localização", desc: "UF, município, região" },
  { number: 4, label: "Estabelecimento", desc: "CNES, CNPJ, nome" },
  { number: 5, label: "Habilitação", desc: "Código e tipo solicitado" },
  { number: 6, label: "Histórico", desc: "Primeira hab. e alterações" },
];
