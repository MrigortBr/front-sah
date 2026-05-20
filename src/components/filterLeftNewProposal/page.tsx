"use client";

import { RefObject, useEffect, useState } from "react";

import { Back, Container, Description, Item, ItemList, Marker, Section, SubTitle, Title, TitleList, TitleRow } from "./styled";

const itens = [
    {
        marker: "1",
        title: "Identificação do Processo",
        description: "SAIPS, NUP, situação, diligência",
    },
    {
        marker: "2",
        title: "Impacto Financeiro",
        description: "Mensal, anual, parcela única",
    },
    {
        marker: "3",
        title: "Estabelecimento",
        description: "CNES, CNPJ, nome",
    },
    {
        marker: "4",
        title: "Localização",
        description: "UF, município, região",
    },
    {
        marker: "5",
        title: "Habilitação",
        description: "Código e tipo solicitado",
    },
    {
        marker: "6",
        title: "Histórico",
        description: "Primeira hab. e alterações",
    },
];

type PROP = {
    refs: RefObject<HTMLDivElement | null>[];
    refContainer: RefObject<HTMLDivElement | null>;
};

export default function SidebarNewProposal({ refs, refContainer }: PROP) {
    const [selected, setSelected] = useState<string>("1");

    useEffect(() => {
        const container = refContainer.current;

        if (!container) return;

        function handleScroll() {
            if (!container) return;

            const containerTop = container.getBoundingClientRect().top;

            refs.forEach((section, index) => {
                if (!section.current) return;

                const rect = section.current.getBoundingClientRect();

                const visible = rect.top <= containerTop + 200 && rect.bottom >= containerTop + 200;

                if (visible) {
                    setSelected(String(index + 1));
                }
            });
        }

        handleScroll();

        container.addEventListener("scroll", handleScroll);

        return () => {
            container.removeEventListener("scroll", handleScroll);
        };
    }, [refs, refContainer]);

    function scrollToSection(index: number, marker: string) {
        refs[index].current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });

        setSelected(marker);
    }

    return (
        <Container>
            <Section>
                <TitleRow>
                    <Title>Nova Proposta</Title>

                    <SubTitle>Etapas de preenchimento</SubTitle>
                </TitleRow>
            </Section>

            <ItemList>
                {itens.map((item, idx) => (
                    <Item key={item.marker} $selected={selected === item.marker} onClick={() => scrollToSection(idx, item.marker)}>
                        <Marker $selected={selected === item.marker}>{item.marker}</Marker>

                        <div>
                            <TitleList>{item.title}</TitleList>

                            <Description>{item.description}</Description>
                        </div>
                    </Item>
                ))}
            </ItemList>
        </Container>
    );
}
