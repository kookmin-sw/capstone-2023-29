import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import { getFavoriteStation, deleteFavoriteStation, getBusArrivalList } from '../api.js';

function BusStopFavList() {
    const [stationList, setStationList] = useState([]);
    const [busArrivalList, setBusArrivalList] = useState([]);
    const [selectedStation, setSelectedStation] = useState(null);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            handleGetFavoriteStation();
        }
    }, []);

    async function handleGetFavoriteStation() {
        try {
            const data = await getFavoriteStation(localStorage.getItem('token'));
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
            setBusArrivalList(data);
            setSelectedStation(stationList.find(station => station.station_id === station_id));
        } catch (error) {
            console.error('Error fetching bus arrival data:', error.message);
        }
    }

    return (
        <>
            {selectedStation === null ? (
                <Table style={{backgroundColor: '#ECECEC', width: '100%', display: 'flex', flexDirection: 'column', justifyContent:'center'}}>
                    <thead style={{backgroundColor: '#E2615B', display: 'flex', flexDirection: 'row', width: '100%'}}>
                        <tr style={{backgroundColor: '#E2615B', display: 'flex', flexDirection: 'row', width: '100%'}}>
                            <th style={{color: '#FFFFFF', width:'80%', textAlign: 'center', height: '100%', fontFamily: 'Inter'}}>Station Name</th>
                            <th><img src="/star_white.svg" alt='non_selected_stat' style={{maxWidth:'25px'}}></img></th>
                        </tr>
                    </thead>
                    <tbody>
                        {stationList.map(station => (
                            <tr key={station.station_id}>
                                <td style={{textAlign: 'center', color: '#E2615B', fontSize: '24px'}} onClick={() => handleGetBusArrivalList(station.station_id)}>
                                    {station.station_name}
                                </td>
                                <td onClick={() => handleDeleteFavoriteStation(station.station_id)}>
                                    <img src="/star_yellow.svg" alt="selected_star"></img>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <>
                    <h2>{selectedStation.station_name}</h2>
                    <button onClick={() => setSelectedStation(null)}>Go Back</button>
                    <Table>
                        <thead>
                            <tr>
                                <th>Bus Name</th>
                                <th>Arrival Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {busArrivalList.map(bus => (
                                <tr key={bus.bus_id}>
                                    <td>{bus.bus_name}</td>
                                    <td>{bus.arrival_time || "No Arrival Information"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
            )}
        </>
    );
}

export default BusStopFavList;