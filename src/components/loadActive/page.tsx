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

export default function LoadActiveComponent() {
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

    return (
        <Container>
            <SidebarNewProposal
                refs={[sectionRef, sectionRef2, sectionRef3, sectionRef4, sectionRef5, sectionRef6]}
                refContainer={refContainer}
            ></SidebarNewProposal>
            <Questions ref={refContainer}>
                <ProcessIdentification
                    isReading={true}
                    refContainer={sectionRef}
                    ref={processRef}
                    tec={data.technicians}
                    dili={data.diligencia}
                    response={dataForm}
                ></ProcessIdentification>
                <FinancialImpact isReading={true} response={dataForm} refContainer={sectionRef2} ref={financialRef}></FinancialImpact>
                <EstablishmentLocation
                    isReading={true}
                    response={dataForm}
                    refContainer={sectionRef3}
                    subRef={sectionRef4}
                    ref={establishmentRef}
                ></EstablishmentLocation>
                <License isReading={true} response={dataForm} refContainer={sectionRef5} licenses={data.typeHab} ref={licenseRef}></License>
                <History isReading={true} response={dataForm} refContainer={sectionRef6} ref={historyRef}></History>
                <FooterNewProposal load={isSending}></FooterNewProposal>
            </Questions>
        </Container>
    );
}
