'use client'
import Image from "next/image"
import { Sweater,Shelf, Button, Snackbar } from "@/components"
import { sweaters, foundations } from "@/constants"
import { useState, useEffect, useRef } from "react"
import { getCurrentDate, getCurrentTime, parseDateTime } from "@/functions"
import './hero.scss'
import { useDrop } from "react-dnd"
import axios from "axios"

const Hero = () => {

  const [sweatersState, setSweaters] = useState(sweaters)
  const [numOfSweaters, setNumOfSweaters] = useState([0,0,0,0]);
  const [displayResetBtn, setDisplayResetBtn] = useState(false);
  const [displaySendBtn, setDisplaySetBtn] = useState(false);
  const [snackBar, setSnackBar ] = useState({open: false, message: '', type: ''});
  const [isSending, setIsSending] = useState(false);
  const [data, setData] = useState();
  const [ipAddress, setIpAddress] = useState();
  const shelfRefs = Array.from({ length: 4 }, () => useRef(null));

  const handleDrop = (draggedSweater) => setSweaters((prevSweaters) => prevSweaters.filter((item) => item.id !== draggedSweater));
   
  const [,drop] = useDrop(() => ({
    accept: 'image',
    drop: (item) => {
      addBackSweater(item.id),
      removeSweaterFromShelf(item.id)
    }
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
     let numOfSweaters = sweatersState.length;
     setDisplayResetBtn(numOfSweaters < 12);
     setDisplaySetBtn(numOfSweaters === 0);
    };

    const addBackSweater = (sweaterId) => {
     let addSweater = sweatersState.find((sweater) => sweaterId === sweater.id);
      setSweaters((prevSweaters) => {
        if(!prevSweaters.some((sweater) => sweater.id === addSweater.id)) {
          const updatedSweaters = [...prevSweaters, addSweater];
          return updatedSweaters; 
        }
        else {
          return prevSweaters;
        }
      })
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

   const getIp = async () => {
    try {
      const response = await axios.get("https://api.ipify.org/?format=json");
      setIpAddress(response.data.ip);
    }
    catch (error) {
      console.error("Error fetching ip address: ", error);
    }
   }

   const getData = async () => {
      try {
        const response = await axios.get("https://sheet.best/api/sheets/23c3bb4f-1443-485a-94a8-0ed3f7f04930");
        setData(response.data);
      }
      catch (error) {
        console.log("Error: ", error);
      }
    }

   const sendData = async() => {
    if(data.length > 0) {
      const lastRequest = data[data.length-1];
      const lastSentDateTime = parseDateTime(lastRequest.date, lastRequest.time);
      const currentDateTime = parseDateTime(getCurrentDate(), getCurrentTime());

      if (lastSentDateTime && currentDateTime - lastSentDateTime  < 600000) {
        setSnackBar({ open: true,  message: "Error sending data. 10 minutes haven't passed since the last request.", type: 'error' });
        return;
      }
    } 
  
    try {
      if(!isSending) {
        setIsSending(true);
        const data = {
          szent_istvan_kiraly_zenei_alapitvany: numOfSweaters[0] === 0 ? "0" : numOfSweaters[0],
          autizmus_alapitvany: numOfSweaters[1] === 0 ? "0" : numOfSweaters[1],
          elemiszer_bankegysulet: numOfSweaters[2] === 0 ? "0" : numOfSweaters[2],
          lampas_92_alapitvany: numOfSweaters[3] === 0 ? "0" : numOfSweaters[3],
          date: getCurrentDate(),
          time: getCurrentTime(), 
          ip: ipAddress
        };
    
        await axios.post("https://sheet.best/api/sheets/23c3bb4f-1443-485a-94a8-0ed3f7f04930", data);
        await getData();
        setIsSending(false);
        setSnackBar({open: true, message: 'Data sent successfully!', type: 'success'});
      }
    }
    catch(error) {
        console.error("Error: ", error);
    }
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBar({ ...snackBar, open: false });
  };


  useEffect(() => {getIp(), getData()},[]);
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

        {displaySendBtn && (
          <div id='hero-sendBtn'>
            <Button text={isSending ? 'Sending...' : 'ELKŰLDŐM'} onClick={sendData} disabled={isSending}/>
          </div>
        )}

      </div>


      <div className='hero-shelfs'>
        {foundations.map((foundation, index) => (
            <Shelf key={foundation.id} onChange={handleChildState} id={foundation.id} name={foundation.name.toUpperCase()} onDrop={handleDrop} site={foundation.site} ref={shelfRefs[index]}/>
        ))}
      </div>   

      {(displayResetBtn) && (
        <div id='hero-resetBtn'>
          <Button text='VISSZAÁLITÁS' type='reset' onClick={resetSweaters}/>
        </div>
      )}
      <Snackbar open={snackBar.open} message={snackBar.message} severity={snackBar.type} handleClose={handleCloseSnackbar}/>
    </div>
  )
}

export default Hero

