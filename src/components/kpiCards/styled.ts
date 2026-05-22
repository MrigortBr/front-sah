// styled.ts
"use client";

import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    margin-top: 5vh;
`;

export const KpiGrid = styled.div`
    width: 100%;

    display: grid;

    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));

    gap: 1vw;

    @media (max-width: 768px) {
        gap: 5dvw;
        grid-template-columns: 45dvw 45dvw;

        width: 95dvw;
        margin-left: 2.5dvw;
    }
`;

export const Card = styled.div<{ $border: string }>`
    width: 100%;

    min-height: 13vh;

    background: ${({ theme }) => theme.colors.white};

    border-radius: 1vw;

    padding: 1.5vh 1.3vw;

    display: flex;

    align-items: flex-start;

    justify-content: space-between;

    border-bottom: 0.35vh solid ${({ $border }) => $border};

    box-shadow: 0 0.2vh 0.6vh rgba(0, 0, 0, 0.05);

    @media (max-width: 768px) {
        height: 15dvh;
        max-height: 5dvh;
    }
`;

export const Title = styled.h3`
    font-size: 0.75vw;

    font-weight: 700;

    color: #6b7b6e;

    letter-spacing: 0.08vw;

    margin-bottom: 1.2vh;

    @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.md};
        font-weight: ${({ theme }) => theme.fontWeights.bold};
    }
`;

export const Number = styled.h1`
    font-size: 2.5vw;

    font-weight: 700;

    color: #082b3a;

    line-height: 100%;

    margin-bottom: 1vh;

    @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.md};
        font-weight: ${({ theme }) => theme.fontWeights.medium};
    }
`;

export const Description = styled.p<{ $color: string }>`
    font-size: 0.8vw;

    font-weight: 500;

    color: ${({ $color }) => $color};

    @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.xs};
        font-weight: ${({ theme }) => theme.fontWeights.medium};
    }
`;

export const IconContainer = styled.div<{ $bg: string }>`
    width: 2.4vw;

    height: 2.4vw;

    min-width: 40px;

    min-height: 40px;

    border-radius: 0.5vw;

    background: ${({ $bg }) => $bg};

    display: flex;

    align-items: center;

    justify-content: center;

    color: #d7dde5;
`;
