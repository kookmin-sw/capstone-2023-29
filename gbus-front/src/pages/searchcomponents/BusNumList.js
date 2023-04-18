import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import BusStationList from "./BusStationList"
import { getBusListByName } from '../../api.js';

function BusNumList(){

    const [inputValue, setInputValue] = useState('')
    const [busListData, setBusListData] = useState('')
    const [busListArr, setBusListArr] = useState([])
    const [busNameListArr, setBusNameListArr] = useState([])
    const [busIdListArr, setBusIdListArr] =useState([])
    let [busInfo, setBusInfo] =useState(false)

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
          const busListArr =JSON.parse(JSON.stringify(data));
          setBusListArr(busListArr)
          setBusNameListArr(busListArr.map(bus => bus.bus_name))
          setBusIdListArr(busListArr.map(bus => bus.id))
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
            <th>ID</th>
          </tr>
        </thead>
        <tbody>
          {busNameListArr.map((busName, index) => (
            <tr key={index}>
            <td onClick={()=>setBusInfo(true)}>{busName}</td>
            <td>{busIdListArr[index]}</td>
        </tr>
        ))}
      </tbody>
      </Table>

        </>
      ):(
        <BusStationList busInfo={busInfo}/>
      )}
      </>
      
    )
}

export default BusNumList;