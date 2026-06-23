import styled from "styled-components";

export const Card = styled.div`
    width: 95%;
    height: fit-content;
    padding: 25px;
    background-color: ${({ theme }) => theme.colors.white};
    -webkit-box-shadow: 5px 5px 25px 15px ${({ theme }) => theme.colors.blackTransparent};
    box-shadow: 5px 5px 25px 15px ${({ theme }) => theme.colors.blackTransparent};
    border-radius: 15px;
    margin-top: 5vh;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 5%;
`;

export const CardHeader = styled.div`
    position: relative;
    padding: 0 15px;
    grid-column-start: 1;
    grid-column-end: 3;
`;

export const CardTitle = styled.h1<{ $color: string }>`
    font-size: ${({ theme }) => theme.fontSizes.md};
    color: ${({ theme }) => theme.colors.black};
    font-weight: ${({ theme }) => theme.fontWeights.bolder};

    &:after {
        content: "";
        position: absolute;
        top: 7px;
        left: 0;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: ${({ $color }) => $color};
        display: block;
    }
`;

export const CardSubTitle = styled.h2`
    font-size: ${({ theme }) => theme.fontSizes.xs};
    color: ${({ theme }) => theme.colors.gray};
    font-weight: ${({ theme }) => theme.fontWeights.regular};
`;

export const InputComponent = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex-wrap: wrap;
    margin: 3vh 0;
`;

export const InputComponentUnique = styled(InputComponent)`
    grid-column: 1 / 3;
    width: 100%;

    & > input {
        width: 100%;
    }
`;

export const InputText = styled.p`
    font-size: ${({ theme }) => theme.fontSizes.xs};
    color: ${({ theme }) => theme.colors.black};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    width: 90%;
    padding-left: 2px;
    height: fit-content;

    & > a {
        color: red;
    }
`;

export const Input = styled.input`
    padding: 10px 14px;
    font-size: ${({ theme }) => theme.fontSizes.xs};
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.colors.gray};
    background-color: ${({ theme }) => theme.colors.grayBackground};
    transition: 500ms;
    width: 100%;

    &:focus {
        border: 1px solid ${({ theme }) => theme.colors.greenBackground};
        background-color: ${({ theme }) => theme.colors.white};
        box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.greenBoxShadow} !important;
        outline: none;
    }
`;

export const InputSelect = styled.select`
    padding: 10px 14px;
    font-size: ${({ theme }) => theme.fontSizes.xs};
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.colors.gray};
    background-color: ${({ theme }) => theme.colors.grayBackground};
    transition: 500ms;
    width: 100%;

    &:focus {
        border: 1px solid ${({ theme }) => theme.colors.greenBackground};
        background-color: ${({ theme }) => theme.colors.white};
        box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.greenBoxShadow} !important;
        outline: none;
    }
`;

export const InputDescription = styled.p`
    font-size: ${({ theme }) => theme.fontSizes.xs};
    color: ${({ theme }) => theme.colors.gray};
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    width: 90%;
    padding-left: 2px;
`;

export const DiligenceContainer = styled.div`
    grid-column-start: 1;
    grid-column-end: 3;

    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    border: 1.5px solid #ffcc80;
    background-color: #fff3e0;
    padding: 16px 20px;
    border-radius: 10px;
    margin: 2vh 0;
`;

export const CnesContaier = styled(DiligenceContainer)`
    padding: 5px 20px;
    background-color: ${({ theme }) => theme.colors.grayBackground};
    border: 1px solid ${({ theme }) => theme.colors.grayLight};
`;

export const HistoryContainer = styled(CnesContaier)`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    row-gap: 0;
    padding: 10px 20px;
`;

export const MoneyContainer = styled(DiligenceContainer)`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
`;

export const DiligenceTitle = styled.h3`
    font-size: ${({ theme }) => theme.fontSizes.xs};
    color: #7a3800;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    width: 100%;

    & > a {
        font-size: ${({ theme }) => theme.fontSizes.xxs};
        font-weight: ${({ theme }) => theme.fontWeights.regular};
        color: ${({ theme }) => theme.colors.gray};
        margin-left: 20px;
    }
`;

export const DiligenceItem = styled.span<{ $selected: boolean }>`
    background-color: ${({ $selected }) => ($selected ? "#E65100" : "#fff")};
    border: 1.5px solid ${({ $selected }) => ($selected ? "#E65100" : "#FFCC80")};
    color: ${({ $selected, theme }) => ($selected ? theme.colors.white : theme.colors.black)};
    font-weight: ${({ $selected, theme }) => ($selected ? theme.fontWeights.bold : theme.fontWeights.medium)};

    font-size: ${({ theme }) => theme.fontSizes.xs};

    border-radius: 20px;
    padding: 6px 12px;
    cursor: pointer;
`;

export const DateContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 5%;
    grid-column-start: 1;
    grid-column-end: 3;
    margin: 2vh 0;
`;

export const EstablishmentInfo = styled(DateContainer)`
    display: grid;
    width: 100%;
    max-width: 100%;
    grid-template-columns: 45% 45%;
    column-gap: 10%;
    grid-column-start: 1;
    grid-column-end: 3;
`;

export const LocationInfo = styled(DateContainer)``;

export const TitleDate = styled.h2`
    grid-column-start: 1;
    grid-column-end: 4;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.colors.gray};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
    padding-bottom: 10px;
`;

export const EstablishmentInfoTitle = styled(TitleDate)`
    grid-column-start: 1;
    grid-column-end: 3;
`;

export const LicenseContainer = styled(DiligenceContainer)`
    background-color: ${({ theme }) => theme.colors.white};

    border: none;
    padding: 0;
`;

export const LicenseItem = styled.div<{ $selected: boolean }>`
    background-color: ${({ $selected, theme }) => ($selected ? theme.colors.greenUltraLight : theme.colors.white)};
    border: 1.5px solid ${({ $selected, theme }) => ($selected ? theme.colors.greenBackground : theme.colors.greenUltraLight)};
    color: ${({ $selected, theme }) => ($selected ? theme.colors.white : theme.colors.black)};
    font-weight: ${({ $selected, theme }) => ($selected ? theme.fontWeights.bold : theme.fontWeights.medium)};
    font-size: ${({ theme }) => theme.fontSizes.xs};
    border-radius: 20px;
    padding: 6px 12px;
    cursor: pointer;
`;

export const LicenseItemSelcted = styled.div`
    border: 1px solid ${({ theme }) => theme.colors.greenBackground};
    background-color: ${({ theme }) => theme.colors.greenBackgroundLight};
    color: ${({ theme }) => theme.colors.greenBackground};
    font-size: ${({ theme }) => theme.fontSizes.xs};
    padding: 5px 10px;
    width: 100%;
    border-radius: 10px;

    & > a {
        font-weight: ${({ theme }) => theme.fontWeights.bolder};
    }
`;

export const LicenseTitle = styled.h1`
    font-size: ${({ theme }) => theme.fontSizes.xs};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    width: 100%;

    & > a {
        color: red;
    }
`;

export const LicenseSubTitle = styled.h2`
    font-size: ${({ theme }) => theme.fontSizes.xxs};
    color: ${({ theme }) => theme.colors.gray};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    width: 100%;
`;

export const LicenseItem2 = styled(LicenseItem)<{ $inGroup?: boolean }>`
    opacity: ${({ $inGroup }) => ($inGroup ? 0.4 : 1)};
    pointer-events: ${({ $inGroup }) => ($inGroup ? "none" : "auto")};
    cursor: ${({ $inGroup }) => ($inGroup ? "not-allowed" : "pointer")};
`;

export const GroupCard = styled.div<{ $bg: string; $border: string }>`
    background-color: ${({ $bg }) => $bg};
    border: 1.5px solid ${({ $border }) => $border};
    border-radius: 12px;
    padding: 14px 16px 12px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 6px;
    transition: box-shadow 0.15s, border-color 0.15s;
    box-shadow: 0 1px 4px rgba(0,0,0,0.06);
`;

export const GroupCardBody = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;
`;

export const GroupCardCodes = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    margin-bottom: 2px;
`;

export const GroupCodeChip = styled.span<{ $color: string; $bg: string; $border: string }>`
    font-size: 11px;
    font-weight: 700;
    color: ${({ $color }) => $color};
    background: ${({ $bg }) => $bg};
    border: 1.5px solid ${({ $border }) => $border};
    border-radius: 20px;
    padding: 2px 10px;
    letter-spacing: 0.02em;
`;

export const GroupCardLabel = styled.span`
    font-size: ${({ theme }) => theme.fontSizes.xxs};
    color: ${({ theme }) => theme.colors.gray};
    line-height: 1.4;
`;

export const GroupCardType = styled.span<{ $color: string; $bg: string }>`
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 10px;
    color: ${({ $color }) => $color};
    background: ${({ $bg }) => $bg};
    border-radius: 20px;
    padding: 2px 8px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    width: fit-content;
`;

export const GroupCardFooter = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    border-top: 1px solid rgba(0,0,0,0.07);
    padding-top: 8px;
    margin-top: 2px;
`;

export const GroupLinkButton = styled.button<{ $active: boolean; $color: string }>`
    font-size: 11px;
    padding: 4px 12px;
    border-radius: 20px;
    border: 1.5px solid ${({ $color }) => $color};
    background: ${({ $active, $color }) => ($active ? $color : "transparent")};
    color: ${({ $active, $color }) => ($active ? "#fff" : $color)};
    cursor: pointer;
    font-weight: 600;
    white-space: nowrap;
    transition: background 0.15s, color 0.15s;
    &:hover { opacity: 0.85; }
`;

export const GroupRemoveButton = styled.button`
    border: none;
    background: transparent;
    cursor: pointer;
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.gray};
    padding: 2px 6px;
    border-radius: 4px;
    flex-shrink: 0;
    transition: background 0.15s;

    &:hover {
        background: rgba(0, 0, 0, 0.08);
    }
`;

/* Conjunta card compacto (ao lado do grupo) */
export const ConjuntaLinkedCard = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    background: #EBF5FF;
    border: 1.5px solid #1565C0;
    border-radius: 10px;
    padding: 10px 14px;
    flex: 1;
    min-width: 0;
    box-shadow: 0 1px 4px rgba(21,101,192,0.08);
`;

export const ConjuntaLinkedName = styled.span`
    font-size: 13px;
    font-weight: 700;
    color: #1565C0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const ConjuntaLinkedCnes = styled.span`
    font-size: 11px;
    color: #1565C0;
    background: #BBDEFB;
    border-radius: 10px;
    padding: 1px 8px;
    font-weight: 600;
    white-space: nowrap;
`;

export const AddGroupButton = styled.button<{ $disabled?: boolean }>`
    margin-top: 10px;
    width: fit-content;
    padding: 5px 14px;
    border-radius: 8px;
    border: 1.5px dashed ${({ theme, $disabled }) => ($disabled ? theme.colors.gray : theme.colors.greenBackground)};
    background: ${({ theme, $disabled }) => ($disabled ? theme.colors.grayBackground : theme.colors.greenBackgroundLight)};
    color: ${({ theme, $disabled }) => ($disabled ? theme.colors.gray : theme.colors.greenBackground)};
    font-size: ${({ theme }) => theme.fontSizes.xxs};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
    transition:
        background 0.15s,
        border-color 0.15s,
        color 0.15s;

    &:hover:not([disabled]) {
        background: ${({ theme }) => theme.colors.greenBackground};
        border-color: ${({ theme }) => theme.colors.greenBackground};
        color: ${({ theme }) => theme.colors.white};
    }
`;

export const HistoryAdd = styled.button`
    background-color: ${({ theme }) => theme.colors.greenBackgroundLight};
    border: 1px dashed ${({ theme }) => theme.colors.greenBackground};
    padding: 10px 10%;
    border-radius: 10px;
    width: fit-content;
    margin: auto;
    grid-column-start: 1;
    grid-column-end: 3;
`;
/* ── Habilitação Conjunta ───────────────────────────────────── */

export const JointSearchRow = styled.div`
    display: flex;
    gap: 10px;
    grid-column: 1 / 3;
    align-items: flex-end;
    margin: 2vh 0 0;
`;

export const JointSearchInput = styled(Input)`
    flex: 1;
`;

export const JointSearchButton = styled.button`
    padding: 10px 18px;
    border-radius: 8px;
    border: none;
    background: ${({ theme }) => theme.colors.greenBackground};
    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.fontSizes.xs};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    cursor: pointer;
    white-space: nowrap;
    transition: opacity 0.15s;

    &:hover:not(:disabled) {
        opacity: 0.85;
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

export const JointResultCard = styled.div`
    grid-column: 1 / 3;
    border: 1.5px solid ${({ theme }) => theme.colors.grayLight};
    border-radius: 10px;
    padding: 14px 18px;
    background: ${({ theme }) => theme.colors.grayBackground};
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-top: 10px;
`;

export const JointResultInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3px;
    flex: 1;
    min-width: 0;
`;

export const JointResultName = styled.span`
    font-size: ${({ theme }) => theme.fontSizes.xs};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.black};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const JointResultMeta = styled.span`
    font-size: ${({ theme }) => theme.fontSizes.xxs};
    color: ${({ theme }) => theme.colors.gray};
`;

export const JointResultCodes = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    margin-top: 4px;
`;

export const JointCodeChip = styled.span`
    background: ${({ theme }) => theme.colors.greenBackgroundLight};
    border: 1px solid ${({ theme }) => theme.colors.greenBackground};
    color: ${({ theme }) => theme.colors.greenBackground};
    font-size: ${({ theme }) => theme.fontSizes.xxs};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    border-radius: 12px;
    padding: 2px 8px;
`;

export const JointAddButton = styled.button`
    padding: 8px 16px;
    border-radius: 8px;
    border: none;
    background: ${({ theme }) => theme.colors.greenBackground};
    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.fontSizes.xxs};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    cursor: pointer;
    white-space: nowrap;
    flex-shrink: 0;
    transition: opacity 0.15s;

    &:hover:not(:disabled) {
        opacity: 0.85;
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

export const JointList = styled.div`
    grid-column: 1 / 3;
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 14px;
`;

export const JointListItem = styled.div`
    border: 1.5px solid ${({ theme }) => theme.colors.greenBackground};
    background: ${({ theme }) => theme.colors.greenBackgroundLight};
    border-radius: 10px;
    padding: 12px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
`;

export const JointListItemInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3px;
    flex: 1;
    min-width: 0;
`;

/* ── Hab × CNES Link Card ─────────────────────────────────── */

export const HabCnesCard = styled.div`
    width: 95%;
    height: fit-content;
    padding: 25px;
    background-color: ${({ theme }) => theme.colors.white};
    box-shadow: 5px 5px 25px 15px ${({ theme }) => theme.colors.blackTransparent};
    border-radius: 15px;
    margin-top: 5vh;
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const HabCnesRow = styled.div`
    border: 1.5px solid #E1BEE7;
    border-radius: 12px;
    padding: 14px 18px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: #FAF5FF;
`;

export const HabCnesRowHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const HabCnesBadge = styled.span`
    font-size: 11px;
    font-weight: 700;
    color: #6A1B9A;
    background: #E1BEE7;
    border-radius: 20px;
    padding: 3px 10px;
    white-space: nowrap;
`;

export const HabCnesName = styled.span`
    font-size: 13px;
    font-weight: 600;
    color: #333;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const HabCnesChips = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    align-items: center;
`;

export const HabCnesChip = styled.span`
    display: inline-flex;
    align-items: center;
    gap: 5px;
    background: #6A1B9A;
    color: #fff;
    font-size: 12px;
    font-weight: 700;
    border-radius: 20px;
    padding: 4px 10px;
`;

export const HabCnesChipRemove = styled.button`
    background: rgba(255,255,255,0.25);
    border: none;
    color: #fff;
    cursor: pointer;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    line-height: 1;
    padding: 0;
    transition: background 0.15s;

    &:hover {
        background: rgba(255,255,255,0.45);
    }
`;

export const HabCnesAddButton = styled.button`
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 12px;
    border-radius: 20px;
    border: 1.5px dashed #9C27B0;
    background: transparent;
    color: #9C27B0;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.15s;

    &:hover {
        background: rgba(156,39,176,0.08);
    }
`;

export const HabCnesDropdown = styled.div`
    position: relative;
    display: inline-block;
`;

export const HabCnesDropdownMenu = styled.div`
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    background: #fff;
    border: 1.5px solid #CE93D8;
    border-radius: 10px;
    box-shadow: 0 4px 16px rgba(106,27,154,0.12);
    z-index: 100;
    min-width: 180px;
    padding: 6px 0;
    display: flex;
    flex-direction: column;
`;

export const HabCnesDropdownItem = styled.button`
    padding: 8px 14px;
    border: none;
    background: transparent;
    text-align: left;
    font-size: 12px;
    font-weight: 600;
    color: #6A1B9A;
    cursor: pointer;
    transition: background 0.12s;

    &:hover {
        background: #F3E5F5;
    }
`;

export const HabCnesEmpty = styled.p`
    font-size: 13px;
    color: ${({ theme }) => theme.colors.gray};
    font-style: italic;
    padding: 4px 0;
`;

/* ── Multi-Establishment Tabs ─────────────────────────────── */

export const EstabTabBar = styled.div`
    grid-column: 1 / 3;
    display: flex;
    align-items: flex-end;
    gap: 4px;
    border-bottom: 2px solid ${({ theme }) => theme.colors.grayLight};
    margin-bottom: 18px;
    overflow-x: auto;
    padding-bottom: 0;
    scrollbar-width: none;
    &::-webkit-scrollbar { display: none; }
`;

export const EstabTabButton = styled.button<{ $active: boolean }>`
    padding: 8px 18px;
    border: 1.5px solid ${({ $active, theme }) => ($active ? "#6A1B9A" : theme.colors.grayLight)};
    border-bottom: ${({ $active }) => ($active ? "2px solid #fff" : "none")};
    background: ${({ $active }) => ($active ? "#fff" : "transparent")};
    color: ${({ $active }) => ($active ? "#6A1B9A" : "#888")};
    font-size: 12px;
    font-weight: ${({ $active }) => ($active ? "700" : "500")};
    border-radius: 8px 8px 0 0;
    cursor: pointer;
    white-space: nowrap;
    position: relative;
    bottom: -2px;
    transition: background 0.15s, color 0.15s;
    display: flex;
    align-items: center;
    gap: 6px;

    &:hover:not([data-active="true"]) {
        background: rgba(106, 27, 154, 0.05);
        color: #6A1B9A;
    }
`;

export const EstabTabClose = styled.span`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    font-size: 11px;
    line-height: 1;
    color: #aaa;
    transition: background 0.15s, color 0.15s;

    &:hover {
        background: rgba(0,0,0,0.1);
        color: #333;
    }
`;

export const EstabTabAddBtn = styled.button`
    padding: 6px 12px;
    border: 1.5px dashed #6A1B9A;
    background: transparent;
    color: #6A1B9A;
    font-size: 18px;
    font-weight: 400;
    border-radius: 8px 8px 0 0;
    cursor: pointer;
    position: relative;
    bottom: -2px;
    line-height: 1;
    transition: background 0.15s;

    &:hover {
        background: rgba(106, 27, 154, 0.08);
    }
`;

export const TitleHistory = styled.div`
    grid-column: 1 / -1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    font-weight: 600;
    color: #333;
    padding: 4px 0 8px;

    button {
        background: transparent;
        border: none;
        cursor: pointer;
        color: #C62828;
        font-size: 14px;
        padding: 0 4px;
    }
`;
