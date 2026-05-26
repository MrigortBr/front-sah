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
import { proposalService } from "@/services/proposal/Proposal";
import { useAlert } from "@/providers/alert/page";
import { theme } from "@/styles/theme";

export default function Page() {
    const { user, isLoading, logout } = useAuth();
    const router = useRouter();
    const { callMessage } = useAlert();
    const [count, setCount] = useState(0);
    const [countActive, setCountActive] = useState(0);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const data = async () => {
            const response = await proposalService.getLengthProposal();

            if (!response.status) {
                callMessage(response.message ?? "Sistema SAH está temporariamente fora do ar!", "error");
                setInterval(async () => {
                    await logout();
                }, 1800);
            }
            setCount(response.data.length);
            // setCountActive(response.data.filter((v) => v === "Proposta concluída"));
            setLoading(false);
        };

        data();
    }, []);

    if (isLoading || loading) {
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

            <CardsContainer>
                <ModuleCard $color={theme.colors.blueBackground} onClick={() => router.push("/propostas")}>
                    <CardIcon>📋</CardIcon>
                    <Card>
                        <CardTitle>Habilitações Ativas</CardTitle>

                        <CardDescription>Consulte e gerencie os estabelecimentos com habilitação oncológica vigente no SUS.</CardDescription>

                        <CardFooter>{count} propostas em andamento →</CardFooter>
                    </Card>
                </ModuleCard>
                {/* 
                <ModuleCard $color={theme.colors.greenBackground} onClick={() => router.push("/propostas")}>
                    <CardIcon>📋</CardIcon>
                    <Card>
                        <CardTitle>Propostas SAIPS</CardTitle>

                        <CardDescription>Acompanhe as propostas de habilitação em tramitação e cadastre novos pedidos.</CardDescription>

                        <CardFooter>{count} propostas em andamento →</CardFooter>
                    </Card>
                </ModuleCard> */}
            </CardsContainer>
        </Container>
    );
}
