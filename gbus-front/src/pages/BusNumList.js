import React, { useState,useEffect } from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import BusInformation from "./BusInfomation.js";
import { getBusListByName, getBusStopByBusId, addFavoriteBus, busLocationList, getBusListByBusStop, getFavorites, deleteFavoriteBus, predict } from '../api.js';

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
    const [lastStation, setLastStation] = useState('')
    const [favoriteBusIdArr, setFavoriteBusIdArr] = useState([])
    const [predictArr, setPredictArr] = useState([])
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
        handleGetFavorites();
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
          console.log(busListArr)
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
      async function handleAddFavoriteBus(bus_id, last_station) {
        try {
          console.log(bus_id)
          setToken(localStorage.getItem('token'))
          const data = await addFavoriteBus(localStorage.getItem("token"), bus_id, last_station);
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
      
      async function handleGetFavorites() {
        try {
          setArrayNull(false);
          const data = await getFavorites(localStorage.getItem('token'));
          const favoriteBusIdArr = JSON.parse(JSON.stringify(data));
          setFavoriteBusIdArr(favoriteBusIdArr.map(bus => bus.bus_id));
          console.log(favoriteBusIdArr)
        
        } catch (error) {
          console.error('Error fetching bus stop data:', error.message);
          setArrayNull(true);
        }
      }

      async function handleDeleteFavorites(bus_id) {
        await deleteFavoriteBus(localStorage.getItem('token'), bus_id)
      }

      async function handlePredict(bus_id) {
        const data = await predict(bus_id)
        setPredictArr(data)
        console.log("predict")
        console.log(predictArr)
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

        <Table style={{backgroundColor: '#ECECEC', marginTop: '-16px'}}>
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
                    handlePredict(busIdListArr[index])
                    handleGetBusStopByBusId();
                    console.log(busStopListArr)
                    }}>{busName}</td>
                  <td>{busStationArr[index]}</td>
                  <td>
                    <img 
                      src={
                        favoriteBusIdArr.includes(busIdListArr[index]) 
                        ? "/star_yellow.svg" 
                        : "/star_white.svg"
                      } 
                      alt={favoriteBusIdArr.includes(busIdListArr[index]) 
                        ? 'selected_star' 
                        : 'non_selected_star'} 
                      style={{maxWidth:'25px'}}
                      onClick={()=>{
                        setBusId(busIdListArr[index]);
                        setLastStation(busNameListArr[index]);
                        if (favoriteBusIdArr.includes(busIdListArr[index])) {
                          handleDeleteFavorites(busIdListArr[index]);
                        } else {
                          handleAddFavoriteBus(busIdListArr[index], 
                          busStationArr[index],
                          );
                        }
                        handleGetFavorites();
                      }}
                    />
                  </td>
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
        <BusInformation
          busName={busName}
          busId={busId}
          busStopListData={busStopListData}
          busStopListArr={busStopListArr}
          locationList={locationList}
          setBusInfo={setBusInfo}
          busPredictArr={predictArr}
    />
      )}
      </>
      
    )
}

export default BusNumList;