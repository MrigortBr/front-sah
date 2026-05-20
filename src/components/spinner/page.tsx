"use client";

import { LoadingContainer, LoadingSpinner, LoadingText } from "./styed";

interface LoadingProps {
    text?: string;
    height?: string;
    width?: string;
}

export default function Loading({ text = "Carregando...", height = "100%", width = "100%" }: LoadingProps) {
    return (
        <LoadingContainer $height={height} $width={width}>
            <LoadingSpinner />

            {text === "" ? <></> : <LoadingText>{text}</LoadingText>}
        </LoadingContainer>
    );
}
