"use client";

import { useAlert } from "@/providers/alert/page";
import {
    Card,
    CardHeader,
    CardSubTitle,
    CardTitle,
    LicenseContainer,
    LicenseItem,
    LicenseItem2,
    LicenseSubTitle,
    LicenseTitle,
    GroupCard,
    GroupCardBody,
    GroupCardCodes,
    GroupCardLabel,
    GroupCardType,
    GroupRemoveButton,
    AddGroupButton,
} from "../styled";
import { HabilitacaoExitingResponse, TypeHab } from "@/services/proposal/type";
import { RefObject, forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { findGroup, GROUP_COLORS, sortCodes } from "@/const/habGroups";

export type TipoHabPayloadItem = { codigo: string; grupo: number };

export type LicenseData = {
    selectedLicenses: number[];
    selectedLicensesData: TypeHab[];
    tipohabilitacao: TipoHabPayloadItem[];
    isValid: boolean;
};

export type LicenseRef = {
    getData: () => LicenseData | undefined;
};

type GroupEntry = {
    id: string;
    codes: string[];
    label: string;
    type: "individual" | "conjunta";
    colorIndex: number;
};

type PROP = {
    refContainer: RefObject<HTMLDivElement | null>;
    licenses: TypeHab[];
    response?: HabilitacaoExitingResponse;
    isReading?: boolean;
};

const License = forwardRef<LicenseRef, PROP>(({ refContainer, licenses, response, isReading }, ref) => {
    const [groups, setGroups] = useState<GroupEntry[]>([]);
    const [activeSelection, setActiveSelection] = useState<string[]>([]);
    const { callMessage } = useAlert();

    const codesInGroups = groups.flatMap((g) => g.codes);

    function toggleCode(code: string) {
        if (isReading) return;
        if (codesInGroups.includes(code)) return;
        setActiveSelection((prev) => (prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]));
    }

    function handleAddGroup() {
        if (activeSelection.length === 0) return;

        const match = findGroup(activeSelection);

        if (!match) {
            callMessage(`Combinação inválida: ${sortCodes(activeSelection).join(" + ")}. Consulte a tabela de agrupamentos permitidos.`, "error");
            return;
        }

        const newGroup: GroupEntry = {
            id: crypto.randomUUID(),
            codes: sortCodes(activeSelection),
            label: match.label,
            type: match.type,
            colorIndex: groups.length % GROUP_COLORS.length,
        };

        setGroups((prev) => [...prev, newGroup]);
        setActiveSelection([]);
    }

    function removeGroup(id: string) {
        setGroups((prev) => prev.filter((g) => g.id !== id));
    }

    function getData(): LicenseData | undefined {
        if (groups.length === 0) {
            callMessage("Adicione ao menos um grupo de habilitação", "info");
            return undefined;
        }

        let multiGroupCounter = 0;
        const tipohabilitacao: TipoHabPayloadItem[] = groups.flatMap((g) => {
            const grupoId = g.codes.length > 1 ? ++multiGroupCounter : 0;
            return g.codes.map((codigo) => ({ codigo, grupo: grupoId }));
        });

        const allCodes = groups.flatMap((g) => g.codes);
        const selectedLicensesData = licenses.filter((l) => allCodes.includes(l.codigo));
        const selectedLicenses = selectedLicensesData.map((l) => l.id_tipo_habilitacao);

        return { selectedLicenses, selectedLicensesData, tipohabilitacao, isValid: true };
    }

    useImperativeHandle(ref, () => ({ getData }));

    useEffect(() => {
        if (!response || !licenses.length) return;

        const items = response.tipohabilitacao ?? [];
        if (!items.length) return;

        const soloItems = items.filter((v) => v.group === 0);
        const multiItems = items.filter((v) => v.group !== 0);

        const grouped = new Map<number, string[]>();
        for (const item of multiItems) {
            if (!grouped.has(item.group)) grouped.set(item.group, []);
            grouped.get(item.group)!.push(item.codigo);
        }

        const entries: GroupEntry[] = [];
        let colorIdx = 0;

        for (const item of soloItems) {
            const match = findGroup([item.codigo]);
            entries.push({
                id: crypto.randomUUID(),
                codes: [item.codigo],
                label: match?.label ?? item.descricao ?? item.codigo,
                type: match?.type ?? "individual",
                colorIndex: colorIdx++ % GROUP_COLORS.length,
            });
        }

        for (const [, codes] of grouped) {
            const sorted = sortCodes(codes);
            const match = findGroup(sorted);
            entries.push({
                id: crypto.randomUUID(),
                codes: sorted,
                label: match?.label ?? sorted.join(" + "),
                type: match?.type ?? "individual",
                colorIndex: colorIdx++ % GROUP_COLORS.length,
            });
        }

        setGroups(entries);
    }, [response, licenses]);

    const selectionMatch = activeSelection.length > 0 ? findGroup(activeSelection) : undefined;
    const isSelectionValid = !!selectionMatch;

    return (
        <Card ref={refContainer}>
            <CardHeader>
                <CardTitle $color={"#FFCD00"}>Habilitação Solicitada</CardTitle>
                <CardSubTitle>
                    Selecione os código(s) e clique em <strong>Adicionar grupo</strong>. Múltiplos grupos são permitidos.
                </CardSubTitle>

                {/* ── Chips de seleção ── */}
                <LicenseContainer>
                    <LicenseTitle>
                        Código(s) de habilitação <a>*</a>
                    </LicenseTitle>
                    <LicenseSubTitle>Clique nos códigos para montar um grupo — depois clique em &quot;Adicionar grupo&quot;</LicenseSubTitle>

                    {licenses.map((l) => {
                        const inGroup = codesInGroups.includes(l.codigo);
                        const selected = activeSelection.includes(l.codigo);
                        return (
                            <LicenseItem2 key={l.id_tipo_habilitacao} $selected={selected} $inGroup={inGroup} onClick={() => toggleCode(l.codigo)}>
                                {l.codigo}
                            </LicenseItem2>
                        );
                    })}

                    {activeSelection.length > 0 ? (
                        <LicenseSubTitle style={{ marginTop: 2, width: "100%" }}>
                            Selecionados: <strong>{sortCodes(activeSelection).join(" + ")}</strong>
                            {" — "}
                            {isSelectionValid ? (
                                <span style={{ color: "#2E7D32" }}>✓ Combinação válida — {selectionMatch!.label}</span>
                            ) : (
                                <span style={{ color: "#C62828" }}>✗ Combinação ainda inválida</span>
                            )}
                        </LicenseSubTitle>
                    ) : (
                        <span style={{ width: "100%" }}></span>
                    )}

                    <AddGroupButton $disabled={!isSelectionValid} onClick={handleAddGroup} disabled={!isSelectionValid}>
                        + Adicionar grupo
                    </AddGroupButton>
                </LicenseContainer>

                {/* ── Grupos criados ── */}
                {groups.length > 0 && (
                    <LicenseContainer>
                        <LicenseTitle>Grupos de habilitação:</LicenseTitle>

                        {groups.map((group) => {
                            const color = GROUP_COLORS[group.colorIndex];
                            return (
                                <GroupCard key={group.id} $bg={color.bg} $border={color.border}>
                                    <GroupCardBody>
                                        <GroupCardCodes $color={color.text}>{group.codes.join(" e ")}</GroupCardCodes>
                                        <GroupCardLabel>{group.label}</GroupCardLabel>
                                        <GroupCardType $color={color.border}>
                                            {group.type === "conjunta" ? "Habilitação conjunta" : "Mesmo estabelecimento"}
                                        </GroupCardType>
                                    </GroupCardBody>

                                    {!isReading && (
                                        <GroupRemoveButton onClick={() => removeGroup(group.id)} title="Remover grupo">
                                            ✕
                                        </GroupRemoveButton>
                                    )}
                                </GroupCard>
                            );
                        })}
                    </LicenseContainer>
                )}

                {groups.length === 0 && <CardSubTitle>Nenhum grupo adicionado ainda.</CardSubTitle>}
            </CardHeader>
        </Card>
    );
});

License.displayName = "License";

export default License;
