import './header.css';
import { Col, Container, Row, Image, Nav, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faSignOut } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

function header() {
  return (
    <Container fluid>
      <Row>
        <Col lg="1"></Col>
        <Col lg={2}>
        <Image src="logo.png" rounded className='logo_icon' />
        </Col>
      </Row>
      <Row>
      <Navbar bg="transparent" expand="lg" variant="dark">
      <Container fluid>
        <Col lg={1}></Col>
        <Navbar.Brand to="#home" className='mob-hide'>Menu</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link to="#home"><FontAwesomeIcon icon={faHouse} /> Home</Nav.Link>
            <Nav.Link to="#link"><FontAwesomeIcon icon={faSignOut}/> Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      </Row>
    </Container>
  );
}

export default header;