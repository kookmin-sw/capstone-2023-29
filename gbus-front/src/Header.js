// Header.js
import React, {useEffect} from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap/';
import { useLocation } from 'react-router-dom';
import './Header.css'

function Header({ token, setToken }) {

    const location = useLocation();

    useEffect(() => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
      }
    }, [setToken]);

  return (
    <Navbar bg="light" variant="light">
      <Container className='head'>
        <Nav style={{width: '100%', display: 'flex'}}>
          <Navbar.Brand href="#home"><img src='/bus_logo.svg' alt='bus_logo'></img></Navbar.Brand>
          <Nav.Link href="/" className={location.pathname === '/' ? 'active' : ''}>Home</Nav.Link>
          <Nav.Link href="/search" className={location.pathname ==='/search' ? 'active' : ''}>Search</Nav.Link>
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
  )
}

export default Header;
