import {React, useState} from 'react';
import { getBusByName, getBusListByBusStop, getBusStopByName, getBusListByName, getStationListByName, getBusStopByBusId, getBusListByStationId, getBusArrivalList, postLogin, postRegister } from './api.js';



function BusInfo(){
  const [busName, setBusName] = useState('');
  const [stationName, setStationName] = useState('');
  const [busData, setBusData] = useState(null);
  const [busListData, setBusListData] = useState(null);
  const [busStopListData, setBusStopListData] = useState(null);
  const [busStopData, setBusStopData] = useState(null);
  const [bus_id, setBus_id] = useState('')
  const [station_id, setStation_id] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [access_token, setAccess_token] = useState(null)

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

  async function handleGetBusStopByBusId() {
    try {
      const data = await getBusStopByBusId(bus_id);
      setBusStopListData(data);
    } catch (error) {
      console.error('Error fetching bus stop data:', error.message);
    }
  }

  async function handleGetBusListByStationId() {
    try {
      const data = await getBusListByStationId(station_id);
      setBusListData(data);
    } catch (error) {
      console.error('Error fetching bus stop data:', error.message);
    }
  }

  async function handleGetBusArrivalListByStationId() {
    try {
      const data = await getBusArrivalList(station_id);
      setBusListData(data);
    } catch (error) {
      console.error('Error fetching bus stop data:', error.message);
    }
  }

  async function handlePostLogin() {
    try {
      const data = await postLogin(username, password);
      console.log("pass")
      setAccess_token(data);
    } catch (error) {
      console.error('Error fetching bus stop data:', error.message);
    }
  }

  async function handlePostRegister() {
    try {
      const data = await postRegister(username,email, password);
      console.log("pass")
      setAccess_token(data);
      console.log("login");
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
      <input
      type="text"
      value={bus_id}
      onChange={(e)=>setBus_id(e.target.value)}
      placeholder="버스아이디로 검색">
      </input>
      <button onClick={(handleGetBusStopByBusId)}>아이디로 정류장 검색</button>
      {busStopListData && <div>{JSON.stringify(busStopListData)}</div>}

      <input
      type="text"
      value={station_id}
      onChange={(e)=>setStation_id(e.target.value)}
      placeholder="정류장아이디로 검색">
      </input>
      <button onClick={(handleGetBusListByStationId)}>정류장 아이디로 버스 검색</button>
      {busListData && <div>{JSON.stringify(busListData)}</div>}
      
      <input
      type="text"
      value={station_id}
      onChange={(e)=>setStation_id(e.target.value)}
      placeholder="정류장아이디로 도착정보 검색">
      </input>
      <button onClick={(handleGetBusArrivalListByStationId)}>정류장 아이디로 도착 버스 검색</button>
      {busListData && <div>{JSON.stringify(busListData)}</div>}
    <div>
      <h2>login</h2>
      <input
      type = "text" 
      placeholder='id'
      value = {username}
      onChange={(e)=>setUsername(e.target.value)}
      ></input>
      <input 
      type = "text" 
      placeholder='password'
      value = {password}
      onChange={(e)=>setPassword(e.target.value)}
      ></input>
      <button onClick={(handlePostLogin)}>Login</button>
      {access_token && <div>{JSON.stringify(access_token)}</div>}
      <h2>Signup</h2>
      <input
      type = "text" 
      placeholder='id'
      value = {username}
      onChange={(e)=>setUsername(e.target.value)}
      ></input>
      <input 
      type = "text" 
      placeholder='password'
      value = {password}
      onChange={(e)=>setPassword(e.target.value)}
      ></input>
      <input 
      type = "text" 
      placeholder='email'
      value = {email}
      onChange={(e)=>setEmail(e.target.value)}
      ></input>
      <button onClick={(handlePostRegister)}>Signup</button>
      {access_token && <div>{JSON.stringify(access_token)}</div>}

    </div>
    
    
    
    </div>

  
  );

}


export default BusInfo;