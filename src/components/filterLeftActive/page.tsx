import { Dispatch, SetStateAction, useState } from "react";

import { CollapseButton, Container, Icon, Label, Left, Menu, MenuItem, MenuWrapper, Section, Title, TitleRow } from "./styled";

import { SimpleProposal } from "@/services/proposal/type";

type PROP = {
    uf?: string[];
    hab: string[];
    set: Dispatch<SetStateAction<SimpleProposal[]>>;
    base: SimpleProposal[];
};

export default function SidebarActive({ uf = [], hab, set, base }: PROP) {
    const [openUf, setOpenUf] = useState(false);
    const [openHab, setOpenHab] = useState(true);

    const [selectedUf, setSelectedUf] = useState("*");
    const [selectedHab, setSelectedHab] = useState("*");

    const handleFilters = (type: "uf" | "hab", value: string) => {
        const newUf = type === "uf" ? value : selectedUf;

        const newHab = type === "hab" ? value : selectedHab;

        set(() =>
            base.filter((item) => {
                const validUf = newUf === "*" || item.uf_estabelecimento === newUf;

                const validHab = newHab === "*" || item.tipohabilitacao?.some((hab) => hab.descricao === newHab);
                return validUf && validHab;
            })
        );

        if (type === "uf") {
            setSelectedUf(value);
        }

        if (type === "hab") {
            setSelectedHab(value);
        }
    };

    return (
        <Container>
            {/* UF */}
            <Section>
                <TitleRow>
                    <Title>UF</Title>

                    <CollapseButton $open={openUf} onClick={() => setOpenUf(!openUf)}>▾</CollapseButton>
                </TitleRow>

                <MenuWrapper $open={openUf}>
                    <Menu>
                        <MenuItem $active={selectedUf === "*"} onClick={() => handleFilters("uf", "*")}>
                            <Left>
                                <Icon>🌎</Icon>

                                <Label>Todos</Label>
                            </Left>
                        </MenuItem>

                        {uf.map((item, index) => (
                            <MenuItem key={index} $active={selectedUf === item} onClick={() => handleFilters("uf", item)}>
                                <Left>
                                    <Icon>📍</Icon>

                                    <Label>{item}</Label>
                                </Left>
                            </MenuItem>
                        ))}
                    </Menu>
                </MenuWrapper>
            </Section>

            {/* Habilitação */}
            <Section>
                <TitleRow>
                    <Title>Habilitação</Title>

                    <CollapseButton $open={openHab} onClick={() => setOpenHab(!openHab)}>▾</CollapseButton>
                </TitleRow>

                <MenuWrapper $open={openHab}>
                    <Menu>
                        <MenuItem $active={selectedHab === "*"} onClick={() => handleFilters("hab", "*")}>
                            <Left>
                                <Icon>📋</Icon>

                                <Label>Todos</Label>
                            </Left>
                        </MenuItem>

                        {hab.map((item, index) => (
                            <MenuItem key={index} $active={selectedHab === item} onClick={() => handleFilters("hab", item)}>
                                <Left>
                                    <Icon>🏥</Icon>

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
