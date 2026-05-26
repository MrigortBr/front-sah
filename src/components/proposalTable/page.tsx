// page.tsx

import { SimpleProposal } from "@/services/proposal/type";
import {
    Container,
    Count,
    CustomTable,
    CustomTableTbody,
    CustomTableTD,
    CustomTableTDEdit,
    CustomTableTH,
    CustomTableThead,
    CustomTableTR,
    Header,
    LeftHeader,
    MultiText,
    Title,
    ViewAll,
} from "./styled";
import { useMemo, useState } from "react";
import { useAuth } from "@/context/auth/auth.context";
import { useRouter } from "next/navigation";

type ColumnKey =
    | "nome_estabelecimento"
    | "numero_unico_protoclo"
    | "uf_estabelecimento"
    | "tipohabilitacao"
    | "situacao"
    | "tecnico"
    | "inicio_saips";

type PROP = {
    proposals: SimpleProposal[];
    headerItens: string[];
    columns: ColumnKey[];
    situations?: string[];
    title: string;
    color: number;
};

export const proposalCountColors = [
    {
        background: "#E3F2FD",
        color: "#1565C0",
    },
    {
        background: "#E8F5E9",
        color: "#2E7D32",
    },
    {
        background: "#FFF3E0",
        color: "#EF6C00",
    },
    {
        background: "#F3E5F5",
        color: "#7B1FA2",
    },
    {
        background: "#FFEBEE",
        color: "#C62828",
    },
    {
        background: "#E0F2F1",
        color: "#00695C",
    },
    {
        background: "#E8EAF6",
        color: "#283593",
    },
    {
        background: "#EFEBE9",
        color: "#5D4037",
    },
    {
        background: "#ECEFF1",
        color: "#37474F",
    },
    {
        background: "#FFFDE7",
        color: "#F9A825",
    },
];

export default function ProposalTable({ proposals, headerItens, columns, situations, title, color }: PROP) {
    const [seeAll, setSeeAll] = useState(false);
    const { onlyReading } = useAuth();
    const router = useRouter();

    const filteredProposals = useMemo(() => {
        if (!situations || situations.length === 0) {
            return proposals;
        }

        return proposals.filter((p) => situations.some((s) => s.toLowerCase() === p.situacao.toLowerCase()));
    }, [proposals, situations]);

    const visibleProposals = useMemo(() => {
        return seeAll ? filteredProposals : filteredProposals.slice(0, 5);
    }, [seeAll, filteredProposals]);

    function renderColumn(proposal: SimpleProposal, column: ColumnKey) {
        switch (column) {
            case "nome_estabelecimento":
                return (
                    <MultiText>
                        <p>{proposal.nome_estabelecimento}</p>
                        <a>CNES: {proposal.cnes_estabelecimento}</a>
                    </MultiText>
                );
            case "uf_estabelecimento":
                return proposal.uf_estabelecimento;

            case "tipohabilitacao":
                return proposal.tipohabilitacao.map((t) => `${t.codigo} ${t.descricao}`).join(", ");

            case "situacao":
                return proposal.situacao;

            case "tecnico":
                return proposal.tecnico;

            case "numero_unico_protoclo":
                return proposal.numero_unico_protoclo;

            case "inicio_saips":
                return new Date(proposal.inicio_saips).toLocaleDateString("pt-BR");

            default:
                return "-";
        }
    }

    const handleClickEdit = (p: SimpleProposal) => {
        router.push(`/propostas/nova?id=${p.id_habilitacao}`);
    };

    return (
        <Container hidden={filteredProposals.length == 0}>
            <Header>
                <LeftHeader>
                    <Title>{title}</Title>

                    <Count style={{ backgroundColor: proposalCountColors[color].background, color: proposalCountColors[color].color }}>
                        {filteredProposals.length} propostas
                    </Count>
                </LeftHeader>

                {filteredProposals.length < 5 ? <></> : <ViewAll onClick={() => setSeeAll((o) => !o)}>{seeAll ? "Ver menos" : "Ver todas"}</ViewAll>}
            </Header>

            <CustomTable>
                <CustomTableThead>
                    <CustomTableTR>
                        {headerItens.map((hi, idx) => (
                            <CustomTableTH key={idx}>{hi}</CustomTableTH>
                        ))}
                        {onlyReading ? <></> : <CustomTableTH>Editar</CustomTableTH>}
                    </CustomTableTR>
                </CustomTableThead>

                <CustomTableTbody>
                    {visibleProposals.map((p, idx) => (
                        <CustomTableTR key={idx}>
                            {columns.map((column, cidx) => (
                                <CustomTableTD key={cidx}>{renderColumn(p, column)}</CustomTableTD>
                            ))}
                            {onlyReading ? <></> : <CustomTableTDEdit onClick={() => handleClickEdit(p)}>Editar</CustomTableTDEdit>}
                        </CustomTableTR>
                    ))}
                </CustomTableTbody>
            </CustomTable>
        </Container>
    );
}
