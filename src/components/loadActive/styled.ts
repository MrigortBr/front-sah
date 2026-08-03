import styled from "styled-components";

export const ConfirmOverlay = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

export const ConfirmCard = styled.div`
    background: #fff;
    border-radius: 12px;
    padding: 32px 28px 24px;
    max-width: 440px;
    width: 90%;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
`;

export const ConfirmTitle = styled.p`
    font-size: 1rem;
    font-weight: 700;
    color: #1b2a1e;
    margin: 0 0 8px;
`;

export const ConfirmText = styled.p`
    font-size: 0.88rem;
    color: #555;
    margin: 0 0 24px;
    line-height: 1.5;
`;

export const ConfirmActions = styled.div`
    display: flex;
    gap: 12px;
    justify-content: flex-end;
`;

export const ConfirmCancel = styled.button`
    padding: 8px 20px;
    border-radius: 8px;
    border: 1px solid #ccc;
    background: #fff;
    color: #333;
    font-size: 0.88rem;
    cursor: pointer;
    &:hover { background: #f5f5f5; }
`;

export const ConfirmProceed = styled.button`
    padding: 8px 20px;
    border-radius: 8px;
    border: none;
    background: #1b5e3b;
    color: #fff;
    font-size: 0.88rem;
    font-weight: 600;
    cursor: pointer;
    &:hover { background: #145030; }
`;

export const Container = styled.div`
    background-color: ${({ theme }) => theme.colors.grayBackground};
    height: 81vh;
    max-height: 81vh;
    width: 100vw;
    overflow: hidden;
    display: grid;
    grid-template-columns: 20% 80%;

    @media (max-width: 768px) {
        display: flex;
    }
`;

export const Questions = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 81vh;
    max-height: 81vh;
    padding-bottom: 10vh;
    overflow-y: auto;
    align-item: center;
    justify-content: center;
`;
