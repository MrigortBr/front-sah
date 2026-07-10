import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    height: 100%;
    overflow: hidden;
    background: ${({ theme }) => theme.colors.grayLight};
`;

export const Sidebar = styled.aside`
    width: 240px;
    min-width: 240px;
    background: #fff;
    border-right: 1px solid #e0e0e0;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    padding: 16px 0;

    @media (max-width: 768px) {
        display: none;
    }
`;

export const SidebarTitle = styled.h2`
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: ${({ theme }) => theme.colors.gray};
    padding: 0 16px 8px;
    margin: 0;
`;

export const SidebarSection = styled.div`
    padding: 8px 0 16px;
    border-bottom: 1px solid #f0f0f0;

    &:last-child {
        border-bottom: none;
    }
`;

export const SidebarLabel = styled.p`
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: ${({ theme }) => theme.colors.gray};
    padding: 0 16px 6px;
    margin: 0;
`;

export const FilterItem = styled.button<{ $active: boolean }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 6px 16px;
    border: none;
    background: ${({ $active, theme }) => ($active ? theme.colors.greenBackgroundLight : "transparent")};
    color: ${({ $active, theme }) => ($active ? theme.colors.greenDark : theme.colors.gray)};
    font-weight: ${({ $active }) => ($active ? 600 : 400)};
    font-size: 0.8rem;
    cursor: pointer;
    text-align: left;
    border-left: 3px solid ${({ $active, theme }) => ($active ? theme.colors.greenBackground : "transparent")};
    transition: background 0.15s;

    &:hover {
        background: ${({ theme }) => theme.colors.greenBackgroundLight};
    }
`;

export const FilterCount = styled.span`
    font-size: 0.7rem;
    color: ${({ theme }) => theme.colors.gray};
    background: ${({ theme }) => theme.colors.grayUltraLight};
    border-radius: 10px;
    padding: 1px 7px;
    flex-shrink: 0;
`;

export const Main = styled.main`
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

export const TopBar = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 20px;
    background: #fff;
    border-bottom: 1px solid #e0e0e0;
    flex-wrap: wrap;
`;

export const PageTitle = styled.h1`
    font-size: 1rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.greenDark};
    margin: 0;
    font-family: ${({ theme }) => theme.fonts.primary};
`;

export const KpiChip = styled.div<{ $color?: string; $bg?: string }>`
    display: flex;
    align-items: center;
    gap: 6px;
    background: ${({ $bg }) => $bg ?? "#e8f5e9"};
    color: ${({ $color }) => $color ?? "#1b5e3b"};
    border-radius: 20px;
    padding: 4px 12px;
    font-size: 0.78rem;
    font-weight: 600;
    white-space: nowrap;
`;

export const BackButton = styled.button`
    display: flex;
    align-items: center;
    gap: 6px;
    background: ${({ theme }) => theme.colors.grayUltraLight};
    color: ${({ theme }) => theme.colors.greenDark};
    border: none;
    border-radius: 8px;
    padding: 6px 12px;
    font-size: 0.82rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.15s;

    &:hover {
        background: ${({ theme }) => theme.colors.greenBackgroundLight};
    }
`;

export const MapArea = styled.div`
    flex: 1;
    position: relative;
    overflow: hidden;
`;

export const LoadingOverlay = styled.div`
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.7);
    z-index: 10;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.gray};
    gap: 10px;
`;

export const Tooltip = styled.div`
    position: fixed;
    background: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    padding: 10px 14px;
    pointer-events: none;
    z-index: 999;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
    min-width: 160px;
`;

export const TooltipTitle = styled.p`
    font-size: 0.82rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.greenDark};
    margin: 0 0 4px;
`;

export const TooltipRow = styled.p`
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.gray};
    margin: 0;
    display: flex;
    justify-content: space-between;
    gap: 12px;
`;

export const TooltipValue = styled.span`
    font-weight: 600;
    color: ${({ theme }) => theme.colors.greenBackground};
`;

export const LegendBar = styled.div`
    position: absolute;
    bottom: 20px;
    right: 20px;
    background: rgba(255, 255, 255, 0.92);
    border-radius: 10px;
    padding: 10px 14px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-size: 0.72rem;
    color: ${({ theme }) => theme.colors.gray};
`;

export const LegendGradient = styled.div`
    width: 120px;
    height: 10px;
    border-radius: 5px;
    background: linear-gradient(to right, #c8e6d4, #1b5e3b);
`;

export const LegendEnds = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 0.68rem;
`;

export const ZoomControls = styled.div`
    position: absolute;
    bottom: 20px;
    left: 20px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    z-index: 10;
`;

export const ZoomButton = styled.button`
    width: 34px;
    height: 34px;
    border: 1px solid #d0d0d0;
    background: rgba(255, 255, 255, 0.95);
    color: ${({ theme }) => theme.colors.greenDark};
    font-size: 1.2rem;
    font-weight: 600;
    cursor: pointer;
    border-radius: 7px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: background 0.15s;
    line-height: 1;

    &:hover  { background: ${({ theme }) => theme.colors.greenBackgroundLight}; }
    &:active { background: ${({ theme }) => theme.colors.greenBackground}; color: #fff; }
`;

export const FilterSearch = styled.input`
    margin: 0 16px 6px;
    padding: 5px 10px;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    font-size: 0.78rem;
    color: ${({ theme }) => theme.colors.greenDark};
    outline: none;
    width: calc(100% - 32px);

    &:focus { border-color: ${({ theme }) => theme.colors.greenBackground}; }
    &::placeholder { color: #aaa; }
`;

export const FilterGroupHeader = styled.button`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 5px 16px;
    border: none;
    background: ${({ theme }) => theme.colors.grayUltraLight};
    color: ${({ theme }) => theme.colors.greenDark};
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    cursor: pointer;
    text-align: left;

    &:hover { background: ${({ theme }) => theme.colors.greenBackgroundLight}; }
`;

export const FilterGroupChevron = styled.span<{ $open: boolean }>`
    display: inline-block;
    transform: rotate(${({ $open }) => ($open ? "90deg" : "0deg")});
    transition: transform 0.2s;
    font-style: normal;
`;

// ─── Right-click modal ────────────────────────────────────────────────────────
export const ModalOverlay = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.35);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ModalCard = styled.div`
    background: #fff;
    border-radius: 14px;
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.2);
    width: min(560px, 92vw);
    max-height: 80vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

export const ModalHeader = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 18px 20px 14px;
    border-bottom: 1px solid #f0f0f0;
    gap: 12px;
`;

export const ModalTitleBlock = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
`;

export const ModalTitle = styled.h2`
    margin: 0;
    font-size: 1rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.greenDark};
`;

export const ModalSubtitle = styled.p`
    margin: 0;
    font-size: 0.78rem;
    color: ${({ theme }) => theme.colors.gray};
`;

export const ModalClose = styled.button`
    background: none;
    border: none;
    font-size: 1.3rem;
    color: ${({ theme }) => theme.colors.gray};
    cursor: pointer;
    padding: 0 2px;
    line-height: 1;
    flex-shrink: 0;

    &:hover { color: ${({ theme }) => theme.colors.greenDark}; }
`;

export const ModalList = styled.div`
    overflow-y: auto;
    flex: 1;
    padding: 8px 0;
`;

export const ModalItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 10px 20px;
    border-bottom: 1px solid #f5f5f5;

    &:last-child { border-bottom: none; }
    &:hover { background: ${({ theme }) => theme.colors.grayUltraLight}; }
`;

export const ModalItemInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3px;
    min-width: 0;
`;

export const ModalItemName = styled.span`
    font-size: 0.82rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.greenDark};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const ModalItemMeta = styled.span`
    font-size: 0.72rem;
    color: ${({ theme }) => theme.colors.gray};
`;

export const ModalBadge = styled.span<{ $color: string; $bg: string }>`
    display: inline-block;
    padding: 1px 7px;
    border-radius: 10px;
    font-size: 0.67rem;
    font-weight: 600;
    background: ${({ $bg }) => $bg};
    color: ${({ $color }) => $color};
    white-space: nowrap;
    flex-shrink: 0;
`;

export const ModalBtn = styled.button`
    flex-shrink: 0;
    padding: 5px 14px;
    border: none;
    border-radius: 7px;
    background: ${({ theme }) => theme.colors.greenBackground};
    color: #fff;
    font-size: 0.75rem;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.15s;

    &:hover { opacity: 0.85; }
`;

export const ModalEmpty = styled.p`
    text-align: center;
    padding: 32px 20px;
    font-size: 0.85rem;
    color: ${({ theme }) => theme.colors.gray};
`;

export const SidebarSectionHeader = styled.button`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 16px 8px;
    border: none;
    background: transparent;
    cursor: pointer;
    text-align: left;
`;

export const SidebarSectionChevron = styled.span<{ $open: boolean }>`
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.gray};
    display: inline-block;
    transform: rotate(${({ $open }) => ($open ? "90deg" : "0deg")});
    transition: transform 0.2s;
`;
