import { Dispatch, SetStateAction, useState } from "react";

import { Badge, CollapseButton, Container, Icon, Label, Left, Menu, MenuItem, MenuWrapper, Section, Title, TitleRow } from "./styled";
import { SimpleProposal } from "@/services/proposal/type";

const statusMock = [
    {
        label: "Enviada ao MS",
        icon: "📨",
    },
    {
        label: "Em análise",
        icon: "🔄",
    },
    {
        label: "Em diligência",
        icon: "⚠️",
    },
    {
        label: "Rejeitada",
        icon: "❌",
    },
    {
        label: "Rejeitada por não atendimento à diligência",
        icon: "🚫",
    },
    {
        label: "Aprovada",
        icon: "✅",
    },
    {
        label: "Portaria Publicada",
        icon: "📄",
    },
    {
        label: "Enviada ao DRAC",
        icon: "📤",
    },
    {
        label: "Proposta excluída",
        icon: "🗑️",
    },
    {
        label: "Proposta concluída",
        icon: "✔️",
    },
];

type PROP = {
    technicians: string[];
    situation: string[];
    set: Dispatch<SetStateAction<SimpleProposal[]>>;
    base: SimpleProposal[];
};

export default function Sidebar({ technicians, situation, set, base }: PROP) {
    const [openSituation, setOpenSituation] = useState(true);
    const [openTechnicians, setOpenTechnicians] = useState(true);
    const [selectedSituation, setSelectedSituation] = useState("*");
    const [selectedTechnician, setSelectedTechnician] = useState("*");

    const handleFilters = (type: "situation" | "technician", value: string) => {
        const newSituation = type === "situation" ? value : selectedSituation;

        const newTechnician = type === "technician" ? value : selectedTechnician;

        set(() =>
            base.filter((v) => {
                const validSituation = newSituation === "*" || v.situacao === newSituation;

                const validTechnician = newTechnician === "*" || v.tecnico === newTechnician;

                return validSituation && validTechnician;
            })
        );

        if (type === "situation") {
            setSelectedSituation(value);
        }

        if (type === "technician") {
            setSelectedTechnician(value);
        }
    };

    return (
        <Container>
            <Section>
                <TitleRow>
                    <Title>Situação</Title>

                    <CollapseButton $open={openSituation} onClick={() => setOpenSituation(!openSituation)}>▾</CollapseButton>
                </TitleRow>

                <MenuWrapper $open={openSituation}>
                    <Menu>
                        <MenuItem $active={selectedSituation === "*"} onClick={() => handleFilters("situation", "*")}>
                            <Left>
                                <Icon>📋</Icon>

                                <Label>Todas</Label>
                            </Left>

                            <Badge>{situation.length}</Badge>
                        </MenuItem>

                        {statusMock.map((item) => (
                            <MenuItem
                                key={item.label}
                                $active={selectedSituation === item.label}
                                onClick={() => handleFilters("situation", item.label)}
                            >
                                <Left>
                                    <Icon>{item.icon}</Icon>

                                    <Label>{item.label}</Label>
                                </Left>

                                <Badge>{situation.filter((v) => v === item.label).length}</Badge>
                            </MenuItem>
                        ))}
                    </Menu>
                </MenuWrapper>
            </Section>

            <Section>
                <TitleRow>
                    <Title>Técnico</Title>

                    <CollapseButton $open={openTechnicians} onClick={() => setOpenTechnicians(!openTechnicians)}>▾</CollapseButton>
                </TitleRow>

                <MenuWrapper $open={openTechnicians}>
                    <Menu>
                        <MenuItem $active={selectedTechnician === "*"} onClick={() => handleFilters("technician", "*")}>
                            <Left>
                                <Icon>👥</Icon>

                                <Label>Todos</Label>
                            </Left>
                        </MenuItem>

                        {technicians.map((item, index) => (
                            <MenuItem key={index} $active={selectedTechnician === item} onClick={() => handleFilters("technician", item)}>
                                <Left>
                                    <Icon>👤</Icon>

                                    <Label>{item}</Label>
                                </Left>
                            </MenuItem>
                        ))}
                    </Menu>
                </MenuWrapper>
            </Section>
        </Container>
    );
}
