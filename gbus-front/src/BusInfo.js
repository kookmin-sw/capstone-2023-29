import {React, useState} from 'react';
import { getBusByName, getBusListByBusStop, getBusStopByName, getBusListByName, getStationListByName } from './api.js';



function BusInfo(){
  const [busName, setBusName] = useState('');
  const [stationName, setStationName] = useState('');
  const [busData, setBusData] = useState(null);
  const [busListData, setBusListData] = useState(null);
  const [busStopData, setBusStopData] = useState(null);

  async function handleGetBusData() {
    try {
      const data = await getBusByName(busName);
      setBusData(data);
    } catch (error) {
      console.error('Error fetching bus data:', error.message);
    }
  }

  async function handleGetBusStopData() {
    try {
      const data = await getBusStopByName(busName);
      setBusStopData(data);
    } catch (error) {
      console.error('Error fetching bus stop data:', error.message);
    }
  }
  
  async function handleGetStationStopData() {
    try {
      const data = await getStationListByName(stationName);
      setBusStopData(data);
    } catch (error) {
      console.error('Error fetching bus stop data:', error.message);
    }
  }

  async function handleGetBusDatabyBusStop() {
    try {
      const data = await getBusListByBusStop(stationName);
      setBusListData(data);
    } catch (error) {
      console.error('Error fetching bus stop data:', error.message);
    }
  }


  async function handleGetBusListbyName() {
    try {
      const data = await getBusListByName(busName);
      setBusListData(data);
    } catch (error) {
      console.error('Error fetching bus stop data:', error.message);
    }
  }

  return (
    <div>
      <input
        type="text"
        value={busName}
        onChange={(e) => setBusName(e.target.value)}
        placeholder="Enter bus name"
      />
      <button onClick={handleGetBusData}>Get Bus Info</button>
      <button onClick={handleGetBusStopData}>Get Bus Stop Info</button>
      {busData && <div>{JSON.stringify(busData)}</div>}
      {busStopData && <div>{JSON.stringify(busStopData)}</div>}
      <input
        type="text"
        value={stationName}
        onChange={(e) => setStationName(e.target.value)}
        placeholder="Enter station name"
      />
      <button onClick={(handleGetStationStopData)}>Get Bus Station by Bus Stop</button>
      {busListData &&<div>{JSON.stringify(busListData)}</div>}
      <input
        type="text"
        value={busName}
        onChange={(e)=>setBusName(e.target.value)}
        placeholder="버스 검색"
       ></input>
      <button onClick={(handleGetBusListbyName)}>버스리스트</button>
      {busListData &&<div>{JSON.stringify(busListData)}</div>}
    </div>
  );

}


export default BusInfo;