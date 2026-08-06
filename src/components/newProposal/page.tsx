"use client";
import { useEffect, useRef, useState } from "react";
import SidebarNewProposal from "../filterLeftNewProposal/page";
import ProcessIdentification, { ProcessIdentificationRef } from "../questionModule/processIdentification/page";
import {
    Container, InheritActions, InheritCancel, InheritCard, InheritCode,
    InheritCodes, InheritConfirm, InheritOverlay, InheritSubtitle, InheritTitle, Questions,
    InheritDivider, InheritViewActiveBtn, InheritHistoricoList, InheritHistoricoRow,
    InheritHistoricoLabel, InheritHistoricoBtn,
} from "./styled";
import {
    HistoricoSection, HistoricoSectionTitle, HistoricoRow, HistoricoInfo,
    HistoricoLabel, HistoricoValue, HistoricoCodigosList, HistoricoCodigoBadge,
    HistoricoVerBtn, HistoricoEmpty,
} from "../loadActive/styled";
import FinancialImpact, { FinancialImpactRef } from "../questionModule/FinancialImpact/page";
import EstablishmentLocation, { EstablishmentLocationRef } from "../questionModule/EstablishmentLocation/page";
import License, { LicenseRef } from "../questionModule/License/page";
import EstablishmentHabLink, { EstablishmentHabLinkRef, EstabInfo } from "../questionModule/EstablishmentHabLink/page";
import { proposalService } from "@/services/proposal/Proposal";
import { useAlert } from "@/providers/alert/page";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PagesPermissions } from "@/data/pages";
import { DataHab, HabilitacaoExitingResponse, TypeHab } from "@/services/proposal/type";
import Loading from "../spinner/page";
import History, { HistoryRef } from "../questionModule/history/page";
import FooterNewProposal from "../FooterNewProposal/page";

export default function NewProposalActive() {
    const [data, setData] = useState<DataHab>({
        typeHab: [],
        diligencia: [],
        technicians: [],
        cnes: [],
    });
    const [dataForm, setDataForm] = useState<HabilitacaoExitingResponse>();
    const [selectedHabs, setSelectedHabs] = useState<TypeHab[]>([]);
    const [availableEstabs, setAvailableEstabs] = useState<EstabInfo[]>([]);
    const [activeInfo, setActiveInfo] = useState<{ id: number; codigos: string[] } | null>(null);
    const [activesList, setActivesList] = useState<{ id: number; codigos: string[] }[]>([]);
    const [showInheritModal, setShowInheritModal] = useState(false);

    type HistoricoHab = { id: number; situacao: string; inicioSaips: string | null; numeroSaips: string; codigos: string[] };
    const [historicos, setHistoricos] = useState<HistoricoHab[]>([]);

    const refContainer = useRef<HTMLDivElement | null>(null);

    const sectionRef = useRef<HTMLDivElement | null>(null);
    const processRef = useRef<ProcessIdentificationRef>(null);

    const sectionRef2 = useRef<HTMLDivElement | null>(null);
    const financialRef = useRef<FinancialImpactRef>(null);

    const sectionRef3 = useRef<HTMLDivElement | null>(null);
    const sectionRef4 = useRef<HTMLDivElement | null>(null);
    const establishmentRef = useRef<EstablishmentLocationRef>(null);

    const habLinkRef = useRef<HTMLDivElement | null>(null);
    const habLinkCompRef = useRef<EstablishmentHabLinkRef>(null);

    const sectionRef5 = useRef<HTMLDivElement | null>(null);
    const licenseRef = useRef<LicenseRef>(null);

    const sectionRef6 = useRef<HTMLDivElement | null>(null);
    const historyRef = useRef<HistoryRef>(null);

    const [isLoading, setIsLoading] = useState(true);
    const [isSending, setIsSending] = useState(false);

    const { callMessage } = useAlert();
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const load = async () => {
            const response = await proposalService.getProposalData();
            if (!response.status) {
                if (response.statusCode == 503) callMessage(response.message, "warning");
                else callMessage(response.message, "error");
                setTimeout(() => { router.push(PagesPermissions[pathname].go); }, 1000);
                return;
            }
            setData(response.data);
            setIsLoading(false);
        };

        const loadForm = async (id: number) => {
            const response = await proposalService.getProposalDataForForm(id);
            if (!response.status) {
                callMessage(response.message, "error");
                setTimeout(() => { router.push(PagesPermissions[pathname].go); }, 1000);
            }
            setDataForm(response.data);
            callMessage(response.message, "success");
            setIsLoading(false);

            const cnes = response.data?.cnes;
            if (cnes) {
                // Coleta todos os CNES da proposta: principal + estabelecimentos vinculados
                const allCnes = [...new Set(
                    [cnes, ...(response.data.habEstabelecimentos?.map(e => e.cnes) ?? [])]
                        .map(c => c.trim()).filter(Boolean)
                )];

                const [histRes, ...activeResults] = await Promise.all([
                    proposalService.getHistoricosByCnes(cnes),
                    ...allCnes.map(c => proposalService.getActiveByCnes(c)),
                ]);

                if (histRes.status && Array.isArray(histRes.data)) setHistoricos(histRes.data);

                const actives = activeResults
                    .filter(r => r.status && r.data)
                    .map(r => r.data!)
                    // dedup por id
                    .filter((a, i, arr) => arr.findIndex(x => x.id === a.id) === i);
                setActivesList(actives);
                if (actives.length > 0) setActiveInfo(actives[0]);
            }
        };

        load();
        const id = Number(searchParams.get("id") || 0);
        if (id !== 0) loadForm(id);
    }, []);

    // Chamado quando o CNES primário é validado — verifica se já existe habilitação ativa
    async function onCnesValidated(cnes: string) {
        // Só verifica em modo criação (sem proposal carregada) e sem herança já ativa
        if (dataForm) return;
        const [activeRes, histRes] = await Promise.all([
            proposalService.getActiveByCnes(cnes),
            proposalService.getHistoricosByCnes(cnes),
        ]);
        if (histRes.status && Array.isArray(histRes.data)) {
            setHistoricos(histRes.data);
        }
        if (activeRes.status && activeRes.data) {
            setActiveInfo(activeRes.data);
            setActivesList([activeRes.data]);
            setShowInheritModal(true);
        }
    }

    // Usuário confirmou herdar dados da habilitação ativa encontrada
    async function handleInheritConfirm() {
        if (!activeInfo) return;
        setShowInheritModal(false);
        setIsLoading(true);
        const res = await proposalService.getProposalDataForForm(activeInfo.id);
        setIsLoading(false);
        if (res.status) {
            setDataForm(res.data);
        }
    }

    if (isLoading) return <Loading />;

    async function generatePayload() {
        if (isSending) { callMessage("Aguarde finalizar o envio", "info"); return; }

        const processData = processRef.current?.getData();
        const financialData = financialRef.current?.getData();
        const establishmentData = establishmentRef.current?.getData();
        const licenseData = licenseRef.current?.getData();
        const historyData = historyRef.current?.getData();

        if (!processData || !financialData || !establishmentData || !licenseData || !historyData) return;

        const habLinks = habLinkCompRef.current?.getData();

        const payload = {
            saips: processData.saips,
            nup: processData.nup,
            situacao: processData.situation,
            newCasesCIB: establishmentData.newCasesCIB,
            tipo_financiamento: processData.financingType,
            tecnico_responsavel_id: Number(processData.technician),
            numero_portaria: processData.ordinance,
            inicio_saips: processData.dateSaips ? new Date(processData.dateSaips).toISOString() : "",
            entrada_decan: processData.dateDecan ? new Date(processData.dateDecan).toISOString() : "",
            envio_drac: processData.dateDrac ? new Date(processData.dateDrac).toISOString() : "",
            inpacto_mensal: Number(financialData.impactMensal.replace(/\./g, "").replace(",", ".")),
            parcela_unica: Number(financialData.parcelaUnica.replace(/\./g, "").replace(",", ".")),
            cnes: establishmentData.cnes,
            numero_aceleradores: Number(establishmentData.accelerators),
            tipohabilitacao: licenseData.tipohabilitacao,
            habilitacaoConjunta: licenseData.habilitacaoConjunta,
            estabelecimentos: establishmentData.establishments,
            habPorEstabelecimento: habLinks?.links ?? [],
            diligencia: processData.selectedDiligence,
            hitorico: historyData.historyList.map((item, index) => ({
                sequencia: String(index + 1),
                anoAlteracao: item.year,
                codigos: item.code,
            })),
        };

        setIsLoading(true);
        const response = await callApi(payload);
        setIsSending(false);

        if (!response.status) {
            callMessage(response.message, "error");
        } else {
            callMessage(response.message, "success");
            setTimeout(() => {
                try { router.push(PagesPermissions[pathname].go); }
                catch { router.push("/"); }
            }, 1000);
        }
    }

    async function deleteProposal() {
        setIsSending(true);
        const id = Number(searchParams.get("id") || 0);
        const response = await proposalService.softDelete(id);
        setIsSending(false);
        callMessage(response.message, "success");
        setTimeout(() => {
            try { router.push(PagesPermissions[pathname].go); }
            catch { router.push("/"); }
        }, 1000);
    }

    async function callApi(data: unknown) {
        const id = Number(searchParams.get("id") || 0);
        if (dataForm && id !== 0) return await proposalService.updateProposal(data, id);
        else return await proposalService.insertNewProposal(data);
    }

    return (
        <Container>
            <SidebarNewProposal
                refs={[sectionRef, sectionRef2, sectionRef3, sectionRef4, sectionRef5, sectionRef6]}
                refContainer={refContainer}
            />
            <Questions ref={refContainer}>
                <ProcessIdentification
                    refContainer={sectionRef}
                    ref={processRef}
                    tec={data.technicians}
                    dili={data.diligencia}
                    response={dataForm}
                />
                <FinancialImpact response={dataForm} refContainer={sectionRef2} ref={financialRef} />
                <EstablishmentLocation
                    response={dataForm}
                    refContainer={sectionRef3}
                    subRef={sectionRef4}
                    ref={establishmentRef}
                    onEstabsChange={setAvailableEstabs}
                    onCnesValidated={onCnesValidated}
                />
                <EstablishmentHabLink
                    refContainer={habLinkRef}
                    ref={habLinkCompRef}
                    establishments={availableEstabs}
                    habs={selectedHabs}
                    response={dataForm}
                />
                <License
                    response={dataForm}
                    refContainer={sectionRef5}
                    licenses={data.typeHab}
                    ref={licenseRef}
                    currentProposalId={dataForm?.id_habilitacao}
                    onHabsChange={setSelectedHabs}
                />
                <History response={dataForm} refContainer={sectionRef6} ref={historyRef} />

                {(activesList.length > 0 || historicos.length > 0) && (() => {
                    const historicosFiltered = historicos.filter((h) => h.id !== dataForm?.id_habilitacao);
                    const total = activesList.length + historicosFiltered.length;
                    return (
                        <HistoricoSection>
                            <HistoricoSectionTitle>📋 Histórico de Habilitações ({total})</HistoricoSectionTitle>

                            {/* Uma linha por habilitação ativa encontrada */}
                            {activesList.map((active) => (
                                <HistoricoRow key={`active-${active.id}`}>
                                    <HistoricoInfo>
                                        <HistoricoLabel>Situação</HistoricoLabel>
                                        <HistoricoValue style={{ color: "#1b5e3b" }}>✅ Ativa</HistoricoValue>
                                    </HistoricoInfo>
                                    <HistoricoInfo>
                                        <HistoricoLabel>Códigos</HistoricoLabel>
                                        <HistoricoCodigosList>
                                            {active.codigos.length > 0
                                                ? active.codigos.map((c) => (
                                                      <HistoricoCodigoBadge key={c} style={{ background: "#e8f5e9", color: "#1b5e3b" }}>{c}</HistoricoCodigoBadge>
                                                  ))
                                                : <HistoricoLabel>Sem códigos</HistoricoLabel>
                                            }
                                        </HistoricoCodigosList>
                                    </HistoricoInfo>
                                    <HistoricoVerBtn
                                        style={{ background: "#1b5e3b" }}
                                        onClick={() => window.open(`/ativos/ler?id=${active.id}`, "_blank")}
                                    >
                                        Ver ativa
                                    </HistoricoVerBtn>
                                </HistoricoRow>
                            ))}

                            {/* Históricos */}
                            {historicosFiltered.length === 0 && !activeInfo ? (
                                <HistoricoEmpty>Nenhuma habilitação anterior encontrada para este CNES.</HistoricoEmpty>
                            ) : (
                                historicosFiltered.map((h) => (
                                    <HistoricoRow key={`sys-${h.id}`}>
                                        <HistoricoInfo>
                                            <HistoricoLabel>SAIPS / Ano</HistoricoLabel>
                                            <HistoricoValue>{h.numeroSaips || "—"} · {h.inicioSaips ? new Date(h.inicioSaips).getFullYear() : "—"}</HistoricoValue>
                                        </HistoricoInfo>
                                        <HistoricoInfo>
                                            <HistoricoLabel>Códigos</HistoricoLabel>
                                            <HistoricoCodigosList>
                                                {h.codigos.length > 0
                                                    ? h.codigos.map((c) => <HistoricoCodigoBadge key={c}>{c}</HistoricoCodigoBadge>)
                                                    : <HistoricoLabel>Sem códigos</HistoricoLabel>
                                                }
                                            </HistoricoCodigosList>
                                        </HistoricoInfo>
                                        <HistoricoVerBtn
                                            onClick={() => window.open(`/ativos/ler?id=${h.id}`, "_blank")}
                                        >
                                            Ver completo
                                        </HistoricoVerBtn>
                                    </HistoricoRow>
                                ))
                            )}
                        </HistoricoSection>
                    );
                })()}

                <FooterNewProposal deleteProposal={deleteProposal} generate={generatePayload} load={isSending} />
            </Questions>

            {showInheritModal && activeInfo && (
                <InheritOverlay>
                    <InheritCard>
                        <InheritTitle>⚠️ Habilitação ativa encontrada</InheritTitle>
                        <InheritSubtitle>
                            Este CNES já possui uma habilitação ativa com os seguintes códigos.
                            Deseja manter esta habilitação como base da nova proposta?
                        </InheritSubtitle>
                        <InheritCodes>
                            {activeInfo.codigos.map((c) => (
                                <InheritCode key={c}>{c}</InheritCode>
                            ))}
                        </InheritCodes>

                        <InheritViewActiveBtn
                            onClick={() => window.open(`/ativos/ler?id=${activeInfo.id}`, "_blank")}
                        >
                            🔗 Ver habilitação ativa completa
                        </InheritViewActiveBtn>

                        {historicos.length > 0 && (
                            <>
                                <InheritDivider />
                                <InheritSubtitle style={{ marginBottom: 8 }}>
                                    📋 Habilitações anteriores ({historicos.length})
                                </InheritSubtitle>
                                <InheritHistoricoList>
                                    {historicos.map((h) => (
                                        <InheritHistoricoRow key={h.id}>
                                            <InheritHistoricoLabel>
                                                {h.numeroSaips || "—"} · {h.inicioSaips ? new Date(h.inicioSaips).getFullYear() : "—"}
                                            </InheritHistoricoLabel>
                                            <InheritHistoricoBtn
                                                onClick={() => window.open(`/ativos/ler?id=${h.id}`, "_blank")}
                                            >
                                                Ver completo
                                            </InheritHistoricoBtn>
                                        </InheritHistoricoRow>
                                    ))}
                                </InheritHistoricoList>
                            </>
                        )}

                        <InheritActions>
                            <InheritCancel onClick={() => setShowInheritModal(false)}>
                                Não, começar do zero
                            </InheritCancel>
                            <InheritConfirm onClick={handleInheritConfirm}>
                                Sim, manter habilitação
                            </InheritConfirm>
                        </InheritActions>
                    </InheritCard>
                </InheritOverlay>
            )}
        </Container>
    );
}
