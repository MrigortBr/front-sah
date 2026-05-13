"use client";
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
import { useState } from "react";

export default function LoginPanel() {
    const [profileAcess, setProfileAcess] = useState(true);

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

                    <ProfileGrid>
                        <ProfileCard $active={profileAcess} onClick={() => setProfileAcess((o) => !o)}>
                            <ProfileIcon>🔬</ProfileIcon>

                            <div>
                                <ProfileName>Técnico</ProfileName>
                                <ProfileDescription>DECAN / MS</ProfileDescription>
                            </div>
                        </ProfileCard>

                        <ProfileCard $active={!profileAcess} onClick={() => setProfileAcess((o) => !o)}>
                            <ProfileIcon>📋</ProfileIcon>

                            <div>
                                <ProfileName>Consulta</ProfileName>
                                <ProfileDescription>Somente leitura</ProfileDescription>
                            </div>
                        </ProfileCard>
                    </ProfileGrid>

                    <Field>
                        <label>Login</label>

                        <Input placeholder="usuario.nome" />
                    </Field>

                    <Field>
                        <label>Senha</label>

                        <Input type="password" placeholder="••••••••" />
                    </Field>

                    <ForgotPassword href="#">Esqueceu a senha?</ForgotPassword>

                    <LoginButton type="submit">Entrar no sistema</LoginButton>
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
