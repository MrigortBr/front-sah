"use client";

import { useAlert } from "@/providers/alert/page";

import {
    Card,
    CardHeader,
    CardSubTitle,
    CardTitle,
    LicenseContainer,
    LicenseItem,
    LicenseItemSelcted,
    LicenseSubTitle,
    LicenseTitle,
} from "../styled";

import { HabilitacaoExitingResponse, TypeHab } from "@/services/proposal/type";

import { RefObject, forwardRef, useEffect, useImperativeHandle, useState } from "react";

export type LicenseData = {
    selectedLicenses: number[];
    selectedLicensesData: TypeHab[];
    isValid: boolean;
};

export type LicenseRef = {
    getData: () => LicenseData | undefined;
};

type PROP = {
    refContainer: RefObject<HTMLDivElement | null>;
    licenses: TypeHab[];
    response?: HabilitacaoExitingResponse;
};

const License = forwardRef<LicenseRef, PROP>(({ refContainer, licenses, response }, ref) => {
    const [selectedLicenses, setSelectedLicenses] = useState<number[]>([]);

    const [isValid, setIsValid] = useState(false);

    const { callMessage } = useAlert();

    function toggleLicense(id: number) {
        setSelectedLicenses((old) => (old.includes(id) ? old.filter((item) => item !== id) : [...old, id]));
    }

    useEffect(() => {
        setIsValid(selectedLicenses.length > 0);
    }, [selectedLicenses]);

    function getData(): LicenseData | undefined {
        if (isValid) {
            return {
                selectedLicenses,
                selectedLicensesData: licenses.filter((l) => selectedLicenses.includes(l.id_tipo_habilitacao)),
                isValid,
            };
        }

        callMessage("Selecione ao menos uma habilitação", "info");

        return undefined;
    }

    useImperativeHandle(ref, () => ({
        getData,
    }));

    function mapLicenseData(response: HabilitacaoExitingResponse, licenses: TypeHab[]): LicenseData {
        const selectedLicenses = response.tipohabilitacao?.map((v) => v.id) ?? [];

        return {
            selectedLicenses,

            selectedLicensesData: licenses.filter((l) => selectedLicenses.includes(l.id_tipo_habilitacao)),

            isValid: selectedLicenses.length > 0,
        };
    }

    useEffect(() => {
        if (!response) return;

        const formatted = mapLicenseData(response, licenses);

        setSelectedLicenses(formatted.selectedLicenses);
    }, [response, licenses]);

    return (
        <Card ref={refContainer}>
            <CardHeader>
                <CardTitle $color={"#FFCD00"}>Habilitação Solicitada</CardTitle>

                <CardSubTitle>Selecione o(s) código(s). Múltiplas seleções permitidas.</CardSubTitle>

                <LicenseContainer>
                    <LicenseTitle>
                        Código(s) de habilitação <a>*</a>
                    </LicenseTitle>

                    <LicenseSubTitle>Clique no código — o nome da habilitação aparece abaixo automaticamente</LicenseSubTitle>

                    {licenses.map((l) => (
                        <LicenseItem
                            key={l.id_tipo_habilitacao}
                            $selected={selectedLicenses.includes(l.id_tipo_habilitacao)}
                            onClick={() => toggleLicense(l.id_tipo_habilitacao)}
                        >
                            {l.codigo}
                        </LicenseItem>
                    ))}
                </LicenseContainer>

                <LicenseContainer>
                    <LicenseTitle>Habilitações selecionadas:</LicenseTitle>

                    {licenses
                        .filter((l) => selectedLicenses.includes(l.id_tipo_habilitacao))
                        .map((l) => (
                            <LicenseItemSelcted key={l.id_tipo_habilitacao} onClick={() => toggleLicense(l.id_tipo_habilitacao)}>
                                <a>{l.codigo}</a> - {l.descricao}
                            </LicenseItemSelcted>
                        ))}
                </LicenseContainer>

                {!isValid && <CardSubTitle>Selecione ao menos uma habilitação.</CardSubTitle>}
            </CardHeader>
        </Card>
    );
});

License.displayName = "License";

export default License;
