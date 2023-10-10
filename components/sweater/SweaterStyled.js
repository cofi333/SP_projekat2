import Image from "next/image";
import styled from "styled-components";

export const SweaterStyled = styled(Image) `
    position: absolute;
    top: 35%;
    left: ${props => props.left-2}%;
    z-index: ${props => props.id};

    @media only screen and (max-width: 1600px) {
        left: ${props => props.left-4}%;
    }

    @media only screen and (max-width: 1400px) {
        width: 200px;
        height: 160px;
    }

    @media only screen and (max-width: 1000px) {
        width: 140px;
        height: 120px;
    }

    @media only screen and (max-width: 745px) {
        width: 100px;
        height: 85px;
    }

    @media only screen and (max-width: 545px) {
        width: 80px;
        height: 65px;
    }

    @media only screen and (max-width: 445px) {
        width: 50px;
        height: 40px;
        left: ${props => props.left-3}%;
    }

    
`
export const FoldedSweaterStyled = styled(Image) `

    position: absolute;
    top: ${props => props.top*(-20)}px;
    left: 70px;

    @media only screen and (max-width: 1450px) {
        width: 120px;
        height: 20px;
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
