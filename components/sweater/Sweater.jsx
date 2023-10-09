'use client'
import Image from "next/image"
import styled from "styled-components"
import { useDrag } from "react-dnd"

const Sweater = (props) => {

  const [{isDragging}, drag] = useDrag(() => ( {
    type: 'image',
    item: {id: props.id}
  }))

  return (
    props.img2 == null ?
    <SweaterStyled src={props.img} alt={`sweater ${props.id}`} width={234} height={189} id={props.id} ref={drag}/>
    :
    <SweaterStyled src={props.img2} alt={`sweater ${props.id}`} width={150} height={20} id={props.id} ref={drag}/> 
  )
}

const SweaterStyled = styled(Image) `
  position: absolute;
`

export default Sweater
