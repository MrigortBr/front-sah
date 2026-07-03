"use client";

import Image from "next/image";

import { FooterContainer, FooterLeft, FooterRight, ImageWrapper } from "./styled";
import { LoadingContainer } from "../module/styled";
import { useAuth } from "@/context/auth/auth.context";

export default function Footer() {
    const { user, isLoading, logout } = useAuth();

    if (isLoading) return <LoadingContainer>{/* <Loading></Loading> */}</LoadingContainer>;

    return (
        <FooterContainer>
            <FooterLeft>© 2026 SAH - Sistema de Acompanhamento de Habilitações</FooterLeft>
            <FooterRight>
                <ImageWrapper>
                    <Image src="/ministeriologo.png" fill alt="Ministerio da saude" style={{ objectFit: "contain" }} />
                </ImageWrapper>
            </FooterRight>
        </FooterContainer>
    );
}
