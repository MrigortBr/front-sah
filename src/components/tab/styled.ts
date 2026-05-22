import styled from "styled-components";

export const TabsWrapper = styled.nav`
    display: flex;
    align-items: flex-end;
    gap: 0;
    background-color: #f5f2ec;
    padding: 0 0;
    border-bottom: 1px solid #e0dbd0;
    margin-top: 5vh;

    @media (max-width: 768px) {
        width: 90dvw;
        margin-left: 5dvw;
    }
`;

export const Tab = styled.button<{ $active?: boolean }>`
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 10px 14px;
    background: none;
    border: none;
    border-bottom: 2px solid ${({ $active, theme }) => ($active ? theme.colors.greenBackground : "transparent")};
    cursor: pointer;
    font-size: 13px;
    font-weight: ${({ $active }) => ($active ? "600" : "400")};
    color: ${({ $active, theme }) => ($active ? theme.colors.black : theme.colors.gray)};
    white-space: nowrap;
    transition:
        color 0.15s ease,
        border-color 0.15s ease;
    margin-bottom: -1px;
    line-height: 1.4;
    letter-spacing: 0.01em;

    &:hover {
        color: #1c1c14;
        border-bottom-color: ${({ $active }) => ($active ? "#2d6a4f" : "#c5bfb0")};
    }

    &:focus-visible {
        outline: 2px solid #2d6a4f;
        outline-offset: 2px;
        border-radius: 2px;
    }
`;

export const TabIcon = styled.span`
    font-size: ${({ theme }) => theme.fontSizes.xs};
    line-height: 1;
    display: flex;
    align-items: center;
`;
