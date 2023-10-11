import { ButtonStyled } from "./ButtonStyled"

const Button = (props) => {
  return (
    <ButtonStyled type={props.type} onClick={props.onClick}>
        {props.text}
    </ButtonStyled>
  )
}

export default Button
