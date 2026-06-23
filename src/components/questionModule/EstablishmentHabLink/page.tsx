"use client";

import {
    CardHeader,
    CardSubTitle,
    CardTitle,
    HabCnesCard,
    HabCnesRow,
    HabCnesRowHeader,
    HabCnesBadge,
    HabCnesName,
    HabCnesChips,
    HabCnesChip,
    HabCnesChipRemove,
    HabCnesAddButton,
    HabCnesDropdown,
    HabCnesDropdownMenu,
    HabCnesDropdownItem,
    HabCnesEmpty,
} from "../styled";
import { HabilitacaoExitingResponse, TypeHab } from "@/services/proposal/type";
import { RefObject, forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

/* ── Types ────────────────────────────────────────────────── */

export type EstabInfo = {
    id: string;
    cnes: string;
    name: string;
};

export type HabCnesLinkData = {
    links: { cnes: string; habIds: number[] }[];
};

export type EstablishmentHabLinkRef = {
    getData: () => HabCnesLinkData;
};

type LinkRow = {
    estabId: string;
    linkedHabIds: number[];
};

type PROP = {
    refContainer: RefObject<HTMLDivElement | null>;
    establishments: EstabInfo[];
    habs: TypeHab[];
    isReading?: boolean;
    response?: HabilitacaoExitingResponse;
};

/* ── Component ────────────────────────────────────────────── */

const EstablishmentHabLink = forwardRef<EstablishmentHabLinkRef, PROP>(
    ({ refContainer, establishments, habs, isReading, response }, ref) => {
        const [rows, setRows] = useState<LinkRow[]>([]);
        const [openDropdown, setOpenDropdown] = useState<string | null>(null);
        const dropdownRef = useRef<HTMLDivElement | null>(null);

        // Ref keeps response always current so useEffect([establishments]) can read it
        const responseRef = useRef(response);
        useEffect(() => { responseRef.current = response; }, [response]);

        /* ── Sync rows when establishments change ── */

        useEffect(() => {
            setRows((prev) => {
                const existingIds = new Set(prev.map((r) => r.estabId));
                const incomingIds = new Set(establishments.map((e) => e.id));

                const kept = prev.filter((r) => incomingIds.has(r.estabId));

                const added: LinkRow[] = establishments
                    .filter((e) => !existingIds.has(e.id))
                    .map((e) => {
                        const saved = responseRef.current?.habEstabelecimentos?.find((h) => h.cnes === e.cnes);
                        return { estabId: e.id, linkedHabIds: saved?.habIds ?? [] };
                    });

                return [...kept, ...added];
            });
        }, [establishments]);

        /* ── Close dropdown on outside click ── */

        useEffect(() => {
            function handleClick(e: MouseEvent) {
                if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                    setOpenDropdown(null);
                }
            }
            document.addEventListener("mousedown", handleClick);
            return () => document.removeEventListener("mousedown", handleClick);
        }, []);

        /* ── Handlers ── */

        function addHab(estabId: string, habId: number) {
            setRows((prev) =>
                prev.map((r) =>
                    r.estabId === estabId && !r.linkedHabIds.includes(habId)
                        ? { ...r, linkedHabIds: [...r.linkedHabIds, habId] }
                        : r
                )
            );
            setOpenDropdown(null);
        }

        function removeHab(estabId: string, habId: number) {
            setRows((prev) =>
                prev.map((r) =>
                    r.estabId === estabId
                        ? { ...r, linkedHabIds: r.linkedHabIds.filter((id) => id !== habId) }
                        : r
                )
            );
        }

        /* ── getData ── */

        function getData(): HabCnesLinkData {
            return {
                links: rows.map((r) => {
                    const estab = establishments.find((e) => e.id === r.estabId);
                    return {
                        cnes: estab?.cnes ?? "",
                        habIds: r.linkedHabIds,
                    };
                }),
            };
        }

        useImperativeHandle(ref, () => ({ getData }));

        /* ── Render ── */

        return (
            <HabCnesCard ref={refContainer}>
                <CardHeader style={{ padding: "0 15px", position: "relative" }}>
                    <CardTitle $color={"#9C27B0"}>Habilitações por Estabelecimento</CardTitle>
                    <CardSubTitle>
                        Defina quais habilitações se aplicam a cada estabelecimento cadastrado.
                    </CardSubTitle>
                </CardHeader>

                {establishments.length === 0 ? (
                    <HabCnesEmpty style={{ padding: "0 15px" }}>
                        Nenhum estabelecimento cadastrado ainda. Adicione um CNES na seção acima.
                    </HabCnesEmpty>
                ) : habs.length === 0 ? (
                    <HabCnesEmpty style={{ padding: "0 15px" }}>
                        Nenhuma habilitação selecionada. Adicione grupos na seção "Habilitação Solicitada".
                    </HabCnesEmpty>
                ) : (
                    rows.map((row) => {
                        const estab = establishments.find((e) => e.id === row.estabId);
                        if (!estab) return null;

                        const linkedHabs = habs.filter((h) => row.linkedHabIds.includes(h.id_tipo_habilitacao));
                        const availableToAdd = habs.filter((h) => !row.linkedHabIds.includes(h.id_tipo_habilitacao));
                        const isOpen = openDropdown === row.estabId;

                        return (
                            <HabCnesRow key={row.estabId}>
                                <HabCnesRowHeader>
                                    <HabCnesBadge>CNES {estab.cnes || "—"}</HabCnesBadge>
                                    <HabCnesName>{estab.name || "Estabelecimento sem nome"}</HabCnesName>
                                </HabCnesRowHeader>

                                <HabCnesChips>
                                    {linkedHabs.length === 0 && (
                                        <HabCnesEmpty style={{ padding: 0, margin: 0 }}>
                                            Nenhuma habilitação vinculada
                                        </HabCnesEmpty>
                                    )}

                                    {linkedHabs.map((hab) => (
                                        <HabCnesChip key={hab.id_tipo_habilitacao}>
                                            {hab.codigo}
                                            {!isReading && (
                                                <HabCnesChipRemove
                                                    onClick={() => removeHab(row.estabId, hab.id_tipo_habilitacao)}
                                                    title={`Remover ${hab.codigo}`}
                                                >
                                                    ×
                                                </HabCnesChipRemove>
                                            )}
                                        </HabCnesChip>
                                    ))}

                                    {!isReading && availableToAdd.length > 0 && (
                                        <HabCnesDropdown ref={isOpen ? dropdownRef : undefined}>
                                            <HabCnesAddButton
                                                onClick={() => setOpenDropdown(isOpen ? null : row.estabId)}
                                            >
                                                + Adicionar
                                            </HabCnesAddButton>

                                            {isOpen && (
                                                <HabCnesDropdownMenu>
                                                    {availableToAdd.map((hab) => (
                                                        <HabCnesDropdownItem
                                                            key={hab.id_tipo_habilitacao}
                                                            onClick={() => addHab(row.estabId, hab.id_tipo_habilitacao)}
                                                        >
                                                            {hab.codigo} — {hab.descricao}
                                                        </HabCnesDropdownItem>
                                                    ))}
                                                </HabCnesDropdownMenu>
                                            )}
                                        </HabCnesDropdown>
                                    )}
                                </HabCnesChips>
                            </HabCnesRow>
                        );
                    })
                )}
            </HabCnesCard>
        );
    }
);

EstablishmentHabLink.displayName = "EstablishmentHabLink";

export default EstablishmentHabLink;
