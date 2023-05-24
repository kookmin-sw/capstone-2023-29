import React from 'react';
import Table from 'react-bootstrap/Table';

function BusInformation({ busName, busId, busStopListData, busStopListArr, locationList, setBusInfo, busPredictArr }) {
  const busPredictions = Object.values(busPredictArr);

  return (
    <>
      <span onClick={()=>{setBusInfo(false)}} style={{backgroundColor: '#ECECEC'}}>
        <h2 style={{backgroundColor: '#E2615B', color: '#FFFFFF', textAlign:'center', height: '70px', display: 'flex', flexDirection: 'row', alignItems:'center', justifyContent:'center'}}> <img src='/white_bus_num.svg' alt='bus_num' style={{height: '30px', width: '32px', marginRight: '10px'}}></img> {busName}번 버스 <br/> <div></div></h2>
        <h2 style={{backgroundColor: '#FFFFFF', height: '45px', marginTop: '-8px', display:'flex', flexDirection: 'row', justifyContent: 'space-between'}}><div style={{width: '3%'}}></div><h2 style={{width: '50%', color: '#484848', fontSize: '13px', display:'flex', alignItems: 'center', paddingTop: '6px'}}>정류장 정보</h2><h2 style={{width: '30%', color: '#E2615B', fontSize: '13px', display: 'flex', alignItems: 'center', paddingTop:'6px'}}>예측 잔여 좌석</h2></h2>
      </span>
      {(
        <Table style={{marginTop: '-7px'}}>
          <thead style={{backgroundColor: '#ECECEC'}}>
            
          </thead>
          <tbody style={{backgroundColor: '#ECECEC'}}>
              {busStopListArr.map((busStop, index) => {
                return (
                  <tr key={index} style={{height: '70px'}}>
                    <td style={{width: '10%', maxHeight:'70px'}}>
                      {locationList.find(bus => bus.station_name === busStop && bus.stationSeq === index+1) ?
                      <img src="/bus_location_logo.png" alt="Bus is here" style={{maxHeight: '50px', maxWidth: '50px', paddingTop: '15px'}}/> : null}
                    </td>
                    <td style={{width: '10%', padding: '0', border: 'none'}}>
                      <img src='/direction_center.svg' alt='station_among' style={{maxHeight: '70px',paddingBottom:'5px', height: '100%', width: '100%', padding: '0'}}></img>
                    </td>
                    <td 
                      
                      onClick={() => {
                      console.log(index)
                      console.log(locationList)
                      console.log(busStop)
                      console.log(busPredictArr)
                    }}>
                      {busStop}{' '}
                    </td>
                    <td style={{width: '25%'}}>
                      {busPredictions.map((prediction, predictionIndex) => (
                        <span key={predictionIndex - 1} style={{color: '#E2615B', fontWeight: '700', textAlign: 'center'}}>
                        {predictionIndex == index ? `${prediction} ` : ''}
                        </span>
                      ))}
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

export default BusInformation;
