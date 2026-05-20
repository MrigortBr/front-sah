import styled, { css } from "styled-components";

export const Container = styled.div`
    width: 100%;

    background: ${({ theme }) => theme.colors.white};

    border-radius: 1rem;

    overflow: auto;

    -webkit-box-shadow: 5px 5px 25px 15px ${({ theme }) => theme.colors.blackTransparent};
    box-shadow: 5px 5px 25px 15px ${({ theme }) => theme.colors.blackTransparent};

    margin-top: 5vh;
    margin-bottom: 5vh;
`;

export const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
`;

export const LeftHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

export const Title = styled.h2`
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-weight: 700;

    color: ${({ theme }) => theme.colors.text};
`;

export const Count = styled.div`
    padding: 0.3rem 0.7rem;

    border-radius: 999px;

    font-size: ${({ theme }) => theme.fontSizes.xs};
    font-weight: 700;

    background: #f5e7b2;
    color: #7a5a00;
`;

export const ViewAll = styled.button`
    border: none;

    padding: 0.7rem 1rem;

    border-radius: 0.6rem;

    cursor: pointer;

    background: ${({ theme }) => theme.colors.grayBackground};

    color: ${({ theme }) => theme.colors.text};

    font-weight: 600;
    transition: 500ms;
    &:hover {
        cursor: pointer;
        background: ${({ theme }) => theme.colors.greenUltraLight};
    }
`;

export const CustomTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    overflow-x: auto;
`;

export const CustomTableThead = styled.thead`
    background-color: ${({ theme }) => theme.colors.grayBackground};
`;

export const CustomTableTbody = styled.tbody``;

export const CustomTableTR = styled.tr`
    &:hover {
        background-color: ${({ theme }) => theme.colors.grayBackground};
    }
`;

export const CustomTableTH = styled.th`
    text-align: center;
    font-weight: ${({ theme }) => theme.fontWeights.regular};

    background-color: ${({ theme }) => theme.colors.grayBackground};
    padding: 1% 20px;
    font-size: ${({ theme }) => theme.fontSizes.sm};
`;

export const CustomTableTD = styled.td`
    text-align: center;
    padding: 1%;
    font-size: ${({ theme }) => theme.fontSizes.xs};
    border-bottom: 1px solid ${({ theme }) => theme.colors.grayBackground};
`;

export const CustomTableTDEdit = styled(CustomTableTD)`
    cursor: pointer;
    transition: 500ms;

    &:hover {
        background-color: ${({ theme }) => theme.colors.yellowVibrantOpaque};
    }
`;
export const MultiText = styled.div`
    & > a {
        color: ${({ theme }) => theme.colors.gray};
    }
`;
