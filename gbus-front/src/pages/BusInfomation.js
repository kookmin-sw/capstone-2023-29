import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';

function BusInformation({ busName, busId, busStopList, locationList, setBusInfo, busPredictArr, handleRefresh }) {
  const busPredictions = Object.values(busPredictArr);
  const [spin, setSpin] = useState(false);

  useEffect(() => {
    if (spin) {
      handleRefresh();
  
      setTimeout(() => {
        setSpin(false);
      }, 1000);
    }
  }, [spin]);

  // 함수 분리하기
  const handleOnClick = (index, busStop) => {
    console.log(index)
    console.log(locationList)
    console.log(busStop)
    console.log(busPredictArr)
  }

  // 반복적으로 사용되는 로직 분리하기
  const renderBusPrediction = (prediction, predictionIndex, index) => (
    <span key={predictionIndex - 1} style={{color: '#E2615B', fontWeight: '600', display: 'flex', flexDirection:'column', fontSize: '13px'}}>
      <div>
        {predictionIndex == index && prediction[0] !== null ? `첫 도착 : ${prediction[0]}` : ''}
      </div>
      <div>
        {predictionIndex == index && prediction[0] !== null && prediction[1] != null ? `다음 도착 : ${prediction[1]}` : ''}
      </div>
    </span>
  );

  return (
    <>
      <span style={{backgroundColor: '#ECECEC'}}>
        <h2 style={{backgroundColor: '#E2615B', color: '#FFFFFF', textAlign:'center', height: '70px', display: 'flex', flexDirection: 'row', alignItems:'center', justifyContent:'center'}}> <img src='/white_bus_num.svg' alt='bus_num' style={{height: '30px', width: '32px', marginRight: '10px'}}></img> {busName}<br/> 
          <div style={{display: 'flex', flexDirection: 'row-reverse', position: 'fixed', bottom: '30px', right: '20px'}}><img
          src='/refresh_icon.svg'
          alt='refresh'
          onClick={() => setSpin(true)}
          style={{
            height: '30px',
            width: '32px',
            marginRight: '10px',
            transition: 'transform 1s',
            transform: spin ? 'rotate(360deg)' : 'none'
          }}
        /></div></h2>
          <h2 style={{backgroundColor: '#FFFFFF', height: '45px', marginTop: '-8px', display:'flex', flexDirection: 'row', justifyContent: 'space-between'}}><div style={{width: '5%'}}></div><h2 style={{width: '50%', color: '#484848', fontSize: '13px', display:'flex', alignItems: 'center', paddingTop: '6px'}}>정류장 정보</h2><h2 style={{width: '30%', color: '#E2615B', fontSize: '13px', display: 'flex', alignItems: 'center', paddingTop:'6px'}}>예측 잔여 좌석</h2></h2>
          <img src='/back_button2.svg' alt='back' style={{height: '30px', width: '32px', position: 'fixed', bottom: '30px', left: '20px'}} onClick={() => {setBusInfo(false)}}></img>
      </span>
      <Table style={{marginTop: '-7px'}}>
        <thead style={{backgroundColor: '#ECECEC'}}></thead>
        <tbody style={{backgroundColor: '#ECECEC'}}>
          {busStopList && busStopList.map((busStop, index) => {
            const bus1 = locationList.find(bus => bus.station_name === busStop && bus.stationSeq === index+1 && bus.plateType === 3);
            const bus2 = locationList.find(bus => bus.station_name === busStop && bus.stationSeq === index+1 && bus.plateType === 4);
            return (
              <tr key={index} style={{height: '70px'}}>
                <td style={{width: '12%', maxHeight:'70px'}}>
                  {/* 별도의 컴포넌트로 분리 */}
                  <BusLocation bus={bus1} logo="/bus_location_logo_1.svg" />
                  <BusLocation bus={bus2} logo="/bus_location_logo_2.svg" />
                </td>
                <td style={{width: '10%', padding: '0', border: 'none'}}>
                  <img src='/direction_center.svg' alt='station_among' style={{maxHeight: '70px',paddingBottom:'5px', height: '100%', width: '100%', padding: '0'}}></img>
                </td>
                <td onClick={() => handleOnClick(index, busStop)}>
                  {busStop}{' '}
                </td>
                <td style={{width: '30%'}}>
                  {busPredictions.map((prediction, predictionIndex) => renderBusPrediction(prediction, predictionIndex, index))}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

// 이미지 등을 불러오는 부분을 별도의 컴포넌트로 분리
function BusLocation({ bus, logo }) {
  return bus ? (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
        <img src={logo} alt="Bus is here" style={{maxHeight: '40px', maxWidth: '50px'}}/>
      </div>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center'}}>
        <div style={{fontSize: '10px', margin:'0'}}>{bus.remainSeatCnt}석</div>
      </div>
    </div>
  ) : null;
}

export default BusInformation;