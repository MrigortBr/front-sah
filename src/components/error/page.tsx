"use client";

import * as S from "./styled";

interface ErrorPageProps {
    text?: string;
    buttonText?: string;
    onClick?: () => void;
}

export default function ErrorPage({ text = "Ocorreu um erro ao carregar a página", buttonText = "Tentar novamente", onClick }: ErrorPageProps) {
    return (
        <S.Container>
            <S.ErrorCircle>
                <S.LineOne />
                <S.LineTwo />
            </S.ErrorCircle>
            <S.Text>{text}</S.Text>

            {onclick == undefined ? <></> : <S.Button onClick={onClick}>{buttonText}</S.Button>}
        </S.Container>
    );
}
