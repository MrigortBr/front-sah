import styled from "styled-components";

export const Container = styled.div`
    width: 100vw;
    height: 100vh;

    display: flex;
    flex-direction: column;

    overflow: hidden;
`;

export const Header = styled.header`
    height: 9vh;
    min-height: 9vh;

    @media (max-width: 768px) {
        height: auto;
        min-height: 0;
    }
`;

export const Content = styled.main`
    height: 81vh;
    min-height: 81vh;

    overflow-y: auto;

    @media (max-width: 768px) {
        flex: 1;
        min-height: 0;
        height: auto;
        max-height: unset;
    }
`;

export const Footer = styled.footer`
    height: 10vh;
    min-height: 10vh;

    @media (max-width: 768px) {
        min-height: 0dvh;
        max-height: 10dvh;
    }
`;
