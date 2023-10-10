import Image from "next/image"
import { Sweater,Shelf, Button } from "@/components"
import { sweaters, foundations } from "@/constants"
import { useState, useEffect } from "react"
import './hero.scss'
import { useDrop } from "react-dnd"

const Hero = () => {

  const [sweatersState, setSweaters] = useState(sweaters)

  const handleDrop = (draggedSweater) => {
    setSweaters((prevSweaters) => prevSweaters.filter((item) => item.id !== draggedSweater));
  }

  const [{isOver},drop] = useDrop(() => ({
    accept: 'image',
    drop: (item) => {
      
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }))

  const toggleButton = () => {
    let resetBtn = document.getElementById('hero-resetBtn');
    let sendBtn = document.getElementById('hero-sendBtn');
    let numOfSweaters = sweatersState.length;
    
    resetBtn.style.display = numOfSweaters < 12 ? 'flex' : 'none';
    sendBtn.style.display = numOfSweaters === 0 ? 'block' : 'none';
  };

  useEffect(toggleButton, [sweatersState]);


  return (
    <div>
      <div className='hero-header'>
        <Image src='/assets/headerImage2022.png' width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }} alt='Hero header'/>
      </div>

      <div className='hero-hat-stand' ref={drop}>
        <Image src='/assets/hat_stand.png' width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }} alt='hat stand'/>
        <div className='hero-hat-stand-sweaters'>
        {sweatersState.map((sweater) => (
          <Sweater key={sweater.id} id={sweater.id} img={sweater.img}/>
        ))}
        </div>

        <div id='hero-sendBtn'>
          <Button text='ELKŰLDŐM'/>
        </div>
      </div>

    
      <div className='hero-shelfs'>
        {foundations.map((foundation) => (
            <Shelf key={foundation.id} name={foundation.name.toUpperCase()} site={foundation.site} onDrop={handleDrop}/>
        ))}
      </div>   

      <div id='hero-resetBtn'>
        <Button text='VISSZAÁLITÁS' type='reset'/>
      </div>
    </div>
  )
}

export default Hero

