import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import BusInformation from "./BusInfomation.js";
import {
  getBusListByName,
  getBusStopByBusId,
  addFavoriteBus,
  busLocationList,
  getFavorites,
  deleteFavoriteBus,
  predict
} from '../api.js';

function BusNumList() {
  const [inputValue, setInputValue] = useState('');
  const [busList, setBusList] = useState([]);
  const [busId, setBusId] = useState(null);
  const [busName, setBusName] = useState(null);
  const [busStopList, setBusStopList] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [favoriteBusIdArr, setFavoriteBusIdArr] = useState([]);
  const [predictArr, setPredictArr] = useState([]);
  const [busInfo, setBusInfo] = useState(false);

  useEffect(() => {
    if (busId) {
      handleGetBusStopByBusId(busId);
    }
  }, [busId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleGetBusListByName(inputValue);
    await handleGetFavorites();
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleGetBusListByName = async (name) => {
    const data = await getBusListByName(name);
    console.log("data:  ", data)
    if(data.message){
      setBusList([])
    }
    else{
      setBusList(data);
    }
  }

  const handleGetBusStopByBusId = async (id) => {
    const data = await getBusStopByBusId(id);
    setBusStopList(data);
  }

  const handleAddFavoriteBus = async (bus_id, last_station) => {
    await addFavoriteBus(localStorage.getItem("token"), bus_id, last_station);
  }

  const handleBusLocationList = async (bus_id) => {
    const data = await busLocationList(bus_id);
    setLocationList(data);
  }

  const handleGetFavorites = async () => {
    const data = await getFavorites(localStorage.getItem('token'));
    console.log("handle! : ", data)
    setFavoriteBusIdArr(data.map(bus => bus.bus_id));
  }

  const handleDeleteFavorites = async (bus_id) => {
    await deleteFavoriteBus(localStorage.getItem('token'), bus_id)
  }

  const handlePredict = async (bus_id) => {
    const data = await predict(bus_id)
    setPredictArr(data)
  }

  const handleStarButtonClick = async (busId, busStation) => {
    if (favoriteBusIdArr.includes(busId)) {
      await handleDeleteFavorites(busId);
    } else {
      await handleAddFavoriteBus(busId, busStation);
    }
    await handleGetFavorites();
  }

  const handleRefresh = async () => {
    if (!busId) {
      return;
    }
    await handleGetBusStopByBusId(busId);
    await handleBusLocationList(busId);
    await handlePredict(busId);
  }

  const handleRowClick = async (bus) => {
    setBusInfo(true)
    setBusName(bus.bus_name)
    setBusId(bus.bus_id)
    await handleBusLocationList(bus.bus_id)
    await handlePredict(bus.bus_id)
    await handleGetBusStopByBusId(bus.bus_id)
  }

  if (!busList) {
     return <div>Loading...</div>; // 로딩 상태를 표시할 컴포넌트나 메시지를 반환합니다.
  }

  return (
    <>
      {!busInfo ?
        (
          <>
            <Form onSubmit={handleSubmit}>
              <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">Search</InputGroup.Text>
                <Form.Control
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  placeholder="버스번호"
                  value={inputValue}
                  onChange={handleInputChange}
                />
              </InputGroup>
            </Form>

            <div style={{ backgroundColor: '#ECECEC', marginTop: '-16px' }}>
              <div style={{ backgroundColor: '#E2615B', display: 'flex', flexDirection: 'row', width: '100%', height: '45px', alignItems: 'center'}}>
                <th style={{ color: '#FFFFFF', width:'30%', textAlign: 'center', fontFamily: 'Inter' }}>버스번호</th>
                <th style={{ color: '#FFFFFF', width:'51%', textAlign: 'center', fontFamily: 'Inter' }}>방면 (종점)</th>
                <th><img src="/star_white.svg" alt='non_selected_stat' style={{ maxWidth: '20px' }} /></th>
              </div>
              <div style={{ borderRadius: '25px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                {busList && busList.map((bus, index) => (
                  <div key={index} style={{display: 'flex', flexDirection: 'row', backgroundColor: '#FFFFFF', width: "95%", height: '80px', padding: '10px', borderRadius: '10px', marginTop: '20px'}}>
                    <p style={{width: '24%', color: '#E2615B', fontSize: '24px', textAlign: 'center', justifyContent: 'center', alignItems: 'center', margin: '0px', fontWeight:'500', paddingTop: '10px'}} onClick={() => handleRowClick(bus)}>{bus.bus_name}</p>
                    <p style={{width: '60%', fontSize: '14px', textAlign: 'center', justifyContent: 'center', alignItems: 'center', margin: '0px', fontWeight: '500', paddingTop: '18px'}} onClick={() => handleRowClick(bus)}>{bus.station_name}</p>
                    <p style={{justifyContent: 'center', alignItems: 'center', margin: '0px', marginBottom:'5px', paddingTop: '15px'}}>
                      <img
                        src={
                          favoriteBusIdArr.includes(bus.bus_id)
                            ? "/star_yellow.svg"
                            : "/star_1.svg"
                        }
                        alt={favoriteBusIdArr.includes(bus.bus_id)
                          ? 'selected_star'
                          : 'non_selected_star'}
                        style={{ maxWidth: '20px' }}
                        onClick={() => handleStarButtonClick(bus.bus_id, bus.station_name)}
                      />
                    </p>
                  </div>
                ))}
                {busList.length === 0 && (
                  <tr>
                    <td colSpan="3">검색 결과가 없습니다.</td>
                  </tr>
                )}
              </div>
            </div>
          </>
        ) : (
          <BusInformation
            busName={busName}
            busId={busId}
            busStopList={busStopList}
            locationList={locationList}
            setBusInfo={setBusInfo}
            busPredictArr={predictArr}
            handleRefresh={handleRefresh}
          />
        )
      }
    </>
  )
}

export default BusNumList;
