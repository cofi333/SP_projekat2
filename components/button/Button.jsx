import { ButtonStyled } from "./ButtonStyled"

const Button = (props) => {
  return (
    <ButtonStyled type={props.type}>
        {props.text}
    </ButtonStyled>
  )
}

export default Button
