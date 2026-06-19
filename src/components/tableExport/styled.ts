import styled from "styled-components";

export const Wrapper = styled.div`
    position: relative;
    display: inline-block;
`;

export const ExportButton = styled.button`
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 14px;
    border-radius: 6px;
    border: 1px solid ${({ theme }) => theme.colors.greenBackground};
    background: transparent;
    color: ${({ theme }) => theme.colors.greenBackground};
    font-size: ${({ theme }) => theme.fontSizes.xs};
    font-weight: 600;
    cursor: pointer;
    transition: background 0.15s ease, color 0.15s ease;
    white-space: nowrap;

    &:hover {
        background: ${({ theme }) => theme.colors.greenBackground};
        color: ${({ theme }) => theme.colors.white};
    }
`;

export const Dropdown = styled.div`
    position: absolute;
    top: calc(100% + 6px);
    right: 0;
    background: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.grayUltraLight};
    border-radius: 8px;
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12);
    min-width: 170px;
    z-index: 9999;
    overflow: hidden;
`;

export const DropdownItem = styled.button`
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: 10px 14px;
    border: none;
    background: transparent;
    font-size: ${({ theme }) => theme.fontSizes.xs};
    color: ${({ theme }) => theme.colors.black};
    cursor: pointer;
    text-align: left;
    transition: background 0.12s ease;

    &:hover {
        background: ${({ theme }) => theme.colors.grayBackground};
    }

    &:not(:last-child) {
        border-bottom: 1px solid ${({ theme }) => theme.colors.grayUltraLight};
    }
`;
