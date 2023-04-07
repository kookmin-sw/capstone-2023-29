import {React, useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container , Nav, Navbar} from 'react-bootstrap/';
import Bookmark from './components/Bookmark.js';
import RecentSearch from './components/RecentSearch.js';
import SearchForm from './components/SearchForm.js';
import { useSelector } from "react-redux";


function App() {


  let [tab, setTab] = useState(0);
  function TabContent(){
    if(tab===0){
      return(
        <Bookmark/>
      )
    }
    if(tab===1){
      return(
        <RecentSearch/>
      )
    }
  }

  return (
    <>
    <div className="App"> 

    {/*header */}
    <Navbar bg="light" variant="light">
        <Container>
        <Navbar.Brand href="#home">자리있어?</Navbar.Brand>
        <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            {/* <Nav.Link href="/detail">Detail</Nav.Link> */}
        </Nav>
        </Container>
    </Navbar>
    
    <div>
    <SearchForm/>
    </div>

    <div>
    <Nav variant="tabs" defaultActiveKey="link0">
      <Nav.Item>
          <Nav.Link onClick={()=>{setTab(0)}} eventKey="link0">즐겨찾기</Nav.Link>
      </Nav.Item>
      <Nav.Item>
          <Nav.Link onClick={()=>{setTab(1)}} eventKey="link1">최근검색어</Nav.Link>
      </Nav.Item>
    </Nav>
    </div>
    
    <div>
    <TabContent/>
    </div>
    </div>
    </>

  );
}

export default App;
