import {React, useState, useEffect} from 'react';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import {Container , Nav, Navbar} from 'react-bootstrap/';
import Search from './pages/Search.js'
import Login from './pages/Login.js';
import BusInfo from './BusInfo';
import Bookmark from './pages/Bookmark';
import RecentSearch from './pages/RecentSearch';
import Signup from './pages/SignUp';

function App() {

  const [token, setToken] = useState(localStorage.getItem('token'))
  
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);
  

  return (
    <div className="App"> 
    <Routes>
      <Route path="/" element={
            <>
              {/*header */}
              <Navbar bg="light" variant="light">
                <Container>
                  <Navbar.Brand href="#home">자리있어?</Navbar.Brand>
                  <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/search">Search</Nav.Link>
                    {token ? 
                    (
                      <Nav.Link
                        onClick={() => {
                          localStorage.removeItem('token');
                          setToken(null);
                        }}
                      >
                        Logout
                      </Nav.Link>
                    ) : (
                      <Nav.Link href="/login">Login</Nav.Link>
                    )}
                   
              
                  </Nav>
                </Container>
              </Navbar>

            
      
            <div>
            <Tabs
            defaultActiveKey="bookMark"
            id="fill-tab-example"
            className="mb-3"
            fill
             >
          <Tab eventKey="bookMark" title="즐겨찾기">
            <Bookmark/>
           </Tab>
          
          </Tabs>
            </div>
          </>
      
      }></Route>

      <Route path = "/login" element={
        <Login></Login>
      }></Route>
      <Route path="/search" element={
        <Search></Search>
      }></Route>
      <Route path = "/businfo" element={
        <BusInfo></BusInfo>
      }></Route>
      <Route path = "/signup" element={
        <Signup/>
      }></Route>

      </Routes>
    </div>

  )
    }

export default App;
