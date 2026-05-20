"use client";

import { useEffect, useState } from "react";

import {
    Card,
    CardDescription,
    CardFooter,
    CardIcon,
    CardTitle,
    CardsContainer,
    Container,
    Greeting,
    GreetingContainer,
    GreetingSubtitle,
    LoadingContainer,
    ModuleCard,
} from "./styled";
import Loading from "../spinner/page";
import { useAuth } from "@/context/auth/auth.context";
import { useRouter } from "next/navigation";

export default function Page() {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    if (isLoading) {
        return (
            <LoadingContainer>
                <Loading></Loading>
            </LoadingContainer>
        );
    }

    return (
        <Container>
            <GreetingContainer>
                <Greeting>Bom dia, {user?.name} 👋</Greeting>

                <GreetingSubtitle>Selecione o módulo que deseja acessar</GreetingSubtitle>
            </GreetingContainer>

            <CardsContainer onClick={() => router.push("/propostas")}>
                <ModuleCard>
                    <CardIcon>📋</CardIcon>
                    <Card>
                        <CardTitle>Propostas SAIPS</CardTitle>

                        <CardDescription>Acompanhe as propostas de habilitação em tramitação e cadastre novos pedidos.</CardDescription>

                        <CardFooter>28 propostas em andamento →</CardFooter>
                    </Card>
                </ModuleCard>
            </CardsContainer>
        </Container>
    );
}
