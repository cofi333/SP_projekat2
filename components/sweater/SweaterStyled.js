import Image from "next/image";
import styled from "styled-components";

export const SweaterStyled = styled(Image) `
    position: absolute;
    top: 35%;
    left: ${props => props.left-2}%;
    z-index: ${props => props.id};
    width: 13%;
    height: 30%; 
`
export const FoldedSweaterStyled = styled(Image) `

    position: absolute;
    top: ${props => props.top*(-20)}px;
    left: 70px;

    @media only screen and (max-width: 1450px) {
        width: 120px;
    }

    @media only screen and (max-width: 1150px) {
        height: 16px;
        top: ${props => props.top*(-16)}px;
    }

    @media only screen and (max-width: 900px) {
        width: 90px;
        height: 14px;
        top: ${props => props.top*(-14)}px;
        left: 50px;
    }

    @media only screen and (max-width: 650px) {
        width: 70px;
        height: 12px;
        top: ${props => props.top*(-12)}px;
    }

    @media only screen and (max-width: 500px) {
        width: 50px;
        height: 8px;
        top: ${props => props.top*(-8)}px;
        left: 30px;
    }

`
