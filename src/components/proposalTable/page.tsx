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
    TitleTwo,
    ViewAll,
} from "./styled";
import { useMemo, useState } from "react";
import { useAuth } from "@/context/auth/auth.context";
import { useRouter } from "next/navigation";

type ColumnKey =
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

type PROP = {
    proposals: SimpleProposal[];
    headerItens: string[];
    columns: ColumnKey[];
    title: string;
    color: number;

    noEdit: boolean;
    situations?: string[];
    search?: boolean;
    onClick?: "open";
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

export default function ProposalTable({ proposals, search = false, headerItens, columns, situations, title, color, noEdit, onClick }: PROP) {
    const [seeAll, setSeeAll] = useState(false);
    const { onlyReading } = useAuth();
    const router = useRouter();
    const [searchValue, setSearchValue] = useState("");

    const searchedProposals = useMemo(() => {
        if (!searchValue.trim()) {
            return proposals;
        }

        const search = searchValue.toLowerCase();

        return proposals.filter((p) =>
            [p.nome_estabelecimento, p.cnes_estabelecimento, p.tecnico, p.saips, p.numero_unico_protoclo, p.uf_estabelecimento, p.situacao]
                .filter(Boolean)
                .some((value) => String(value).toLowerCase().includes(search))
        );
    }, [proposals, searchValue]);

    const filteredProposals = useMemo(() => {
        if (!situations || situations.length === 0) {
            return searchedProposals;
        }

        return searchedProposals.filter((p) => situations.some((s) => s.toLowerCase() === p.situacao.toLowerCase()));
    }, [searchedProposals, situations]);

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
            case "saips":
                return proposal.saips;
            case "inicio_saips":
                return new Date(proposal.inicio_saips).toLocaleDateString("pt-BR");
            case "aceleradores":
                return proposal.numero_aceleradores;
            case "numero_unico_protoclo":
                return proposal.numero_unico_protoclo;
            case "gestao":
                return proposal.gestao;
            case "ano_alteracao":
                return proposal.ano_alteracao;

            default:
                return "-";
        }
    }

    const handleClickEdit = (p: SimpleProposal) => {
        router.push(`/propostas/nova?id=${p.id_habilitacao}`);
    };

    const handleClick = (p: SimpleProposal) => {
        if (onClick) {
            switch (onClick) {
                case "open":
                    router.push(`/ativos/ler?id=${p.id_habilitacao}`);
            }
        }
    };

    return (
        <Container hidden={filteredProposals.length == 0 && search == false}>
            <Header>
                <LeftHeader>
                    <Title>{title}</Title>

                    <Count style={{ backgroundColor: proposalCountColors[color].background, color: proposalCountColors[color].color }}>
                        {filteredProposals.length} propostas
                    </Count>
                </LeftHeader>

                {search && (
                    <input
                        type="text"
                        placeholder="🔍 Buscar proposta..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        style={{
                            width: 300,
                            padding: "8px 12px",
                            borderRadius: 8,
                            border: "1px solid #ddd",
                            outline: "none",
                            marginLeft: "auto",
                            marginRight: "1dvw",
                        }}
                    />
                )}

                {filteredProposals.length < 5 ? <></> : <ViewAll onClick={() => setSeeAll((o) => !o)}>{seeAll ? "Ver menos" : "Ver todas"}</ViewAll>}
            </Header>

            <CustomTable>
                <CustomTableThead hidden={visibleProposals.length == 0}>
                    <CustomTableTR $cursor={""}>
                        {headerItens.map((hi, idx) => (
                            <CustomTableTH key={idx}>{hi}</CustomTableTH>
                        ))}
                        {noEdit ? <></> : onlyReading ? <></> : <CustomTableTH>Editar</CustomTableTH>}
                    </CustomTableTR>
                </CustomTableThead>

                <CustomTableTbody>
                    {visibleProposals.map((p, idx) => (
                        <CustomTableTR key={idx} onClick={() => handleClick(p)} $cursor={onClick ? "pointer" : ""}>
                            {columns.map((column, cidx) => (
                                <CustomTableTD key={cidx}>{renderColumn(p, column)}</CustomTableTD>
                            ))}
                            {noEdit ? <></> : onlyReading ? <></> : <CustomTableTDEdit onClick={() => handleClickEdit(p)}>Editar</CustomTableTDEdit>}
                        </CustomTableTR>
                    ))}
                </CustomTableTbody>
            </CustomTable>

            {visibleProposals.length == 0 ? (
                <Header>
                    <TitleTwo>Sem Dados</TitleTwo>
                </Header>
            ) : (
                <></>
            )}
        </Container>
    );
}
