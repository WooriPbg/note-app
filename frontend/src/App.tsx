import React from 'react';
import { NavbarBrand } from 'react-bootstrap';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import Navbar from 'react-bootstrap/Navbar';
import './App.css';
import Routes from './Routes';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';

function App() {
  return (
    <div className='App container py-3'>
      <Navbar collapseOnSelect bg='light' expand='md' className='mb-3'>
        <LinkContainer to='/'>
        <NavbarBrand className='font-weight-bold text-muted'>
            Scratch
          </NavbarBrand>
        </LinkContainer>
        <NavbarToggle />
        <Navbar.Collapse className='justify-content-end'>
          <Nav activeKey={window.location.pathname}>
            <LinkContainer to='/signup'>
            <Nav.Link>회원가입</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/login'>
            <Nav.Link>로그인  </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes />
    </div>
  );
}

export default App;
