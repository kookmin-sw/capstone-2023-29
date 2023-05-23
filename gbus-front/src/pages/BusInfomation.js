import React from 'react';
import Table from 'react-bootstrap/Table';

function BusInformation({ busName, busId, busStopListData, busStopListArr, locationList, setBusInfo, busPredictArr }) {
  const busPredictions = Object.values(busPredictArr);

  return (
    <>
      <span onClick={()=>{setBusInfo(false)}} style={{backgroundColor: '#ECECEC'}}>
        <h2 style={{backgroundColor: '#E2615B', color: '#FFFFFF', textAlign:'center', height: '100px'}}>{busName}번 버스</h2>
      </span>
      {(
        <Table style={{marginTop: '-7px'}}>
          <thead style={{backgroundColor: '#ECECEC'}}>
            
          </thead>
          <tbody style={{backgroundColor: '#ECECEC'}}>
              {busStopListArr.map((busStop, index) => {
                

                return (
                  <tr key={index}>
                    <td style={{width: '10%'}}>
                      {locationList.find(bus => bus.station_name === busStop && bus.stationSeq === index+1) ?
                      <img src="/bus_logo.svg" alt="Bus is here" /> : null}
                    </td>
                    <td onClick={() => {
                      console.log(index)
                      console.log(locationList)
                      console.log(busStop)
                      console.log(busPredictArr)
                    }}>
                      {busStop}{' '}
                    </td>
                    <td>
                      {busPredictions.map((prediction, predictionIndex) => (
                        <span key={predictionIndex - 1}>
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
