import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import { getStationListByName, getBusArrivalList, addFavoriteStation, deleteFavoriteStation, getFavoriteBus, getFavoriteStation } from '../api.js';
import { FavoriteButton, BusName, BusDirection, ArrivalInfo, BusDetailsContainer, BusTable, BackButton, StyledRow, FavoriteStar, BusInfo, BusNextStop, SeatsInfo } from './StyledComponent.js';
import { Link } from 'react-router-dom';

function SearchForm({ onSubmit }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(inputValue);
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">Search</InputGroup.Text>
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          placeholder="정류장"
          value={inputValue}
          onChange={handleInputChange}
        />
      </InputGroup>
    </Form>
  );
}

function BusStopList() {
  const [inputValue, setInputValue] = useState('');
  const [busStopList, setBusStopList] = useState([]);
  const [selectedBusStop, setSelectedBusStop] = useState(null);
  const [busList, setBusList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favoriteStationIdArr, setFavoriteStationIdArr] = useState([]);
  const [spin, setSpin] = useState(false);
  const [stopName, setStopName] = useState('');

  useEffect(() => {
    if (spin) {
      setTimeout(() => {
        setSpin(false);
      }, 1000);
    }
  }, [spin]);

  const handleRefresh = () => {
    setSelectedBusStop(null)
    console.log(selectedBusStop)
    handleSelectBusStop(stopName)
  }
  useEffect(() => {
    if (inputValue) {
      setIsLoading(true);
      getStationListByName(inputValue)
        .then(data => {
          setBusStopList(data);
          setError(null);
        })
        .catch(error => setError(error.message))
        .finally(() => setIsLoading(false));
    }
  }, [inputValue]);

  useEffect(() => {
    if (selectedBusStop) {
      setIsLoading(true);
      getBusArrivalList(selectedBusStop.station_id)
        .then(data => {
          setBusList(data);
          setError(null);
        })
        .catch(error => setError(error.message))
        .finally(() => setIsLoading(false));
    }
  }, [selectedBusStop]);

  const handleSearch = (value) => {
    setInputValue(value);
    handleGetFavorites();
  }

  const handleSelectBusStop = (busStop) => {
    console.log("busStop : ", busStop)
    setStopName(busStop);
    setSelectedBusStop(busStop);
  }

  const handleAddFavoriteStation = async (station_id, next_station) => {
    try {
      const token = localStorage.getItem('token')
      await addFavoriteStation(token, station_id, next_station);
      console.log("Added to favorites.");
    } catch (error) {
      console.log(`Error adding to favorites: ${error.message}`);
    }
  }

  const handleDeleteFavorites = async (station_id) => {
    await deleteFavoriteStation(localStorage.getItem('token'), station_id)
  }

  const handleGetFavorites = async () => {
    const data = await getFavoriteStation(localStorage.getItem('token'));
    setFavoriteStationIdArr(data.map(station => station.station_id));
  }

  const handleStarButtonClick = async (busId, next_station) => {
    if (favoriteStationIdArr.includes(busId)) {
      await handleDeleteFavorites(busId);
    } else {
      await handleAddFavoriteStation(busId, next_station);
    }
    await handleGetFavorites();
  }
  

  return (
    <div>
      <SearchForm onSubmit={handleSearch} />

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        selectedBusStop ? (
          <BusDetailsContainer style={{width: '100%', margin: '0', padding: '0', marginTop: '-16px'}}>
            <BusName style={{paddingTop: '20px'}}>{selectedBusStop.station_name}</BusName>
            <div style={{fontSize: '12px', paddingTop: '5px'}}>{selectedBusStop.next_stop} 방면</div>
            <BusTable style={{width: '100%', display: 'flex', flexDirection: 'column'}}>
            <thead>
                {/* <tr>
                  <th>Bus</th>
                  <th>Time</th>
                  <th>Seat</th>
                </tr> */}
              </thead>
              {busList.map((bus, index) => {
              return (
                <StyledRow key={index} style={{display: 'flex', flexDirection: 'column'}}>
                  <div style={{width: '90%', height: '120px', display: 'flex', flexDirection: 'row', backgroundColor: '#FFFFFF', borderRadius: '9px'}}>
                    <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
                      <div style={{display: 'flex', marginTop:'15px', height: '80px', width: '80px', backgroundColor: '#E2615B', borderRadius: '90px', justifyContent: 'center', alignItems: 'center', alignContent:'center', boxShadow: 'inset 0px 4px 4px rgba(0, 0, 0, 0.25)'}}>
                        <BusInfo style={{alignContent:'center', margin: '0'}}>
                          <BusName style={{color: '#FFFFFF', textAlign: 'center'}}>{bus.bus_name}</BusName>
                        </BusInfo>
                      </div>
                      <div style={{width: '10%'}}></div>
                      <div style={{display: 'flex', flexDirection: 'row'}}>
                        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                          <div>
                            <div style={{fontWeight: '600'}}>{selectedBusStop.station_name}</div>
                            <BusNextStop style={{color: '#959595'}}>{bus.next_stop}</BusNextStop>
                          </div>
                          <div> 
                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                              {bus.predictTime1 ? 
                                <>
                                  <ArrivalInfo style={{fontWeight: '400'}}>{bus.predictTime1}분</ArrivalInfo>
                                  <SeatsInfo style={{color: '#E2615B', fontSize: '14px', fontWeight: '600', paddingLeft: '40px'}}>남은 좌석 {bus.remainSeatCnt1}석</SeatsInfo>
                                </>
                                : <ArrivalInfo style={{fontWeight: '400'}}>도착 정보 없음</ArrivalInfo>
                              }
                            </div>
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                              {bus.predictTime2 ? 
                                <>
                                  <ArrivalInfo style={{fontWeight: '400'}}>{bus.predictTime2}분</ArrivalInfo>
                                  <SeatsInfo style={{color: '#E2615B', fontSize: '14px', fontWeight: '600', paddingLeft: '20px'}}>남은 좌석 {bus.remainSeatCnt2}석</SeatsInfo>
                                </>
                                : <ArrivalInfo style={{fontWeight: '400'}}>도착 정보 없음</ArrivalInfo>
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </StyledRow>
              );
            })}
            </BusTable>
            <img src='/back_button2.svg' alt='back' style={{height: '30px', width: '32px', position: 'fixed', bottom: '40px', left: '10px'}} onClick={() => {setSelectedBusStop(null)}}></img>
            <div style={{display: 'flex', flexDirection: 'row-reverse', position: 'fixed', bottom: '40px', right: '10px'}}><img
              src='/refresh_icon.svg'
              alt='refresh'
              onClick={() => {setSpin(true); handleRefresh()}}
              style={{
                height: '30px',
                width: '32px',
                marginRight: '10px',
                transition: 'transform 1s',
                transform: spin ? 'rotate(360deg)' : 'none'
              }}
            /></div>
          </BusDetailsContainer>
        ) : (
          <>
            <div style={{backgroundColor: '#ECECEC', marginTop: '-16px'}}>
              <div style={{backgroundColor: '#E2615B', display: 'flex', flexDirection: 'row', width: '100%', height: '45px', alignItems: 'center'}}>
                <th style={{color: '#FFFFFF', width:'30%', textAlign: 'center', fontFamily: 'Inter'}}>정류장</th>
                <th style={{color: '#FFFFFF', width:'51%', textAlign: 'center', fontFamily: 'Inter'}}>방면</th>
                <th><img src="/star_white.svg" alt='non_selected_stat' style={{maxWidth:'20px'}}></img></th>
              </div>
              <div style={{ borderRadius: '25px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                {busStopList.map((busStop, index) => (
                  <div key={index} style={{display: 'flex', flexDirection: 'row', backgroundColor: '#FFFFFF', width: "95%", height: '80px', padding: '10px', borderRadius: '10px', marginTop: '20px', alignItems: 'center'}}>
                    <p style={{width: '24%', color: '#E2615B', fontSize: '14px', textAlign: 'center', justifyContent: 'center', alignItems: 'center', margin: '0px', fontWeight:'500'}} onClick={() => handleSelectBusStop(busStop)}>{busStop.station_name}</p>
                    <p style={{width: '60%', fontSize: '14px', textAlign: 'center', justifyContent: 'center', alignItems: 'center', margin: '0px', fontWeight: '500'}} onClick={() => handleSelectBusStop(busStop)}>{busStop.next_stop}</p>
                    {/* <p style={{justifyContent: 'center', alignItems: 'center', margin: '0px', marginBottom:'5px'}} onClick={() => handleAddFavoriteStation(busStop.station_id, busStop.next_stop)}><img src='/star_1.svg' alt='white_star' style={{maxWidth:'20px'}}></img></p> */}
                    <div style={{ justifyContent: 'center', alignItems: 'center', margin: '0px', marginBottom:'5px' }}>
                      <img 
                        src={
                          favoriteStationIdArr.includes(busStop.station_id)
                            ? "/star_yellow.svg"
                            : "/star_1.svg"
                        }
                        alt={favoriteStationIdArr.includes(busStop.station_id)
                          ? 'selected_star'
                          : 'non_selected_star'}
                        style={{ maxWidth: '20px' }}
                        onClick={() => handleStarButtonClick(busStop.station_id, busStop.next_stop)}
                      />
                    </div>  
                  </div>
                ))}
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
}

export default BusStopList;