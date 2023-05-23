import React, { useState,useEffect } from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import BusInformation from "./BusInfomation.js";
import { deleteFavoriteBus, getBusStopByBusId, getFavorites, busLocationList, predict } from '../api.js';

function BusNumFavList(){

    const [busListData, setBusListData] = useState('')
    const [busListArr, setBusListArr] = useState([])
    const [busNameListArr, setBusNameListArr] = useState([])
    const [busIdListArr, setBusIdListArr] =useState([])
    const [busStopListData,setBusStopListData] = useState(null)
    const [busStationArr, setBusStationArr] = useState([])
    const [busStopListArr, setBusStopListArr] =useState([])
    const [busId, setBusId] =useState(null)
    const [busName, setBusName] = useState(null)
    const [locationList, setLocationList] = useState([])
    const [arrayNull, setArrayNull] = useState(false)
    const [token, setToken] = useState('')
    const [predictArr, setPredictArr] = useState([])
    let [busInfo, setBusInfo] =useState(false)
    let [detail, setDetail] = useState(false)
    let [selected, setSelected] = useState(-1);
    

    useEffect(() => {
      if (localStorage.getItem('token')) {
        handleGetFavorites();
        handleGetBusStopByBusId();
      }
    }, [token]);


    async function handleGetFavorites() {
        try {
          setArrayNull(false);
          const data = await getFavorites(localStorage.getItem('token'));
          const busListArr = JSON.parse(JSON.stringify(data));
          setBusListArr(busListArr)
          setBusNameListArr(busListArr.map(bus => bus.bus_name))
          setBusIdListArr(busListArr.map(bus => bus.bus_id))  
          console.log(busIdListArr)
          console.log(busNameListArr)
        
        } catch (error) {
          console.error('Error fetching bus stop data:', error.message);
          setArrayNull(true);
        }
      }

      async function handleDeleteFavoriteBus(bus_id) {
        console.log("bus id : " + bus_id)
        await deleteFavoriteBus(localStorage.getItem('token'), bus_id)
        
      }

      async function handleGetBusStopByBusId(bus_id) {
        try {
          setArrayNull(false);
          // 여기에 busId가 널값이 들어옴
          const data = await getBusStopByBusId(bus_id);
          console.log("hadleGetBus")
          console.log(data)
          const busStopListArr = JSON.parse(JSON.stringify(data));
          setBusStopListArr(busStopListArr)
        } catch (error) {
          console.error('Error fetching bus stop data:', error.message);
          setArrayNull(true);
        }
      }

      async function handleBusLocationList(bus_id) {
        try {
          const data = await busLocationList(bus_id);
          console.log({data})
          const busLocationArr = JSON.parse(JSON.stringify(data));
          setLocationList(data);
        } catch (error) {
          console.error('Error bus_location_list : ', error.message)
        }
      }

      async function handlePredict(bus_id) {
        const data = await predict(bus_id)
        const responsePredict = JSON.parse(JSON.stringify(data));
        setPredictArr(data)
        console.log("predict")
        console.log(predictArr)
      }


  
    return(
      <>
      {!busInfo ?
      (
        <>
        <Table style={{backgroundColor: '#ECECEC', width: '100%', display: 'flex', flexDirection: 'column', justifyContent:'center'}}>
          <thead style={{backgroundColor: '#E2615B', display: 'flex', flexDirection: 'row', width: '100%'}}>
            <tr style={{backgroundColor: '#E2615B', display: 'flex', flexDirection: 'row', width: '100%'}}>
              <th style={{color: '#FFFFFF', width:'30%', textAlign: 'center', height: '100%', fontFamily: 'Inter'}}>버스번호</th>
              <th style={{color: '#FFFFFF', width:'50%', textAlign: 'center', height: '100%', fontFamily: 'Inter'}}>방면 (종점)</th>
              <th><img src="/star_white.svg" alt='non_selected_stat' style={{maxWidth:'25px'}}></img></th>
            </tr>
          </thead>
          
          <div style={{width: '100%', marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              {busListArr.map((bus, index) => (
                  <div key={index} style={{ width: '95%', height: '80px', backgroundColor: '#FFFFFF', borderRadius: '10px', padding: '10px', marginBottom: '10px', display: 'flex', flexDirection: 'low', alignItems: 'center'}}>
                      <p style={{width: '24%', color: '#E2615B', fontSize: '24px', textAlign: 'center', justifyContent: 'center', alignItems: 'center', margin: '0px', fontWeight:'500'}} onClick={() => {
                          setBusId((busIdListArr[index])); 
                          setBusName(busNameListArr[index]);
                          handleGetBusStopByBusId(busIdListArr[index]); 
                          handleBusLocationList(busIdListArr[index]); 
                          handlePredict(busIdListArr[index]);
                          setBusInfo(true) }}>{bus.bus_name}</p>
                      <p style={{width: '60%', fontSize: '14px', textAlign: 'center', justifyContent: 'center', alignItems: 'center', margin: '0px', fontWeight: '500'}} onClick={() => {
                        setBusId((busIdListArr[index])); 
                        setBusName(busNameListArr[index]);
                        handleGetBusStopByBusId(busIdListArr[index]); 
                        handleBusLocationList(busIdListArr[index]); 
                        handlePredict(busIdListArr[index]);
                        setBusInfo(true);
                      }}>{bus.last_station}</p>
                      <p style={{justifyContent: 'center', alignItems: 'center', margin: '0px', marginBottom:'5px'}} onClick={() => {handleDeleteFavoriteBus(busIdListArr[index]); window.location.reload()}}><img src="/star_yellow.svg" alt="selected_star"></img></p>
                  </div>
              ))}
          </div>
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

export default BusNumFavList;