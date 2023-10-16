'use client'
import './statistics.scss'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { ProgressBar } from 'react-loader-spinner'
import { Table } from '@/components'

const page = () => {

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);


  const getData = async () => {
    try {
      const response = await axios.get("https://sheet.best/api/sheets/23c3bb4f-1443-485a-94a8-0ed3f7f04930");
      setData(response.data);
      setIsLoading(false);
    }
    catch (error) {
      console.log("Error: ", error);
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const lastDateAndTimeRequest = () => {
    if(data.length !== 0) {
      let lastElement = data.slice(-1);
      let date = lastElement[0].date;
      let time = lastElement[0].time;
      let dateTime = `${date} ${time}`

      return dateTime;
    }
    
    return 'There is no requests.';
  }

  const numberOfSweaters = () => {

    let szent_istvan = 0;
    let autizmus_alapitvany = 0;
    let elemiszer_bankegysulet = 0;
    let lampas_92 = 0;

    if(data.length !== 0) {
      data.forEach((request) => {
        szent_istvan += parseInt(request.szent_istvan_kiraly_zenei_alapitvany);
        autizmus_alapitvany += parseInt(request.autizmus_alapitvany);
        elemiszer_bankegysulet += parseInt(request.elemiszer_bankegysulet);
        lampas_92 += parseInt(request.lampas_92_alapitvany);
      })

    }

    return (
      <div className='total-numbers'>
        <p>SZENT ISTVÁN KIRÁLY ZENEI ALAPÍTVÁNY: {szent_istvan}</p>
        <p>AUTIZMUS ALAPÍTVÁNY: {autizmus_alapitvany}</p>
        <p>ÉLELMISZERBANK EGYESŰLET: {elemiszer_bankegysulet}</p>
        <p>LÁMPÁS 92 ALAPÍTVÁNY : {lampas_92}</p>
      </div>
    )

  }

  

  return (
    <div className="statistics">
      {isLoading ? (
          <div className='loading-animation'>
            <ProgressBar
          height="80"
          width="80"
          ariaLabel="progress-bar-loading"
          wrapperStyle={{}}
          wrapperClass="progress-bar-wrapper"
          borderColor = '#FFF'
          barColor = '#000'
          className='loading'
            />
          </div>
      ) : (
        <>
          <div className="statistics-header">
            <h1>Statistics</h1>
          </div>
  
          <div className="statistics-hero">
            <div className="hero-s requests">
              <h2>All requests: {data.length}</h2>
            </div>
  
            <div className="hero-s sweaters">
              <h2>Total number of sweaters sent per foundation:</h2>
                {numberOfSweaters()}
            </div>
  
            <div className="hero-s last-request">
              <h2>Date and time of last request:</h2>
              {lastDateAndTimeRequest()}
            </div>
  
            <div className="hero-s table">
              <h2>Data:</h2>
                <Table tableData={data}/>
            </div>
          </div>
        </>
      )}
    </div>
  );
  
}

export default page
