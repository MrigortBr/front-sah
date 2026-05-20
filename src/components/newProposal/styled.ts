import styled from "styled-components";

export const Container = styled.div`
    background-color: ${({ theme }) => theme.colors.grayBackground};
    height: 81vh;
    max-height: 81vh;
    width: 100vw;
    overflow: hidden;
    display: grid;
    grid-template-columns: 20% 80%;
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
