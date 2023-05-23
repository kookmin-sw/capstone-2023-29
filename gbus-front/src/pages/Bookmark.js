import {React, useState} from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import BusNumList from "./BusNumList.js";
import BusStopList from "./BusStopList.js";
import Header from '../Header'; // Import the Header component
import BusNumFavList from './BusNumFavList.js'
import BusStopFavList from "./BusStopFavList.js";
import './Tab.css'

function Bookmark(){
    return(
        <>
        <Tabs
            style={{backgroundColor: '#FFFFFF', color: '#000000'}}
            defaultActiveKey="busNum"
            id="fill-tab-example"
            className="mb-3"
            fill
          >
            <Tab eventKey="busNum" title="버스번호" style={{backgroundColor: '#ECECEC', borderRadius:'12px', marginTop:'-16px'}}>
              <BusNumFavList/>
            </Tab>
            <Tab eventKey="busStop" title="정류장" style={{backgroundColor: '#ECECEC', borderRadius:'12px', marginTop:'-16px'}}>
              <BusStopFavList/>
            </Tab>
          </Tabs>
        </>
    )
}

export default Bookmark;