'use client'
import Image from "next/image"
import { useState } from "react"
import './shelf.scss'
import { useDrop } from "react-dnd"
import { sweaters } from "@/constants"
import { Sweater, Popup } from "@/components"


const Shelf = (props) => {

  const [countSweaters, setCountSweaters] = useState(0);
  const [sweatersList, setSweaters] = useState([])

  const [{isOver},drop] = useDrop(() => ({
    accept: 'image',
    drop: (item) => {
      addSweaterToShelf(item.id),
      incCountSweaters(),
      props.onDrop(item.id)
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }))

  const addSweaterToShelf = (id) => {
    const addSweaterList = sweaters.filter((sweater) => id === sweater.id);
    setSweaters((sweaters2) => [...sweaters2, addSweaterList[0]]);
  }

  const incCountSweaters = () => {
    setCountSweaters((prev) => prev+1);
  }

  return (
    <div className='shelf' ref={drop}>
      <div className='shelf-image'>
        <Image src='/assets/shelf.png' width={360} height={83} alt='shelf' className='shelf'/>

        <div className='shelf-sweaters'>
          {sweatersList.map((sweater,index) => (
              <Sweater img2={sweater.img2} top={(index+1)} key={index}/>
          ))}
        </div>
      </div>

      <div className='shelf-number'>
        <span>{countSweaters}</span>
        <h2>{props.name}</h2>
      </div>

      <div className='shelf-foundation'>
        <div className='shelf-site'>
          <span>
            <Popup/>
            <a href={`https://${props.site}`} className='web' target="_blank">{props.site}</a>
          </span>

          <div className='shelf-site-mobile'>
            <a href={`https://${props.site}`} target="_blank"><Image src='/assets/linkIcon.png' width={40} height={40} alt='Web site'/></a>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Shelf
