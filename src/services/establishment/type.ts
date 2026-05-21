export interface CnesData {
    cnes: string;
    nomeEstabelecimento: string;
    cnpj: string;
    naturezaJuridica: string;
    gestao: string;
    status: string;
    municipio: Municipio;
    casosMacro: Estimativa;
    quantidadeRegioesSaude: string;
    quantidadeMunicipios: string;
    populacaoTotalIBGE2022: string;
    estimativa: Estimativa[];
    onco: ProductionData;
}

export interface Estimativa {
    codigo_macro: string;
    uf: string;
    estimativa_casos: number;
}

export interface ProductionData {
    cirQtd: string;
    cirVal: string;
    quiQtd: string;
    quiVal: string;
    radQtd: string;
    radVal: string;
}

export interface Municipio {
    ibgeMunicipio: string;
    nomeMunicipio: string;
    uf: UF;
}

export interface UF {
    ufSigla: string;
    nomeUf: string;
    regioes: Regiao[];
    macrorregioes: Macrorregiao[];
}

export interface Regiao {
    ibgeRegiao: string;
    nomeRegiao: string;
}

export interface Macrorregiao {
    ibgeMacro: string;
    nomeMacro: string;
}
