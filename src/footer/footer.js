import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import './footer.css';

function footer() {
  return (
    <Container fluid>
        <Row className='grey_color footer'>
            <Col lg="6">
                <Card.Text className='copywright'>
                2023 ©<span style={{fontWeight:"bold",color:"#0d0d0d"}}>NAC Jewellers.</span>
                </Card.Text>
            </Col>
            <Col lg="6">
                <Card.Text className='design_develop'>
                Designed & Developed by Sundar Infographic Analytics
                </Card.Text>
            </Col>
        </Row>
    </Container>
  );
}

export default footer;
