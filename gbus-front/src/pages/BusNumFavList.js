import React, { useState,useEffect } from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import { getBusStopByBusId, getFavorites } from '../api.js';

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
    const [arrayNull, setArrayNull] = useState(false)
    const [token, setToken] = useState('')
    let [busInfo, setBusInfo] =useState(false)
    let [detail, setDetail] = useState(false)
    let [selected, setSelected] = useState(-1);
    

    useEffect(() => {
      if (localStorage.getItem('token')) {
        handleGetFavorites();
      }
    }, [busListArr]);


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


  
    return(
      <>
      {!busInfo ?
      (
        <>
        <Table style={{backgroundColor: '#FFFFFF', width: '100%', display: 'flex', flexDirection: 'column', justifyContent:'center'}}>
          <thead style={{backgroundColor: '#E2615B', display: 'flex', flexDirection: 'row', width: '100%'}}>
            <tr style={{backgroundColor: '#E2615B', display: 'flex', flexDirection: 'row', width: '100%'}}>
              <th style={{color: '#FFFFFF', width:'30%', textAlign: 'center', height: '100%'}}>버스번호</th>
              <th style={{color: '#FFFFFF', width:'40%', textAlign: 'center', height: '100%'}}>방면 (종점)</th>
              <th><img src="/star_white.svg" alt='non_selected_stat' style={{maxWidth:'25px'}}></img></th>
            </tr>
          </thead>
          
          <div style={{width: '100%', marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              {busListArr.map((bus, index) => (
                  <div key={index} style={{ width: '90%', height: '15%', backgroundColor: '#ECECEC', borderRadius: '10px', padding: '10px', marginBottom: '10px' }}>
                      <p>Bus Number: {bus.bus_id}</p>
                      <p>Bus Name: {bus.bus_name}</p>
                  </div>
              ))}
          </div>
        </Table>


        </>
      ):(
        <>
        <span onClick={()=>{setBusInfo(false)}}>
        <h2>{busName}</h2>
        </span>
        {busStopListData && (
          <Table>
            <thead>
              <tr>
                <th>busStop</th>
              </tr>
            </thead>
            <tbody>
              {busStopListArr.map((busStop, index) => (
                <tr key={index}>
                  <td onClick={() => {
                    setSelected(index)
                    setDetail(true)
                  }}>
                    {busStop}{' '}
                    {detail && index === selected && (
                      <span>
                        <br />
                        <span onClick={() => { setDetail(false) }}>Additional Information:</span>
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
        )}
        </>
      )}
      </>
      
    )
}

export default BusNumFavList;