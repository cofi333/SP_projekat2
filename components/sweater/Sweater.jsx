'use client'
import { useDrag } from "react-dnd"
import { SweaterStyled, FoldedSweaterStyled } from "./SweaterStyled"

const Sweater = (props) => {

  const [{isDragging}, drag] = useDrag(() => ( {
    type: 'image',
    item: {id: props.id}
  }))

  return (
    props.img2 == null ?
    <SweaterStyled src={props.img} alt={`sweater ${props.id}`} left={props.id*7} width={234} height={189} id={props.id} ref={drag}/>
    :
    <FoldedSweaterStyled src={props.img2} alt={`sweater ${props.id}`} width={150} height={20} id={props.id} ref={drag} top={props.top}/> 
  )
}



export default Sweater
