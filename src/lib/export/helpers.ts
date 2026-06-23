import { SimpleProposal } from "@/services/proposal/type";
import { findGroup, sortCodes } from "@/const/habGroups";

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
        case "tipohabilitacao": {
            const items = proposal.tipohabilitacao;
            const soloItems = items.filter((t) => t.group === 0);
            const multiMap = new Map<number, typeof items>();
            for (const t of items.filter((t) => t.group !== 0)) {
                if (!multiMap.has(t.group)) multiMap.set(t.group, []);
                multiMap.get(t.group)!.push(t);
            }
            const parts: string[] = [];
            for (const t of soloItems) parts.push(`${t.codigo} - ${t.descricao}`);
            for (const [, group] of multiMap) {
                const codes = sortCodes(group.map((t) => t.codigo));
                const label = findGroup(codes)?.label ?? group.map((t) => t.descricao).join(" + ");
                parts.push(`${codes.join(" + ")} - ${label}`);
            }
            return parts.join(" | ");
        }
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
