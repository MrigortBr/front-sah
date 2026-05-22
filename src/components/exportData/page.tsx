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
import { CardDescription } from "../module/styled";
import { useAlert } from "@/providers/alert/page";

type PROPS = {
    data: SimpleProposal[];
};

export default function ExportData({ data }: PROPS) {
    const [uf, setUf] = useState("");
    const [municipio, setMunicipio] = useState("");
    const [dataFiltred, setDataFiltred] = useState(() => {
        return data.filter((v) => v.situacao == "Em diligência");
    });
    const { callMessage } = useAlert();
    const [dataSelected, setdataSelected] = useState<SimpleProposal | undefined>(undefined);
    const [copied, setCopied] = useState(false);

    const uniqueUFs = useMemo(() => {
        const ufs = data.map((v) => v.uf_estabelecimento).filter(Boolean);
        return [...new Set(ufs)].sort();
    }, [data]);

    const filteredMunicipios = useMemo(() => {
        const source = uf ? data.filter((v) => v.uf_estabelecimento === uf) : data;
        const municipios = source.map((v) => v.municipio).filter(Boolean);
        return [...new Set(municipios)].sort();
    }, [data, uf]);

    function handleUfChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setUf(e.target.value);
        setMunicipio("");
    }

    function generateText(): string {
        if (!dataSelected) return "";

        const habilitacoes = dataSelected.tipohabilitacao.map((h) => `${h.codigo} - ${h.descricao}`).join(", ");

        return (
            `Em consulta ao Sistema de Apoio à Implementação de Políticas em Saúde (SAIPS), ` +
            `foi identificada a proposta nº ${dataSelected.saips}, referente à solicitação de habilitação ` +
            `na alta complexidade em oncologia como ${habilitacoes}, do ${dataSelected.nome_estabelecimento}, ` +
            `a qual se encontra em diligência.`
        );
    }

    async function handleCopyText() {
        if (!dataSelected) return;
        await navigator.clipboard.writeText(generateText());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        callMessage("Proposta copiada com sucesso!", "success");
    }

    async function handleExportDocx() {
        if (!dataSelected) return;

        const { Document, Packer, Paragraph, TextRun, AlignmentType } = await import("docx");

        const texto = generateText();

        const doc = new Document({
            sections: [
                {
                    properties: {},
                    children: [
                        new Paragraph({
                            alignment: AlignmentType.JUSTIFIED,
                            children: [
                                new TextRun({
                                    text: texto,
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
                            <InputSelect value={municipio} onChange={(e) => setMunicipio(e.target.value)} disabled={filteredMunicipios.length === 0}>
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
                            <Input />
                        </InputComponent>
                    </InputLine>

                    <CardTitleSecondary>Propostas em diligência · {dataFiltred.length} proposta</CardTitleSecondary>

                    {dataFiltred.map((d, idx) => {
                        return (
                            <CardItem key={idx} onClick={() => setdataSelected(d)}>
                                <CardHeader>
                                    <CardTitle $color={"green"}>{d.nome_estabelecimento}</CardTitle>
                                    <CardSubTitle>
                                        {d.uf_estabelecimento} - {d.municipio} - CNES{d.cnes_estabelecimento} - {d.saips}
                                    </CardSubTitle>
                                    <CardSubTitle>
                                        {d.tipohabilitacao.map((h, i) => {
                                            return `${h.codigo} ${h.descricao} / `;
                                        })}
                                    </CardSubTitle>
                                    <CardSubTitle></CardSubTitle>
                                    <CardSubTitle></CardSubTitle>
                                </CardHeader>
                            </CardItem>
                        );
                    })}

                    {dataSelected != undefined ? (
                        <ResultData>
                            <CardTitleSecondary>Nota gerada — proposta em diligência</CardTitleSecondary>
                            <CardItem>
                                <CardHeader>
                                    <CardTitle $color={"green"}>{dataSelected.nome_estabelecimento}</CardTitle>
                                    <CardSubTitle>
                                        {dataSelected.uf_estabelecimento} - {dataSelected.municipio} - CNES{dataSelected.cnes_estabelecimento} -{" "}
                                        {dataSelected.saips}
                                    </CardSubTitle>
                                    <CardSubTitle>
                                        {dataSelected.tipohabilitacao.map((h, i) => {
                                            return `${h.codigo} ${h.descricao} / `;
                                        })}
                                    </CardSubTitle>
                                    <CardSubTitle></CardSubTitle>
                                    <CardSubTitle></CardSubTitle>
                                </CardHeader>
                            </CardItem>
                            <CardItem>
                                <CardText>{generateText()}</CardText>
                            </CardItem>
                            <ButtonsContainer>
                                <ButtonOutline onClick={handleCopyText}>📋 Copiar texto</ButtonOutline>

                                <ButtonSolid onClick={handleExportDocx}>📄 Exportar Word (.docx)</ButtonSolid>
                            </ButtonsContainer>
                        </ResultData>
                    ) : (
                        <></>
                    )}
                </CardHeader>
            </Card>
            <CardOrange>
                <CardTitle $color={""}>Modelo de nota — proposta em diligência</CardTitle>
                <CardDescription>
                    Em consulta ao Sistema de Apoio à Implementação de Políticas em Saúde (SAIPS), foi identificada a proposta nº 218623, referente à
                    solicitação de habilitação na alta complexidade em oncologia como UNACON c/ Serviço de Radioterapia (códigos 17.06 e 17.07), do
                    Fundação Hospital Regional do Câncer, a qual se encontra em diligência.
                </CardDescription>
            </CardOrange>
        </>
    );
}
