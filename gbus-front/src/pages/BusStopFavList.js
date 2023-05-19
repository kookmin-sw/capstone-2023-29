import React, { useState} from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import { getStationListByName, getBusArrivalList, addFavoriteStation } from '../api.js';



function BusStopFavList(){

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
    const [arrayNull, setArrayNull] = useState(false)
    const [token, setToken] = useState(null)



    async function handleGetBusArrivalListByStationId() {
      try {
        setBusStopArr([]);
        setBusStopNameArr([]);
        setArrayNull(false);
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
        setArrayNull(true);
      }
    }

    async function handleAddFavoriteStation(bus_id) {
      try {
        console.log(bus_id)
        setToken(localStorage.getItem('token'))
        const data = await addFavoriteStation(localStorage.getItem("token"), bus_id);
        console.log("add")
        console.log(data)
      } catch (error) {
        console.error('Error fetching bus stop data:', error.message);
      }
    }




    return(
      <>
      {!busStopInfo ? (
             <>
             <Table style={{backgroundColor: '#FFFFFF', marginTop: '-16px'}}>
              <thead style={{backgroundColor: '#E2615B'}}>
                <tr>
                  <th style={{color: '#FFFFFF', width: '40%'}}>정류장</th>
                  <th style={{color: '#FFFFFF', width: '40%'}}>방면</th>
                  <th><img src="/star_white.svg" alt='non_selected_stat' style={{maxWidth:'25px'}}></img></th>
                </tr>
              </thead>
              <tbody style={{borderRadius: '25px', height:'100px'}}>
                  {busStopNameArr.length > 0 ? (
                    busStopNameArr.map((busStopName, index) => (
                      <tr key={index}>
                        <td onClick={()=>{
                          setBusStopInfo(true)
                          setBusStopName(busStopNameArr[index])
                          setStationId(busStopIdArr[index])
                          handleGetBusArrivalListByStationId();
                          console.log(stationId)
                          }}>{busStopName}</td>
                        <td>{busStopWayArr[index]}</td>
                        <td onClick={()=>{
                          setStationId((busStopIdArr[index]))
                          handleAddFavoriteStation(busStopIdArr[index])
                        }}>즐찾</td>
                    </tr>
                    ))
                  ) : (
                    arrayNull && (
                      <tr>
                        <td colSpan="3">
                          검색 결과가 없습니다.
                          {/* 이 위치에 원하는 이미지를 추가하세요. 예: */}
                          {/* <img src="/path/to/your/image.png" alt="No results" /> */}
                        </td>
                      </tr>
                    )
                  )}
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

export default BusStopFavList;