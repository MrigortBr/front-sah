"use client";
import { useEffect, useRef, useState } from "react";
import SidebarNewProposal from "../filterLeftNewProposal/page";
import ProcessIdentification, { ProcessIdentificationRef } from "../questionModule/processIdentification/page";
import { Container, Questions } from "./styled";
import FinancialImpact, { FinancialImpactRef } from "../questionModule/FinancialImpact/page";
import EstablishmentLocation, { EstablishmentLocationRef } from "../questionModule/EstablishmentLocation/page";
import License, { LicenseRef } from "../questionModule/License/page";
import { proposalService } from "@/services/proposal/Proposal";
import { useAlert } from "@/providers/alert/page";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PagesPermissions } from "@/data/pages";
import { DataHab, HabilitacaoExitingResponse } from "@/services/proposal/type";
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

    const refContainer = useRef<HTMLDivElement | null>(null);

    const sectionRef = useRef<HTMLDivElement | null>(null);
    const processRef = useRef<ProcessIdentificationRef>(null);

    const sectionRef2 = useRef<HTMLDivElement | null>(null);
    const financialRef = useRef<FinancialImpactRef>(null);

    const sectionRef3 = useRef<HTMLDivElement | null>(null);
    const sectionRef4 = useRef<HTMLDivElement | null>(null);
    const establishmentRef = useRef<EstablishmentLocationRef>(null);

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
        const data = async () => {
            const response = await proposalService.getProposalData();

            if (!response.status) {
                if (response.statusCode == 503) callMessage(response.message, "warning");
                else callMessage(response.message, "error");
                setTimeout(() => {
                    router.push(PagesPermissions[pathname].go);
                }, 1000);

                return;
            }

            setData(response.data);
            setIsLoading(false);
        };

        const getDataForm = async (id: number) => {
            const response = await proposalService.getProposalDataForForm(id);

            if (!response.status) {
                callMessage(response.message, "error");
                setTimeout(() => {
                    router.push(PagesPermissions[pathname].go);
                }, 1000);
            }
            setDataForm(response.data);
            callMessage(response.message, "success");
            setIsLoading(false);
        };

        data();

        const id = Number(searchParams.get("id") || 0);
        if (id != 0) getDataForm(id);
    }, []);

    if (isLoading) return <Loading></Loading>;

    async function generatePayload() {
        if (isSending) {
            callMessage("Aguarde finalizar o envio", "info");
            return;
        }

        const processData = processRef.current?.getData();

        const financialData = financialRef.current?.getData();

        const establishmentData = establishmentRef.current?.getData();

        const licenseData = licenseRef.current?.getData();

        const historyData = historyRef.current?.getData();

        if (!processData || !financialData || !establishmentData || !licenseData || !historyData) {
            return undefined;
        }

        const data = {
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

            inpacto_mensal: Number(financialData.impactAnual.replace(/\./g, "").replace(",", ".")),

            parcela_unica: Number(financialData.parcelaUnica.replace(/\./g, "").replace(",", ".")),

            cnes: establishmentData.cnes,

            numero_aceleradores: Number(establishmentData.accelerators),

            tipohabilitacao: licenseData.selectedLicensesData.map((item) => item.codigo),

            diligencia: processData.selectedDiligence,

            hitorico: historyData.historyList.map((item, index) => ({
                sequencia: String(index + 1),

                anoAlteracao: item.year,

                codigos: item.code,
            })),
        };

        setIsLoading(true);

        const response = await callApi(data);

        setIsSending(false);

        if (!response.status) {
            callMessage(response.message, "error");
        } else {
            callMessage(response.message, "success");
            setTimeout(() => {
                try {
                    router.push(PagesPermissions[pathname].go);
                } catch (e) {
                    router.push("/");
                }
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
            try {
                router.push(PagesPermissions[pathname].go);
            } catch (e) {
                router.push("/");
            }
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
            ></SidebarNewProposal>
            <Questions ref={refContainer}>
                <ProcessIdentification
                    refContainer={sectionRef}
                    ref={processRef}
                    tec={data.technicians}
                    dili={data.diligencia}
                    response={dataForm}
                ></ProcessIdentification>
                <FinancialImpact response={dataForm} refContainer={sectionRef2} ref={financialRef}></FinancialImpact>
                <EstablishmentLocation
                    response={dataForm}
                    refContainer={sectionRef3}
                    subRef={sectionRef4}
                    ref={establishmentRef}
                ></EstablishmentLocation>
                <License response={dataForm} refContainer={sectionRef5} licenses={data.typeHab} ref={licenseRef}></License>
                <History response={dataForm} refContainer={sectionRef6} ref={historyRef}></History>
                <FooterNewProposal deleteProposal={deleteProposal} generate={generatePayload} load={isSending}></FooterNewProposal>
            </Questions>
        </Container>
    );
}
