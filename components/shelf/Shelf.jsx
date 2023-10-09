'use client'
import Image from "next/image"
import { useState } from "react"
import './shelf.scss'
import { useDrop } from "react-dnd"
import { sweaters } from "../../constants"
import { Sweater } from "@/components"
import styled from "styled-components"

const Shelf = (props) => {

  const [countSweaters, setCountSweaters] = useState(0);
  const [sweatersList, setSweaters] = useState([])

  const [{isOver},drop] = useDrop(() => ({
    accept: 'image',
    drop: (item) => addSweaterToShelf(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }))

  const addSweaterToShelf = (id) => {
    const addSweaterList = sweaters.filter((sweater) => id === sweater.id);
    setSweaters((sweaters2) => [...sweaters2, addSweaterList[0]]);
    console.log(sweatersList) 
  }

  return (
    <div className='shelf' ref={drop}>
      <div className='shelf-image'>
        <Image src='/assets/shelf.png' width={360} height={83} alt='shelf'/>
      </div>

      <div className='shelf-number'>
        <span>{countSweaters}</span>
      </div>

      <div className='shelf-foundation'>
        <h2>{props.name}</h2>

        <div className='shelf-site'>
          <span>
            <Image src='/assets/infoIcon.png' width={40} height={40} alt='info'/>
            {props.site}
          </span>
        </div>

        <div className='shelf-sweaters'>
          {sweatersList.map((sweater,index) => (
            <SweaterStyled top={-20*(index+1)}>
              <Sweater img2={sweater.img2}/>
            </SweaterStyled>
          ))}
        </div>

      </div>

    </div>
  )
}

const SweaterStyled = styled.div `
position: absolute;
top: ${props => props.top}px;
left: 120px;
`

export default Shelf
