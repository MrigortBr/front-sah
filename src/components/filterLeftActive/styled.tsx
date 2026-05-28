// styled.ts
import styled, { css } from "styled-components";

export const Container = styled.aside`
    width: 18vw;
    min-width: 240px;
    height: 81vh;
    max-height: 81vh;

    padding: 2vh 1vw;

    background: ${({ theme }) => theme.colors.white};

    display: flex;
    flex-direction: column;
    gap: 4vh;

    -webkit-box-shadow: 5px 0px 22px 5px ${({ theme }) => theme.colors.grayLight};
    box-shadow: 5px 0px 22px 5px ${({ theme }) => theme.colors.grayLight};

    @media (max-width: 768px) {
        display: none;
    }
`;

export const Section = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5vh;
`;

export const Title = styled.h3`
    font-size: ${({ theme }) => theme.fontSizes.xs};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    text-transform: uppercase;
    letter-spacing: 0.12em;
    padding-left: 10px;

    color: ${({ theme }) => theme.colors.gray};
`;

export const Menu = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5vh;
`;

export const MenuItem = styled.button<{ $active?: boolean }>`
    width: 100%;

    border: none;
    outline: none;

    background: transparent;

    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 1.2vh 0.8vw;

    border-radius: 0.8rem;

    cursor: pointer;

    transition: 0.2s ease-in-out;

    ${({ $active, theme }) =>
        $active &&
        css`
            background: ${theme.colors.greenBackgroundLight};
        `}

    &:hover {
        background: ${({ theme }) => theme.colors.greenBackgroundLight};
    }
`;

export const Left = styled.div`
    display: flex;
    align-items: center;
    gap: 0.8vw;
`;

export const Icon = styled.div`
    font-size: ${({ theme }) => theme.fontSizes.sm};

    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Label = styled.span`
    font-size: ${({ theme }) => theme.fontSizes.xs};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    line-height: 1.2rem;
    text-align: start;
    color: ${({ theme }) => theme.colors.gray};
`;

export const Badge = styled.div`
    min-width: 1.6rem;
    height: 1.6rem;

    padding: 0 0.4rem;

    border-radius: 999px;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: ${({ theme }) => theme.fontSizes.xxs};
    font-weight: ${({ theme }) => theme.fontWeights.bold};

    background: ${({ theme }) => theme.colors.greenUltraLight};
    color: ${({ theme }) => theme.colors.greenDark};
`;

export const CollapseButton = styled.button`
    border: none;
    background: transparent;

    cursor: pointer;

    font-size: 1.2rem;
    font-weight: bold;

    color: ${({ theme }) => theme.colors.text};

    transition: 0.2s;

    &:hover {
        opacity: 0.7;
    }
`;

export const TitleRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
