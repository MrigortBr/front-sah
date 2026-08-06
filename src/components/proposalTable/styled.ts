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
        align-items: center;
        justify-content: center;
        gap: 4px;
        cursor: pointer;
        flex-wrap: nowrap;
        user-select: none;
        & > svg {
            height: ${({ theme }) => theme.fontSizes.sm};
            cursor: pointer;
            flex-shrink: 0;
        }
    }
`;

export const FilterMenu = styled.div`
    position: absolute;
    top: calc(100% + 4px);
    left: 50%;
    transform: translateX(-50%);
    min-width: 240px;
    width: max-content;
    max-width: 320px;
    background: #fff;
    border: 1px solid #b0b8c9;
    border-radius: 4px;
    z-index: 999999;
    box-shadow: 0 4px 16px rgba(0,0,0,0.18);
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

export const FilterMenuHeader = styled.div`
    background: #217346;
    color: #fff;
    font-size: 12px;
    font-weight: 600;
    padding: 6px 10px;
    letter-spacing: 0.03em;
`;

export const FilterSearchBox = styled.input`
    margin: 8px 8px 4px;
    padding: 5px 8px;
    border: 1px solid #b0b8c9;
    border-radius: 3px;
    font-size: 12px;
    outline: none;
    &:focus { border-color: #217346; }
`;

export const FilterSelectAllRow = styled.label`
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 4px 10px 2px;
    font-size: 12px;
    font-weight: 600;
    color: #333;
    cursor: pointer;
    border-bottom: 1px solid #e0e0e0;
    margin-bottom: 2px;
    user-select: none;
    input[type="checkbox"] { accent-color: #217346; }
`;

export const FilterOptionsList = styled.div`
    max-height: 200px;
    overflow-y: auto;
    padding: 2px 0;
    &::-webkit-scrollbar { width: 6px; }
    &::-webkit-scrollbar-thumb { background: #ccc; border-radius: 3px; }
`;

export const FilterOption = styled.label`
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 3px 10px;
    font-size: 12px;
    color: #222;
    cursor: pointer;
    user-select: none;
    &:hover { background: #e8f5e9; }
    input[type="checkbox"] { accent-color: #217346; flex-shrink: 0; }
`;

export const FilterMenuFooter = styled.div`
    display: flex;
    gap: 6px;
    padding: 8px 10px;
    border-top: 1px solid #e0e0e0;
    justify-content: flex-end;
`;

export const FilterOkButton = styled.button`
    padding: 4px 18px;
    background: #217346;
    color: #fff;
    border: none;
    border-radius: 3px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    &:hover { background: #185c38; }
`;

export const ClearFilterButton = styled.button`
    padding: 4px 12px;
    background: #fff;
    color: #333;
    border: 1px solid #b0b8c9;
    border-radius: 3px;
    font-size: 12px;
    cursor: pointer;
    &:hover { background: #f5f5f5; }
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

export const HabBlock = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    text-align: left;
`;

export const HabGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`;

export const HabChipRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 4px;
`;

export const HabChip = styled.span<{ $type: "solo" | "conj" }>`
    display: inline-flex;
    align-items: center;
    font-size: ${({ theme }) => theme.fontSizes.xs};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    padding: 2px 8px;
    border-radius: 20px;
    white-space: nowrap;

    ${({ $type, theme }) =>
        $type === "solo"
            ? `
        background: #F1F8E9;
        color: #33691E;
        border: 0.5px solid #AED581;
    `
            : `
        background: #E3F2FD;
        color: #0D47A1;
        border: 0.5px solid #90CAF9;
    `}
`;

export const HabPlus = styled.span<{ $type: "solo" | "conj" }>`
    font-size: ${({ theme }) => theme.fontSizes.xxs};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ $type }) => ($type === "conj" ? "#90CAF9" : "#AED581")};
`;

export const HabDesc = styled.span<{ $type: "solo" | "conj" }>`
    font-size: ${({ theme }) => theme.fontSizes.xxs};
    color: ${({ theme }) => theme.colors.gray};
    margin-top: 2px;
    font-style: italic;
    text-align: center;
`;
