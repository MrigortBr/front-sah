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
} from "../styled";

import { establishmentService } from "@/services/establishment/page";

import { RefObject, forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { HabilitacaoExitingResponse } from "@/services/proposal/type";

export type EstablishmentLocationData = {
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
    isValid: boolean;
};

export type EstablishmentLocationRef = {
    getData: () => EstablishmentLocationData | undefined;
};

type PROP = {
    refContainer: RefObject<HTMLDivElement | null>;
    subRef: RefObject<HTMLDivElement | null>;
    response?: HabilitacaoExitingResponse;
};

const EstablishmentLocation = forwardRef<EstablishmentLocationRef, PROP>(({ refContainer, subRef, response }, ref) => {
    const [cnes, setCnes] = useState("");

    const [establishmentName, setEstablishmentName] = useState("");

    const [cnpj, setCnpj] = useState("");
    const [legalNature, setLegalNature] = useState("");

    const [management, setManagement] = useState("");

    const [accelerators, setAccelerators] = useState("");

    const [uf, setUf] = useState("");

    const [ibgeCity, setIbgeCity] = useState("");
    const [cityName, setCityName] = useState("");

    const [healthRegion, setHealthRegion] = useState("");

    const [ibgeHealthRegion, setIbgeHealthRegion] = useState("");

    const [macroRegion, setMacroRegion] = useState("");

    const [isValid, setIsValid] = useState(false);

    const [loading, setLoading] = useState(false);

    const { callMessage } = useAlert();

    function handleCnes(value: string) {
        const numbers = value.replace(/\D/g, "");

        setCnes(numbers.slice(0, 7));
    }

    async function fetchCnes() {
        if (cnes.length !== 7) return;

        setLoading(true);

        const response = await establishmentService.getDataEstablishment(cnes);

        setLoading(false);

        if (!response.status || !response.data) {
            callMessage("CNES não encontrado", "info");

            return;
        }

        const data = response.data;

        setEstablishmentName(data.nomeEstabelecimento ?? "");

        setCnpj(data.cnpj ?? "");

        setLegalNature(data.naturezaJuridica ?? "");

        setManagement(data.gestao ?? "");

        setUf(data.municipio?.uf?.ufSigla ?? "");

        setIbgeCity(data.municipio?.ibgeMunicipio ?? "");

        setCityName(data.municipio?.nomeMunicipio ?? "");

        setHealthRegion(data.municipio?.uf?.regioes?.[0]?.nomeRegiao ?? "");

        setIbgeHealthRegion(data.municipio?.uf?.regioes?.[0]?.ibgeRegiao ?? "");

        setMacroRegion(data.municipio?.uf?.macrorregioes?.[0]?.nomeMacro ?? "");
    }

    useEffect(() => {
        fetchCnes();
    }, [cnes]);

    useEffect(() => {
        const valid = cnes.length === 7 && accelerators.trim() !== "" && uf.trim() !== "";

        setIsValid(valid);
    }, [cnes, accelerators, establishmentName, cnpj, uf]);

    function getData(): EstablishmentLocationData | undefined {
        console.log(isValid);

        if (isValid) {
            return {
                cnes,
                establishmentName,
                cnpj,
                legalNature,
                management,
                accelerators,
                uf,
                ibgeCity,
                cityName,
                healthRegion,
                ibgeHealthRegion,
                macroRegion,
                isValid,
            };
        }

        callMessage("Preencha todo o módulo de Estabelecimento e Localização", "info");

        return undefined;
    }

    useImperativeHandle(ref, () => ({
        getData,
    }));

    function mapEstablishmentLocationData(response: HabilitacaoExitingResponse): { cnes: string; accelerators: string; isValid: boolean } {
        const data = response;

        return {
            cnes: data.cnes ?? "",

            accelerators: String(data.numero_aceleradores ?? ""),

            isValid: true,
        };
    }

    useEffect(() => {
        if (!response) return;

        const formatted = mapEstablishmentLocationData(response);

        setCnes(formatted.cnes);

        setAccelerators(formatted.accelerators);
    }, [response]);

    return (
        <Card ref={refContainer}>
            <CardHeader>
                <CardTitle $color={"#6A1B9A"}>Estabelecimento e Localização</CardTitle>

                <CardSubTitle>
                    Digite o CNES para preencher automaticamente os dados do estabelecimento e localização via banco do CNES 🔗
                </CardSubTitle>
            </CardHeader>

            <CnesContaier>
                <InputComponentUnique>
                    <InputText>
                        CNES <a>*</a>
                    </InputText>

                    <Input value={cnes} onChange={(e) => handleCnes(e.target.value)} maxLength={7} />

                    <InputDescription>{loading ? "Carregando dados..." : "7 dígitos — dados preenchidos automaticamente"}</InputDescription>
                </InputComponentUnique>
            </CnesContaier>

            <EstablishmentInfo>
                <EstablishmentInfoTitle>Dados do Estabelecimento</EstablishmentInfoTitle>

                <InputComponentUnique>
                    <InputText>
                        Nome do Estabelecimento
                        <a>*</a>
                    </InputText>

                    <Input
                        disabled
                        style={{
                            cursor: "no-drop",
                        }}
                        value={establishmentName}
                    />
                </InputComponentUnique>

                <InputComponent>
                    <InputText>
                        CNPJ <a>*</a>
                    </InputText>

                    <Input
                        disabled
                        style={{
                            cursor: "no-drop",
                        }}
                        value={cnpj}
                    />
                </InputComponent>

                <InputComponent>
                    <InputText>
                        Natureza Jurídica
                        <a>*</a>
                    </InputText>

                    <Input
                        disabled
                        style={{
                            cursor: "no-drop",
                        }}
                        value={legalNature}
                    />
                </InputComponent>

                <InputComponent>
                    <InputText>
                        Gestão <a>*</a>
                    </InputText>

                    <Input
                        disabled
                        style={{
                            cursor: "no-drop",
                        }}
                        value={management}
                    />
                </InputComponent>

                <InputComponent>
                    <InputText>
                        Nº Aceleradores / Cobaltos
                        <a>*</a>
                    </InputText>

                    <Input value={accelerators} onChange={(e) => setAccelerators(e.target.value.replace(/\D/g, ""))} />

                    <InputDescription>Único campo a preencher manualmente</InputDescription>
                </InputComponent>
            </EstablishmentInfo>

            <LocationInfo ref={subRef}>
                <TitleDate>Localização</TitleDate>

                <InputComponent>
                    <InputText>
                        UF <a>*</a>
                    </InputText>

                    <Input
                        disabled
                        style={{
                            cursor: "no-drop",
                        }}
                        value={uf}
                    />
                </InputComponent>

                <InputComponent>
                    <InputText>
                        IBGE do Município
                        <a>*</a>
                    </InputText>

                    <Input
                        disabled
                        style={{
                            cursor: "no-drop",
                        }}
                        value={ibgeCity}
                    />
                </InputComponent>

                <InputComponent>
                    <InputText>
                        Nome do Município
                        <a>*</a>
                    </InputText>

                    <Input
                        disabled
                        style={{
                            cursor: "no-drop",
                        }}
                        value={cityName}
                    />
                </InputComponent>

                <InputComponent>
                    <InputText>
                        Região de Saúde
                        <a>*</a>
                    </InputText>

                    <Input
                        disabled
                        style={{
                            cursor: "no-drop",
                        }}
                        value={healthRegion}
                    />
                </InputComponent>

                <InputComponent>
                    <InputText>
                        IBGE Região de Saúde
                        <a>*</a>
                    </InputText>

                    <Input
                        disabled
                        style={{
                            cursor: "no-drop",
                        }}
                        value={ibgeHealthRegion}
                    />
                </InputComponent>

                <InputComponent>
                    <InputText>
                        Macrorregião de Saúde
                        <a>*</a>
                    </InputText>

                    <Input
                        disabled
                        style={{
                            cursor: "no-drop",
                        }}
                        value={macroRegion}
                    />
                </InputComponent>
            </LocationInfo>

            {!isValid && <InputDescription>Preencha um CNES válido e o número de aceleradores/cobaltos.</InputDescription>}
        </Card>
    );
});

EstablishmentLocation.displayName = "EstablishmentLocation";

export default EstablishmentLocation;
