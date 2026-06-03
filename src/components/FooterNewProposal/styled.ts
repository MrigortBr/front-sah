import styled from "styled-components";

export const Container = styled.div`
    width: 95%;
    height: fit-content;
    padding: 25px;
    background-color: ${({ theme }) => theme.colors.white};
    -webkit-box-shadow: 5px 5px 25px 15px ${({ theme }) => theme.colors.blackTransparent};
    box-shadow: 5px 5px 25px 15px ${({ theme }) => theme.colors.blackTransparent};
    border-radius: 15px;
    margin-top: 5vh;
    display: flex;
    flex-wrap: nowrap;
`;

export const CancelButton = styled.button`
    border-radius: 10px;
    border: 1px solid transparent;
    background-color: ${({ theme }) => theme.colors.white};
    cursor: pointer;
    padding: 5px 10px;
    transition: 500ms;

    &:hover {
        border: 1px dashed ${({ theme }) => theme.colors.gray};
    }
`;

export const SaveButton = styled.button`
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.colors.blueBackground};
    background-color: ${({ theme }) => theme.colors.grayBackground};
    color: ${({ theme }) => theme.colors.black};
    cursor: pointer;
    padding: 5px 10px;
    transition: 500ms;
    margin-left: auto;

    &:hover {
        border: 1px solid ${({ theme }) => theme.colors.blueBackgroundLight};
        background: ${({ theme }) => theme.colors.blueBackgroundLight};
        color: ${({ theme }) => theme.colors.white};
    }
`;

export const DeleteButton = styled(SaveButton)`
    border: 1px solid ${({ theme }) => theme.colors.redBlack};
    background-color: ${({ theme }) => theme.colors.red};
    color: ${({ theme }) => theme.colors.white};

    &:hover {
        border: 1px solid ${({ theme }) => theme.colors.redLight};
        background: ${({ theme }) => theme.colors.redBlack};
        color: ${({ theme }) => theme.colors.white};
    }
`;

export const SendButton = styled.button`
    border-radius: 10px;
    border: 1px solid transparent;
    background-color: ${({ theme }) => theme.colors.greenBackground};
    color: ${({ theme }) => theme.colors.white};
    cursor: pointer;
    padding: 5px 10px;
    transition: 500ms;
    margin-left: 25px;
    margin-left: auto;

    &:hover {
        border: 1px solid ${({ theme }) => theme.colors.greenUltraLight};
        background: ${({ theme }) => theme.colors.greenUltraLight};
    }
`;
