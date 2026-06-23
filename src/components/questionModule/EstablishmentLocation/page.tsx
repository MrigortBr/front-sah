"use client";

import { useAlert } from "@/providers/alert/page";
import {
    Card,
    CardHeader,
    CardSubTitle,
    CardTitle,
    CnesContaier,
    EstablishmentInfo,
    EstablishmentInfoTitle,
    Input,
    InputComponent,
    InputComponentUnique,
    InputDescription,
    InputText,
    LocationInfo,
    TitleDate,
    EstabTabBar,
    EstabTabButton,
    EstabTabClose,
    EstabTabAddBtn,
} from "../styled";

import { establishmentService } from "@/services/establishment/page";
import { RefObject, forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { HabilitacaoExitingResponse } from "@/services/proposal/type";
import { EstabInfo } from "../EstablishmentHabLink/page";

/* ── Types ────────────────────────────────────────────────── */

type EstabItem = {
    id: string;
    cnes: string;
    establishmentName: string;
    cnpj: string;
    legalNature: string;
    management: string;
    accelerators: string;
    uf: string;
    ibgeCity: string;
    cityName: string;
    healthRegion: string;
    ibgeHealthRegion: string;
    macroRegion: string;
    regiaoMacro: string;
    municipioMacro: string;
    populacao: string;
    cirQtd: string;
    cirVal: string;
    quiQtd: string;
    quiVal: string;
    radQtd: string;
    radVal: string;
    newCasesMacro: number;
    newCasesState: number;
    newCasesCIB: number;
    loading: boolean;
    isValid: boolean;
};

export type EstablishmentLocationData = {
    // First establishment (backward compat)
    cnes: string;
    establishmentName: string;
    cnpj: string;
    legalNature: string;
    management: string;
    accelerators: string;
    newCasesCIB: number;
    uf: string;
    ibgeCity: string;
    cityName: string;
    healthRegion: string;
    ibgeHealthRegion: string;
    macroRegion: string;
    isValid: boolean;
    // All establishments
    establishments: {
        cnes: string;
        establishmentName: string;
        accelerators: string;
        newCasesCIB: number;
        isValid: boolean;
    }[];
};

export type EstablishmentLocationRef = {
    getData: () => EstablishmentLocationData | undefined;
};

type PROP = {
    refContainer: RefObject<HTMLDivElement | null>;
    subRef: RefObject<HTMLDivElement | null>;
    response?: HabilitacaoExitingResponse;
    isReading?: boolean;
    onEstabsChange?: (estabs: EstabInfo[]) => void;
};

/* ── Helpers ──────────────────────────────────────────────── */

function createEmptyEstab(): EstabItem {
    return {
        id: crypto.randomUUID(),
        cnes: "",
        establishmentName: "",
        cnpj: "",
        legalNature: "",
        management: "",
        accelerators: "",
        uf: "",
        ibgeCity: "",
        cityName: "",
        healthRegion: "",
        ibgeHealthRegion: "",
        macroRegion: "",
        regiaoMacro: "",
        municipioMacro: "",
        populacao: "",
        cirQtd: "",
        cirVal: "",
        quiQtd: "",
        quiVal: "",
        radQtd: "",
        radVal: "",
        newCasesMacro: 0,
        newCasesState: 0,
        newCasesCIB: 0,
        loading: false,
        isValid: false,
    };
}

function formatMoney(value: string) {
    const numbers = value.replace(/\D/g, "");
    const numeric = Number(numbers) / 100;
    return (
        "R$ " +
        numeric.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })
    );
}

/* ── Component ────────────────────────────────────────────── */

const EstablishmentLocation = forwardRef<EstablishmentLocationRef, PROP>(
    ({ refContainer, subRef, response, isReading, onEstabsChange }, ref) => {
        const [estabs, setEstabs] = useState<EstabItem[]>(() => [createEmptyEstab()]);
        const [activeId, setActiveId] = useState<string>("");

        const { callMessage } = useAlert();

        // Keep activeId valid when tabs change
        useEffect(() => {
            if (estabs.length > 0 && (!activeId || !estabs.find((e) => e.id === activeId))) {
                setActiveId(estabs[0].id);
            }
        }, [estabs]);

        // Notify parent when establishments (cnes/name) change
        useEffect(() => {
            if (!onEstabsChange) return;
            onEstabsChange(
                estabs.map((e) => ({ id: e.id, cnes: e.cnes, name: e.establishmentName }))
            );
        }, [estabs.map((e) => e.id + e.cnes + e.establishmentName).join("|")]);

        const active = estabs.find((e) => e.id === activeId) ?? estabs[0];

        /* ── Updater ── */

        function updateEstab(id: string, patch: Partial<EstabItem>) {
            setEstabs((prev) => prev.map((e) => (e.id === id ? { ...e, ...patch } : e)));
        }

        /* ── CNES input ── */

        function handleCnesInput(id: string, value: string) {
            const numbers = value.replace(/\D/g, "").slice(0, 7);
            // Reset validity when CNES changes
            updateEstab(id, { cnes: numbers, isValid: false, establishmentName: "" });
        }

        /* ── CNES fetch — only when cnes reaches 7 digits and data not yet loaded ── */

        async function fetchCnes(id: string, cnes: string) {
            updateEstab(id, { loading: true });

            const res = await establishmentService.getDataEstablishment(cnes);
            updateEstab(id, { loading: false });

            if (!res.status || !res.data) {
                if (res.statusCode === 503) callMessage(res.message, "warning");
                else callMessage("CNES não encontrado", "info");
                return;
            }

            const d = res.data;
            updateEstab(id, {
                establishmentName: d.nomeEstabelecimento ?? "",
                cnpj: d.cnpj ?? "",
                legalNature: d.naturezaJuridica ?? "",
                management: d.gestao ?? "",
                uf: d.municipio?.uf?.ufSigla ?? "",
                ibgeCity: d.municipio?.ibgeMunicipio ?? "",
                cityName: d.municipio?.nomeMunicipio ?? "",
                healthRegion: d.municipio?.uf?.regioes?.[0]?.nomeRegiao ?? "",
                ibgeHealthRegion: d.municipio?.uf?.regioes?.[0]?.ibgeRegiao ?? "",
                macroRegion: d.municipio?.uf?.macrorregioes?.[0]?.nomeMacro ?? "",
                regiaoMacro: d.quantidadeRegioesSaude ?? "",
                municipioMacro: d.quantidadeMunicipios ?? "",
                populacao: d.populacaoTotalIBGE2022 ?? "",
                cirQtd: d.onco.cirQtd ?? "",
                cirVal: d.onco.cirVal ?? "",
                quiVal: d.onco.quiVal ?? "",
                quiQtd: d.onco.quiQtd ?? "",
                radQtd: d.onco.radQtd ?? "",
                radVal: d.onco.radVal ?? "",
                newCasesMacro: d.casosMacro?.estimativa_casos ?? 0,
                newCasesState:
                    d.estimativa?.reduce(
                        (acc: number, item: { estimativa_casos: number }) => acc + Number(item.estimativa_casos),
                        0
                    ) ?? 0,
                isValid: true,
            });
        }

        // Trigger fetch only when cnes hits 7 digits and data isn't loaded yet
        useEffect(() => {
            if (active?.cnes.length === 7 && !active.isValid && !active.loading) {
                fetchCnes(active.id, active.cnes);
            }
        }, [active?.cnes, active?.id]);

        /* ── Tab management ── */

        function addTab() {
            const e = createEmptyEstab();
            setEstabs((prev) => [...prev, e]);
            setActiveId(e.id);
        }

        function removeTab(id: string) {
            if (estabs.length === 1) return;
            setEstabs((prev) => prev.filter((e) => e.id !== id));
            if (activeId === id) {
                const remaining = estabs.filter((e) => e.id !== id);
                setActiveId(remaining[remaining.length - 1].id);
            }
        }

        /* ── getData ── */

        function getData(): EstablishmentLocationData | undefined {
            const first = estabs[0];
            if (!first.isValid) {
                callMessage("Preencha um CNES válido no primeiro estabelecimento", "info");
                return undefined;
            }

            return {
                cnes: first.cnes,
                establishmentName: first.establishmentName,
                cnpj: first.cnpj,
                legalNature: first.legalNature,
                management: first.management,
                accelerators: first.accelerators,
                newCasesCIB: first.newCasesCIB,
                uf: first.uf,
                ibgeCity: first.ibgeCity,
                cityName: first.cityName,
                healthRegion: first.healthRegion,
                ibgeHealthRegion: first.ibgeHealthRegion,
                macroRegion: first.macroRegion,
                isValid: true,
                establishments: estabs.map((e) => ({
                    cnes: e.cnes,
                    establishmentName: e.establishmentName,
                    accelerators: e.accelerators,
                    newCasesCIB: e.newCasesCIB,
                    isValid: e.isValid,
                })),
            };
        }

        useImperativeHandle(ref, () => ({ getData }));

        /* ── Load existing response ── */

        useEffect(() => {
            if (!response) return;
            const mainCnes = response.cnes ?? "";

            // Collect extra CNESes from habEstabelecimentos (exclude the main one)
            const extraCnes = (response.habEstabelecimentos ?? [])
                .map((h) => h.cnes)
                .filter((c) => c && c !== mainCnes);
            const uniqueExtra = [...new Set(extraCnes)];

            const mainEstab: EstabItem = {
                ...createEmptyEstab(),
                cnes: mainCnes,
                accelerators: String(response.numero_aceleradores ?? ""),
                newCasesCIB: Number(response.newCasesCIB ?? 0),
                isValid: false, // força fetchCnes
            };

            const extraEstabs: EstabItem[] = uniqueExtra.map((c) => ({
                ...createEmptyEstab(),
                cnes: c,
                isValid: false, // força fetchCnes
            }));

            setEstabs([mainEstab, ...extraEstabs]);
        }, [response]);

        /* ── Render ── */

        if (!active) return null;

        return (
            <Card ref={refContainer}>
                <CardHeader>
                    <CardTitle $color={"#6A1B9A"}>Estabelecimento e Localização</CardTitle>
                    <CardSubTitle>
                        Adicione um ou mais estabelecimentos. Digite o CNES para preencher os dados automaticamente.
                    </CardSubTitle>
                </CardHeader>

                {/* ── Tab Bar ── */}
                <EstabTabBar>
                    {estabs.map((e, idx) => (
                        <EstabTabButton
                            key={e.id}
                            $active={e.id === activeId}
                            data-active={e.id === activeId}
                            onClick={() => setActiveId(e.id)}
                        >
                            {e.cnes.length === 7 && e.establishmentName ? e.cnes : `Estabelecimento ${idx + 1}`}
                            {estabs.length > 1 && (
                                <EstabTabClose
                                    onClick={(ev) => {
                                        ev.stopPropagation();
                                        removeTab(e.id);
                                    }}
                                >
                                    ×
                                </EstabTabClose>
                            )}
                        </EstabTabButton>
                    ))}
                    {!isReading && (
                        <EstabTabAddBtn onClick={addTab} title="Adicionar estabelecimento">
                            +
                        </EstabTabAddBtn>
                    )}
                </EstabTabBar>

                {/* ── CNES Input ── */}
                <CnesContaier>
                    <InputComponentUnique>
                        <InputText>
                            CNES<a>*</a>
                        </InputText>
                        <Input
                            value={active.cnes}
                            onChange={(e) => handleCnesInput(active.id, e.target.value)}
                            maxLength={7}
                            disabled={isReading}
                        />
                        <InputDescription>
                            {active.loading ? "Carregando dados..." : "7 dígitos — dados preenchidos automaticamente"}
                        </InputDescription>
                    </InputComponentUnique>
                </CnesContaier>

                {/* ── Establishment Data ── */}
                <EstablishmentInfo>
                    <EstablishmentInfoTitle>Dados do Estabelecimento</EstablishmentInfoTitle>

                    <InputComponentUnique>
                        <InputText>Nome do Estabelecimento</InputText>
                        <Input disabled style={{ cursor: "no-drop" }} value={active.establishmentName} />
                    </InputComponentUnique>

                    <InputComponent>
                        <InputText>CNPJ</InputText>
                        <Input disabled style={{ cursor: "no-drop" }} value={active.cnpj} />
                    </InputComponent>

                    <InputComponent>
                        <InputText>Natureza Jurídica</InputText>
                        <Input disabled style={{ cursor: "no-drop" }} value={active.legalNature} />
                    </InputComponent>

                    <InputComponent>
                        <InputText>Gestão</InputText>
                        <Input disabled style={{ cursor: "no-drop" }} value={active.management} />
                    </InputComponent>

                    <InputComponent>
                        <InputText>
                            Nº Aceleradores / Cobaltos<a>*</a>
                        </InputText>
                        <Input
                            value={active.accelerators}
                            onChange={(e) => updateEstab(active.id, { accelerators: e.target.value.replace(/\D/g, "") })}
                            disabled={isReading}
                        />
                        <InputDescription>Único campo a preencher manualmente</InputDescription>
                    </InputComponent>
                </EstablishmentInfo>

                {/* ── Production Data ── */}
                <LocationInfo>
                    <TitleDate>Dados de produção</TitleDate>

                    <InputComponent>
                        <InputText>Total cirurgia Oncológica</InputText>
                        <Input disabled style={{ cursor: "no-drop" }} value={active.cirQtd} />
                    </InputComponent>

                    <InputComponent>
                        <InputText>Valor cirurgia Oncológica</InputText>
                        <Input disabled style={{ cursor: "no-drop" }} value={formatMoney(active.cirVal)} />
                    </InputComponent>

                    <InputComponent>
                        <InputText>Total Quimioterapia</InputText>
                        <Input disabled style={{ cursor: "no-drop" }} value={active.quiQtd} />
                    </InputComponent>

                    <InputComponent>
                        <InputText>Valor Quimioterapia</InputText>
                        <Input disabled style={{ cursor: "no-drop" }} value={formatMoney(active.quiVal)} />
                    </InputComponent>

                    <InputComponent>
                        <InputText>Total Radioterapia</InputText>
                        <Input disabled style={{ cursor: "no-drop" }} value={active.radQtd} />
                    </InputComponent>

                    <InputComponent>
                        <InputText>Valor Radioterapia</InputText>
                        <Input disabled style={{ cursor: "no-drop" }} value={formatMoney(active.radVal)} />
                    </InputComponent>
                </LocationInfo>

                {/* ── New Cases ── */}
                <LocationInfo>
                    <TitleDate>Novos Casos</TitleDate>

                    <InputComponent>
                        <InputText>Novos casos Macrorregião de Saúde</InputText>
                        <Input disabled style={{ cursor: "no-drop" }} value={active.newCasesMacro} />
                    </InputComponent>

                    <InputComponent>
                        <InputText>Novos casos Estado</InputText>
                        <Input disabled style={{ cursor: "no-drop" }} value={active.newCasesState} />
                    </InputComponent>

                    <InputComponent>
                        <InputText>Novos Casos de Câncer pactuados em CIB</InputText>
                        <Input
                            value={active.newCasesCIB}
                            onChange={(e) => updateEstab(active.id, { newCasesCIB: Number(e.target.value) })}
                            disabled={isReading}
                        />
                    </InputComponent>
                </LocationInfo>

                {/* ── Location ── */}
                <LocationInfo ref={subRef}>
                    <TitleDate>Localização</TitleDate>

                    <InputComponent>
                        <InputText>UF</InputText>
                        <Input disabled style={{ cursor: "no-drop" }} value={active.uf} />
                    </InputComponent>

                    <InputComponent>
                        <InputText>IBGE do Município</InputText>
                        <Input disabled style={{ cursor: "no-drop" }} value={active.ibgeCity} />
                    </InputComponent>

                    <InputComponent>
                        <InputText>Nome do Município</InputText>
                        <Input disabled style={{ cursor: "no-drop" }} value={active.cityName} />
                    </InputComponent>

                    <InputComponent>
                        <InputText>Região de Saúde</InputText>
                        <Input disabled style={{ cursor: "no-drop" }} value={active.healthRegion} />
                    </InputComponent>

                    <InputComponent>
                        <InputText>IBGE Região de Saúde</InputText>
                        <Input disabled style={{ cursor: "no-drop" }} value={active.ibgeHealthRegion} />
                    </InputComponent>

                    <InputComponent>
                        <InputText>Macrorregião de Saúde</InputText>
                        <Input disabled style={{ cursor: "no-drop" }} value={active.macroRegion} />
                    </InputComponent>

                    <InputComponent>
                        <InputText>Total regiões de saúde da macrorregião</InputText>
                        <Input disabled style={{ cursor: "no-drop" }} value={active.regiaoMacro} />
                    </InputComponent>

                    <InputComponent>
                        <InputText>Quantidade municípios da Macrorregião</InputText>
                        <Input disabled style={{ cursor: "no-drop" }} value={active.municipioMacro} />
                    </InputComponent>

                    <InputComponent>
                        <InputText>Estimativa de população IBGE 2022</InputText>
                        <Input disabled style={{ cursor: "no-drop" }} value={active.populacao} />
                    </InputComponent>
                </LocationInfo>

                {!active.isValid && (
                    <InputDescription style={{ gridColumn: "1 / 3" }}>
                        Preencha um CNES válido.
                    </InputDescription>
                )}
            </Card>
        );
    }
);

EstablishmentLocation.displayName = "EstablishmentLocation";

export default EstablishmentLocation;
