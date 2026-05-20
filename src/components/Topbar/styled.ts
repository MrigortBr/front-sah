import styled from "styled-components";

export const TopbarContainer = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 20px;
    background: ${({ theme }) => theme.colors.greenBackground};
    height: 9vh;
`;

export const TopbarBrand = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    width: 50%;
`;

export const TopbarLogo = styled.div`
    height: 5vh;
    width: 5vh;
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.yellowVibrant};
    color: ${({ theme }) => theme.colors.greenBackground};
    font-size: ${({ theme }) => theme.fontSizes.xs};
    padding: 1%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
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
`;

export const TopbarRight = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

export const UserInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

export const UserAvatar = styled.div`
    width: 5vh;
    height: 5vh;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.greenTransparent};
    color: ${({ theme }) => theme.colors.white};
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    font-size: ${({ theme }) => theme.fontSizes.sm};
`;

export const UserName = styled.div`
    font-size: ${({ theme }) => theme.fontSizes.xs};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    color: ${({ theme }) => theme.colors.text.strong};
`;

export const UserRole = styled.div`
    font-size: ${({ theme }) => theme.fontSizes.xxs};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    color: ${({ theme }) => theme.colors.text.half};
`;

export const LogoutButton = styled.button`
    padding: 6px 12px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    background: ${({ theme }) => theme.colors.greenTransparent};
    border: 1px solid ${({ theme }) => theme.colors.text.half};
    color: white;
    font-weight: 600;
    font-size: ${({ theme }) => theme.fontSizes.xxs};

    &:hover {
        background: ${({ theme }) => theme.colors.whiteUltraOpaque};
    }
`;
