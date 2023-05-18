import React, { useState,useEffect } from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import { getBusListByName, getBusStopByBusId } from '../api.js';

function BusNumList(){

    const [inputValue, setInputValue] = useState('')
    const [busListData, setBusListData] = useState('')
    const [busListArr, setBusListArr] = useState([])
    const [busNameListArr, setBusNameListArr] = useState([])
    const [busIdListArr, setBusIdListArr] =useState([])
    const [busStopListData,setBusStopListData] = useState(null)
    const [busStationArr, setBusStationArr] = useState(null)
    const [busStopListArr, setBusStopListArr] =useState([])
    const [busId, setBusId] =useState(null)
    const [busName, setBusName] = useState(null)
    let [busInfo, setBusInfo] =useState(false)
    let [detail, setDetail] = useState(false)
    let [selected, setSelected] = useState(-1);

    useEffect(() => {
      if (busId) {
        handleGetBusStopByBusId();
      }
    }, [busId]);

    function handleSubmit(e){
        e.preventDefault();
        console.log(inputValue);
        handleGetBusListbyName();
    }

    function handleInputChange(e){
        setInputValue(e.target.value)
    }


    async function handleGetBusListbyName() {
        try {
          const data = await getBusListByName(inputValue);
          setBusListData(data);
          const busListArr = JSON.parse(JSON.stringify(data));
          setBusListArr(busListArr)
          setBusNameListArr(busListArr.map(bus => bus.bus_name))
          setBusIdListArr(busListArr.map(bus => bus.bus_id))
          setBusStationArr(busListArr.map(bus => bus.station_name))
        } catch (error) {
          console.error('Error fetching bus stop data:', error.message);
        }
      }

      async function handleGetBusStopByBusId() {
        try {
          const data = await getBusStopByBusId(busId);
          setBusStopListData(data);
          const busStopListArr = JSON.parse(JSON.stringify(data));
          setBusStopListArr(busStopListArr)
        } catch (error) {
          console.error('Error fetching bus stop data:', error.message);
        }
      }


  
    return(
      <>
      {!busInfo ?
      (
        <>
        <Form onSubmit={handleSubmit}>
        <InputGroup 
        className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-default">
              Search
          </InputGroup.Text>
          <Form.Control
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            placeholder="버스번호"
            value={inputValue}
            onChange={handleInputChange}
          />
        </InputGroup>
        </Form>

        <Table >
        <thead>
          <tr>
            <th>버스번호</th>
            <th>방면 (종점)</th>
          </tr>
        </thead>
        <tbody>
          {busNameListArr.map((busName, index) => (
            <tr key={index}>
            <td onClick={()=>{
              setBusInfo(true)
              setBusName((busNameListArr[index]))
              setBusId((busIdListArr[index]))
              console.log(busId)
              handleGetBusStopByBusId();
              }}>{busName}</td>
            <td>{busStationArr[index]}</td>
        </tr>
        ))}
      </tbody>
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

export default BusNumList;