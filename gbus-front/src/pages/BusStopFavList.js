import React, { useState, useEffect } from "react";
import { getFavoriteStation, deleteFavoriteStation, getBusArrivalList, addFavoriteStation } from '../api.js';
import Table from 'react-bootstrap/Table';
import BusStopInformation from "./BusStopInformation.js";

function BusStopFavList() {
    const [stationList, setStationList] = useState([]);
    const [busArrivalList, setBusArrivalList] = useState([]);
    const [selectedStation, setSelectedStation] = useState(null);
    const [busStopList, setBusStopList] = useState([]);
    const [selectedBusStop, setSelectedBusStop] = useState(null);
    const [busList, setBusList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            handleGetFavoriteStation();
        }
    }, []);

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

    async function handleGetFavoriteStation() {
        try {
            const data = await getFavoriteStation(localStorage.getItem('token'));
            console.log(data)
            setStationList(data);
        } catch (error) {
            console.error('Error fetching favorite station data:', error.message);
        }
    }

    async function handleDeleteFavoriteStation(station_id) {
        try {
            await deleteFavoriteStation(localStorage.getItem('token'), station_id);
            handleGetFavoriteStation();
        } catch (error) {
            console.error('Error deleting favorite station:', error.message);
        }
    }

    async function handleGetBusArrivalList(station_id) {
        try {
            const data = await getBusArrivalList(station_id);
            setSelectedStation(stationList.find(station => station.station_id === station_id));
            setBusArrivalList(data);
            setBusList(data); 
        } catch (error) {
            console.error('Error fetching bus arrival data:', error.message);
        }
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

      const handleSelectBusStop = async (busStop) => {
        console.log("busStop : ", busStop)
        setSelectedBusStop(busStop);
        const busList = await handleGetBusArrivalList(busStop.station_id);
        console.log("busList : ", busList)
        setBusList(busList);
      }

    return (
        <>
            {selectedStation === null ? (
                <div style={{backgroundColor: '#ECECEC', width: '100%', display: 'flex', flexDirection: 'column', justifyContent:'center'}}>
                    <div style={{backgroundColor: '#E2615B', display: 'flex', flexDirection: 'row', width: '100%', height: '45px', alignItems: 'center'}}>
                        <th style={{color: '#FFFFFF', width:'30%', textAlign: 'center', fontFamily: 'Inter'}}>정류장 이름</th>
                        <th style={{color: '#FFFFFF', width:'50%', textAlign: 'center', fontFamily: 'Inter'}}>방면</th>
                        <img src="/star_white.svg" alt='non_selected_stat' style={{maxWidth:'20px'}}></img>
                    </div>
                    <div style={{width: '100%', marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        {stationList.map((station, index) => (
                            <div key={index} style={{ width: '95%', height: '80px', backgroundColor: '#FFFFFF', borderRadius: '10px', padding: '10px', marginBottom: '10px', display: 'flex', flexDirection: 'row', alignItems: 'center'}} onClick={() => handleSelectBusStop(station)}>
                                <p style={{width: '24%', color: '#E2615B', fontSize: '14px', textAlign: 'center', justifyContent: 'center', alignItems: 'center', margin: '0px', fontWeight:'500'}} >{station.station_name}</p>
                                <p style={{width: '60%', fontSize: '14px', textAlign: 'center', justifyContent: 'center', alignItems: 'center', margin: '0px', fontWeight: '500'}} >{station.next_station}</p>
                                <p style={{justifyContent: 'center', alignItems: 'center', margin: '0px', marginBottom:'5px'}} onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteFavoriteStation(station.station_id);
                                }}><img src="/star_yellow.svg" alt="selected_star"></img></p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                // The detailed page of a station
                // ...
                <>
                    {<BusStopInformation
                        selectedBusStop={selectedBusStop}
                        busList={busList}
                        onBack={() => setSelectedStation(null)}
                    />}
                </>
            )}
        </>
    );
}

export default BusStopFavList;