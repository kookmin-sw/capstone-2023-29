import React, { useState} from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import { getStationListByName, getBusArrivalList } from '../api.js';


function BusStopList(){
    
    const [inputValue, setInputValue] =useState('')
    const [busStopData, setBusStopData] =useState('')
    const [busStopArr, setBusStopArr] = useState([])
    const [busStopNameArr, setBusStopNameArr] = useState([])
    const [busStopWayArr, setBusStopWayArr] = useState([])
    const [busListData, setBusListData] = useState(null)
    const [busListArr, setBusListArr] = useState([])
    const [busStopId, setBusStopId] =useState(null)
    const [busStopIdArr,setBusStopIdArr] = useState(null)
    const [busIdArr, setBusIdArr] = useState(null)
    const [predictTime1Arr, setPredictTime1Arr] = useState(null)
    const [predictTime2Arr, setPredictTime2Arr] = useState(null)
    const [remainSeat1Arr, setRemainSeat1Arr] = useState(null)
    const [remainSeat2Arr, setRemainSeat2Arr] = useState(null)
    const [stationId, setStationId] = useState('')
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
        setBusStopWayArr(busStopListArr.map(station => station.next_stop))
      } catch (error) {
        console.error('Error fetching bus stop data:', error.message);
      }
    }


    async function handleGetBusArrivalListByStationId() {
      try {
        const data = await getBusArrivalList(stationId);
        setBusListData(data);
        const busListArr = JSON.parse(JSON.stringify(data))
        setBusListArr(busListArr)
        setBusIdArr(busListArr.map(bus => bus.bus_name))
        setPredictTime1Arr(busListArr.map(predict1 => predict1.predictTime1))
        setPredictTime2Arr(busListArr.map(predict2 => predict2.predictTime2))
        setRemainSeat1Arr(busListArr.map(seat1 => seat1.remainSeatCnt1))
        setRemainSeat2Arr(busListArr.map(seat2 => seat2.remainSeatCnt2))
      } catch (error) {
        console.error('Error fetching bus data:', error.message);
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
               <th>방면</th>
             </tr>
           </thead>
           <tbody>
               {busStopNameArr.map((busStopName, index) => (
                 <tr key={index}>
                 <td onClick={()=>{
                  setBusStopInfo(true)
                  setBusStopName(busStopNameArr[index])
                  setStationId(busStopIdArr[index])
                  handleGetBusArrivalListByStationId();
                  console.log(stationId)
                  }}>{busStopName}</td>
                 <td>{busStopWayArr[index]}</td>
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
              <th>Time</th>
              <th>Seat</th>
            </tr>
          </thead>
          <tbody>
            {busIdArr && busIdArr.map((busId, index) => (
              <tr key={index}>
                <td>{busId}</td>
                <td>{predictTime1Arr[index]}, {predictTime2Arr[index] && predictTime2Arr[index]}</td>
                <td>{remainSeat1Arr[index]}, {remainSeat2Arr[index]}</td>
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