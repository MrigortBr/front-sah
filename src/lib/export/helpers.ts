import { SimpleProposal } from "@/services/proposal/type";

export type ColumnKey =
    | "nome_estabelecimento"
    | "aceleradores"
    | "saips"
    | "uf_estabelecimento"
    | "tipohabilitacao"
    | "situacao"
    | "tecnico"
    | "inicio_saips"
    | "numero_aceleradores"
    | "gestao"
    | "numero_unico_protoclo"
    | "ano_alteracao";

export function getExportValue(proposal: SimpleProposal, column: ColumnKey): string {
    switch (column) {
        case "nome_estabelecimento":
            return proposal.nome_estabelecimento ?? "";
        case "uf_estabelecimento":
            return proposal.uf_estabelecimento ?? "";
        case "tipohabilitacao":
            return proposal.tipohabilitacao.map((t) => `${t.codigo} ${t.descricao}`).join(", ");
        case "situacao":
            return proposal.situacao ?? "";
        case "tecnico":
            return proposal.tecnico ?? "";
        case "saips":
            return proposal.saips ?? "";
        case "inicio_saips":
            return proposal.inicio_saips ? new Date(proposal.inicio_saips).toLocaleDateString("pt-BR") : "";
        case "aceleradores":
        case "numero_aceleradores":
            return String(proposal.numero_aceleradores ?? "");
        case "numero_unico_protoclo":
            return proposal.numero_unico_protoclo || "-";
        case "gestao":
            return proposal.gestao ?? "";
        case "ano_alteracao":
            return String(proposal.ano_alteracao ?? "");
        default:
            return "";
    }
}

export function buildRows(data: SimpleProposal[], columns: ColumnKey[]): string[][] {
    return data.map((p) => columns.map((col) => getExportValue(p, col)));
}

export function triggerDownload(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
