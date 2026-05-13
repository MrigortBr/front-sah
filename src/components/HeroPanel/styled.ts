import styled, { keyframes } from "styled-components";

export const Container = styled.section`
    position: relative;

    width: 100%;
    min-height: 100vh;

    padding: 3rem;

    overflow: hidden;

    background: #1b5e3b;

    display: flex;

    &::after {
        content: "";
        position: absolute;
        bottom: -120px;
        right: -120px;
        width: 420px;
        height: 420px;
        border: 60px solid rgba(255, 255, 255, 0.04);
        border-radius: 50%;
        pointer-events: none;
    }
`;

export const Content = styled.div`
    position: relative;
    z-index: 2;

    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const DotsGrid = styled.div`
    position: absolute;
    inset: 0;

    background-image: radial-gradient(circle, rgba(255, 255, 255, 0.12) 1px, transparent 1px);

    background-size: 1.75rem 1.75rem;
`;

export const Top = styled.div`
    display: flex;
    flex-direction: column;
`;

export const GovBar = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;

    margin-bottom: 4rem;
`;

export const GovLogo = styled.div`
    width: 2.8rem;
    height: 2.8rem;

    border-radius: 0.5rem;

    background: #ffcd00;

    display: flex;
    align-items: center;
    justify-content: center;

    color: #1b5e3b;

    font-size: 1.1rem;
    font-weight: 700;
`;

export const GovText = styled.div`
    display: flex;
    flex-direction: column;

    strong {
        color: rgba(255, 255, 255, 0.95);
        font-size: 0.75rem;
    }

    span {
        color: rgba(255, 255, 255, 0.7);
        font-size: 0.7rem;
    }
`;
const pulse = keyframes`
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }

  50% {
    opacity: 0.5;
    transform: scale(0.8);
  }
`;

export const HeroLabel = styled.div`
    width: fit-content;

    padding: 0.4rem 0.9rem;
    display: inline-flex;

    align-items: center;
    justify-content: center;
    gap: 10px;

    border-radius: 999px;

    background: rgba(255, 205, 0, 0.18);
    border: 1px solid rgba(255, 205, 0, 0.35);

    color: #ffcd00;

    font-size: 0.72rem;
    font-weight: 600;

    margin-bottom: 1.5rem;

    &::before {
        content: "";

        width: 6px;
        height: 6px;

        border-radius: 50%;

        background: var(--amarelo);

        animation: ${pulse} 2s ease-in-out infinite;
    }
`;

export const HeroTitle = styled.h1`
    font-size: clamp(3rem, 5vw, 5rem);
    line-height: 0.95;

    color: white;

    letter-spacing: -0.08em;

    margin-bottom: 1rem;

    em {
        font-style: normal;
        color: #ffcd00;
    }
`;

export const HeroSub = styled.p`
    max-width: 26rem;

    color: rgba(255, 255, 255, 0.7);

    font-size: 0.95rem;
    line-height: 1.8;
`;

export const Bottom = styled.div`
    width: 100%;
`;

export const StatsRow = styled.div`
    display: flex;
    gap: 2.5rem;

    padding-top: 2rem;

    border-top: 1px solid rgba(255, 255, 255, 0.1);

    flex-wrap: wrap;
`;

export const StatItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
`;

export const StatNumber = styled.div`
    font-size: 2rem;
    font-weight: 700;

    color: white;

    span {
        color: #ffcd00;
    }
`;

export const StatLabel = styled.div`
    color: rgba(255, 255, 255, 0.55);

    font-size: 0.72rem;

    text-transform: uppercase;
`;
