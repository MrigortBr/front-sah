"use client";
import { useEffect, useRef, useState } from "react";
import SidebarNewProposal from "../filterLeftNewProposal/page";
import ProcessIdentification, { ProcessIdentificationRef } from "../questionModule/processIdentification/page";
import {
    ConfirmActions, ConfirmCancel, ConfirmCard, ConfirmOverlay,
    ConfirmProceed, ConfirmText, ConfirmTitle, Container, Questions,
} from "./styled";
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

    const refContainer = useRef<HTMLDivElement | null>(null);

    const sectionRef  = useRef<HTMLDivElement | null>(null);
    const processRef  = useRef<ProcessIdentificationRef>(null);

    const sectionRef2  = useRef<HTMLDivElement | null>(null);
    const financialRef = useRef<FinancialImpactRef>(null);

    const sectionRef3       = useRef<HTMLDivElement | null>(null);
    const sectionRef4       = useRef<HTMLDivElement | null>(null);
    const establishmentRef  = useRef<EstablishmentLocationRef>(null);

    const habLinkRef     = useRef<HTMLDivElement | null>(null);
    const habLinkCompRef = useRef<EstablishmentHabLinkRef>(null);

    const sectionRef5 = useRef<HTMLDivElement | null>(null);
    const licenseRef  = useRef<LicenseRef>(null);

    const sectionRef6 = useRef<HTMLDivElement | null>(null);
    const historyRef  = useRef<HistoryRef>(null);

    const [isLoading,   setIsLoading]   = useState(true);
    const [isSending,   setIsSending]   = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const { callMessage } = useAlert();
    const pathname     = usePathname();
    const router       = useRouter();
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
        };

        load();
        const id = Number(searchParams.get("id") || 0);
        if (id !== 0) loadForm(id);
    }, []);

    if (isLoading) return <Loading />;

    function buildPayload(force = false) {
        const processData       = processRef.current?.getData(force);
        const financialData     = financialRef.current?.getData(force);
        const establishmentData = establishmentRef.current?.getData(force);
        const licenseData       = licenseRef.current?.getData(force);
        const historyData       = historyRef.current?.getData(force);

        if (!processData || !financialData || !establishmentData || !licenseData || !historyData) return null;

        const habLinks = habLinkCompRef.current?.getData();

        return {
            saips:                  processData.saips,
            nup:                    processData.nup,
            situacao:               processData.situation,
            newCasesCIB:            establishmentData.newCasesCIB,
            tipo_financiamento:     processData.financingType,
            tecnico_responsavel_id: Number(processData.technician),
            numero_portaria:        processData.ordinance,
            inicio_saips:           processData.dateSaips ? new Date(processData.dateSaips).toISOString() : "",
            entrada_decan:          processData.dateDecan ? new Date(processData.dateDecan).toISOString() : "",
            envio_drac:             processData.dateDrac  ? new Date(processData.dateDrac).toISOString()  : "",
            inpacto_mensal:         Number(financialData.impactAnual.replace(/\./g, "").replace(",", ".")),
            parcela_unica:          Number(financialData.parcelaUnica.replace(/\./g, "").replace(",", ".")),
            cnes:                   establishmentData.cnes,
            numero_aceleradores:    Number(establishmentData.accelerators),
            tipohabilitacao:        licenseData.tipohabilitacao,
            habilitacaoConjunta:    licenseData.habilitacaoConjunta,
            estabelecimentos:       establishmentData.establishments,
            habPorEstabelecimento:  habLinks?.links ?? [],
            diligencia:             processData.selectedDiligence,
            hitorico: historyData.historyList.map((item, index) => ({
                sequencia:    String(index + 1),
                anoAlteracao: item.year,
                codigos:      item.code,
            })),
        };
    }

    async function sendPayload(payload: unknown) {
        setIsLoading(true);
        const id       = Number(searchParams.get("id") || 0);
        const response = await proposalService.updateProposalActive(payload, id);
        setIsSending(false);
        setIsLoading(false);

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

    async function generatePayload() {
        if (isSending) { callMessage("Aguarde finalizar o envio", "info"); return; }

        // Tenta validação normal
        const payload = buildPayload(false);
        if (payload) {
            // Todos os campos válidos — salva direto
            await sendPayload(payload);
            return;
        }

        // Algum campo inválido — pergunta se quer salvar mesmo assim
        setShowConfirm(true);
    }

    async function handleForceConfirm() {
        setShowConfirm(false);
        const payload = buildPayload(true);
        if (!payload) {
            callMessage("Não foi possível coletar os dados do formulário", "error");
            return;
        }
        await sendPayload(payload);
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
                <FooterNewProposal generate={generatePayload} load={isSending} />
            </Questions>

            {showConfirm && (
                <ConfirmOverlay>
                    <ConfirmCard>
                        <ConfirmTitle>⚠️ Campos obrigatórios em branco</ConfirmTitle>
                        <ConfirmText>
                            Alguns campos obrigatórios não foram preenchidos. Deseja salvar mesmo assim?
                            Os campos vazios serão enviados sem valor para o sistema.
                        </ConfirmText>
                        <ConfirmActions>
                            <ConfirmCancel onClick={() => setShowConfirm(false)}>
                                Cancelar
                            </ConfirmCancel>
                            <ConfirmProceed onClick={handleForceConfirm}>
                                Salvar assim mesmo
                            </ConfirmProceed>
                        </ConfirmActions>
                    </ConfirmCard>
                </ConfirmOverlay>
            )}
        </Container>
    );
}
