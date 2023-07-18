import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { busLocationList, predict, getBusStopByBusId } from '../api.js';

function BusRoute({ bus, favoriteBuses, onToggleFavorite, onBack }) {
  const [locationList, setLocationList] = useState([]);
  const [predictArr, setPredictArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [busStopListArr, setBusStopListArr] = useState([]);
  const [arrayNull, setArrayNull] = useState(false);

  useEffect(() => {
    fetchBusLocationList(bus.bus_id);
    fetchPredict(bus.bus_id);
    handleGetBusStopByBusId();
  }, [bus]);

  const fetchBusLocationList = async (busId) => {
    try {
      setIsLoading(true);
      const data = await busLocationList(busId);
      setLocationList(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching bus location list:', error.message);
      setIsLoading(false);
    }
  };

  const fetchPredict = async (busId) => {
    try {
      const data = await predict(busId);
      setPredictArr(data);
    } catch (error) {
      console.error('Error fetching prediction data:', error.message);
    }
  };

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      await fetchBusLocationList(bus.bus_id);
      await fetchPredict(bus.bus_id);
      setIsRefreshing(false);
    } catch (error) {
      console.error('Error refreshing data:', error.message);
      setIsRefreshing(false);
    }
  };

  async function handleGetBusStopByBusId() {
    try {
      setArrayNull(false);
      const data = await getBusStopByBusId(bus.bus_id);
      const busStopListArr = JSON.parse(JSON.stringify(data));
      setBusStopListArr(busStopListArr)
    } catch (error) {
      console.error('Error fetching bus stop data:', error.message);
      setArrayNull(true);
    }
  }

  return (
    <>
      <span style={{ backgroundColor: '#ECECEC' }}>
        <h2 style={{ backgroundColor: '#E2615B', color: '#FFFFFF', textAlign: 'center', height: '70px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <img src='/white_bus_num.svg' alt='bus_num' style={{ height: '30px', width: '32px', marginRight: '10px' }}></img>
          {bus.bus_name}<br />
          <div style={{ display: 'flex', flexDirection: 'row-reverse', position: 'fixed', bottom: '30px', right: '20px' }}>
            <img
              src='/refresh_icon.svg'
              alt='refresh'
              onClick={handleRefresh}
              style={{
                height: '30px',
                width: '32px',
                marginRight: '10px',
                transition: 'transform 1s',
                transform: isRefreshing ? 'rotate(360deg)' : 'none'
              }}
            />
          </div>
        </h2>
        <h2 style={{ backgroundColor: '#FFFFFF', height: '45px', marginTop: '-8px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <div style={{ width: '5%' }}></div>
          <h2 style={{ width: '50%', color: '#484848', fontSize: '13px', display: 'flex', alignItems: 'center', paddingTop: '6px' }}>정류장 정보</h2>
          <h2 style={{ width: '30%', color: '#E2615B', fontSize: '13px', display: 'flex', alignItems: 'center', paddingTop: '6px' }}>예측 잔여 좌석</h2>
        </h2>
        <img src='/back_button2.svg' alt='back' style={{ height: '30px', width: '32px', position: 'fixed', bottom: '30px', left: '20px' }} onClick={onBack}></img>
      </span>
      {isLoading ? (
        <Table>
          <tbody>
            <tr>
              <td>Loading...</td>
            </tr>
          </tbody>
        </Table>
      ) : arrayNull ? null : (
        <Table>
          <tbody>
            {busStopListArr.map((busStop, index) => {
              const busLocation = locationList.find((location) => location.station_name === busStop.station_name && location.stationSeq === busStop.stop_order);
              const predictions = predictArr[index];
              return (
                <tr key={index} style={{ height: '70px' }}>
                  <td style={{ width: '12%', maxHeight: '70px' }}>
                    {busLocation && (
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {busLocation.plateType === 3 && (
                          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <img src="/bus_location_logo_1.svg" alt="Bus is here" style={{ maxHeight: '40px', maxWidth: '50px' }} />
                          </div>
                        )}
                        {busLocation.plateType === 4 && (
                          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <img src="/bus_location_logo_2.svg" alt="Bus is here" style={{ maxHeight: '40px', maxWidth: '50px' }} />
                          </div>
                        )}
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                          <div style={{ fontSize: '10px', margin: '0' }}>{busLocation.remainSeatCnt}석</div>
                        </div>
                      </div>
                    )}
                  </td>

                  <td style={{ width: '10%', padding: '0', border: 'none' }}>
                    <img src='/direction_center.svg' alt='station_among' style={{ maxHeight: '70px', paddingBottom: '5px', height: '100%', width: '100%', padding: '0' }}></img>
                  </td>

                  <td>{busStop.station_name}</td>
                  <td style={{ width: '30%' }}>
                    <span style={{ color: '#E2615B', fontWeight: '600', display: 'flex', flexDirection: 'column', fontSize: '13px' }}>
                      {predictions && predictions[0] && `첫 도착: ${predictions[0]}`}
                      {predictions && predictions[1] && `다음 도착: ${predictions[1]}`}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </>
  );
}

export default BusRoute;
