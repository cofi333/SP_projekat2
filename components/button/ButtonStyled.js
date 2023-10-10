import styled from "styled-components";

export const ButtonStyled = styled.button `

    border: none;
    cursor: pointer;
    background-color: ${props => props.type === 'reset' ? '#f00' : '#1a6999'};
    color: #fff;
    padding: 5px 25px;
    font-size: ${props => props.type === 'reset' ? '20px' : '26px'};
    border: 3px solid #fff;
    border-radius: 15px;


    @media only screen and (max-width: 900px) {
        font-size: ${props => props.type === 'reset' ? '16px' : '22px'};
    }

    @media only screen and (max-width: 600px) {
        font-size: 14px;
        border: 2px solid #fff;
        padding: 5px 15px;
    }

`