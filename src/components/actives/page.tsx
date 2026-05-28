"use client";
import { proposalService } from "@/services/proposal/Proposal";
import { useEffect, useState } from "react";
import { AddNewRequest, Container, ContainerProposal, TitleContainer } from "../proposal/styled";
import { SimpleProposal } from "@/services/proposal/type";
import { useAuth } from "@/context/auth/auth.context";
import { LoadingContainer } from "../module/styled";
import Loading from "../spinner/page";
import { useRouter } from "next/navigation";
import KpiCards from "../kpiActive/page";
import { TabId } from "../tab/page";
import ExportData from "../exportData/page";
import { useAlert } from "@/providers/alert/page";
import ProposalTable from "../proposalTable/page";
import SidebarActive from "../filterLeftActive/page";

export default function ActivesComponent() {
    const { onlyReading, isLoading, logout } = useAuth();
    const [uf, setUf] = useState<string[]>([]);
    const [habilitacao, setHabilitacao] = useState<string[]>([]);
    const [proposals, setProposals] = useState<SimpleProposal[]>([]);
    const [baseProposals, setBaseProposals] = useState<SimpleProposal[]>([]);
    const [tabValue, setTabValue] = useState<TabId>("lista-propostas");
    const [loadingData, setLoadingData] = useState(true);
    const router = useRouter();
    const { callMessage } = useAlert();

    useEffect(() => {
        if (isLoading) return;

        const loadData = async () => {
            try {
                setLoadingData(true);

                const response = await proposalService.getSimpleProposalFilter("Proposta concluída");

                if (!response.status) {
                    callMessage(response.message ?? "Sistema SAH está temporariamente fora do ar!", "error");
                    setInterval(async () => {
                        await logout();
                    }, 1800);
                    return;
                }
                const data = response.data;

                setUf([...new Set(data.filter((v) => v.uf_estabelecimento).map((v) => v.uf_estabelecimento))]);

                const habs: string[] = [];

                data.map((v) =>
                    v.tipohabilitacao.map((t) => {
                        habs.push(`${t.descricao}`);
                    })
                );

                setHabilitacao([...new Set(habs)]);

                setProposals(data);
                setBaseProposals(data);
                if (response.statusCode != 503) setLoadingData(false);
            } catch (error) {
                console.error(error);
            } finally {
            }
        };

        loadData();
    }, [isLoading]);

    if (isLoading || loadingData) {
        return (
            <LoadingContainer>
                <Loading></Loading>
            </LoadingContainer>
        );
    }

    return (
        <Container>
            <SidebarActive uf={uf} hab={habilitacao} set={setProposals} base={baseProposals}></SidebarActive>

            <ContainerProposal>
                <TitleContainer>
                    <h1>Habilitações ativas</h1>
                    {onlyReading ? (
                        <span></span>
                    ) : (
                        <>
                            <AddNewRequest onClick={() => router.push("/ativos/nova")}>+ Cadastrar nova proposta</AddNewRequest>
                        </>
                    )}
                    <h2>{proposals.length} propostas em ativas</h2>
                </TitleContainer>

                {tabValue == "lista-propostas" ? (
                    <>
                        <KpiCards data={proposals}></KpiCards>
                        <ProposalTable
                            title="Todas"
                            color={3}
                            proposals={proposals}
                            headerItens={["Estabelecimento", "UF", "Habilitação soliticada", "Situação", "Técnico", "Entrada"]}
                            columns={["nome_estabelecimento", "uf_estabelecimento", "tipohabilitacao", "situacao", "tecnico", "inicio_saips"]}
                            situations={["Proposta concluída"]}
                        ></ProposalTable>
                    </>
                ) : (
                    <ExportData data={baseProposals}></ExportData>
                )}
            </ContainerProposal>
        </Container>
    );
}
