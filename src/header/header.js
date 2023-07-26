import { useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './header.css';
import { Col, Container, Row, Image, Nav, Navbar, Button, Modal  } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faSignOut, faChartArea } from '@fortawesome/free-solid-svg-icons';
import { resetUserSession } from '../misc/authService';

export default function Header() {
	const navigate = useNavigate();
	const logout = () => {
		setShow(false)
		resetUserSession();
		navigate("/");
	};
	const [show, setShow] = useState(false);
	return (
		<Container fluid>
			<Row>
				<Col lg={2}>
					<Image src="logo.png" rounded className='logo_icon' />
				</Col>
				<Col lg={9}></Col>
				<Col lg={1} className='center-box'>
				<Button className='center-button' onClick={()=>setShow(true)} ><FontAwesomeIcon icon={faSignOut}/> Logout</Button>
				</Col>
			</Row>
			<Row>
				<Navbar bg="transparent" expand="lg" variant="dark">
					<Container fluid>

						<Navbar.Brand to="#home" className='mob-hide'>Menu</Navbar.Brand>
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Collapse id="basic-navbar-nav">
							<Nav className="me-auto">
								<Nav.Link to="#home"><FontAwesomeIcon icon={faHouse} /> Home</Nav.Link>
								<Nav.Link to="#home"><FontAwesomeIcon icon={faChartArea} /> Sales Report</Nav.Link>
								
							</Nav>
						</Navbar.Collapse>
					</Container>
				</Navbar>
			</Row>
			<Row>
			
      <Modal show={show} onHide={()=>setShow(false)} animation={false} >
        <Modal.Header closeButton className='text-center'>
          <Modal.Title className='text-center text-bold'>Logout ?</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-center exit'>Do you want logout </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className='cutomof' onClick={()=>setShow(false)}>
            No
          </Button>
          <Button variant="danger" className='cutomof' onClick={logout}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

			</Row>
		</Container>
	);
};