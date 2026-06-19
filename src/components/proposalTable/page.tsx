// page.tsx

import { SimpleProposal } from "@/services/proposal/type";
import {
    ClearFilterButton,
    Container,
    Count,
    CustomTable,
    CustomTableTbody,
    CustomTableTD,
    CustomTableTDEdit,
    CustomTableTH,
    CustomTableThead,
    CustomTableTR,
    FilterContainer,
    FilterMenu,
    FilterOption,
    Header,
    LeftHeader,
    MultiText,
    PaginationButton,
    PaginationContainer,
    PaginationInfo,
    Title,
    TitleTwo,
} from "./styled";
import { useMemo, useState } from "react";
import { useAuth } from "@/context/auth/auth.context";
import { useRouter } from "next/navigation";
import { Funnel } from "lucide-react";
import { ColumnKey } from "@/lib/export/helpers";
import TableExport from "@/components/tableExport/page";

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

const PAGE_SIZE = 5;

export default function ProposalTable({ proposals, search = false, headerItens, columns, situations, title, color, noEdit, onClick }: PROP) {
    const [currentPage, setCurrentPage] = useState(1);
    const { onlyReading } = useAuth();
    const router = useRouter();
    const [searchValue, setSearchValue] = useState("");

    const [openFilter, setOpenFilter] = useState<ColumnKey | null>(null);

    const [columnFilters, setColumnFilters] = useState<Partial<Record<ColumnKey, string[]>>>({});

    function resetPage() {
        setCurrentPage(1);
    }

    const getFilterValue = (proposal: SimpleProposal, column: ColumnKey): string => {
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
    };

    const getColumnValues = (column: ColumnKey) => {
        return [...new Set(proposals.map((p) => getFilterValue(p, column)).filter(Boolean))].sort();
    };

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
        let result = searchedProposals;

        if (situations?.length) {
            result = result.filter((p) => situations.some((s) => s.toLowerCase() === p.situacao.toLowerCase()));
        }

        Object.entries(columnFilters).forEach(([column, values]) => {
            if (!values?.length) return;

            result = result.filter((proposal) => values.includes(getFilterValue(proposal, column as ColumnKey)));
        });

        return result;
    }, [searchedProposals, situations, columnFilters]);

    const totalPages = Math.max(1, Math.ceil(filteredProposals.length / PAGE_SIZE));

    const safePage = Math.min(currentPage, totalPages);

    const visibleProposals = useMemo(() => {
        const start = (safePage - 1) * PAGE_SIZE;
        return filteredProposals.slice(start, start + PAGE_SIZE);
    }, [filteredProposals, safePage]);

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
                return proposal.numero_unico_protoclo == "" ? "-" : proposal.numero_unico_protoclo;
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
        } else if (!noEdit) {
            handleClickEdit(p);
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
                        onChange={(e) => {
                            setSearchValue(e.target.value);
                            resetPage();
                        }}
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

                <TableExport
                    headers={headerItens}
                    columns={columns}
                    data={filteredProposals}
                    filename={title}
                />
            </Header>

            <CustomTable>
                <CustomTableThead hidden={visibleProposals.length == 0}>
                    <CustomTableTR $cursor={""}>
                        {headerItens.map((hi, idx) => {
                            const column = columns[idx];

                            return (
                                <CustomTableTH key={idx}>
                                    <FilterContainer>
                                        <p
                                            onClick={(e) => {
                                                e.stopPropagation();

                                                setOpenFilter(openFilter === column ? null : column);
                                            }}
                                        >
                                            {hi}
                                            <Funnel
                                                size={16}
                                                color={columnFilters[column]?.length ? "#1976d2" : undefined}
                                                onClick={(e) => {
                                                    e.stopPropagation();

                                                    setOpenFilter(openFilter === column ? null : column);
                                                }}
                                            />
                                        </p>

                                        {openFilter === column && (
                                            <FilterMenu>
                                                {getColumnValues(column).map((value) => (
                                                    <FilterOption key={value}>
                                                        <input
                                                            type="checkbox"
                                                            checked={columnFilters[column]?.includes(value) ?? false}
                                                            onChange={(e) => {
                                                                const current = columnFilters[column] || [];
                                                                setColumnFilters({
                                                                    ...columnFilters,
                                                                    [column]: e.target.checked
                                                                        ? [...current, value]
                                                                        : current.filter((v) => v !== value),
                                                                });
                                                                resetPage();
                                                            }}
                                                        />

                                                        {value}
                                                    </FilterOption>
                                                ))}

                                                <ClearFilterButton
                                                    onClick={() => {
                                                        setColumnFilters({ ...columnFilters, [column]: [] });
                                                        resetPage();
                                                    }}
                                                >
                                                    Limpar filtro
                                                </ClearFilterButton>
                                            </FilterMenu>
                                        )}
                                    </FilterContainer>
                                </CustomTableTH>
                            );
                        })}
                    </CustomTableTR>
                </CustomTableThead>

                <CustomTableTbody>
                    {visibleProposals.map((p, idx) => (
                        <CustomTableTR key={idx} onClick={() => handleClick(p)} $cursor={onClick || !noEdit ? "pointer" : ""}>
                            {columns.map((column, cidx) => (
                                <CustomTableTD key={cidx}>{renderColumn(p, column)}</CustomTableTD>
                            ))}
                            {/* {noEdit ? <></> : onlyReading ? <></> : <CustomTableTDEdit onClick={() => handleClickEdit(p)}>Editar</CustomTableTDEdit>} */}
                        </CustomTableTR>
                    ))}
                </CustomTableTbody>
            </CustomTable>

            {visibleProposals.length === 0 ? (
                <Header>
                    <TitleTwo>Sem Dados</TitleTwo>
                </Header>
            ) : (
                <PaginationContainer>
                    <PaginationButton onClick={() => setCurrentPage(1)} disabled={safePage === 1}>
                        «
                    </PaginationButton>
                    <PaginationButton onClick={() => setCurrentPage((p) => p - 1)} disabled={safePage === 1}>
                        ‹ Anterior
                    </PaginationButton>

                    <PaginationInfo>
                        Página {safePage} de {totalPages}
                    </PaginationInfo>

                    <PaginationButton onClick={() => setCurrentPage((p) => p + 1)} disabled={safePage === totalPages}>
                        Próxima ›
                    </PaginationButton>
                    <PaginationButton onClick={() => setCurrentPage(totalPages)} disabled={safePage === totalPages}>
                        »
                    </PaginationButton>
                </PaginationContainer>
            )}
        </Container>
    );
}
