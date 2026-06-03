"use client";

import { useMemo } from "react";

import { Card, Container, Description, IconContainer, KpiGrid, Number, Title } from "./styled";

import { RefreshCcw, Upload, AlertTriangle, Check } from "lucide-react";

import { SimpleProposal } from "@/services/proposal/type";

type PROPS = {
    data: SimpleProposal[];
};

export default function KpiCards({ data }: PROPS) {
    const kpis = useMemo(() => {
        const now = new Date();

        const emAnalise = data.filter((v) => v.situacao === "Em análise");

        const noDrac = data.filter((v) => v.situacao === "Enviada ao DRAC");

        const emDiligencia = data.filter((v) => v.situacao === "Em diligência");

        const aprovadas2025 = data.filter((v) => v.situacao === "Aprovada");

        // const aprovadas2025 = data.filter((v) => {
        //     const date = new Date(v.inicio_saips);

        //     return v.situacao.toLowerCase().includes("Aprovada") && date.getFullYear() === 2025;
        // });

        const analise30Dias = emAnalise.filter((v) => {
            const startDate = new Date(v.inicio_saips);

            const diff = (now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);

            return diff >= 30;
        });

        const diligenciaProxima = emDiligencia.filter((v) => {
            const startDate = new Date(v.inicio_saips);

            const diff = (now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);

            return diff >= 20;
        });

        return [
            {
                title: "EM ANÁLISE",
                value: emAnalise.length,
                description: `${analise30Dias.length} aguardando +30 dias`,
                icon: <RefreshCcw size={22} />,
                border: "#FFD600",
                iconBg: "#EEF2F7",
                descColor: "#FF6B00",
            },
            {
                title: "NO DRAC",
                value: noDrac.length,
                description: "aguardando retorno",
                icon: <Upload size={22} />,
                border: "#1565D8",
                iconBg: "#F3EEF8",
                descColor: "#6B7B6E",
            },
            {
                title: "EM DILIGÊNCIA",
                value: emDiligencia.length,
                description: `${diligenciaProxima.length} prazo próximo`,
                icon: <AlertTriangle size={22} />,
                border: "#E65100",
                iconBg: "#FFF6E9",
                descColor: "#FF6B00",
            },
            {
                title: "APROVADAS 2025",
                value: aprovadas2025.length,
                description: "propostas aprovadas",
                icon: <Check size={22} />,
                border: "#47B36B",
                iconBg: "#EDF8F1",
                descColor: "#1E8E5A",
            },
        ];
    }, [data]);

    return (
        <Container>
            <KpiGrid>
                {kpis.map((item, index) => (
                    <Card key={index} $border={item.border}>
                        <div>
                            <Title>{item.title}</Title>

                            <Number>{item.value}</Number>

                            <Description $color={item.descColor}>{item.description}</Description>
                        </div>

                        <IconContainer $bg={item.iconBg}>{item.icon}</IconContainer>
                    </Card>
                ))}
            </KpiGrid>
        </Container>
    );
}
