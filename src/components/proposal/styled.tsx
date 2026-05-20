import styled from "styled-components";

export const Container = styled.div`
    background-color: ${({ theme }) => theme.colors.grayBackground};
    height: 81vh;
    width: 100vw;

    overflow-x: hidden;
    display: grid;
    grid-template-columns: 20% 80%;
`;

export const ContainerProposal = styled.div`
    width: 100%;
    height: 100%;
    padding: 2% 2%;
`;

export const TitleContainer = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: 70% 30%;

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
`;

export const AddNewRequest = styled.button`
    padding: 6px 12px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    background: ${({ theme }) => theme.colors.greenBackground};
    border: 1px solid ${({ theme }) => theme.colors.text.half};
    color: white;
    font-weight: 600;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    transition: 500ms;

    &:hover {
        background: ${({ theme }) => theme.colors.greenUltraLight};
    }

    margin: auto 0;

    margin-left: auto;
`;
