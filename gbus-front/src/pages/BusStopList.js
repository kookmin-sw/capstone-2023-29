import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import { getStationListByName } from '../api.js';


function BusStopList(){
    
    const [inputValue, setInputValue] =useState('')
    const [busStopData, setBusStopData] =useState('')
    const [busStopArr, setBusStopArr] = useState([])
    const [busStopNameArr, setBusStopNameArr] = useState([])
    const [busStopIdArr, setBusStopIdArr] = useState([])
    const [busStopId, setBusStopId] =useState(null)
    const [busStopName, setBusStopName] = useState(null)
    let [busStopInfo, setBusStopInfo] = useState(false)

    function handleSubmit(e){
        e.preventDefault();
        console.log(inputValue);
        handleGetBusListbyName();
        
    }

    function handleInputChange(e){
        setInputValue(e.target.value)
    }

    async function handleGetBusListbyName() {
      try {
        const data = await getStationListByName(inputValue);
        setBusStopData(data);
        const busListArr =JSON.parse(JSON.stringify(data));
        setBusStopArr(busListArr)
        setBusStopNameArr(busListArr.map(station => station.station_name))
        setBusStopIdArr(busListArr.map(station => station.station_id))
      } catch (error) {
        console.error('Error fetching bus stop data:', error.message);
      }
    }



    return(
      <>
      {!busStopInfo ? (
             <>
             <Form onSubmit={handleSubmit}>
             <InputGroup 
             className="mb-3">
             <InputGroup.Text id="inputGroup-sizing-default">
                 Search
             </InputGroup.Text>
             <Form.Control
               aria-label="Default"
               aria-describedby="inputGroup-sizing-default"
               placeholder="정류장"
               value={inputValue}
               onChange={handleInputChange}
             />
             </InputGroup>
             </Form>
             <Table >
           <thead>
             <tr>
               <th>정류장</th>
               <th>info</th>
             </tr>
           </thead>
           <tbody>
               {busStopNameArr.map((busName, index) => (
                 <tr key={index}>
                 <td onClick={()=>{
                  setBusStopInfo(true)
                  setBusStopName(busStopNameArr[index])
                  setBusStopId(busStopIdArr[index])
                  }}>{busName}</td>
                 <td>{busStopIdArr[index]}</td>
             </tr>
             ))}
           </tbody>
         </Table>
             </>

      ):(
        <>
        <div onClick={()=>{setBusStopInfo(false)}}>{busStopName}</div>
        <div>{busStopId}</div>
        </>
      )}
      
      </>
    )

    
}

export default BusStopList;