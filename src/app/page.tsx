// LoginPage.jsx

import Footer from "@/components/footer/page";
import HeroPanel from "@/components/HeroPanel/page";
import LoginPanel from "@/components/LoginPanel/page";
import styled from "styled-components";

export default function LoginPage() {
    return (
        <Container>
            <HeroPanel />
            <LoginPanel />
            <Footer></Footer>
        </Container>
    );
}

export const Container = styled.div`
    width: 100%;

    height: 100vh;

    max-height: 100vh;

    display: grid;
    grid-template-columns: 1fr 30rem;
    grid-template-rows: 90vh 10vh;

    @media (max-width: 980px) {
        grid-template-columns: 1fr;
    }

    & > footer {
        grid-column-start: 1;
        grid-column-end: 3;
    }
`;
