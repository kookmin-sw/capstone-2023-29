import {React, useState} from 'react';
import { getBusByName, getBusListByBusStop, getBusStopByName, getBusListByName } from './api.js';



function BusInfo(){
  const [busName, setBusName] = useState('');
  const [station_name, setStationname] = useState('');
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

  async function handleGetBusDatabyBusStop() {
    try {
      const data = await getBusListByBusStop(station_name);
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
        value={station_name}
        onChange={(e) => setStationname(e.target.value)}
        placeholder="Enter station name"
      />
      <button onClick={(handleGetBusDatabyBusStop)}>Get Bus by Bus Stop</button>
      {busListData &&<div>{JSON.stringify(busListData)}</div>}
      <input
        type="text"
        value={busName}
        onChange={(e)=>setBusName(e.target.value)}
        placeholder="버스 검색"
       ></input>
      <button onClick={(handleGetBusListbyName)}>버스리스트</button>
  
    </div>
  );

}


export default BusInfo;