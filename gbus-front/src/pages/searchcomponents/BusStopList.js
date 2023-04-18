import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';


function BusStopList(){
    
    const [inputValue, setInputValue] =useState('')

    function handleSubmit(e){
        e.preventDefault();
        console.log(inputValue);
    }

    function handleInputChange(e){
        setInputValue(e.target.value)
    }



    return(
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
          placeholder="정류장"
          value={inputValue}
          onChange={handleInputChange}
        />
        </InputGroup>
        </Form>
        <Table >
      <thead>
        <tr>
          <th>정류장</th>
          <th>info</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td></td>
        </tr>
        </tbody>
    </Table>
        </>
    )
}

export default BusStopList;