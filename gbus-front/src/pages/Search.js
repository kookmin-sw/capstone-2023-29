import {React, useState} from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import BusNumList from "./BusNumList.js";
import BusStopList from "./BusStopList.js";
import Header from '../Header'; // Import the Header component

function Search(){

  const [token, setToken] = useState(localStorage.getItem('token'));
    return(
        <>
        <Header token={token} setToken={setToken}/> {/* Use the Header component here */}
       
        <Tabs
          defaultActiveKey="busNum"
          id="fill-tab-example"
          className="mb-3"
          fill
        >
          <Tab eventKey="busNum" title="버스번호">
            <BusNumList/>
          </Tab>
          <Tab eventKey="busStop" title="정류장" >
            <BusStopList/>
          </Tab>
        </Tabs>
        </>
    )
}

export default Search;
