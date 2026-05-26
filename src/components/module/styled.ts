"use client";

import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    background: ${({ theme }) => theme.colors.grayLight};

    font-family: ${({ theme }) => theme.fonts.sans};

    padding: 4vh 4vw;

    @media (max-width: 768px) {
        height: 72dvh;
    }
`;

export const GreetingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 1vh;

    @media (max-width: 768px) {
        width: 100%;
    }
`;

export const Greeting = styled.h1`
    font-size: ${({ theme }) => theme.fontSizes.xxl};
    font-weight: ${({ theme }) => theme.fontWeights.bold};

    color: ${({ theme }) => theme.colors.greenDark};

    font-family: ${({ theme }) => theme.fonts.primary};

    text-align: center;

    @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.xl};
    }
`;

export const GreetingSubtitle = styled.p`
    font-size: 1vw;
    font-weight: ${({ theme }) => theme.fontWeights.medium};

    color: ${({ theme }) => theme.colors.gray};

    font-family: ${({ theme }) => theme.fonts.sans};

    text-align: center;

    @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.lg};
    }
`;

export const CardsContainer = styled.div`
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    gap: 2vw;

    flex-wrap: wrap;
`;

export const ModuleCard = styled.div<{ $color: string }>`
    width: 28vw;
    min-height: 20vh;

    padding: 3vh 2vw;

    border-radius: ${({ theme }) => theme.borderRadius.xs};

    border: 0.5vh solid transparent;

    border-top: 1vh solid ${({ $color }) => $color};

    background: ${({ theme }) => theme.colors.grayLight};

    display: flex;
    flex-direction: column;

    gap: 2vh;

    cursor: pointer;

    transition:
        transform 0.2s ease,
        box-shadow 0.2s ease;

    box-shadow: 0 0.5vh 1vh rgba(0, 0, 0, 0.08);

    &:hover {
        transform: translateY(-0.5vh);

        box-shadow: 0 1vh 2vh rgba(0, 0, 0, 0.12);
    }

    @media (max-width: 768px) {
        width: 85dvw;
        flex-direction: row;
    }
`;

export const CardIcon = styled.div`
    width: 4vw;
    height: 4vw;

    border-radius: 1vw;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 1.8vw;

    background: ${({ theme }) => theme.colors.grayUltraLight};

    color: ${({ theme }) => theme.colors.greenBackground};

    @media (max-width: 768px) {
        height: 5dvh;
        width: 10dvh;
        font-size: ${({ theme }) => theme.fontSizes.md};
    }
`;

export const Card = styled.div`
    display: flex;
    flex-direction: column;

    gap: 1.5vh;
`;

export const CardTitle = styled.h2`
    font-size: 1.6vw;
    font-weight: ${({ theme }) => theme.fontWeights.bold};

    color: ${({ theme }) => theme.colors.greenDark};

    font-family: ${({ theme }) => theme.fonts.primary};

    line-height: 120%;

    @media (max-width: 768px) {
        width: fit-content;
        font-size: ${({ theme }) => theme.fontSizes.lg};
    }
`;

export const CardDescription = styled.p`
    font-size: 1vw;
    font-weight: ${({ theme }) => theme.fontWeights.regular};

    color: ${({ theme }) => theme.colors.gray};

    font-family: ${({ theme }) => theme.fonts.sans};

    line-height: 160%;

    @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.md};
    }
`;

export const CardFooter = styled.span`
    margin-top: auto;

    font-size: 0.95vw;
    font-weight: ${({ theme }) => theme.fontWeights.bold};

    color: ${({ theme }) => theme.colors.greenBackground};

    font-family: ${({ theme }) => theme.fonts.sans};

    @media (max-width: 768px) {
        font-size: ${({ theme }) => theme.fontSizes.md};
    }
`;

export const LoadingContainer = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    background: ${({ theme }) => theme.colors.grayLight};

    color: ${({ theme }) => theme.colors.greenDark};

    font-size: 2vw;
    font-weight: ${({ theme }) => theme.fontWeights.bold};

    font-family: ${({ theme }) => theme.fonts.primary};
`;
