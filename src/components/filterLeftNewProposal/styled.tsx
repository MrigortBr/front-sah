import styled from "styled-components";

export const Container = styled.aside`
    width: 18vw;
    min-width: 240px;
    height: 81vh;
    max-height: 81vh;

    background: ${({ theme }) => theme.colors.white};

    display: flex;
    flex-direction: column;

    -webkit-box-shadow: 5px 0px 22px 5px ${({ theme }) => theme.colors.grayLight};
    box-shadow: 5px 0px 22px 5px ${({ theme }) => theme.colors.grayLight};

    @media (max-width: 768px) {
        display: none;
    }
`;

export const Section = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5vh;
`;

export const Title = styled.h3`
    font-size: ${({ theme }) => theme.fontSizes.xs};
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    text-transform: uppercase;
    letter-spacing: 0.12em;
    padding-left: 10px;

    color: ${({ theme }) => theme.colors.gray};
`;

export const SubTitle = styled(Title)`
    font-size: ${({ theme }) => theme.fontSizes.xxs};
    font-weight: ${({ theme }) => theme.fontWeights.bolder};
    color: ${({ theme }) => theme.colors.greenDark};
`;

export const Menu = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5vh;
`;

export const Back = styled.button``;

export const TitleRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
    padding: 15% 10% 10% 2%;
`;

export const ItemList = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    height: 70%;
    padding: 5% 0;
`;

export const Item = styled.div<{ $selected: boolean }>`
    display: grid;
    width: calc(100% - 25px);
    padding: 5px;
    margin-left: 12.5px;
    grid-template-columns: 35px calc(100% - 35px);
    grid-template-rows: 50% 50%;
    border-radius: 10px;
    transition: 500ms;
    cursor: pointer;

    background-color: ${({ $selected, theme }) => ($selected ? theme.colors.greenBackgroundLight : "transparent")};

    border: 1px solid ${({ $selected, theme }) => ($selected ? theme.colors.greenBackgroundLight : theme.colors.greenBackgroundLight)};
`;

export const Marker = styled.div<{ $selected: boolean }>`
    width: 25px;
    height: 25px;
    align-items: center;
    justify-content: center;
    display: flex;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    transition: 500ms;
    border-radius: 50%;
    margin: auto;
    grid-column-start: 1;
    grid-row-start: 1;
    grid-row-end: 3;

    background-color: ${({ $selected, theme }) => ($selected ? theme.colors.greenBackground : "transparent")};
    color: ${({ $selected, theme }) => ($selected ? theme.colors.white : theme.colors.greenBackground)};
    border: 1px solid ${({ $selected, theme }) => ($selected ? theme.colors.greenBackgroundLight : theme.colors.greenBackgroundLight)};
`;

export const TitleList = styled.h1`
    font-size: ${({ theme }) => theme.fontSizes.xs};
    font-weight: ${({ theme }) => theme.fontWeights.bolder};
    color: ${({ theme }) => theme.colors.greenLight};
`;

export const Description = styled.h2`
    font-size: ${({ theme }) => theme.fontSizes.xxs};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    color: ${({ theme }) => theme.colors.gray};
`;
