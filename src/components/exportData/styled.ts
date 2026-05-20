import styled from "styled-components";

export const Card = styled.div`
    width: 95%;
    height: fit-content;
    padding: 25px;
    background-color: ${({ theme }) => theme.colors.white};
    -webkit-box-shadow: 5px 5px 25px 15px ${({ theme }) => theme.colors.blackTransparent};
    box-shadow: 5px 5px 25px 15px ${({ theme }) => theme.colors.blackTransparent};
    border-radius: 15px;
    margin-top: 5vh;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 5%;
`;

export const CardText = styled.h2`
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.colors.black};
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    width: 100%;
`;

export const CardOrange = styled(Card)`
    flex-wrap: wrap;
    display: flex;
    background-color: #e651003a;
    border: 1px dashed #e65100;
`;

export const ResultData = styled.div`
    border-top: 1px solid ${({ theme }) => theme.colors.gray};
    padding-top: 2vh;
    margin-top: 2vh;
`;

export const CardItem = styled(Card)`
    display: flex;
    border: 1px solid transparent;
    transition: 500ms;
    margin-top: 2vh;

    & > div > h1 {
        font-size: ${({ theme }) => theme.fontSizes.sm};
        color: ${({ theme }) => theme.colors.black};
        font-weight: ${({ theme }) => theme.fontWeights.bolder};
    }

    & > div > h2 {
        font-size: ${({ theme }) => theme.fontSizes.xxs};
        color: ${({ theme }) => theme.colors.gray};
        font-weight: ${({ theme }) => theme.fontWeights.regular};
    }

    &:hover {
        background-color: #e651003a;
        cursor: pointer;
        border: 1px solid #e65100;
    }
`;

export const CardHeader = styled.div`
    position: relative;
    padding: 0 15px;
    grid-column-start: 1;
    grid-column-end: 3;
`;

export const CardTitle = styled.h1<{ $color: string }>`
    font-size: ${({ theme }) => theme.fontSizes.md};
    color: ${({ theme }) => theme.colors.black};
    font-weight: ${({ theme }) => theme.fontWeights.bolder};

    &:after {
        content: "";
        position: absolute;
        top: 7px;
        left: 0;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: ${({ $color }) => $color};
        display: block;
    }
`;

export const CardSubTitle = styled.h2`
    font-size: ${({ theme }) => theme.fontSizes.md};
    color: ${({ theme }) => theme.colors.gray};
    font-weight: ${({ theme }) => theme.fontWeights.regular};
`;

export const CardTitleSecondary = styled.h2`
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.colors.gray};
    font-weight: ${({ theme }) => theme.fontWeights.bolder};
`;

export const InputComponent = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex-wrap: wrap;
    margin: 3vh 0;
`;

export const InputText = styled.p`
    font-size: ${({ theme }) => theme.fontSizes.xs};
    color: ${({ theme }) => theme.colors.black};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    width: 90%;
    padding-left: 2px;
    height: fit-content;

    & > a {
        color: red;
    }
`;

export const InputSelect = styled.select`
    padding: 10px 14px;
    font-size: ${({ theme }) => theme.fontSizes.xs};
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.colors.gray};
    background-color: ${({ theme }) => theme.colors.grayBackground};
    transition: 500ms;
    width: 100%;

    &:focus {
        border: 1px solid ${({ theme }) => theme.colors.greenBackground};
        background-color: ${({ theme }) => theme.colors.white};
        box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.greenBoxShadow} !important;
        outline: none;
    }
`;

export const Input = styled.input`
    padding: 10px 14px;
    font-size: ${({ theme }) => theme.fontSizes.xs};
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.colors.gray};
    background-color: ${({ theme }) => theme.colors.grayBackground};
    transition: 500ms;
    width: 100%;

    &:focus {
        border: 1px solid ${({ theme }) => theme.colors.greenBackground};
        background-color: ${({ theme }) => theme.colors.white};
        box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.greenBoxShadow} !important;
        outline: none;
    }
`;

export const InputLine = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 100%;
    column-gap: 2.5%;
`;

// styled.ts

export const ButtonsContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 2vh;
`;

export const ButtonOutline = styled.button`
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    background: transparent;
    border: 1.5px solid ${({ theme }) => theme.colors.greenBackground};
    border-radius: 6px;
    color: #2d6a4f;
    font-size: ${({ theme }) => theme.fontSizes.xs};
    font-weight: 500;
    cursor: pointer;
    transition: 500ms;

    &:hover {
        background: ${({ theme }) => theme.colors.greenBackground};
        border: 1.5px solid ${({ theme }) => theme.colors.greenBackgroundLight};

        color: ${({ theme }) => theme.colors.white};
    }

    &:disabled {
        opacity: 0.45;
        cursor: not-allowed;
    }
`;

export const ButtonSolid = styled.button`
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 18px;
    background: #1e3a4f;
    border: 1.5px solid transparent;
    border-radius: 6px;
    color: #ffffff;
    font-size: ${({ theme }) => theme.fontSizes.xs};
    font-weight: 500;
    cursor: pointer;
    transition: background 0.15s ease;

    &:hover {
        background: #16303f;
    }

    &:disabled {
        opacity: 0.45;
        cursor: not-allowed;
    }
`;
