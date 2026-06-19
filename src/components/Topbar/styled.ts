import styled from "styled-components";

export const TopbarContainer = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    background: ${({ theme }) => theme.colors.greenBackground};
    height: 9vh;
    gap: 12px;

    @media (max-width: 768px) {
        padding: 0 12px;
        height: 10dvh;
    }
`;

export const TopbarBrand = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;

    @media (max-width: 768px) {
        gap: 8px;
    }
`;

export const TopbarLogo = styled.div`
    height: 5vh;
    width: 5vh;
    min-height: 32px;
    min-width: 32px;
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.yellowVibrant};
    color: ${({ theme }) => theme.colors.greenBackground};
    font-size: ${({ theme }) => theme.fontSizes.xs};
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    flex-shrink: 0;
`;

export const TopbarName = styled.div`
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.colors.text.strong};
`;

export const TopbarSub = styled.div`
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    font-size: ${({ theme }) => theme.fontSizes.xxs};
    color: ${({ theme }) => theme.colors.text.half};

    @media (max-width: 480px) {
        display: none;
    }
`;

/* ── Navegação central ── */

export const NavGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    flex: 1;
    justify-content: center;

    @media (max-width: 768px) {
        display: none;
    }
`;

export const MobileNavBar = styled.div`
    display: none;

    @media (max-width: 768px) {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 6px 12px;
        background: ${({ theme }) => theme.colors.greenBackground};
        border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
`;

export const NavButton = styled.button<{ $active?: boolean }>`
    padding: 6px 16px;
    border-radius: 6px;
    cursor: pointer;
    font-family: inherit;
    font-size: ${({ theme }) => theme.fontSizes.xs};
    font-weight: ${({ $active, theme }) =>
        $active ? theme.fontWeights.bold : theme.fontWeights.medium};
    transition: background 0.18s ease, color 0.18s ease, border-color 0.18s ease;

    background: ${({ $active, theme }) =>
        $active ? theme.colors.yellowVibrant : "transparent"};
    color: ${({ $active, theme }) =>
        $active ? theme.colors.greenBackground : theme.colors.text.strong};
    border: 1px solid
        ${({ $active, theme }) =>
            $active ? theme.colors.yellowVibrant : theme.colors.text.half};

    &:hover {
        background: ${({ $active, theme }) =>
            $active ? theme.colors.yellowVibrant : theme.colors.whiteUltraOpaque};
        border-color: ${({ $active, theme }) =>
            $active ? theme.colors.yellowVibrant : theme.colors.text.normal};
    }

    @media (max-width: 768px) {
        flex: 1;
        padding: 6px 4px;
        font-size: ${({ theme }) => theme.fontSizes.xxs};
        text-align: center;
    }
`;

/* ── Lado direito ── */

export const TopbarRight = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;

    @media (max-width: 768px) {
        gap: 6px;
    }
`;

export const SessionTimer = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: ${({ theme }) => theme.fontSizes.xs};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.text.strong};
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
    background: ${({ theme }) => theme.colors.greenTransparent};
    border: 1px solid ${({ theme }) => theme.colors.text.normal};
    padding: 4px 10px;
    border-radius: 6px;

    @media (max-width: 480px) {
        padding: 3px 6px;
        font-size: ${({ theme }) => theme.fontSizes.xxs};
    }
`;

export const UserInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;

    @media (max-width: 768px) {
        > div:last-child {
            display: none;
        }
    }
`;

export const UserAvatar = styled.div`
    width: 5vh;
    height: 5vh;
    min-width: 32px;
    min-height: 32px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.greenTransparent};
    border: 1px solid ${({ theme }) => theme.colors.text.half};
    color: ${({ theme }) => theme.colors.white};
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    flex-shrink: 0;
`;

export const UserName = styled.div`
    font-size: ${({ theme }) => theme.fontSizes.xs};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    color: ${({ theme }) => theme.colors.text.strong};
    white-space: nowrap;
`;

export const UserRole = styled.div`
    font-size: ${({ theme }) => theme.fontSizes.xxs};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    color: ${({ theme }) => theme.colors.text.half};
    white-space: nowrap;
`;

export const LogoutButton = styled.button`
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
    font-family: inherit;
    background: ${({ theme }) => theme.colors.greenTransparent};
    border: 1px solid ${({ theme }) => theme.colors.text.half};
    color: white;
    font-weight: 600;
    font-size: ${({ theme }) => theme.fontSizes.xxs};
    white-space: nowrap;
    transition: background 0.18s ease;

    &:hover {
        background: ${({ theme }) => theme.colors.whiteUltraOpaque};
    }

    @media (max-width: 480px) {
        padding: 5px 8px;
    }
`;

export const TopBarCenter = styled.div``;
