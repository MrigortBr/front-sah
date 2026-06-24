export type HabGroup = {
    codes: string[];
    label: string;
    type: "individual" | "conjunta";
};

/** Normaliza e ordena os códigos para comparação */
export function sortCodes(codes: string[]): string[] {
    return [...codes].sort();
}

/** Encontra o grupo correspondente à seleção atual */
export function findGroup(selected: string[]): HabGroup | undefined {
    const sorted = sortCodes(selected).join("|");
    return HAB_GROUPS.find((g) => sortCodes(g.codes).join("|") === sorted);
}

const hab_groups_individual: HabGroup[] = [
    { codes: ["17.04"], label: "Serviço Isolado de Radioterapia", type: "individual" },
    { codes: ["17.06"], label: "UNACON", type: "individual" },
    { codes: ["17.09"], label: "UNACON com Serviço de Oncologia Pediátrica", type: "individual" },
    { codes: ["17.07"], label: "UNACON com Serviço de Radioterapia", type: "individual" },
    { codes: ["17.10"], label: "UNACON Exclusiva de Hematologia", type: "individual" },
    { codes: ["17.11"], label: "UNACON Exclusiva de Oncologia Pediátrica", type: "individual" },
    { codes: ["17.12"], label: "CACON", type: "individual" },
    { codes: ["17.13"], label: "CACON com Serviço de Oncologia Pediátrica", type: "individual" },

    { codes: ["17.14"], label: "Hospital Geral com Cirurgia Oncológica", type: "individual" },
    { codes: ["17.16"], label: "Serviço de Oncologia Clínica de Complexo Hospitalar", type: "individual" },
    { codes: ["17.08"], label: "UNACON com Serviço de Hematologia", type: "individual" },
    { codes: ["17.20"], label: "SDM / Serviço de Referência para Diagnóstico de Câncer de Mama", type: "individual" },
    {
        codes: ["17.19"],
        label: "SRC / Serviço de Referência para Diagnóstico e Tratamento de Lesões Precursoras do Câncer do Colo de Útero.",
        type: "individual",
    },
    { codes: ["17.22"], label: "Tratamentos Integrados Sincrônicos em Oncologia", type: "individual" },
    { codes: ["32.02"], label: "QualiCito / Laboratório de exames citopatológicos do colo de útero – Tipo I", type: "individual" },
    { codes: ["32.03"], label: "QualiCito / Laboratório de exames citopatológicos do colo de útero – Tipo II", type: "individual" },
    { codes: ["17.15"], label: "Serviço de Radioterapia de Complexo Hospitalar", type: "individual" },
];

export const HAB_GROUPS: HabGroup[] = [
    { codes: ["17.06", "17.22"], label: "UNACON com Tratamentos Integrados Sincrônicos em Oncologia", type: "conjunta" },
    { codes: ["17.06", "17.08"], label: "UNACON com Serviço de Hematologia", type: "conjunta" },
    { codes: ["17.12", "17.22"], label: "CACON com Tratamentos Integrados Sincrônicos em Oncologia", type: "conjunta" },
    {
        codes: ["17.13", "17.22"],
        label: "CACON com Serviço de Oncologia Pediátrica e Tratamentos Integrados Sincrônicos em Oncologia",
        type: "conjunta",
    },
    {
        codes: ["17.06", "17.08", "17.22"],
        label: "UNACON com Serviço de Hematologia e Tratamentos Integrados Sincrônicos em Oncologia",
        type: "conjunta",
    },
    { codes: ["17.06", "17.08", "17.09"], label: "UNACON com Serviço de Hematologia e de Oncologia Pediátrica", type: "conjunta" },
    {
        codes: ["17.06", "17.08", "17.09", "17.22"],
        label: "UNACON com Serviço de Hematologia, de Oncologia Pediátrica e Tratamentos Integrados Sincrônicos em Oncologia",
        type: "conjunta",
    },
    { codes: ["17.07", "17.22"], label: "UNACON com Serviço de Radioterapia e Tratamentos Integrados Sincrônicos em Oncologia", type: "conjunta" },
    { codes: ["17.07", "17.08"], label: "UNACON com Serviço de Radioterapia e de Hematologia", type: "conjunta" },
    {
        codes: ["17.07", "17.08", "17.22"],
        label: "UNACON com Serviço de Radioterapia, de Hematologia e Tratamentos Integrados Sincrônicos em Oncologia",
        type: "conjunta",
    },
    { codes: ["17.07", "17.09"], label: "UNACON com Serviço de Radioterapia e de Oncologia Pediátrica", type: "conjunta" },
    {
        codes: ["17.07", "17.09", "17.22"],
        label: "UNACON com Serviço de Radioterapia, de Oncologia Pediátrica e Tratamentos Integrados Sincrônicos em Oncologia",
        type: "conjunta",
    },
    { codes: ["17.07", "17.11"], label: "UNACON Exclusiva de Oncologia Pediátrica com Serviço de Radioterapia", type: "conjunta" },
    { codes: ["17.07", "17.08", "17.09"], label: "UNACON com Serviço de Radioterapia, de Hematologia e de Oncologia Pediátrica", type: "conjunta" },
    {
        codes: ["17.07", "17.08", "17.09", "17.22"],
        label: "UNACON com Serviço de Radioterapia, de Hematologia e de Oncologia Pediátrica e Tratamentos Integrados Sincrônicos em Oncologia",
        type: "conjunta",
    },
    {
        codes: ["17.09", "17.22"],
        label: "UNACON com Serviço de Oncologia Pediátrica e Tratamentos Integrados Sincrônicos em Oncologia",
        type: "conjunta",
    },
    {
        codes: ["17.14", "17.15"],
        label: "Hospital Geral com Cirurgia Oncológica e Serviço de Radioterapia de Complexo Hospitalar",
        type: "conjunta",
    },
    {
        codes: ["17.15", "17.16"],
        label: "Radioterapia de Complexo Hospitalar e Serviço de Oncologia Clínica de Complexo Hospitalar",
        type: "conjunta",
    },
    { codes: ["17.06", "17.07", "17.13"], label: "CACON com Serviço de Oncologia Pediátrica", type: "conjunta" },
    {
        codes: ["17.06", "17.07", "17.13", "17.22"],
        label: "CACON com Serviço de Oncologia Pediátrica e Tratamentos Integrados Sincrônicos em Oncologia",
        type: "conjunta",
    },
    {
        codes: ["17.06", "17.08", "17.09", "17.15"],
        label: "UNACON com Serviço de Hematologia, de Oncologia Pediátrica e de Radioterapia de Complexo Hospitalar",
        type: "conjunta",
    },
    {
        codes: ["17.06", "17.08", "17.09", "17.15", "17.22"],
        label: "UNACON com Serviço de Hematologia, de Oncologia Pediátrica, de Radioterapia de Complexo Hospitalar e Tratamentos Integrados Sincrônicos em Oncologia",
        type: "conjunta",
    },
    { codes: ["17.06", "17.08", "17.14"], label: "UNACON com Serviço de Hematologia (Conjunta)", type: "conjunta" },
    {
        codes: ["17.06", "17.08", "17.14", "17.22"],
        label: "UNACON com Serviço de Hematologia e Tratamentos Integrados Sincrônicos em Oncologia (Conjunta)",
        type: "conjunta",
    },
    { codes: ["17.06", "17.08", "17.15"], label: "UNACON com Serviço de Hematologia e de Radioterapia de Complexo Hospitalar", type: "conjunta" },
    {
        codes: ["17.06", "17.08", "17.15", "17.22"],
        label: "UNACON com Serviço de Hematologia, de Radioterapia de Complexo Hospitalar e Tratamentos Integrados Sincrônicos em Oncologia",
        type: "conjunta",
    },
    { codes: ["17.06", "17.14"], label: "UNACON (Conjunta com Cirurgia Oncológica)", type: "conjunta" },
    { codes: ["17.06", "17.14", "17.22"], label: "UNACON com Tratamentos Integrados Sincrônicos em Oncologia (Conjunta)", type: "conjunta" },
    { codes: ["17.06", "17.14", "17.15"], label: "UNACON com Serviço de Radioterapia de Complexo Hospitalar (Conjunta)", type: "conjunta" },
    {
        codes: ["17.06", "17.14", "17.15", "17.22"],
        label: "UNACON com Serviço de Radioterapia de Complexo Hospitalar e Tratamentos Integrados Sincrônicos em Oncologia (Conjunta)",
        type: "conjunta",
    },
    { codes: ["17.06", "17.15"], label: "UNACON com Serviço de Radioterapia de Complexo Hospitalar", type: "conjunta" },
    {
        codes: ["17.06", "17.15", "17.22"],
        label: "UNACON com Serviço de Radioterapia de Complexo Hospitalar e Tratamentos Integrados Sincrônicos em Oncologia",
        type: "conjunta",
    },
    { codes: ["17.07", "17.08", "17.14"], label: "UNACON com Serviço de Radioterapia e de Hematologia (Conjunta)", type: "conjunta" },
    {
        codes: ["17.07", "17.08", "17.14", "17.22"],
        label: "UNACON com Serviço de Radioterapia, de Hematologia e Tratamentos Integrados Sincrônicos em Oncologia (Conjunta)",
        type: "conjunta",
    },
    {
        codes: ["17.07", "17.08", "17.09", "17.14"],
        label: "UNACON com Serviço de Radioterapia, de Hematologia e de Oncologia Pediátrica (Conjunta)",
        type: "conjunta",
    },
    {
        codes: ["17.07", "17.08", "17.09", "17.14", "17.22"],
        label: "UNACON com Serviço de Radioterapia, de Hematologia, de Oncologia Pediátrica e Tratamentos Integrados Sincrônicos em Oncologia (Conjunta)",
        type: "conjunta",
    },
    { codes: ["17.07", "17.14"], label: "UNACON com Serviço de Radioterapia (Conjunta)", type: "conjunta" },
    {
        codes: ["17.07", "17.14", "17.22"],
        label: "UNACON com Serviço de Radioterapia e Tratamentos Integrados Sincrônicos em Oncologia (Conjunta)",
        type: "conjunta",
    },
    { codes: ["17.07", "17.15"], label: "UNACON com Serviço de Radioterapia e Radioterapia de Complexo Hospitalar", type: "conjunta" },
    {
        codes: ["17.07", "17.15", "17.22"],
        label: "UNACON com Serviço de Radioterapia, Radioterapia de Complexo Hospitalar e Tratamentos Integrados Sincrônicos em Oncologia",
        type: "conjunta",
    },
    { codes: ["17.12", "17.14"], label: "CACON (Conjunta com Cirurgia Oncológica)", type: "conjunta" },
    { codes: ["17.12", "17.14", "17.22"], label: "CACON com Tratamentos Integrados Sincrônicos em Oncologia (Conjunta)", type: "conjunta" },
    { codes: ["17.13", "17.14"], label: "CACON com Serviço de Oncologia Pediátrica (Conjunta)", type: "conjunta" },
    {
        codes: ["17.13", "17.14", "17.22"],
        label: "CACON com Serviço de Oncologia Pediátrica e Tratamentos Integrados Sincrônicos em Oncologia (Conjunta)",
        type: "conjunta",
    },
    { codes: ["17.14", "17.15", "17.16"], label: "UNACON com Serviço de Radioterapia de Complexo Hospitalar (Conjunta)", type: "conjunta" },
];

export const GROUP_COLORS = [
    { bg: "#FFF9C4", border: "#F9A825", text: "#5D4037" },
    { bg: "#FFEBEE", border: "#E53935", text: "#B71C1C" },
    { bg: "#E3F2FD", border: "#1E88E5", text: "#0D47A1" },
    { bg: "#F3E5F5", border: "#8E24AA", text: "#4A148C" },
    { bg: "#E8F5E9", border: "#43A047", text: "#1B5E20" },
    { bg: "#FFF3E0", border: "#EF6C00", text: "#E65100" },
];
