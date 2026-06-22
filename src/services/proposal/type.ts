export interface SimpleProposal {
    id_habilitacao: number;
    nome_estabelecimento: string;
    cnes_estabelecimento: string;
    uf_estabelecimento: string;
    municipio: string;
    saips: string;
    tecnico: string;
    situacao: string;
    inicio_saips: string;
    numero_unico_protoclo: string;
    numero_aceleradores: number;
    gestao: string;
    ano_alteracao: string;
    tipohabilitacao: {
        id: number;
        codigo: string;
        descricao: string;
        categoria: string;
        group: number;
    }[];
}

export interface Response<T> {
    data: T;
    statusCode: number;
    status: boolean;
    message: string;
}

export interface DataHab {
    typeHab: TypeHab[];
    diligencia: Diligencia[];
    technicians: Technician[];
    cnes: Cnes[];
}

export interface TypeHab {
    id_tipo_habilitacao: number;
    codigo: string;
    descricao: string;
    categoria: string;
}

export interface Diligencia {
    id: number;
    title: string;
}

export interface Technician {
    id?: number;
    name?: string;
    surname?: string;
}

export interface Cnes {
    cnes: string;
    nomeEstabelecimento: string;
}

export type HabilitacaoExitingResponse = {
    id_habilitacao: number;
    cnes: string;
    saips: string;
    nup: string;
    tipo_financiamento: string;
    newCasesCIB: string;
    tecnico: {
        id: number;
        name: string;
        surname: string;
    };

    situacao: string;
    numero_portaria: string;
    numero_aceleradores: number;

    inicio_saips: string;
    entrada_decan: string;
    envio_drac: string;

    inpacto_mensal: string;
    parcela_unica: string;

    tipohabilitacao: {
        id: number;
        codigo: string;
        descricao: string;
        categoria: string;
        group: number;
    }[];

    diligencia: {
        id: number;
        title: string;
    }[];

    historico: {
        id: number;
        sequencia: string;
        anoAlteracao: number;
        codigos: string;
    }[];
};
