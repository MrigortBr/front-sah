import styled from "styled-components";

export const InheritOverlay = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

export const InheritCard = styled.div`
    background: #fff;
    border-radius: 12px;
    padding: 32px 28px 24px;
    max-width: 480px;
    width: 90%;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
`;

export const InheritTitle = styled.p`
    font-size: 1rem;
    font-weight: 700;
    color: #1b2a1e;
    margin: 0 0 6px;
`;

export const InheritSubtitle = styled.p`
    font-size: 0.85rem;
    color: #666;
    margin: 0 0 12px;
    line-height: 1.5;
`;

export const InheritCodes = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 20px;
`;

export const InheritCode = styled.span`
    background: #e8f5e9;
    color: #1b5e3b;
    font-size: 0.78rem;
    font-weight: 600;
    padding: 3px 10px;
    border-radius: 20px;
    border: 1px solid #a5d6a7;
`;

export const InheritActions = styled.div`
    display: flex;
    gap: 12px;
    justify-content: flex-end;
`;

export const InheritCancel = styled.button`
    padding: 8px 20px;
    border-radius: 8px;
    border: 1px solid #ccc;
    background: #fff;
    color: #333;
    font-size: 0.88rem;
    cursor: pointer;
    &:hover { background: #f5f5f5; }
`;

export const InheritConfirm = styled.button`
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

export const InheritDivider = styled.hr`
    border: none;
    border-top: 1px solid #e0e0e0;
    margin: 16px 0 12px;
`;

export const InheritViewActiveBtn = styled.button`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 14px;
    border-radius: 8px;
    border: 1px solid #1b5e3b;
    background: #f0faf4;
    color: #1b5e3b;
    font-size: 0.82rem;
    font-weight: 600;
    cursor: pointer;
    margin-bottom: 12px;
    &:hover { background: #e0f2e9; }
`;

export const InheritHistoricoList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    max-height: 160px;
    overflow-y: auto;
    margin-bottom: 16px;
`;

export const InheritHistoricoRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #f7f7fb;
    border-radius: 8px;
    padding: 7px 10px;
    gap: 8px;
`;

export const InheritHistoricoLabel = styled.span`
    font-size: 0.82rem;
    color: #333;
    font-weight: 500;
    flex: 1;
`;

export const InheritHistoricoBtn = styled.button`
    padding: 4px 12px;
    border-radius: 6px;
    border: none;
    background: #3949ab;
    color: #fff;
    font-size: 0.78rem;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
    &:hover { background: #283593; }
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
