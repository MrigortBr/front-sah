export type ConjuntaGroup = {
    codes: string[];
    label: string;
};

/** Combinações válidas para habilitação conjunta (entre estabelecimentos distintos).
 *  Fonte: aba "Habilitações conjuntas" da planilha CGECON 16.06.2026. */
export const HAB_CONJUNTAS: ConjuntaGroup[] = [
    { codes: ["17.04"], label: "Serviço Isolado de Radioterapia" },
    { codes: ["17.06"], label: "UNACON" },
    { codes: ["17.06", "17.22"], label: "UNACON com Tratamentos Integrados Sincrônicos em Oncologia" },
    { codes: ["17.06", "17.07", "17.13"], label: "CACON com Serviço de Oncologia Pediátrica" },
    {
        codes: ["17.06", "17.07", "17.13", "17.22"],
        label: "CACON com Serviço de Oncologia Pediátrica e Tratamentos Integrados Sincrônicos em Oncologia",
    },
    { codes: ["17.06", "17.08"], label: "UNACON com Serviço de Hematologia" },
    { codes: ["17.06", "17.08", "17.22"], label: "UNACON com Serviço de Hematologia e Tratamentos Integrados Sincrônicos em Oncologia" },
    { codes: ["17.06", "17.08", "17.09"], label: "UNACON com Serviço de Hematologia e de Oncologia Pediátrica" },
    {
        codes: ["17.06", "17.08", "17.09", "17.22"],
        label: "UNACON com Serviço de Hematologia, de Oncologia Pediátrica e Tratamentos Integrados Sincrônicos em Oncologia",
    },
    {
        codes: ["17.06", "17.08", "17.09", "17.15"],
        label: "UNACON com Serviço de Hematologia, de Oncologia Pediátrica e de Radioterapia de Complexo Hospitalar",
    },
    {
        codes: ["17.06", "17.08", "17.09", "17.15", "17.22"],
        label: "UNACON com Serviço de Hematologia, de Oncologia Pediátrica, de Radioterapia de Complexo Hospitalar e Tratamentos Integrados Sincrônicos em Oncologia",
    },
    { codes: ["17.06", "17.08", "17.14"], label: "UNACON com Serviço de Hematologia" },
    { codes: ["17.06", "17.08", "17.14", "17.22"], label: "UNACON com Serviço de Hematologia e Tratamentos Integrados Sincrônicos em Oncologia" },
    { codes: ["17.06", "17.08", "17.15"], label: "UNACON com Serviço de Hematologia e de Radioterapia de Complexo Hospitalar" },
    {
        codes: ["17.06", "17.08", "17.15", "17.22"],
        label: "UNACON com Serviço de Hematologia, de Radioterapia de Complexo Hospitalar e Tratamentos Integrados Sincrônicos em Oncologia",
    },
    { codes: ["17.06", "17.14"], label: "UNACON" },
    { codes: ["17.06", "17.14", "17.22"], label: "UNACON com Tratamentos Integrados Sincrônicos em Oncologia" },
    { codes: ["17.06", "17.14", "17.15"], label: "UNACON com Serviço de Radioterapia de Complexo Hospitalar" },
    {
        codes: ["17.06", "17.14", "17.15", "17.22"],
        label: "UNACON com Serviço de Radioterapia de Complexo Hospitalar e Tratamentos Integrados Sincrônicos em Oncologia",
    },
    { codes: ["17.06", "17.15"], label: "UNACON com Serviço de Radioterapia de Complexo Hospitalar" },
    {
        codes: ["17.06", "17.15", "17.22"],
        label: "UNACON com Serviço de Radioterapia de Complexo Hospitalar e Tratamentos Integrados Sincrônicos em Oncologia",
    },
    { codes: ["17.07"], label: "UNACON com Serviço de Radioterapia" },
    { codes: ["17.07", "17.22"], label: "UNACON com Serviço de Radioterapia e Tratamentos Integrados Sincrônicos em Oncologia" },
    { codes: ["17.07", "17.08"], label: "UNACON com Serviço de Radioterapia e de Hematologia" },
    {
        codes: ["17.07", "17.08", "17.22"],
        label: "UNACON com Serviço de Radioterapia, de Hematologia e Tratamentos Integrados Sincrônicos em Oncologia",
    },
    { codes: ["17.07", "17.08", "17.14"], label: "UNACON com Serviço de Radioterapia e de Hematologia" },
    {
        codes: ["17.07", "17.08", "17.14", "17.22"],
        label: "UNACON com Serviço de Radioterapia, de Hematologia e Tratamentos Integrados Sincrônicos em Oncologia",
    },
    { codes: ["17.07", "17.09"], label: "UNACON com Serviço de Radioterapia e de Oncologia Pediátrica" },
    {
        codes: ["17.07", "17.09", "17.22"],
        label: "UNACON com Serviço de Radioterapia, de Oncologia Pediátrica e Tratamentos Integrados Sincrônicos em Oncologia",
    },
    { codes: ["17.07", "17.11"], label: "UNACON Exclusiva de Oncologia Pediátrica com Serviço de Radioterapia" },
    { codes: ["17.07", "17.14"], label: "UNACON com Serviço de Radioterapia" },
    { codes: ["17.07", "17.14", "17.22"], label: "UNACON com Serviço de Radioterapia e Tratamentos Integrados Sincrônicos em Oncologia" },
    { codes: ["17.07", "17.15"], label: "UNACON com Serviço de Radioterapia" },
    { codes: ["17.07", "17.15", "17.22"], label: "UNACON com Serviço de Radioterapia" },
    { codes: ["17.07", "17.08", "17.09"], label: "UNACON com Serviço de Radioterapia, de Hematologia e de Oncologia Pediátrica" },
    {
        codes: ["17.07", "17.08", "17.09", "17.22"],
        label: "UNACON com Serviço de Radioterapia, de Hematologia, de Oncologia Pediátrica e Tratamentos Integrados Sincrônicos em Oncologia",
    },
    { codes: ["17.07", "17.08", "17.09", "17.14"], label: "UNACON com Serviço de Radioterapia, de Hematologia e de Oncologia Pediátrica" },
    {
        codes: ["17.07", "17.08", "17.09", "17.14", "17.22"],
        label: "UNACON com Serviço de Radioterapia, de Hematologia, de Oncologia Pediátrica e Tratamentos Integrados Sincrônicos em Oncologia",
    },
    { codes: ["17.09"], label: "UNACON com Serviço de Oncologia Pediátrica" },
    { codes: ["17.09", "17.22"], label: "UNACON com Serviço de Oncologia Pediátrica" },
    { codes: ["17.10"], label: "UNACON Exclusiva de Hematologia" },
    { codes: ["17.11"], label: "UNACON Exclusiva de Oncologia Pediátrica" },
    { codes: ["17.12"], label: "CACON" },
    { codes: ["17.12", "17.22"], label: "CACON" },
    { codes: ["17.12", "17.14"], label: "CACON" },
    { codes: ["17.12", "17.14", "17.22"], label: "CACON" },
    { codes: ["17.13"], label: "CACON com Serviço de Oncologia Pediátrica" },
    { codes: ["17.13", "17.22"], label: "CACON com Serviço de Oncologia Pediátrica" },
    { codes: ["17.13", "17.14"], label: "CACON com Serviço de Oncologia Pediátrica" },
    { codes: ["17.13", "17.14", "17.22"], label: "CACON com Serviço de Oncologia Pediátrica" },
    { codes: ["17.14"], label: "Hospital Geral com Cirurgia Oncológica" },
    { codes: ["17.14", "17.15"], label: "Hospital Geral com Cirurgia Oncológica e Serviço de Radioterapia de Complexo Hospitalar" },
    { codes: ["17.14", "17.15", "17.16"], label: "UNACON com Serviço de Radioterapia de Complexo Hospitalar" },
];

/** Verifica se um conjunto de códigos forma uma combinação conjunta válida. */
export function findConjuntaMatch(codes: string[]): ConjuntaGroup | undefined {
    const sorted = [...codes].sort();
    return HAB_CONJUNTAS.find((g) => {
        const gs = [...g.codes].sort();
        return gs.length === sorted.length && gs.every((c, i) => c === sorted[i]);
    });
}
