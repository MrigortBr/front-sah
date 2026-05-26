"use client";
import { proposalService } from "@/services/proposal/Proposal";
import { useEffect, useState } from "react";
import Sidebar from "../filterLeftProposal/page";
import { AddNewRequest, Container, ContainerProposal, TitleContainer } from "./styled";
import { SimpleProposal } from "@/services/proposal/type";
import ProposalTable from "../proposalTable/page";
import { useAuth } from "@/context/auth/auth.context";
import { LoadingContainer } from "../module/styled";
import Loading from "../spinner/page";
import { useRouter } from "next/navigation";
import KpiCards from "../kpiCards/page";
import { TabId, Tabs } from "../tab/page";
import ExportData from "../exportData/page";
import { useAlert } from "@/providers/alert/page";
import ErrorPage from "../error/page";

export default function ProposalComponent() {
    const { onlyReading, isLoading, logout } = useAuth();
    const [technicians, setTechnicians] = useState<string[]>([]);
    const [situation, setSituation] = useState<string[]>([]);
    const [proposals, setProposals] = useState<SimpleProposal[]>([]);
    const [baseProposals, setBaseProposals] = useState<SimpleProposal[]>([]);
    const [tabValue, setTabValue] = useState<TabId>("lista-propostas");
    const [loadingData, setLoadingData] = useState(true);
    const [error, setError] = useState({ message: "", function: () => {} });
    const router = useRouter();
    const { callMessage } = useAlert();

    useEffect(() => {
        if (isLoading) return;

        const loadData = async () => {
            try {
                setLoadingData(true);

                const response = await proposalService.getSimpleProposal();
                if (!response.status) {
                    callMessage(response.message ?? "Sistema SAH está temporariamente fora do ar!", "error");
                    setError({ message: response.message, function: () => {} });
                    return;
                }
                const data = response.data;

                setTechnicians([...new Set(data.filter((v) => v.tecnico).map((v) => v.tecnico))]);

                setSituation([...new Set(data.filter((v) => v.situacao).map((v) => v.situacao))]);

                setProposals(data);
                setBaseProposals(data);
                setLoadingData(false);
                if (response.statusCode != 503) setLoadingData(false);
            } catch (error) {
                console.error(error);
            } finally {
            }
        };

        loadData();
    }, [isLoading]);

    if (error.message != "") {
        return (
            <LoadingContainer>
                <ErrorPage text={error.message}></ErrorPage>
            </LoadingContainer>
        );
    }

    if (isLoading || loadingData) {
        return (
            <LoadingContainer>
                <Loading></Loading>
            </LoadingContainer>
        );
    }

    return (
        <Container>
            <Sidebar technicians={technicians} situation={situation} set={setProposals} base={baseProposals}></Sidebar>

            <ContainerProposal>
                <TitleContainer>
                    <h1>Propostas SAIPS</h1>
                    {onlyReading ? (
                        <span></span>
                    ) : (
                        <>
                            <AddNewRequest onClick={() => router.push("/propostas/nova")}>+ Cadastrar nova proposta</AddNewRequest>
                        </>
                    )}
                    <h2>{proposals.length} propostas em andamento</h2>
                </TitleContainer>

                <Tabs defaultTab="lista-propostas" onChange={(t) => setTabValue(t)}></Tabs>

                {tabValue == "lista-propostas" ? (
                    <>
                        <KpiCards data={proposals}></KpiCards>

                        <ProposalTable
                            title={"Em análise / Em diligência"}
                            color={2}
                            proposals={proposals}
                            headerItens={["SAIPS", "Estabelecimento", "UF", "Habilitação soliticada", "Situação", "Técnico", "Entrada"]}
                            columns={[
                                "saips",
                                "nome_estabelecimento",
                                "uf_estabelecimento",
                                "tipohabilitacao",
                                "situacao",
                                "tecnico",
                                "inicio_saips",
                            ]}
                            situations={["Em análise", "Em diligência"]}
                        ></ProposalTable>

                        <ProposalTable
                            title="Enviadas ao DRAC"
                            color={0}
                            proposals={proposals}
                            headerItens={["SAIPS", "Estabelecimento", "UF", "Habilitação soliticada", "Situação", "Técnico", "Entrada"]}
                            columns={[
                                "saips",
                                "nome_estabelecimento",
                                "uf_estabelecimento",
                                "tipohabilitacao",
                                "situacao",
                                "tecnico",
                                "inicio_saips",
                            ]}
                            situations={["Enviadas ao DRAC"]}
                        ></ProposalTable>

                        <ProposalTable
                            title="Todas"
                            color={3}
                            proposals={proposals}
                            headerItens={["SAIPS", "Estabelecimento", "UF", "Habilitação soliticada", "Situação", "Técnico", "Entrada"]}
                            columns={[
                                "saips",
                                "nome_estabelecimento",
                                "uf_estabelecimento",
                                "tipohabilitacao",
                                "situacao",
                                "tecnico",
                                "inicio_saips",
                            ]}
                            situations={[
                                "Enviada ao MS",
                                "Em análise",
                                "Em diligência",
                                "Rejeitada",
                                "Rejeitada por não atendimento à diligência",
                                "Aprovada",
                                "Portaria Publicada",
                                "Enviada ao DRAC",
                                "Proposta excluída",
                                "Proposta concluída",
                            ]}
                        ></ProposalTable>
                    </>
                ) : (
                    <ExportData data={baseProposals}></ExportData>
                )}
            </ContainerProposal>
        </Container>
    );
}
