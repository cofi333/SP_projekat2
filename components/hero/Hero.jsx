import Image from "next/image"
import { Sweater,Shelf, Button } from "@/components"
import { sweaters, foundations } from "@/constants"
import { useState, useEffect, useRef } from "react"
import './hero.scss'
import { useDrop } from "react-dnd"
import axios from "axios"

const Hero = () => {

  const [sweatersState, setSweaters] = useState(sweaters)
  const [numOfSweaters, setNumOfSweaters] = useState([0,0,0,0]);
  const [ipAddress, setIpAddress] = useState();
  const shelfRefs = Array.from({ length: 4 }, () => useRef(null));

  const handleDrop = (draggedSweater) => {
     setSweaters((prevSweaters) => prevSweaters.filter((item) => item.id !== draggedSweater));
   }

  const [,drop] = useDrop(() => ({
    accept: 'image',
    drop: (item) => {
      addBackSweater(item.id),
      removeSweaterFromShelf(item.id)
    },
    
  }))

  const removeSweaterFromShelf = (item) => {
    shelfRefs.forEach((ref) => {
        ref.current.sweaters.forEach((sweater) => {
          if(sweater.id === item) {
              ref.current.removeSweaterFromShelf(item)
          }
        })
    }) 
  }

   const toggleButtons = () => {
     let resetBtn = document.getElementById('hero-resetBtn');
     let sendBtn = document.getElementById('hero-sendBtn');
     let numOfSweaters = sweatersState.length;
    
     resetBtn.style.display = numOfSweaters < 12 ? 'flex' : 'none';
     sendBtn.style.display = numOfSweaters === 0 ? 'block' : 'none';
   };

   const addBackSweater = (sweaterId) => {
     let sweater = sweatersState.find((sweater) => sweaterId === sweater.id);
    setSweaters((prevSweaters) => [...prevSweaters, sweater]);
   }

   const resetSweaters = () => {
     setSweaters(sweaters);
    
     shelfRefs.forEach((ref) => {
       ref.current.resetAllSweaters();
     })
   }

   const handleChildState = (childIndex, newState) => {
    setNumOfSweaters((prevSweaters) => {
      const newNums = [...prevSweaters];
      newNums[childIndex] = newState;
      return newNums;
    })
   }

  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
  
    const time = `${hours}:${minutes}:${seconds}`;

    return time;
  }

   const getIp = async () => {
    try {
      const response = await axios.get("https://api.ipify.org/?format=json");
      setIpAddress(response.data.ip);
    }
    catch (error) {
      console.error("Error fetching ip address: ", error);
    }
   }

   const data = {
    szent_istvan_kiraly_zenei_alapitvany: numOfSweaters[0],
    autizmus_alapitvany: numOfSweaters[1],
    elemiszer_bankegysulet: numOfSweaters[2],
    lampas_92_alapitvany: numOfSweaters[3],
    time: getCurrentTime(),
    ip: ipAddress
   }

   const sendData = () => {
      try {
        axios.post("https://sheet.best/api/sheets/23c3bb4f-1443-485a-94a8-0ed3f7f04930", data);
      }
      catch(error) {
        console.error("Error: ", error);
      }
    }

  useEffect(() => {getIp()},[]);
  useEffect(toggleButtons, [sweatersState]);
  
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
          <Button text='ELKŰLDŐM' onClick={sendData}/>
        </div>
      </div>

    
      <div className='hero-shelfs'>
        {foundations.map((foundation, index) => (
            <Shelf key={foundation.id} onChange={handleChildState} id={foundation.id} name={foundation.name.toUpperCase()} onDrop={handleDrop} site={foundation.site} ref={shelfRefs[index]}/>
        ))}
      </div>   

      <div id='hero-resetBtn'>
        <Button text='VISSZAÁLITÁS' type='reset' onClick={resetSweaters}/>
      </div>
    </div>
  )
}

export default Hero

