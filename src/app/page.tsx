// LoginPage.jsx

import HeroPanel from "@/components/HeroPanel/page";
import LoginPanel from "@/components/LoginPanel/page";
import styled from "styled-components";

export default function LoginPage() {
    return (
        <Container>
            <HeroPanel />
            <LoginPanel />
        </Container>
    );
}

const Container = styled.div`
    width: 100%;

    height: 100vh;

    max-height: 100vh;

    display: grid;
    grid-template-columns: 1fr 30rem;

    @media (max-width: 980px) {
        grid-template-columns: 1fr;
    }
`;
