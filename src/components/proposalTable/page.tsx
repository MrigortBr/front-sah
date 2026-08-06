// page.tsx

import { CONJUNTA, SimpleProposal } from "@/services/proposal/type";
import { findGroup } from "@/const/habGroups";
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
    FilterMenuHeader,
    FilterMenuFooter,
    FilterSearchBox,
    FilterSelectAllRow,
    FilterOptionsList,
    FilterOption,
    FilterOkButton,
    HabBlock,
    HabChip,
    HabChipRow,
    HabDesc,
    HabGroup,
    HabPlus,
    Header,
    LeftHeader,
    MultiText,
    PaginationButton,
    PaginationContainer,
    PaginationInfo,
    Title,
    TitleTwo,
} from "./styled";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
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
    const router = useRouter();
    const [searchValue, setSearchValue] = useState("");

    const [openFilter, setOpenFilter] = useState<ColumnKey | null>(null);
    const [filterSearch, setFilterSearch] = useState("");
    const [pendingFilters, setPendingFilters] = useState<Partial<Record<ColumnKey, string[]>>>({});
    const [columnFilters, setColumnFilters] = useState<Partial<Record<ColumnKey, string[]>>>({});

    function openFilterMenu(column: ColumnKey) {
        setOpenFilter(column);
        setFilterSearch("");
        setPendingFilters({ ...columnFilters });
    }

    function applyFilter() {
        setColumnFilters({ ...pendingFilters });
        setOpenFilter(null);
        resetPage();
    }

    function resetPage() { setCurrentPage(1); }

    // Fecha o filtro ao clicar fora
    useEffect(() => {
        if (!openFilter) return;
        const handler = () => setOpenFilter(null);
        document.addEventListener("click", handler);
        return () => document.removeEventListener("click", handler);
    }, [openFilter]);

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

    // Expande para paginar corretamente (5 linhas/pág, contando clones)
    const expandedRows = useMemo(() => {
        const rows: { proposal: SimpleProposal; conjunta?: CONJUNTA }[] = [];
        for (const p of filteredProposals) {
            rows.push({ proposal: p });
            for (const c of p.conjunta ?? []) {
                rows.push({ proposal: p, conjunta: c });
            }
        }
        return rows;
    }, [filteredProposals]);

    const totalPages = Math.max(1, Math.ceil(expandedRows.length / PAGE_SIZE));

    const safePage = Math.min(currentPage, totalPages);

    const visibleRows = useMemo(() => {
        const start = (safePage - 1) * PAGE_SIZE;
        return expandedRows.slice(start, start + PAGE_SIZE);
    }, [expandedRows, safePage]);

    function renderColumn(proposal: SimpleProposal, column: ColumnKey, conjunta?: CONJUNTA) {
        switch (column) {
            case "nome_estabelecimento":
                return (
                    <MultiText>
                        <p>{conjunta ? conjunta.nome_estabelecimento : proposal.nome_estabelecimento}</p>
                        <a>CNES: {conjunta ? conjunta.cnes : proposal.cnes_estabelecimento}</a>
                    </MultiText>
                );

            case "uf_estabelecimento":
                return conjunta ? conjunta.uf : proposal.uf_estabelecimento;
            case "tipohabilitacao": {
                const items = proposal.tipohabilitacao;
                const conjuntaRecords = proposal.conjunta ?? [];

                // Agrupa itens: multi-código pelo valor de group, solo cada um separado
                const habGroups: { key: number; groupOne: number; groupItems: typeof items }[] = [];
                let soloKey = -1;
                const multiTracker = new Map<number, number>();
                for (const item of items) {
                    if (item.group === 0) {
                        habGroups.push({ key: soloKey--, groupOne: 0, groupItems: [item] });
                    } else {
                        if (!multiTracker.has(item.group)) {
                            multiTracker.set(item.group, habGroups.length);
                            habGroups.push({ key: item.group, groupOne: item.group, groupItems: [] });
                        }
                        habGroups[multiTracker.get(item.group)!].groupItems.push(item);
                    }
                }
                // Ordena chips do menor para o maior dentro de cada grupo
                habGroups.forEach((g) => g.groupItems.sort((a, b) => a.codigo.localeCompare(b.codigo)));

                // Map: group_one → primeira conjunta (uma por grupo na exibição)
                const conjuntaByGroupOne = new Map<number, (typeof conjuntaRecords)[0]>();
                for (const c of conjuntaRecords) {
                    if (!conjuntaByGroupOne.has(c.group_one)) conjuntaByGroupOne.set(c.group_one, c);
                }

                // Solo itens: mostra conjunta apenas na primeira linha
                let soloConjuntaUsed = false;

                return (
                    <HabBlock>
                        {habGroups.map(({ key, groupOne, groupItems }) => {
                            // Conjunta para este grupo
                            let conjuntaRec = conjuntaByGroupOne.get(groupOne);
                            if (groupOne === 0 && conjuntaRec) {
                                if (soloConjuntaUsed) conjuntaRec = undefined;
                                else soloConjuntaUsed = true;
                            }

                            const isMulti = groupItems.length > 1;
                            const hasConjunta = !!conjuntaRec;
                            const ownType: "conj" | "solo" = hasConjunta || isMulti ? "conj" : "solo";
                            const codes = groupItems.map((h) => h.codigo);
                            const groupMatch = isMulti ? findGroup(codes) : null;
                            const desc = groupMatch ? groupMatch.label : (groupItems[0]?.descricao ?? "");

                            return (
                                <HabGroup key={key}>
                                    <HabChipRow>
                                        {groupItems.map((h, i) => (
                                            <Fragment key={h.id}>
                                                {i > 0 && <HabPlus $type={ownType}>+</HabPlus>}
                                                <HabChip $type={ownType}>{h.codigo}</HabChip>
                                            </Fragment>
                                        ))}
                                    </HabChipRow>
                                    <HabDesc $type={ownType}>{desc}</HabDesc>
                                </HabGroup>
                            );
                        })}
                    </HabBlock>
                );
            }
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

                <TableExport headers={headerItens} columns={columns} data={filteredProposals} filename={title} />
            </Header>

            <CustomTable>
                <CustomTableThead hidden={visibleRows.length == 0}>
                    <CustomTableTR $cursor={""}>
                        {headerItens.map((hi, idx) => {
                            const column = columns[idx];

                            const allValues = getColumnValues(column);
                            const searchLower = filterSearch.toLowerCase();
                            const visibleValues = filterSearch
                                ? allValues.filter(v => v.toLowerCase().includes(searchLower))
                                : allValues;
                            const pending = pendingFilters[column] ?? [];
                            const allChecked = visibleValues.length > 0 && visibleValues.every(v => pending.includes(v));
                            const someChecked = visibleValues.some(v => pending.includes(v));

                            return (
                                <CustomTableTH key={idx}>
                                    <FilterContainer>
                                        <p onClick={(e) => { e.stopPropagation(); openFilter === column ? setOpenFilter(null) : openFilterMenu(column); }}>
                                            {hi}
                                            <Funnel size={14} color={columnFilters[column]?.length ? "#217346" : "#888"} />
                                        </p>

                                        {openFilter === column && (
                                            <FilterMenu onClick={e => e.stopPropagation()}>
                                                <FilterMenuHeader>Filtrar por {hi}</FilterMenuHeader>

                                                <FilterSearchBox
                                                    autoFocus
                                                    placeholder="Pesquisar..."
                                                    value={filterSearch}
                                                    onChange={e => setFilterSearch(e.target.value)}
                                                />

                                                <FilterSelectAllRow>
                                                    <input
                                                        type="checkbox"
                                                        checked={allChecked}
                                                        ref={el => { if (el) el.indeterminate = !allChecked && someChecked; }}
                                                        onChange={() => {
                                                            const rest = pending.filter(v => !visibleValues.includes(v));
                                                            setPendingFilters({
                                                                ...pendingFilters,
                                                                [column]: allChecked ? rest : [...rest, ...visibleValues],
                                                            });
                                                        }}
                                                    />
                                                    (Selecionar tudo)
                                                </FilterSelectAllRow>

                                                <FilterOptionsList>
                                                    {visibleValues.map(value => (
                                                        <FilterOption key={value}>
                                                            <input
                                                                type="checkbox"
                                                                checked={pending.includes(value)}
                                                                onChange={e => {
                                                                    setPendingFilters({
                                                                        ...pendingFilters,
                                                                        [column]: e.target.checked
                                                                            ? [...pending, value]
                                                                            : pending.filter(v => v !== value),
                                                                    });
                                                                }}
                                                            />
                                                            {value}
                                                        </FilterOption>
                                                    ))}
                                                </FilterOptionsList>

                                                <FilterMenuFooter>
                                                    <ClearFilterButton onClick={() => { setPendingFilters({ ...pendingFilters, [column]: [] }); setFilterSearch(""); }}>
                                                        Limpar
                                                    </ClearFilterButton>
                                                    <FilterOkButton onClick={applyFilter}>OK</FilterOkButton>
                                                </FilterMenuFooter>
                                            </FilterMenu>
                                        )}
                                    </FilterContainer>
                                </CustomTableTH>
                            );
                        })}
                    </CustomTableTR>
                </CustomTableThead>

                <CustomTableTbody>
                    {visibleRows.map(({ proposal, conjunta }, idx) => (
                        <CustomTableTR
                            key={idx}
                            onClick={() => handleClick(proposal)}
                            $cursor={onClick || !noEdit ? "pointer" : ""}
                            style={
                                conjunta || proposal.conjunta.length > 0 ? { backgroundColor: "#F3F8FF", borderLeft: "3px solid #90CAF9" } : undefined
                            }
                        >
                            {columns.map((column, cidx) => (
                                <CustomTableTD key={cidx}>{renderColumn(proposal, column, conjunta)}</CustomTableTD>
                            ))}
                        </CustomTableTR>
                    ))}
                </CustomTableTbody>
            </CustomTable>

            {visibleRows.length === 0 ? (
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
