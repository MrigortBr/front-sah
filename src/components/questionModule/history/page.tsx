"use client";

import { useAlert } from "@/providers/alert/page";

import {
    Card,
    CardHeader,
    CardSubTitle,
    CardTitle,
    HistoryAdd,
    HistoryContainer,
    Input,
    InputComponent,
    InputDescription,
    InputText,
    TitleHistory,
} from "../styled";

import { RefObject, forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { HabilitacaoExitingResponse } from "@/services/proposal/type";

type HistoryItem = {
    year: string;
    code: string;
};

export type HistoryData = {
    historyList: HistoryItem[];
    isValid: boolean;
};

export type HistoryRef = {
    getData: () => HistoryData | undefined;
};

type PROP = {
    refContainer: RefObject<HTMLDivElement | null>;
    response?: HabilitacaoExitingResponse;
};

const History = forwardRef<HistoryRef, PROP>(({ refContainer, response }, ref) => {
    const [historyList, setHistoryList] = useState<HistoryItem[]>([
        {
            year: "",
            code: "",
        },
    ]);

    const [isValid, setIsValid] = useState(true);

    const { callMessage } = useAlert();

    function addHistory() {
        setHistoryList((old) => [
            ...old,
            {
                year: "",
                code: "",
            },
        ]);
    }

    function removeHistory(index: number) {
        setHistoryList((old) => old.filter((_, idx) => idx !== index));
    }

    function updateHistory(index: number, field: keyof HistoryItem, value: string) {
        setHistoryList((old) =>
            old.map((item, idx) =>
                idx === index
                    ? {
                          ...item,
                          [field]: field === "year" ? value.replace(/\D/g, "").slice(0, 4) : value,
                      }
                    : item
            )
        );
    }

    useEffect(() => {
        const hasValidItems = historyList.every((item) => {
            const empty = item.year.trim() === "" && item.code.trim() === "";

            if (empty) return true;

            return item.year.trim().length === 4 && item.code.trim() !== "";
        });

        setIsValid(hasValidItems);
    }, [historyList]);

    function getData(): HistoryData | undefined {
        if (isValid) {
            return {
                historyList: historyList.filter((item) => item.year.trim() !== "" || item.code.trim() !== ""),
                isValid,
            };
        }

        callMessage("Preencha corretamente o módulo de Histórico de Habilitação", "info");

        return undefined;
    }

    useImperativeHandle(ref, () => ({
        getData,
    }));

    function mapHistoryData(response: HabilitacaoExitingResponse): HistoryData {
        const historyList =
            response.historico?.map((item) => ({
                year: String(item.anoAlteracao ?? ""),
                code: item.codigos ?? "",
            })) ?? [];

        return {
            historyList:
                historyList.length > 0
                    ? historyList
                    : [
                          {
                              year: "",
                              code: "",
                          },
                      ],

            isValid: true,
        };
    }

    useEffect(() => {
        if (!response) return;

        const formatted = mapHistoryData(response);

        setHistoryList(formatted.historyList);
    }, [response]);

    return (
        <Card ref={refContainer}>
            <CardHeader>
                <CardTitle $color={"#6B7B6E"}>Histórico de Habilitação</CardTitle>

                <CardSubTitle>Preencher somente se houver histórico anterior</CardSubTitle>
            </CardHeader>

            {historyList.map((history, index) => {
                const title = index === 0 ? "Primeira Habilitação" : `${index}ª Alteração`;

                return (
                    <HistoryContainer key={index}>
                        <TitleHistory>
                            {title}

                            {index !== 0 && <button onClick={() => removeHistory(index)}>x</button>}
                        </TitleHistory>

                        <InputComponent>
                            <InputText>Ano da {title}</InputText>

                            <Input
                                value={history.year}
                                onChange={(e) => updateHistory(index, "year", e.target.value)}
                                placeholder="2025"
                                maxLength={4}
                            />
                        </InputComponent>

                        <InputComponent>
                            <InputText>Código(s) de Habilitação</InputText>

                            <Input value={history.code} onChange={(e) => updateHistory(index, "code", e.target.value)} />
                        </InputComponent>
                    </HistoryContainer>
                );
            })}

            <HistoryAdd onClick={addHistory}>+ Adicionar alteração no histórico</HistoryAdd>

            {!isValid && <InputDescription>Preencha corretamente os anos e os códigos das habilitações do histórico.</InputDescription>}
        </Card>
    );
});

History.displayName = "History";

export default History;
