"use client";

import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100vh;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2vh;
    background: #ffffff;
`;

export const ErrorCircle = styled.div`
    width: 12vh;
    height: 12vh;

    border-radius: 50%;
    border: 0.6vh solid #ff4d4f;

    position: relative;
`;

const Line = styled.span`
    width: 7vh;
    height: 0.6vh;

    background: #ff4d4f;

    border-radius: 999px;

    position: absolute;
    top: 50%;
    left: 50%;
`;

export const LineOne = styled(Line)`
    transform: translate(-50%, -50%) rotate(45deg);
`;

export const LineTwo = styled(Line)`
    transform: translate(-50%, -50%) rotate(-45deg);
`;

export const Text = styled.h1`
    font-size: 2.2vh;
    font-weight: 600;

    color: #333333;
`;

export const Button = styled.button`
    padding: 1.2vh 2vh;

    border: none;
    border-radius: 1vh;

    background: #ff4d4f;
    color: white;

    font-size: 1.7vh;
    font-weight: 600;

    cursor: pointer;

    transition: 0.2s;

    &:hover {
        opacity: 0.85;
    }
`;
