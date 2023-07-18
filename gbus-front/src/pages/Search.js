import {React, useState} from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import BusNumList from "./BusNumList.js";
import BusStopList from "./BusStopList.js";
import Header from '../Header'; // Import the Header component
import BusSearch from "./BusSearch.js";

function Search({token, setToken}){

    return(
        <>
        <Header token={token} setToken={setToken}/> {/* Use the Header component here */}
        <div style={{backgroundColor: '#FFFFFF'}}>
          <Tabs
            defaultActiveKey="busNum"
            id="fill-tab-example"
            className="mb-3"
            fill
          >
            <Tab eventKey="busNum" title="버스번호" style={{backgroundColor: '#FFFFFF', borderRadius:'12px', marginTop:'-16px'}}>
              <BusNumList/>
            </Tab>
            <Tab eventKey="busStop" title="정류장" style={{backgroundColor: '#FFFFFF', borderRadius:'12px', marginTop:'-16px'}}>
              <BusStopList/>
            </Tab>
          </Tabs>
        </div>
        </>
    )
}

export default Search;
