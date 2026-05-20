export interface CnesData {
    cnes: string;
    nomeEstabelecimento: string;
    cnpj: string;
    naturezaJuridica: string;
    gestao: string;
    status: string;
    municipio: Municipio;
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
