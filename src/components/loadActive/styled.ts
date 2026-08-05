import styled from "styled-components";

export const HistoricoBanner = styled.div`
    width: 100%;
    background: #1b5e3b;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 10px 24px;
    font-size: 0.95rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    border-top: 4px solid #FFD600;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    box-sizing: border-box;
`;

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

/* ── Histórico de habilitações (Habilitacao records com situacao=Histórico) ── */

export const HistoricoSection = styled.div`
    width: 95%;
    height: fit-content;
    padding: 25px;
    background-color: #fff;
    -webkit-box-shadow: 5px 5px 25px 15px rgba(0,0,0,0.05);
    box-shadow: 5px 5px 25px 15px rgba(0,0,0,0.05);
    border-radius: 15px;
    margin-top: 5vh;
`;

export const HistoricoSectionTitle = styled.h3`
    font-size: 1rem;
    font-weight: 700;
    color: #4a4a6a;
    margin: 0 0 20px;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 15px;
`;

export const HistoricoRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 14px;
    border-radius: 8px;
    background: #f7f7fb;
    margin-bottom: 8px;
    gap: 12px;
    flex-wrap: wrap;
`;

export const HistoricoInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1;
`;

export const HistoricoLabel = styled.span`
    font-size: 0.78rem;
    color: #888;
    font-weight: 500;
`;

export const HistoricoValue = styled.span`
    font-size: 0.9rem;
    color: #222;
    font-weight: 600;
`;

export const HistoricoCodigosList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
`;

export const HistoricoCodigoBadge = styled.span`
    background: #e8eaf6;
    color: #3949ab;
    border-radius: 6px;
    padding: 2px 8px;
    font-size: 0.78rem;
    font-weight: 600;
`;

export const HistoricoVerBtn = styled.button`
    padding: 6px 16px;
    border-radius: 8px;
    border: none;
    background: #3949ab;
    color: #fff;
    font-size: 0.82rem;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
    &:hover { background: #283593; }
`;

export const HistoricoEmpty = styled.p`
    font-size: 0.88rem;
    color: #aaa;
    margin: 0;
    text-align: center;
    padding: 12px 0;
`;

export const Container = styled.div`
    background-color: ${({ theme }) => theme.colors.grayBackground};
    height: 81vh;
    max-height: 81vh;
    width: 100vw;
    overflow: hidden;
    display: grid;
    grid-template-columns: auto 1fr;

    @media (max-width: 768px) {
        display: flex;
    }
`;

/* Wraps banner + scroll area so the banner sits outside the scroll container */
export const ContentArea = styled.div`
    display: flex;
    flex-direction: column;
    height: 81vh;
    max-height: 81vh;
    overflow: hidden;
`;

export const Questions = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    flex: 1;
    min-height: 0;
    padding-bottom: 10vh;
    overflow-y: auto;
    align-item: center;
    justify-content: center;
`;
