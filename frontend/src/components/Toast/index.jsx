import React from "react";

import styled, { keyframes } from "styled-components";

const PushDown = keyframes`
    0% {
        top: -50px;
        opacity: 0;
    }

    100% {
        top: 15px;
        opacity: 1;
    }
`

const Container = styled.span`
    background: beige;
    color: black;
    position: absolute;
    top: 0;
    padding: .5rem 2rem;
    cursor: pointer;
    animation-delay: 3s;
    animation: ${PushDown} .4s ease-out forwards;
`

const Toast = ({text}) => {

    const Close = (e) => {
        e.currentTarget.style.display = "none";
    }

    return <Container onClick={Close} >{text}</Container>
}

export default Toast;
