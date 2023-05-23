// App.js
import { React, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tab, Tabs } from 'react-bootstrap';
import Search from './pages/Search.js';
import Login from './pages/Login.js';
import BusInfo from './BusInfo';
import Bookmark from './pages/Bookmark';
import Signup from './pages/SignUp';
import Header from './Header'; // Add this line

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  return (
    <div className="App" style={{height: '100vh', backgroundColor: '#ECECEC'}}>
      <Routes>
        <Route path="/" element={
          <>
            {/*header */}
            <Header token={token} setToken={setToken}/> {/* Replace your previous header with this line */}
    
            <div style={{display: 'flex', flexDirection: 'column', margin: '0', backgroundColor: '#ECECEC', height: '100%'}}>
              <Bookmark />  
            </div>
          </>
        }></Route>

        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<Search token={token} setToken={setToken} />} />
        <Route path="/businfo" element={<BusInfo />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
