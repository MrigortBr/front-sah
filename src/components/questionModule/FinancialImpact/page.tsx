"use client";

import { useAlert } from "@/providers/alert/page";

import { Card, CardHeader, CardSubTitle, CardTitle, Input, InputComponent, InputDescription, InputText, MoneyContainer } from "../styled";

import { RefObject, forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { HabilitacaoExitingResponse } from "@/services/proposal/type";

type FinancialImpactData = {
    impactMensal: string;
    impactAnual: string;
    parcelaUnica: string;
    isValid: boolean;
};

export type FinancialImpactRef = {
    getData: () => FinancialImpactData | undefined;
};

type PROP = {
    refContainer: RefObject<HTMLDivElement | null>;
    response?: HabilitacaoExitingResponse;
};

const FinancialImpact = forwardRef<FinancialImpactRef, PROP>(({ refContainer, response }, ref) => {
    const [impactMensal, setImpactMensal] = useState("");

    const [impactAnual, setImpactAnual] = useState("");

    const [parcelaUnica, setParcelaUnica] = useState("");

    const [isValid, setIsValid] = useState(true);

    const { callMessage } = useAlert();

    function formatMoney(value: string) {
        const numbers = value.replace(/\D/g, "");

        const numeric = Number(numbers) / 100;

        return numeric.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    }

    function handleMonthlyImpact(value: string) {
        const formatted = formatMoney(value);

        setImpactMensal(formatted);

        const numeric = Number(formatted.replace(/\./g, "").replace(",", "."));

        const annual = numeric * 12;

        setImpactAnual(
            annual.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })
        );
    }

    function handleUniqueParcel(value: string) {
        setParcelaUnica(formatMoney(value));
    }

    useEffect(() => {
        // const valid =
        //     impactMensal.trim() !== "" &&
        //     impactMensal.trim() !== "0,00" &&
        //     impactAnual.trim() !== "" &&
        //     impactAnual.trim() !== "0,00" &&
        //     parcelaUnica.trim() !== "" &&
        //     parcelaUnica.trim() !== "0,00";

        setIsValid(true);
    }, [impactMensal, impactAnual, parcelaUnica]);

    function formatMoneyBR(value: string | number) {
        const numeric = Number(value);

        return numeric.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    }

    function mapFinancialImpactData(response: HabilitacaoExitingResponse): FinancialImpactData {
        const data = response;

        const monthly = Number(data.inpacto_mensal ?? 0);

        const annual = monthly * 12;

        return {
            impactMensal: formatMoneyBR(monthly),

            impactAnual: formatMoneyBR(annual),

            parcelaUnica: formatMoneyBR(data.parcela_unica ?? 0),

            isValid: true,
        };
    }

    useEffect(() => {
        if (!response) return;

        const formatted = mapFinancialImpactData(response);

        setImpactMensal(formatted.impactMensal);
        setImpactAnual(formatted.impactAnual);
        setParcelaUnica(formatted.parcelaUnica);
    }, [response]);

    function getData(): FinancialImpactData | undefined {
        if (isValid) {
            return {
                impactMensal,
                impactAnual,
                parcelaUnica,
                isValid,
            };
        }

        callMessage("Preencha todo o módulo de Impacto Financeiro", "info");

        return undefined;
    }

    useImperativeHandle(ref, () => ({
        getData,
    }));

    return (
        <Card ref={refContainer}>
            <CardHeader>
                <CardTitle $color="#E65100">Impacto Financeiro</CardTitle>

                <CardSubTitle>Valores em R$ com até 2 casas decimais — campos obrigatórios</CardSubTitle>
            </CardHeader>

            <MoneyContainer>
                <InputComponent>
                    <InputText>Impacto Mensal</InputText>

                    <Input value={impactMensal} onChange={(e) => handleMonthlyImpact(e.target.value)} placeholder="0,00" />

                    <InputDescription>R$ por mês</InputDescription>
                </InputComponent>

                <InputComponent>
                    <InputText>Impacto Anual</InputText>

                    <Input value={impactAnual} disabled style={{ cursor: "no-drop" }} />

                    <InputDescription>Calculado (× 12)</InputDescription>
                </InputComponent>

                <InputComponent>
                    <InputText>Parcela Única</InputText>

                    <Input value={parcelaUnica} onChange={(e) => handleUniqueParcel(e.target.value)} placeholder="0,00" />

                    <InputDescription>R$ pagamento único</InputDescription>
                </InputComponent>
            </MoneyContainer>

            {!isValid && <InputDescription>Preencha todos os campos obrigatórios</InputDescription>}
        </Card>
    );
});

FinancialImpact.displayName = "FinancialImpact";

export default FinancialImpact;
