import styled from "styled-components";

export const FooterContainer = styled.footer`
    width: 100%;
    height: 100%;

    padding: 0 24px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    background: ${({ theme }) => theme.colors.white};

    font-size: ${({ theme }) => theme.fontSizes.xs};
    color: ${({ theme }) => theme.colors.greenDark};

    border-top: 1px solid ${({ theme }) => theme.colors.greenBackground};
`;

export const FooterLeft = styled.div`
    font-weight: 500;
`;

export const FooterRight = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ImageWrapper = styled.div`
    position: relative;

    height: 9vh;
    width: auto;
    aspect-ratio: 3 / 1;
`;
