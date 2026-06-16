"use client";

import { SimpleProposal } from "@/services/proposal/type";
import {
    Card,
    CardHeader,
    CardSubTitle,
    CardTitle,
    InputComponent,
    InputText,
    InputSelect,
    Input,
    InputLine,
    CardTitleSecondary,
    CardItem,
    CardOrange,
    ResultData,
    CardText,
    ButtonsContainer,
    ButtonOutline,
    ButtonSolid,
} from "./styled";
import { useState, useMemo } from "react";
import { useAlert } from "@/providers/alert/page";

type PROPS = {
    data: SimpleProposal[];
};

export default function ExportData({ data }: PROPS) {
    const [uf, setUf] = useState("");
    const [municipio, setMunicipio] = useState("");
    const [busca, setBusca] = useState("");
    const { callMessage } = useAlert();
    const [dataSelected, setDataSelected] = useState<SimpleProposal | undefined>(undefined);
    const [copied, setCopied] = useState(false);

    // Base segura — protege contra data null/undefined
    const safeData = useMemo(() => data ?? [], [data]);

    // Subconjunto fixo: só as diligências
    const diligencias = useMemo(() => safeData.filter((v) => v.situacao === "Em diligência"), [safeData]);

    // UFs derivadas só das diligências
    const uniqueUFs = useMemo(() => {
        const ufs = diligencias.map((v) => v.uf_estabelecimento).filter(Boolean);
        return [...new Set(ufs)].sort();
    }, [diligencias]);

    // Municípios filtrados pela UF selecionada (dentro das diligências)
    const filteredMunicipios = useMemo(() => {
        const source = uf ? diligencias.filter((v) => v.uf_estabelecimento === uf) : diligencias;
        const municipios = source.map((v) => v.municipio).filter(Boolean);
        return [...new Set(municipios)].sort();
    }, [diligencias, uf]);

    // Lista filtrada — parte das diligências, nunca de data inteiro
    const dataFiltred = useMemo(() => {
        const term = busca.toLowerCase().trim();
        return diligencias.filter((v) => {
            if (uf && v.uf_estabelecimento !== uf) return false;
            if (municipio && v.municipio !== municipio) return false;
            if (term) {
                const matchCnes = v.cnes_estabelecimento?.toLowerCase().includes(term);
                const matchNome = v.nome_estabelecimento?.toLowerCase().includes(term);
                const matchSaips = v.saips?.toLowerCase().includes(term);
                if (!matchCnes && !matchNome && !matchSaips) return false;
            }
            return true;
        });
    }, [diligencias, uf, municipio, busca]);

    // Texto gerado memoizado — evita re-computar a cada render
    const generatedText = useMemo(() => {
        if (!dataSelected) return "";
        const habilitacoes = (dataSelected.tipohabilitacao ?? [])
            .map((h) => `${h.codigo} - ${h.descricao}`)
            .join(", ");
        return (
            `Em consulta ao Sistema de Apoio à Implementação de Políticas em Saúde (SAIPS), ` +
            `foi identificada a proposta nº ${dataSelected.saips}, referente à solicitação de habilitação ` +
            `na alta complexidade em oncologia como ${habilitacoes}, do ${dataSelected.nome_estabelecimento}, ` +
            `a qual se encontra em diligência.`
        );
    }, [dataSelected]);

    function handleUfChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setUf(e.target.value);
        setMunicipio("");
        setDataSelected(undefined); // limpa seleção ao trocar filtro
    }

    function handleMunicipioChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setMunicipio(e.target.value);
        setDataSelected(undefined); // limpa seleção ao trocar filtro
    }

    function handleBuscaChange(e: React.ChangeEvent<HTMLInputElement>) {
        setBusca(e.target.value);
        setDataSelected(undefined); // limpa seleção ao trocar filtro
    }

    async function handleCopyText() {
        if (!dataSelected) return;
        try {
            await navigator.clipboard.writeText(generatedText);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
            callMessage("Proposta copiada com sucesso!", "success");
        } catch {
            callMessage("Não foi possível copiar o texto. Verifique as permissões do navegador.", "error");
        }
    }

    async function handleExportDocx() {
        if (!dataSelected) return;
        try {
            const { Document, Packer, Paragraph, TextRun, AlignmentType } = await import("docx");

            const doc = new Document({
                sections: [
                    {
                        properties: {},
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.JUSTIFIED,
                                children: [
                                    new TextRun({
                                        text: generatedText,
                                        font: "Arial",
                                        size: 24, // 12pt
                                    }),
                                ],
                            }),
                        ],
                    },
                ],
            });

            const blob = await Packer.toBlob(doc);
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `nota_diligencia_${dataSelected.saips ?? dataSelected.cnes_estabelecimento}.docx`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            callMessage("Proposta baixada com sucesso!", "success");
        } catch {
            callMessage("Erro ao gerar o arquivo Word. Tente novamente.", "error");
        }
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle $color={"green"}>Gerador de Notas — Proposta em Diligência</CardTitle>
                    <CardSubTitle>
                        Apenas propostas SAIPS em diligência (sem habilitação concluída). Filtre por estado, município ou busque pelo CNES/nome,
                        selecione o estabelecimento e exporte a nota para Word.
                    </CardSubTitle>

                    <InputLine>
                        <InputComponent>
                            <InputText>Estado (UF)</InputText>
                            <InputSelect value={uf} onChange={handleUfChange}>
                                <option value="">Todos</option>
                                {uniqueUFs.map((v) => (
                                    <option key={v} value={v}>
                                        {v}
                                    </option>
                                ))}
                            </InputSelect>
                        </InputComponent>

                        <InputComponent>
                            <InputText>Município</InputText>
                            <InputSelect
                                value={municipio}
                                onChange={handleMunicipioChange}
                                disabled={filteredMunicipios.length === 0}
                            >
                                <option value="">Todos</option>
                                {filteredMunicipios.map((v) => (
                                    <option key={v} value={v}>
                                        {v}
                                    </option>
                                ))}
                            </InputSelect>
                        </InputComponent>

                        <InputComponent>
                            <InputText>Busca (CNES, nome...)</InputText>
                            <Input
                                value={busca}
                                onChange={handleBuscaChange}
                                placeholder="CNES, nome ou nº SAIPS..."
                            />
                        </InputComponent>
                    </InputLine>

                    <CardTitleSecondary>
                        Propostas em diligência · {dataFiltred.length} proposta{dataFiltred.length !== 1 ? "s" : ""}
                    </CardTitleSecondary>

                    {dataFiltred.map((d) => (
                        <CardItem key={d.id_habilitacao} onClick={() => setDataSelected(d)}>
                            <CardHeader>
                                <CardTitle $color={"green"}>{d.nome_estabelecimento}</CardTitle>
                                <CardSubTitle>
                                    {d.uf_estabelecimento} - {d.municipio} - CNES {d.cnes_estabelecimento} - {d.saips}
                                </CardSubTitle>
                                <CardSubTitle>
                                    {(d.tipohabilitacao ?? []).map((h) => `${h.codigo} ${h.descricao}`).join(" / ")}
                                </CardSubTitle>
                            </CardHeader>
                        </CardItem>
                    ))}

                    {dataSelected && (
                        <ResultData>
                            <CardTitleSecondary>Nota gerada — proposta em diligência</CardTitleSecondary>
                            <CardItem>
                                <CardHeader>
                                    <CardTitle $color={"green"}>{dataSelected.nome_estabelecimento}</CardTitle>
                                    <CardSubTitle>
                                        {dataSelected.uf_estabelecimento} - {dataSelected.municipio} - CNES{" "}
                                        {dataSelected.cnes_estabelecimento} - {dataSelected.saips}
                                    </CardSubTitle>
                                    <CardSubTitle>
                                        {(dataSelected.tipohabilitacao ?? []).map((h) => `${h.codigo} ${h.descricao}`).join(" / ")}
                                    </CardSubTitle>
                                </CardHeader>
                            </CardItem>
                            <CardItem>
                                <CardText>{generatedText}</CardText>
                            </CardItem>
                            <ButtonsContainer>
                                <ButtonOutline onClick={handleCopyText}>
                                    {copied ? "✅ Copiado!" : "📋 Copiar texto"}
                                </ButtonOutline>
                                <ButtonSolid onClick={handleExportDocx}>📄 Exportar Word (.docx)</ButtonSolid>
                            </ButtonsContainer>
                        </ResultData>
                    )}
                </CardHeader>
            </Card>
            <CardOrange>
                <CardTitle $color={""}>Modelo de nota — proposta em diligência</CardTitle>
                <CardSubTitle>
                    Em consulta ao Sistema de Apoio à Implementação de Políticas em Saúde (SAIPS), foi identificada a proposta nº 218623, referente à
                    solicitação de habilitação na alta complexidade em oncologia como UNACON c/ Serviço de Radioterapia (códigos 17.06 e 17.07), do
                    Fundação Hospital Regional do Câncer, a qual se encontra em diligência.
                </CardSubTitle>
            </CardOrange>
        </>
    );
}
