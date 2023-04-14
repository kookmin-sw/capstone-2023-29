import {React, useState} from 'react';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container , Nav, Navbar} from 'react-bootstrap/';
import Bookmark from './components/Bookmark.js';
import RecentSearch from './components/RecentSearch.js';
import { useDispatch, useSelector } from "react-redux";
import { addRS } from './Store';
import {Dropdown, Form, InputGroup, DropdownButton} from 'react-bootstrap/';
import SearchResult from './components/SearchResult.js';
import Login from './Login.js';
import BusInfo from './BusInfo';
import { getBusListByBusStop, getBusListByName} from './api.js';


function App() {

  let dispatch = useDispatch()
  const [busName, setBusName] = useState('');
  let [title, setTitle] = useState("정류장")
  let [inputValue, setInputValue] = useState("")
  let [submitted, setSubmitted] = useState(false)
  let [searchResultList, setSearchResultList] = useState([])
  const [station_name, setStationname] = useState('');
  const [busListData, setBusListData] = useState(null);

  function handleSubmit(e){
      e.preventDefault();
      if(inputValue.length <= 0){
        setSubmitted(false)
        return;
      }

      search(inputValue)
      console.log(inputValue)
      dispatch(addRS(inputValue))
      setSubmitted(true)

  }

  function handleInputChange(e){
      setInputValue(e.target.value)
      setSubmitted(false)
  }

  function search(inputValue){
    if (title === "버스번호"){
      setBusName(inputValue);
      handleGetBusListbyName(); 
    }else if(title === "정류장"){
      setStationname(inputValue);
      handleGetBusDatabyBusStop();
    }
    setSearchResultList(JSON.stringify(busListData))
  }

  async function handleGetBusListbyName() {
    try {
      const data = await getBusListByName(busName);
      setBusListData(data);
    } catch (error) {
      console.error('Error fetching bus stop data:', error.message);
    }
  }

  async function handleGetBusDatabyBusStop() {
    try {
      const data = await getBusListByBusStop(station_name);
      setBusListData(data);
    } catch (error) {
      console.error('Error fetching bus stop data:', error.message);
    }
  }


  let [tab, setTab] = useState(0);
  function TabContent(){
      if(tab===0){
        return(
          <Bookmark/>
        )
      }else{
        return(
          <RecentSearch/>
        )
      }
  }

  return (
    <>
    <Routes>
      <Route path="/" element={
            <div className="App"> 

            {/*header */}
            <Navbar bg="light" variant="light">
                <Container>
                <Navbar.Brand href="#home">자리있어?</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Nav.Link href="/businfo">BusInfo</Nav.Link>
                    {/* <Nav.Link href="/detail">Detail</Nav.Link> */}
                </Nav>
                </Container>
            </Navbar>
            
            {/*SearchForm*/}
            <div> 
            <Form
                className="mb-3"
                 onSubmit={
                  handleSubmit}>
                <InputGroup>
                    <DropdownButton
                    variant="outline-secondary"
                    title={title}
                    id="input-group-dropdown-1"
                    >
                    <Dropdown.Item onClick={()=>{
                      setTitle("버스번호")
                      }} href="#">버스번호</Dropdown.Item>
                    <Dropdown.Item onClick={()=>{
                      setTitle("정류장")
                      }}href="#">정류장</Dropdown.Item>
                    </DropdownButton>
                    <Form.Control 
                    placeholder="Enter input"
                    value = {inputValue}
                    onChange={handleInputChange}/>
              </InputGroup>
              </Form>
            </div>
        
            {/*Content */}
            {submitted === false ?
            <>
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
            </>
            :
             <SearchResult searchResultList={searchResultList} title={title}/>
          }
            </div>
      }></Route>

      <Route path = "/login" element={
        <Login></Login>
      }></Route>
      <Route path = "/businfo" element={
        <BusInfo></BusInfo>
      }>

      </Route>

    </Routes>

    </>

  );
}

export default App;
