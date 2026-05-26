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

import { RefObject, forwardRef, use, useEffect, useImperativeHandle, useState } from "react";
import { HabilitacaoExitingResponse } from "@/services/proposal/type";

export type EstablishmentLocationData = {
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
    const [regiaoMacro, setRegiaoMacro] = useState("");
    const [municipioMacro, setMunicipiosMacro] = useState("");
    const [populacao, setPopulacao] = useState("");
    const [cirQtd, setCirQtd] = useState<string>("");
    const [cirVal, setCirVal] = useState<string>("");
    const [quiQtd, setQuiQtd] = useState<string>("");
    const [quiVal, setQuiVal] = useState<string>("");
    const [radQtd, setRadQtd] = useState<string>("");
    const [radVal, setRadVal] = useState<string>("");
    const [newCasesMacro, setNewCasesMacro] = useState(0);
    const [newCasesState, setNewCasesState] = useState(0);
    const [newCasesCIB, setNewCasesCIB] = useState(0);

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
            if (response.statusCode == 503) callMessage(response.message, "warning");
            else callMessage("CNES não encontrado", "info");

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
        setRegiaoMacro(data.quantidadeRegioesSaude ?? "");
        setMunicipiosMacro(data.quantidadeMunicipios ?? "");
        setPopulacao(data.populacaoTotalIBGE2022 ?? "");
        setCirQtd(data.onco.cirQtd ?? "");
        setCirVal(data.onco.cirVal ?? "");
        setQuiVal(data.onco.quiVal ?? "");
        setQuiQtd(data.onco.quiQtd ?? "");
        setRadQtd(data.onco.radQtd ?? "");
        setRadVal(data.onco.radVal ?? "");
        setNewCasesMacro(data.casosMacro.estimativa_casos);
        setNewCasesState(data.estimativa.reduce((acc, item) => acc + Number(item.estimativa_casos), 0));
    }

    useEffect(() => {
        fetchCnes();
    }, [cnes]);

    useEffect(() => {
        const valid = cnes.length === 7;
        // && newCasesCIB > 0;

        setIsValid(valid);
    }, [cnes, accelerators, establishmentName, cnpj, uf]);

    function getData(): EstablishmentLocationData | undefined {
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
                newCasesCIB: newCasesCIB,
            };
        }

        callMessage("Preencha todo o módulo de Estabelecimento e Localização", "info");

        return undefined;
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

    useImperativeHandle(ref, () => ({
        getData,
    }));

    function mapEstablishmentLocationData(response: HabilitacaoExitingResponse): {
        cnes: string;
        accelerators: string;
        isValid: boolean;
        newCases: number;
    } {
        const data = response;

        console.log(data);

        return {
            cnes: data.cnes ?? "",

            accelerators: String(data.numero_aceleradores ?? ""),

            newCases: Number(data.newCasesCIB),

            isValid: true,
        };
    }

    useEffect(() => {
        if (!response) return;

        const formatted = mapEstablishmentLocationData(response);

        setCnes(formatted.cnes);

        setAccelerators(formatted.accelerators);

        setNewCasesCIB(formatted.newCases);
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
                        CNES<a>*</a>
                    </InputText>

                    <Input value={cnes} onChange={(e) => handleCnes(e.target.value)} maxLength={7} />

                    <InputDescription>{loading ? "Carregando dados..." : "7 dígitos — dados preenchidos automaticamente"}</InputDescription>
                </InputComponentUnique>
            </CnesContaier>

            <EstablishmentInfo>
                <EstablishmentInfoTitle>Dados do Estabelecimento</EstablishmentInfoTitle>

                <InputComponentUnique>
                    <InputText>Nome do Estabelecimento</InputText>

                    <Input
                        disabled
                        style={{
                            cursor: "no-drop",
                        }}
                        value={establishmentName}
                    />
                </InputComponentUnique>

                <InputComponent>
                    <InputText>CNPJ</InputText>

                    <Input
                        disabled
                        style={{
                            cursor: "no-drop",
                        }}
                        value={cnpj}
                    />
                </InputComponent>

                <InputComponent>
                    <InputText>Natureza Jurídica</InputText>

                    <Input
                        disabled
                        style={{
                            cursor: "no-drop",
                        }}
                        value={legalNature}
                    />
                </InputComponent>

                <InputComponent>
                    <InputText>Gestão</InputText>

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
                        Nº Aceleradores / Cobaltos<a>*</a>
                    </InputText>

                    <Input value={accelerators} onChange={(e) => setAccelerators(e.target.value.replace(/\D/g, ""))} />

                    <InputDescription>Único campo a preencher manualmente</InputDescription>
                </InputComponent>
            </EstablishmentInfo>

            <LocationInfo>
                <TitleDate>Dados de produção</TitleDate>

                <InputComponent>
                    <InputText>Total cirurgia Oncológica</InputText>

                    <Input
                        disabled
                        style={{
                            cursor: "no-drop",
                        }}
                        value={cirQtd}
                    />
                </InputComponent>

                <InputComponent>
                    <InputText>Valor cirurgia Oncológica</InputText>

                    <Input
                        disabled
                        style={{
                            cursor: "no-drop",
                        }}
                        value={formatMoney(cirVal)}
                    />
                </InputComponent>

                <InputComponent>
                    <InputText>Total Quimioterapia</InputText>

                    <Input
                        disabled
                        style={{
                            cursor: "no-drop",
                        }}
                        value={quiQtd}
                    />
                </InputComponent>

                <InputComponent>
                    <InputText>Valor Quimioterapia</InputText>

                    <Input
                        disabled
                        style={{
                            cursor: "no-drop",
                        }}
                        value={formatMoney(quiVal)}
                    />
                </InputComponent>

                <InputComponent>
                    <InputText>Total Radioterapia</InputText>

                    <Input
                        disabled
                        style={{
                            cursor: "no-drop",
                        }}
                        value={radQtd}
                    />
                </InputComponent>

                <InputComponent>
                    <InputText>Valor Radioterapia</InputText>

                    <Input
                        disabled
                        style={{
                            cursor: "no-drop",
                        }}
                        value={formatMoney(radVal)}
                    />
                </InputComponent>
            </LocationInfo>

            <LocationInfo>
                <TitleDate>Novos Casos</TitleDate>

                <InputComponent>
                    <InputText>Novos casos Macrorregião de Saúde</InputText>

                    <Input
                        disabled
                        style={{
                            cursor: "no-drop",
                        }}
                        value={newCasesMacro}
                    />
                </InputComponent>
                <InputComponent>
                    <InputText>Novos casos Estado</InputText>

                    <Input
                        disabled
                        style={{
                            cursor: "no-drop",
                        }}
                        value={newCasesState}
                    />
                </InputComponent>
                <InputComponent>
                    <InputText>Novos Casos de Câncer pactuados em CIB</InputText>
                    <Input value={newCasesCIB} onChange={(e) => setNewCasesCIB(Number(e.target.value))} />
                </InputComponent>
            </LocationInfo>

            <LocationInfo ref={subRef}>
                <TitleDate>Localização</TitleDate>

                <InputComponent>
                    <InputText>UF</InputText>

                    <Input
                        disabled
                        style={{
                            cursor: "no-drop",
                        }}
                        value={uf}
                    />
                </InputComponent>

                <InputComponent>
                    <InputText>IBGE do Município</InputText>

                    <Input
                        disabled
                        style={{
                            cursor: "no-drop",
                        }}
                        value={ibgeCity}
                    />
                </InputComponent>

                <InputComponent>
                    <InputText>Nome do Município</InputText>

                    <Input
                        disabled
                        style={{
                            cursor: "no-drop",
                        }}
                        value={cityName}
                    />
                </InputComponent>

                <InputComponent>
                    <InputText>Região de Saúde</InputText>

                    <Input
                        disabled
                        style={{
                            cursor: "no-drop",
                        }}
                        value={healthRegion}
                    />
                </InputComponent>

                <InputComponent>
                    <InputText>IBGE Região de Saúde</InputText>

                    <Input
                        disabled
                        style={{
                            cursor: "no-drop",
                        }}
                        value={ibgeHealthRegion}
                    />
                </InputComponent>

                <InputComponent>
                    <InputText>Macrorregião de Saúde</InputText>

                    <Input
                        disabled
                        style={{
                            cursor: "no-drop",
                        }}
                        value={macroRegion}
                    />
                </InputComponent>

                <InputComponent>
                    <InputText>Total regiões de saúde da macrorregião</InputText>

                    <Input
                        disabled
                        style={{
                            cursor: "no-drop",
                        }}
                        value={regiaoMacro}
                    />
                </InputComponent>

                <InputComponent>
                    <InputText>Quantidade municipios da Macrorregião</InputText>

                    <Input
                        disabled
                        style={{
                            cursor: "no-drop",
                        }}
                        value={municipioMacro}
                    />
                </InputComponent>

                <InputComponent>
                    <InputText>Estimativa de pupulçao IBGE 2022</InputText>

                    <Input
                        disabled
                        style={{
                            cursor: "no-drop",
                        }}
                        value={populacao}
                    />
                </InputComponent>
            </LocationInfo>

            {!isValid && <InputDescription>Preencha um CNES válido e o número de aceleradores/cobaltos.</InputDescription>}
        </Card>
    );
});

EstablishmentLocation.displayName = "EstablishmentLocation";

export default EstablishmentLocation;
