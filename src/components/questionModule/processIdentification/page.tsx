"use client";
import { useAlert } from "@/providers/alert/page";
import {
    Card,
    CardHeader,
    CardSubTitle,
    CardTitle,
    DateContainer,
    DiligenceContainer,
    DiligenceItem,
    DiligenceTitle,
    Input,
    InputComponent,
    InputDescription,
    InputSelect,
    InputText,
    TitleDate,
} from "../styled";

import { statusMock, typeFin } from "./data";

import { Diligencia, HabilitacaoExitingResponse, Technician } from "@/services/proposal/type";

import { RefObject, useEffect, useImperativeHandle, useState, forwardRef } from "react";

export type ProcessIdentificationData = {
    saips: string;
    nup: string;
    situation: string;
    financingType: string;
    technician: string;
    ordinance: string;
    dateSaips: string;
    dateDecan: string;
    dateDrac: string;
    selectedDiligence: number[];
    isValid: boolean;
};

export type ProcessIdentificationRef = {
    getData: () => ProcessIdentificationData | undefined;
};

type PROP = {
    refContainer: RefObject<HTMLDivElement | null>;
    tec: Technician[];
    dili: Diligencia[];
    response?: HabilitacaoExitingResponse;
    isReading?: boolean;
};

const ProcessIdentification = forwardRef<ProcessIdentificationRef, PROP>(({ refContainer, tec, dili, response, isReading }, ref) => {
    const [saips, setSaips] = useState("");
    const [nup, setNup] = useState("");
    const [situation, setSituation] = useState(statusMock[0]);
    const [financingType, setFinancingType] = useState(typeFin[0]);
    const [technician, setTechnician] = useState("");
    const [ordinance, setOrdinance] = useState("");
    const [dateSaips, setDateSaips] = useState("");
    const [dateDecan, setDateDecan] = useState("");
    const [dateDrac, setDateDrac] = useState("");
    const { callMessage } = useAlert();

    const [selectedDiligence, setSelectedDiligence] = useState<number[]>([]);

    const [isValid, setIsValid] = useState(false);

    function toggleDiligence(id: number) {
        if (!isReading) setSelectedDiligence((old) => (old.includes(id) ? old.filter((item) => item !== id) : [...old, id]));
    }

    function formatDate(date: string) {
        return date.split("T")[0];
    }

    function mapProcessIdentificationData(response: HabilitacaoExitingResponse): ProcessIdentificationData {
        const data = response;

        return {
            saips: data.saips ?? "",
            nup: data.nup ?? "",
            situation: data.situacao ?? "",
            financingType: data.tipo_financiamento ?? "",
            technician: String(data.tecnico?.id ?? ""),
            ordinance: data.numero_portaria ?? "",

            dateSaips: data.inicio_saips ? formatDate(data.inicio_saips) : "",
            dateDecan: data.entrada_decan ? formatDate(data.entrada_decan) : "",
            dateDrac: data.envio_drac ? formatDate(data.envio_drac) : "",

            selectedDiligence: data.diligencia?.map((v) => v.id) ?? [],

            isValid: true,
        };
    }

    useEffect(() => {
        const valid =
            saips.trim() !== "" &&
            // nup.trim() !== "" &&
            situation.trim() !== "" &&
            financingType.trim() !== "" &&
            technician.trim() !== "" &&
            // ordinance.trim() !== "" &&
            dateSaips.trim() !== "" &&
            dateDecan.trim() !== "";

        setIsValid(valid);
    }, [saips, nup, situation, financingType, technician, ordinance, dateSaips, dateDecan]);

    useEffect(() => {
        if (response == undefined) return;

        const formatted = mapProcessIdentificationData(response);

        setSaips(formatted.saips);
        setNup(formatted.nup);
        setSituation(formatted.situation);
        setFinancingType(formatted.financingType);
        setTechnician(formatted.technician);
        setOrdinance(formatted.ordinance);
        setDateSaips(formatted.dateSaips);
        setDateDecan(formatted.dateDecan);
        setDateDrac(formatted.dateDrac);
        setSelectedDiligence(formatted.selectedDiligence);
    }, [response]);

    function getData(): ProcessIdentificationData | undefined {
        if (isValid) {
            return {
                saips,
                nup,
                situation,
                financingType,
                technician,
                ordinance,
                dateSaips,
                dateDecan,
                dateDrac,
                selectedDiligence,
                isValid,
            };
        } else {
            callMessage("Preencha todo o modulo de Identificação do Processo", "info");
            return undefined;
        }
    }

    useImperativeHandle(ref, () => ({
        getData,
    }));

    return (
        <Card ref={refContainer}>
            <CardHeader>
                <CardTitle $color={"green"}>Identificação do Processo</CardTitle>
                <CardSubTitle>Dados de identificação e tramitação administrativa</CardSubTitle>
            </CardHeader>
            <InputComponent>
                <InputText>
                    SAIPS <a>*</a>
                </InputText>
                <Input value={saips} onChange={(e) => setSaips(e.target.value)} disabled={isReading} />
            </InputComponent>
            <InputComponent>
                <InputText>NUP</InputText>
                <Input value={nup} onChange={(e) => setNup(e.target.value)} disabled={isReading} />
            </InputComponent>
            <InputComponent>
                <InputText>
                    Situação <a>*</a>
                </InputText>
                <InputSelect value={situation} onChange={(e) => setSituation(e.target.value)} disabled={isReading}>
                    {statusMock.map((v, idx) => (
                        <option key={idx} value={v}>
                            {v}
                        </option>
                    ))}
                </InputSelect>
            </InputComponent>
            <InputComponent>
                <InputText>
                    Tipo de Financiamento <a>*</a>
                </InputText>
                <InputSelect value={financingType} onChange={(e) => setFinancingType(e.target.value)} disabled={isReading}>
                    {typeFin.map((v, idx) => (
                        <option key={idx} value={v}>
                            {v}
                        </option>
                    ))}
                </InputSelect>
            </InputComponent>
            <InputComponent>
                <InputText>
                    Técnico Responsável <a>*</a>
                </InputText>
                <InputSelect value={technician} onChange={(e) => setTechnician(e.target.value)} disabled={isReading}>
                    <option value="">Selecione</option>
                    {tec.map((v) => (
                        <option key={v.id} value={v.id}>
                            {v.name} {v.surname}
                        </option>
                    ))}
                </InputSelect>
            </InputComponent>
            <InputComponent>
                <InputText>Nº Portaria de Habilitação</InputText>
                <Input value={ordinance} onChange={(e) => setOrdinance(e.target.value)} disabled={isReading} />
            </InputComponent>
            <DiligenceContainer>
                <DiligenceTitle>
                    ⚠️ Diligência(s) <a>Opcional — selecione uma ou mais</a>
                </DiligenceTitle>
                {dili.map((v) => (
                    <DiligenceItem key={v.id} $selected={selectedDiligence.includes(v.id)} onClick={() => toggleDiligence(v.id)}>
                        {v.title}
                    </DiligenceItem>
                ))}
            </DiligenceContainer>
            <DateContainer>
                <TitleDate>Datas de tramitação</TitleDate>
                <InputComponent>
                    <InputText>
                        Início no SAIPS <a>*</a>
                    </InputText>
                    <Input type="date" value={dateSaips} onChange={(e) => setDateSaips(e.target.value)} disabled={isReading} />
                    <InputDescription>Resposta única e fixa</InputDescription>
                </InputComponent>
                <InputComponent>
                    <InputText>
                        Entrada na DECAN <a>*</a>
                    </InputText>
                    <Input type="date" value={dateDecan} onChange={(e) => setDateDecan(e.target.value)} disabled={isReading} />
                    <InputDescription>Resposta única e fixa</InputDescription>
                </InputComponent>
                <InputComponent>
                    <InputText>Envio ao DRAC</InputText>{" "}
                    <Input type="date" value={dateDrac} onChange={(e) => setDateDrac(e.target.value)} disabled={isReading} />
                </InputComponent>
            </DateContainer>
            {!isValid && <InputDescription>Preencha todos os campos obrigatórios.</InputDescription>}
        </Card>
    );
});

ProcessIdentification.displayName = "ProcessIdentification";

export default ProcessIdentification;
