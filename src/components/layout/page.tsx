"use client";

import { ReactNode } from "react";
import { Footer, Header, Content, Container } from "./styled";

interface LayoutMasterProps {
    header: ReactNode;
    footer: ReactNode;
    children: ReactNode;
}

export default function LayoutMaster({ header, footer, children }: LayoutMasterProps) {
    return (
        <Container>
            <Header>{header}</Header>
            <Content>{children}</Content>
            <Footer>{footer}</Footer>
        </Container>
    );
}
