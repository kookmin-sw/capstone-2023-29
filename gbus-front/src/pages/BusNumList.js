import React, { useState,useEffect } from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import { getBusListByName, getBusStopByBusId, addFavoriteBus, busLocationList } from '../api.js';

function BusNumList(){

    const [inputValue, setInputValue] = useState('')
    const [busListData, setBusListData] = useState('')
    const [busListArr, setBusListArr] = useState([])
    const [busNameListArr, setBusNameListArr] = useState([])
    const [busIdListArr, setBusIdListArr] =useState([])
    const [busStopListData,setBusStopListData] = useState(null)
    const [busStationArr, setBusStationArr] = useState(null)
    const [busStopListArr, setBusStopListArr] =useState([])
    const [busId, setBusId] =useState(null)
    const [busName, setBusName] = useState(null)
    const [arrayNull, setArrayNull] = useState(false)
    const [token, setToken] = useState('')
    const [locationList, setLocationList] = useState([])
    let [busInfo, setBusInfo] =useState(false)
    let [detail, setDetail] = useState(false)
    let [selected, setSelected] = useState(-1);
    

    useEffect(() => {
      if (busId) {
        handleGetBusStopByBusId();
      }
    }, [busId]);

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
          setBusNameListArr([]);
          setBusStationArr([]);
          setArrayNull(false);
          const data = await getBusListByName(inputValue);
          setBusListData(data);
          const busListArr = JSON.parse(JSON.stringify(data));
          setBusListArr(busListArr)
          setBusNameListArr(busListArr.map(bus => bus.bus_name))
          setBusIdListArr(busListArr.map(bus => bus.bus_id))
          setBusStationArr(busListArr.map(bus => bus.station_name))
        } catch (error) {
          console.error('Error fetching bus stop data:', error.message);
          setArrayNull(true);
        }
      }

      async function handleGetBusStopByBusId() {
        try {
          setBusNameListArr([]);
          setBusStationArr([]);
          setArrayNull(false);
          const data = await getBusStopByBusId(busId);
          setBusStopListData(data);
          const busStopListArr = JSON.parse(JSON.stringify(data));
          setBusStopListArr(busStopListArr)
        } catch (error) {
          console.error('Error fetching bus stop data:', error.message);
          setArrayNull(true);
        }
      }
      async function handleAddFavoriteBus(bus_id) {
        try {
          console.log(bus_id)
          setToken(localStorage.getItem('token'))
          const data = await addFavoriteBus(localStorage.getItem("token"), bus_id);
          console.log("add")
          console.log(data)
        } catch (error) {
          console.error('Error fetching bus stop data:', error.message);
        }
      }

      async function handleBusLocationList(bus_id) {
        try {
          setLocationList([]);
          const data = await busLocationList(bus_id);
          console.log({data})
          const busLocationArr = JSON.parse(JSON.stringify(data));
          setLocationList(data);
        } catch (error) {
          console.error('Error bus_location_list : ', error.message)
        }
      }


  
    return(
      <>
      {!busInfo ?
      (
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
            placeholder="버스번호"
            value={inputValue}
            onChange={handleInputChange}
          />
        </InputGroup>
        </Form>

        <Table style={{backgroundColor: '#FFFFFF', marginTop: '-16px'}}>
  <thead style={{backgroundColor: '#E2615B'}}>
    <tr style={{}}>
      <th style={{color: '#FFFFFF', width:'40%'}}>버스번호</th>
      <th style={{color: '#FFFFFF', width:'40%'}}>방면 (종점)</th>
      <th><img src="/star_white.svg" alt='non_selected_stat' style={{maxWidth:'25px'}}></img></th>
    </tr>
  </thead>
  <tbody style={{borderRadius: '25px', height:'100px'}}>
    {busNameListArr.length > 0 ? (
      busNameListArr.map((busName, index) => (
        <tr key={index}>
          <td
            onClick={()=>{
            setBusInfo(true)
            setBusName((busNameListArr[index]))
            setBusId((busIdListArr[index]))
            handleBusLocationList((busIdListArr[index]))
            console.log(busId)
            handleGetBusStopByBusId();
            }}>{busName}</td>
          <td>{busStationArr[index]}</td>
          <td 
          onClick={()=>{
            setBusId((busIdListArr[index]))
            handleAddFavoriteBus(busIdListArr[index])
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
        <span onClick={()=>{setBusInfo(false)}} style={{backgroundColor: '#FFFFFF'}}>
        <h2 style={{backgroundColor: '#FFFFFF'}}>{busName}</h2>
        </span>
        {busStopListData && (
          <Table style={{marginTop: '-7px'}}>
            <thead style={{backgroundColor: '#FFFFFF'}}>
              
            </thead>
            <tbody style={{backgroundColor: '#FFFFFF'}}>
                {busStopListArr.map((busStop, index) => (
                  <tr key={index}>
                    <td style={{width: '20%'}}>
                      {locationList.find(bus => bus.station_name === busStop && bus.stationSeq === index+1) ?
                      <img src="/bus_logo.svg" alt="Bus is here" /> : null}
                    </td>
                    <td onClick={() => {
                      setSelected(index)
                      setDetail(true)
                      console.log(index)
                      console.log(locationList)
                      console.log(busStop)
                    }}>
                      {busStop}{' '}
                    </td>
                  </tr>
                ))}

            
            </tbody>
          </Table>
        )}
        </>
      )}
      </>
      
    )
}

export default BusNumList;