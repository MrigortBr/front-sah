// ── API response wrapper ─────────────────────────────────────
export interface ApiResponse<T> {
  message: string;
  description: string;
  data: T;
}

// ── Form list data (GET /form/list) ──────────────────────────
export interface TipoHabilitacao {
  codigo: string;
  descricao: string;
  categoria: string;
}

export interface Diligencia {
  id: number;
  title: string;
}

export interface Technician {
  id: number;
  name: string;
  surname: string;
  /** computed full name */
  fullName?: string;
}

export interface CnesEstabelecimento {
  cnes: string;
  nomeEstabelecimento: string;
}

export interface FormListInfo {
  tipoHabilitacao: TipoHabilitacao[];
  diligencia: Diligencia[];
}

export interface FormListData {
  info: FormListInfo;
  technicians: Technician[];
  cnes: CnesEstabelecimento[];
}

// ── Situação (static) ─────────────────────────────────────────
export type SituacaoId =
  | 'todas'
  | 'em_analise'
  | 'no_drac'
  | 'em_diligencia'
  | 'aprovada'
  | 'portaria_publicada';

export interface Situacao {
  id: SituacaoId;
  label: string;
  icon: string;
  color: 'default' | 'warning' | 'info' | 'error' | 'success' | 'secondary';
  count?: number;
}

// ── Proposta ──────────────────────────────────────────────────
export interface Proposta {
  id: number;
  cnes: string;
  nomeEstabelecimento: string;
  uf: string;
  municipio: string;
  habilitacao: string;
  situacao: SituacaoId;
  tecnico: string;
  dataEntrada: string;
  dataTrabalho?: string;
}

// ── CNES lookup (mock) ────────────────────────────────────────
export interface CnesData {
  nome: string;
  cnpj: string;
  natureza: string;
  gestao: string;
  uf: string;
  ibge_mun: string;
  municipio: string;
  regiao: string;
  ibge_reg: string;
  macro: string;
}

// ── Cadastro form ─────────────────────────────────────────────
export interface CadastroFormValues {
  cnes: string;
  nomeEstabelecimento: string;
  cnpj: string;
  naturezaJuridica: string;
  gestao: string;
  uf: string;
  ibgeMunicipio: string;
  nomeMunicipio: string;
  regiaoSaude: string;
  ibgeRegiao: string;
  macrorregiao: string;
  aceleradores: number | '';
  habilitacoesSelecionadas: string[];
  anoprimeiraHabilitacao: string;
  codigos1aAlteracao: string;
  ano1aAlteracao: string;
  codigos2aAlteracao: string;
  ano2aAlteracao: string;
  codigos3aAlteracao: string;
  tecnicoId: number | '';
  dataTrabalho: Date | null;
  previsaoMensal: string;
  diligenciasSelecionadas: number[];
  observacoes: string;
}

// ── Auth ──────────────────────────────────────────────────────
export interface LoginCredentials {
  email:     string;
  password:  string;
  remember?: boolean;
}

export interface AuthTokenPayload {
  sub:   string;
  name:  string;
  email: string;
  role:  'tecnico' | 'consulta';
  iat:   number;
  exp:   number;
}

export interface AuthUser {
  name:     string;
  email:    string;
  role:     'tecnico' | 'consulta';
  initials: string;
}
