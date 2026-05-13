import styled from "styled-components";

export const Container = styled.section`
    width: 100%;
    min-height: 100vh;

    background: white;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 3rem 2rem;

    position: relative;

    &::before {
        content: "";

        position: absolute;
        left: 0;
        top: 0;

        width: 0.3rem;
        height: 100%;

        background: linear-gradient(180deg, #ffcd00, #3da06a);
    }
`;

export const Content = styled.div`
    width: 100%;
    max-width: 24rem;
`;

export const Header = styled.div`
    margin-bottom: 2rem;
`;

export const Eyebrow = styled.p`
    font-size: 0.7rem;
    font-weight: 700;

    letter-spacing: 0.15em;
    text-transform: uppercase;

    color: #2e7d52;

    margin-bottom: 0.6rem;
`;

export const Title = styled.h2`
    font-size: 2rem;
    font-weight: 700;

    color: #1a2e20;

    margin-bottom: 0.5rem;
`;

export const Description = styled.p`
    color: #6b7b6e;

    font-size: 0.9rem;
    line-height: 1.7;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

export const SectionLabel = styled.p`
    font-size: 0.8rem;
    font-weight: 600;

    margin-bottom: 1rem;

    color: #1a2e20;
`;

export const ProfileGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;

    gap: 0.8rem;

    margin-bottom: 2rem;
`;

export const ProfileCard = styled.div<{ $active: boolean }>`
    padding: 1rem;

    border-radius: 0.8rem;

    border: 1.5px solid ${({ $active }) => ($active ? "#2E7D52" : "#E4EBE6")};

    background: ${({ $active }) => ($active ? "#EAF4EF" : "#F4F6F4")};

    cursor: pointer;

    transition: 0.2s;

    display: flex;
    align-items: center;
    gap: 0.8rem;

    &:hover {
        border-color: #2e7d52;
    }
`;

export const ProfileIcon = styled.div`
    width: 2.5rem;
    height: 2.5rem;

    border-radius: 0.7rem;

    background: #1b5e3b;

    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ProfileName = styled.div`
    font-size: 0.82rem;
    font-weight: 700;

    color: #1a2e20;
`;

export const ProfileDescription = styled.div`
    font-size: 0.7rem;

    color: #6b7b6e;
`;

export const Field = styled.div`
    display: flex;
    flex-direction: column;

    gap: 0.5rem;

    margin-bottom: 1.2rem;

    label {
        font-size: 0.8rem;
        font-weight: 600;

        color: #1a2e20;
    }
`;

export const Input = styled.input`
    width: 100%;

    padding: 0.9rem 1rem;

    border-radius: 0.7rem;

    border: 1.5px solid #e4ebe6;

    background: #f4f6f4;

    outline: none;

    transition: 0.2s;

    &:focus {
        border-color: #2e7d52;
        background: white;
    }
`;

export const ForgotPassword = styled.a`
    width: fit-content;

    margin-left: auto;
    margin-bottom: 1.5rem;

    color: #2e7d52;

    font-size: 0.8rem;

    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

export const LoginButton = styled.button`
    width: 100%;

    height: 3.2rem;

    border: none;
    border-radius: 0.8rem;

    background: #1b5e3b;

    color: white;

    font-size: 0.9rem;
    font-weight: 700;

    cursor: pointer;

    transition: 0.2s;

    &:hover {
        background: #2e7d52;
        transform: translateY(-1px);
    }
`;

export const Footer = styled.div`
    margin-top: 2rem;

    padding-top: 1.2rem;

    border-top: 1px solid #e4ebe6;

    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 1rem;

    flex-wrap: wrap;
`;

export const Version = styled.span`
    font-size: 0.7rem;

    color: #a0aca4;
`;

export const Links = styled.div`
    display: flex;
    gap: 1rem;

    a {
        color: #6b7b6e;

        font-size: 0.72rem;

        text-decoration: none;

        &:hover {
            color: #1b5e3b;
        }
    }
`;
