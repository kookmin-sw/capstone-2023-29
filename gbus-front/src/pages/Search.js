import {React} from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import BusNumList from "./BusNumList.js";
import BusStopList from "./BusStopList.js";

function Search(){
       
    return(
        <>
        <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">자리있어?</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/businfo">BusInfo</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
       
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