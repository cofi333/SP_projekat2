'use client'
import Image from "next/image"
import { useState, forwardRef, useImperativeHandle} from "react"
import './shelf.scss'
import { useDrop } from "react-dnd"
import { sweaters } from "@/constants"
import { Sweater, Popup } from "@/components"


const Shelf = forwardRef((props, ref) => {

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

  useImperativeHandle(ref, () => (
    {
      removeSweaterFromShelf: (id) => {
        setSweaters((prevSweaters) => prevSweaters.filter((item) => item.id !== id));
        decCountSweaters();
      },
      resetAllSweaters: () => {
         setSweaters([]);
         setCountSweaters(0); 
      },
      sweaters: sweatersList,
    }))


  const addSweaterToShelf = (id) => {
    const addSweater = sweaters.find((sweater) => id === sweater.id);
    setSweaters((prevSweaters) => [...prevSweaters, addSweater])
  }

  const incCountSweaters = () => {
    setCountSweaters((prev) => prev+1);
  }

  const decCountSweaters = () => {
    setCountSweaters((prev) => prev-1);
  }

  
  return (
    <div className='shelf' ref={drop}>
      <div className='shelf-image'>
        <Image src='/assets/shelf.png' width={360} height={83} alt='shelf' className='shelf'/>

        <div className='shelf-sweaters'>
          {sweatersList.map((sweater,index) => (
              <Sweater img2={sweater.img2} top={(index+1)} key={index} id={sweater.id}/>
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
})

export default Shelf
