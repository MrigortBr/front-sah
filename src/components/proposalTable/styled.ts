import styled, { css } from "styled-components";

export const Container = styled.div`
    z-index: 1;

    position: relative;
    width: 100%;

    background: ${({ theme }) => theme.colors.white};

    border-radius: 1rem;

    overflow: visible;

    -webkit-box-shadow: 5px 5px 25px 15px ${({ theme }) => theme.colors.blackTransparent};
    box-shadow: 5px 5px 25px 15px ${({ theme }) => theme.colors.blackTransparent};

    margin-top: 5vh;
    margin-bottom: 5vh;

    @media (max-width: 768px) {
        width: 95dvw;
        margin-left: 2dvw;
    }
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

export const TitleTwo = styled(Title)`
    text-align: center;
    width: 100%;
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

export const CustomTableTR = styled.tr<{ $cursor: string }>`
    &:hover {
        background-color: ${({ theme }) => theme.colors.grayBackground};
        cursor: ${({ $cursor }) => $cursor};
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

export const FilterContainer = styled.div`
    position: relative;

    & > p {
        display: flex;
        cursor: pointer;
        justify-content: center;
        flex-wrap: nowrap;
        & > svg {
            height: ${({ theme }) => theme.fontSizes.sm};
            cursor: pointer;
        }
    }
`;

export const FilterMenu = styled.div`
    position: absolute;
    top: 100%;
    right: 0;

    min-width: 220px;
    max-height: 300px;

    overflow-y: auto;

    background: white;
    border: 1px solid #ddd;
    border-radius: 10px;

    padding: 10px;

    z-index: 999999;

    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);

    display: flex;
    flex-direction: column;
    gap: 6px;
`;

export const FilterOption = styled.label`
    display: flex;
    align-items: center;
    gap: 8px;

    cursor: pointer;
    font-size: 13px;
`;

export const ClearFilterButton = styled.button`
    border: none;

    margin-top: 10px;
    padding: 8px;

    border-radius: 6px;

    cursor: pointer;

    background: #f5f5f5;

    &:hover {
        background: #e9e9e9;
    }
`;

export const PaginationContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 12px 10px;
    border-top: 1px solid ${({ theme }) => theme.colors.grayBackground};
`;

export const PaginationButton = styled.button<{ $active?: boolean }>`
    border: 1px solid ${({ $active, theme }) => ($active ? theme.colors.greenUltraLight : "#ddd")};
    background: ${({ $active, theme }) => ($active ? theme.colors.greenUltraLight : "white")};
    color: ${({ $active, theme }) => ($active ? theme.colors.text : theme.colors.text)};
    font-weight: ${({ $active }) => ($active ? 700 : 400)};

    min-width: 36px;
    height: 36px;
    padding: 0 10px;

    border-radius: 6px;
    cursor: pointer;
    font-size: ${({ theme }) => theme.fontSizes.xs};
    transition: 200ms;

    &:hover:not(:disabled) {
        background: ${({ theme }) => theme.colors.greenUltraLight};
    }

    &:disabled {
        opacity: 0.4;
        cursor: default;
    }
`;

export const PaginationInfo = styled.span`
    font-size: ${({ theme }) => theme.fontSizes.xs};
    color: ${({ theme }) => theme.colors.gray};
    white-space: nowrap;
`;
