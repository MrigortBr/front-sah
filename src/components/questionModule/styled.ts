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
export const TitleHistory = styled.div`
    grid-column-start: 1;
    grid-column-end: 3;
    font-weight: ${({ theme }) => theme.fontWeights.bold};

    font-size: ${({ theme }) => theme.fontSizes.md};
    margin-bottom: 0;
    display: flex;

    & > button {
        border: 0;
        cursor: pointer;
        margin-left: auto;
        transition: 500ms;
        font-size: ${({ theme }) => theme.fontSizes.md};
    }

    & > button:hover {
        color: red;
    }

    & > button:focus {
        outline: 0;
    }
`;
