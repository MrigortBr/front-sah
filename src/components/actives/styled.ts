import styled from "styled-components";

export const InputContainer = styled.div`
    width: 100%;
    height: 100%;
    margin-top: 0;

    & > div {
        width: 100%;
        height: 100%;
        display: grid;
        flex-direction: column;
        gap: 4px;
        flex-wrap: wrap;
        margin: 0;
    }
`;

export const SpanTitle = styled.span`
    margin: auto 0;

    & > h1 {
        font-size: ${({ theme }) => theme.fontSizes.lg};
        color: ${({ theme }) => theme.colors.text};
        font-weight: ${({ theme }) => theme.fontWeights.bold};
    }

    & > h2 {
        font-size: ${({ theme }) => theme.fontSizes.xs};
        color: ${({ theme }) => theme.colors.gray};
        font-weight: ${({ theme }) => theme.fontWeights.regular};
    }

    & > button {
        grid-column-start: 2;
        grid-row-start: 1;
        grid-row-end: 3;
    }

    @media (max-width: 768px) {
        margin-top: 5dvh;
        padding: 3dvw;
        display: grid;
        grid-template-columns: 50dvw 40dvw;
        & > h1 {
            width: 50dvw;
        }

        & > h2 {
            width: 50dvw;
        }

        & > button {
            width: 30dvw;
            grid-column-start: 2;
            grid-column-end: 3;
            grid-row-start: 1;
            grid-row-end: 3;
        }
    }
`;
