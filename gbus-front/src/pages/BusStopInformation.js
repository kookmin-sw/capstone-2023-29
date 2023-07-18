import React from 'react';
import { BusDetailsContainer, BusName, BusTable, BackButton, StyledRow, FavoriteStar, BusInfo, BusNextStop, SeatsInfo, ArrivalInfo } from './StyledComponent.js';

function BusStopInformation({ selectedBusStop, busList, onBack }) {

    console.log(selectedBusStop, busList);

    if (!busList) {
        return <div>Loading...</div>; // 로딩 상태를 표시할 컴포넌트나 메시지를 반환합니다.
    }

    return (
        <BusDetailsContainer style={{width: '100%', margin: '0', padding: '0', marginTop: '-16px'}}>
            <BusName style={{paddingTop: '20px'}}>{selectedBusStop.station_name}</BusName>
            <div style={{fontSize: '12px', paddingTop: '5px'}}>{selectedBusStop.next_station} 방면</div>
            <BusTable style={{width: '100%', display: 'flex', flexDirection: 'column'}}>
            <thead>
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
                        <FavoriteStar />
                        </div>
                  </StyledRow>
                );
            })}
            </BusTable>
            <BackButton onClick={onBack}>Back</BackButton>
        </BusDetailsContainer>
    );
}

export default BusStopInformation;