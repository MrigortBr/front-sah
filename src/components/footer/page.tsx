"use client";

import Image from "next/image";

import { FooterContainer, FooterLeft, FooterRight, ImageWrapper } from "./styled";

export default function Footer() {
    return (
        <FooterContainer>
            <FooterLeft>© 2026 SAH - Sistema de Acompanhamento de Habilitações</FooterLeft>
            <FooterRight>
                <ImageWrapper>
                    <Image src="/especialistas.png" fill alt="Agora tem especialistas" style={{ objectFit: "contain" }} />
                </ImageWrapper>
                <ImageWrapper>
                    <Image src="/ministerio.png" fill alt="Ministerio da saude" style={{ objectFit: "contain" }} />
                </ImageWrapper>
                <ImageWrapper>
                    <Image src="/gov.jpeg" fill alt="Governo Federal" style={{ objectFit: "contain" }} />
                </ImageWrapper>
            </FooterRight>
        </FooterContainer>
    );
}
