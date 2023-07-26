import React from 'react';
import './footer.css';
import { Card, Col, Container, Row } from 'react-bootstrap';

export default function Footer() {
	return (
		<Container fluid>
			<Row className='grey_color footer'>
				<Col lg="6">
					<Card.Text className='copywright'>{new Date().getFullYear()} ©<span style={{ fontWeight: "bold", color: "#0d0d0d" }}>NAC Jewellers.</span></Card.Text>
				</Col>
				<Col lg="6">
					<Card.Text className='design_develop'>Designed & Developed by Sundar Infographic Analytics</Card.Text>
				</Col>
			</Row>
		</Container>
	);
};