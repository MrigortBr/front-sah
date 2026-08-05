import { useState } from "react";
import { Card, CardHeader } from "../styled";

export const statusMock = [
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
    "Histórico",
];

export const typeFin = ["MAC", "FAEC", "MAC E FAEC", "Não há ônus para o MS"];

export const Diligencias: string[] = [
    "Deliberação CIB",
    "Link do Plano de Atenção para o Diagnóstico e o Tratamento do Câncer",
    "Relatório de vistoria realizada pela Vigilância Sanitária",
    "Relatório do gestor sobre a necessidade dos serviços de saúde",
    "Termo de compromisso",
    "Cálculo de previsão financeira",
    "Declaração do responsável técnico médico",
    "Licença de operação emitida pela CNEN",
    "Formulário de Classificação e Verificação dos critérios mínimos para habilitação",
    "Parecer conclusivo do gestor",
    "Licença Sanitária",
];
