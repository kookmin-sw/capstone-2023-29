import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import BusInformation from "./BusInfomation.js";
import { deleteFavoriteBus, getBusStopByBusId, getFavoriteBus, busLocationList, predict } from '../api.js';

function BusNumFavList() {
    const [busList, setBusList] = useState([]);
    const [selectedBus, setSelectedBus] = useState(null);
    const [busStopList, setBusStopList] = useState([]);
    const [locationList, setLocationList] = useState([]);
    const [predictArr, setPredictArr] = useState([]);
    const [busInfo, setBusInfo] = useState(false);
  
    useEffect(() => {
      if (localStorage.getItem('token')) {
        handleGetFavorites();
      }
    }, []);
  
    useEffect(() => {
      if (selectedBus) {
        handleGetBusStopByBusId(selectedBus.bus_id); 
        handleBusLocationList(selectedBus.bus_id); 
        handlePredict(selectedBus.bus_id);
      }
    }, [selectedBus]);
  
    async function handleGetFavorites() {
      try {
        const busList = await getFavoriteBus(localStorage.getItem('token'));
        setBusList(busList);
      } catch (error) {
        console.error('Error fetching bus stop data:', error.message);
      }
    }
  
    async function handleDeleteFavoriteBus(bus) {
      await deleteFavoriteBus(localStorage.getItem('token'), bus.bus_id);
      await handleGetFavorites();
    }
  
    async function handleGetBusStopByBusId(bus_id) {
      const busStopList = await getBusStopByBusId(bus_id);
      console.log("busStopList : ", busStopList)
      setBusStopList(busStopList);
    }
  
    async function handleBusLocationList(bus_id) {
      const data = await busLocationList(bus_id);
      setLocationList(data);
    }
  
    async function handlePredict(bus_id) {
      const data = await predict(bus_id);
      setPredictArr(data);
    }
  
    async function handleRefresh() {
      if (selectedBus) {
        handleGetBusStopByBusId(selectedBus.bus_id); 
        handleBusLocationList(selectedBus.bus_id); 
        handlePredict(selectedBus.bus_id);
      }
    }
  
    return(
      <>
        {!busInfo ?
        (
          <div style={{backgroundColor: '#ECECEC', width: '100%', display: 'flex', flexDirection: 'column', justifyContent:'center'}}>
            <div style={{backgroundColor: '#E2615B', display: 'flex', flexDirection: 'row', width: '100%', height: '45px', alignItems: 'center'}}>
              <th style={{color: '#FFFFFF', width:'30%', textAlign: 'center', fontFamily: 'Inter'}}>버스번호</th>
              <th style={{color: '#FFFFFF', width:'50%', textAlign: 'center', fontFamily: 'Inter'}}>방면 (종점)</th>
              <img src="/star_white.svg" alt='non_selected_stat' style={{maxWidth:'20px'}}></img>
            </div>
            
            <div style={{width: '100%', marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                {busList.map((bus, index) => (
                    <div key={index} style={{ width: '95%', height: '80px', backgroundColor: '#FFFFFF', borderRadius: '10px', padding: '10px', marginBottom: '10px', display: 'flex', flexDirection: 'row', alignItems: 'center'}} onClick={() => {
                      setSelectedBus(bus);
                      setBusInfo(true);
                    }}>
                      <th style={{width: '24%', color: '#E2615B', fontSize: '24px', textAlign: 'center', justifyContent: 'center', alignItems: 'center', margin: '0px', fontWeight:'500'}} >{bus.bus_name}</th>
                      <th style={{width: '60%', fontSize: '14px', textAlign: 'center', justifyContent: 'center', alignItems: 'center', margin: '0px', fontWeight: '500'}} >{bus.last_station}</th>
                      <th style={{justifyContent: 'center', alignItems: 'center', margin: '0px', marginBottom:'5px'}} onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteFavoriteBus(bus);
                      }}><img src="/star_yellow.svg" alt="selected_star"></img></th>
                    </div>
                ))}
            </div>
            {busList.length === 0 && 
              <div style={{display: 'flex', justifyContent: 'center', alignContent: 'center', flexDirection: 'column', alignItems: 'center', marginTop: '100px'}}>
                <img src="/join_3_2.png" alt="join_us!" style={{width: '40%'}}></img> 
                <div style={{color: '#989898',  fontWeight: '700'}}>
                  아직 즐겨찾기 목록이 없습니다!<br/> 즐겨찾기 목록을 추가해 보세요! 
                </div>
              </div>
            }
          </div>
        ):(
          <BusInformation
            busName={selectedBus.bus_name}
            busId={selectedBus.bus_id}
            busStopList={busStopList}
            locationList={locationList}
            setBusInfo={setBusInfo}
            busPredictArr={predictArr}
            handleRefresh={handleRefresh}
          />
        )}
      </>
    )
  }
  
  export default BusNumFavList;
