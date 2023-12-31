'use client'
import './statistics.scss'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Table, Chart } from '@/components'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const page = () => {

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      const response = await axios.get("https://sheet.best/api/sheets/23c3bb4f-1443-485a-94a8-0ed3f7f04930");
      setData(response.data);
      setIsLoading(false); 
    }
    catch (error) {
      setError("An error occurred while fetching data. Please try again later.");
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getData()
  }, []);


  const lastDateAndTimeRequest = () => {
    if(data.length > 0) {
      let lastElement = data[data.length-1];
      let date = lastElement.date;
      let time = lastElement.time;
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

  const deleteData = async (row) => {
    try {
      await axios.delete(`https://sheet.best/api/sheets/23c3bb4f-1443-485a-94a8-0ed3f7f04930/${row}`);
      setData((prevData) => prevData.filter((item,index) => index !== row));
    } catch (error) {
      console.error('Error deleting data:', error.message);
    }
  };

  return (
    <div className="statistics">
      {isLoading ? (
          <div className='loading'>
            <Box sx={{ display: 'flex', justifyContent: 'center'}}>
              <CircularProgress />
           </Box>
          </div>
      ) : error ? (
          <p style={{textAlign: 'center'}}>{error}</p>
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
                <Table tableData={data} onDelete={deleteData}/>
            </div>
          </div>

          <div className='statistics-chart'>
          {data.length !== 0 ? (
            <div className='chart'>
              <Chart data={data}/>
            </div>
          ) : (
          <>
            <h2>Chart</h2>
            <p>No data available</p>
          </>
            )}
          </div>
        </>
      )}
    </div>
  );
  
}

export default page