// Header.js
import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap/';

function Header({ token, setToken }) {
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand href="#home"><img src='/bus_logo.svg' alt='bus_logo'></img></Navbar.Brand>
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
  )
}

export default Header;
