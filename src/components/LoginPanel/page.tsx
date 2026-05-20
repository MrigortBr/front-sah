"use client";
import { useAuth } from "@/context/auth/auth.context";
import {
    Container,
    Content,
    Description,
    Eyebrow,
    Field,
    Footer,
    ForgotPassword,
    Form,
    Header,
    Input,
    Links,
    LoginButton,
    ProfileCard,
    ProfileDescription,
    ProfileGrid,
    ProfileIcon,
    ProfileName,
    SectionLabel,
    Title,
    Version,
} from "./styled";
import { MouseEvent, useState } from "react";
import { useAlert } from "@/providers/alert/page";
import { validateLogin } from "@/utils/validateEmail";

export default function LoginPanel() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const { callMessage } = useAlert();

    async function handleLogin(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        const response = validateLogin({ email, password });

        if (!response.valid) {
            if (response.errors.email) callMessage(response.errors.email, "warning");
            else if (response.errors.password) callMessage(response.errors.password, "warning");

            return null;
        }

        const responseLogin = await login(email, password);

        if (!responseLogin.status) callMessage(responseLogin.message, "error");
    }

    return (
        <Container>
            <Content>
                <Header>
                    <Eyebrow>Acesso restrito</Eyebrow>

                    <Title>Entrar no sistema</Title>

                    <Description>Use seu login institucional para acessar o SAH.</Description>
                </Header>

                <Form>
                    <SectionLabel>Perfil de acesso</SectionLabel>

                    <Field>
                        <label>Login</label>

                        <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
                    </Field>

                    <Field>
                        <label>Senha</label>

                        <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="••••••••" />
                    </Field>

                    <ForgotPassword href="#">Esqueceu a senha?</ForgotPassword>

                    <LoginButton type="submit" onClick={handleLogin}>
                        Entrar no sistema
                    </LoginButton>
                </Form>

                <Footer>
                    <Version>SAH v1.0 · 2026</Version>

                    <Links>
                        <a href="#">Suporte</a>
                        <a href="#">Manual</a>
                        <a href="#">Privacidade</a>
                    </Links>
                </Footer>
            </Content>
        </Container>
    );
}
