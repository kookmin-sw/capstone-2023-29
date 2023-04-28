import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import { getStationListByName, getBusListByStationId } from '../api.js';


function BusStopList(){
    
    const [inputValue, setInputValue] =useState('')
    const [busStopData, setBusStopData] =useState('')
    const [busStopArr, setBusStopArr] = useState([])
    const [busStopNameArr, setBusStopNameArr] = useState([])
    const [busStopIdArr, setBusStopIdArr] = useState([])
    const [busListData, setBusListData] = useState(null)
    const [busListArr, setBusListArr] = useState([])
    const [busStopId, setBusStopId] =useState(null)
    const [busStopName, setBusStopName] = useState(null)
    let [busStopInfo, setBusStopInfo] = useState(false)
    const [detail, setDetail] = useState(false)
    const [selected, setSelected] = useState(-1)

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
        const busStopListArr =JSON.parse(JSON.stringify(data));
        setBusStopArr(busStopListArr)
        setBusStopNameArr(busStopListArr.map(station => station.station_name))
        setBusStopIdArr(busStopListArr.map(station => station.station_id))
      } catch (error) {
        console.error('Error fetching bus stop data:', error.message);
      }
    }

    async function handleGetBusListByStationId() {
      try {
        const data = await getBusListByStationId(busStopId);
        setBusListData(data);
        const busListArr = JSON.parse(JSON.stringify(data));
        setBusListArr(busListArr)
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
                  handleGetBusListByStationId();
                  console.log(busListArr)
                  }}>{busName}</td>
                 <td>{busStopIdArr[index]}</td>
             </tr>
             ))}
           </tbody>
         </Table>
             </>

      ):(
        <>
        <span onClick={()=>{setBusStopInfo(false)}}>
        <h2>{busStopName}</h2>
        </span>
        <Table>
          <thead>
            <tr>
              <th>Bus</th>
            </tr>
          </thead>
          <tbody>
            {busListArr.map((bus, index) => (
              <tr key={index}>
                <td onClick={()=>{
                  setSelected(index)
                  setDetail(true)
                }
                }>{bus}{' '}
              {detail && index === selected && (
                <span>
                 <br />
                  <span>Additional Information:</span>
                <br />
                <ul>
                  <li>Bus stop number: 1234</li>
                  <li>Location: 5th Street</li>
                  <li>Next bus arriving in: 10 minutes</li>
                </ul>
              </span>
              )}
                
                </td>
              </tr>
            ))} 
          </tbody>
        </Table>
        </>
      )}
      
      </>
    )

    
}

export default BusStopList;