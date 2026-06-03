"use client";

import { useMemo } from "react";

import { Card, Container, Description, IconContainer, KpiGrid, Number, Title } from "../kpiCards/styled";

import { RefreshCcw, Upload, AlertTriangle, Check } from "lucide-react";

import { SimpleProposal } from "@/services/proposal/type";

type PROPS = {
    data: SimpleProposal[];
};

export default function KpiCardsTwo({ data }: PROPS) {
    const cards = useMemo(() => {
        const total = data.length;

        const cacon = data.filter((p) => p.tipohabilitacao.some((t) => t.descricao.toUpperCase().includes("CACON"))).length;

        const unacon = data.filter((p) => p.tipohabilitacao.some((t) => t.descricao.toUpperCase().includes("UNACON"))).length;
        const aceleradores = data.reduce((acc, p) => {
            return acc + p.numero_aceleradores;
        }, 0);

        return [
            {
                title: "Total",
                value: total,
                description: "",
                icon: <RefreshCcw size={22} />,
                border: "#FFD600",
                iconBg: "#EEF2F7",
                descColor: "#FF6B00",
            },
            {
                title: "CACON",
                value: cacon,
                description: "",
                icon: <Upload size={22} />,
                border: "#1565D8",
                iconBg: "#F3EEF8",
                descColor: "#6B7B6E",
            },
            {
                title: "UNACON",
                value: unacon,
                description: "",
                icon: <AlertTriangle size={22} />,
                border: "#E65100",
                iconBg: "#FFF6E9",
                descColor: "#FF6B00",
            },
            {
                title: "Aceleradores",
                value: aceleradores,
                description: "",
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
                {cards.map((item, index) => (
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
