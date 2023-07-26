import React, { useEffect } from 'react'
import Header from '../header/header';
import Footer from '../footer/footer';
import './page404.css';
import { getUser } from '../misc/authService';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Image, Card } from 'react-bootstrap';

export default function Page404() {
    const navigate = useNavigate();
    useEffect(() => {
        if (!getUser()) { navigate('/'); }
        document.title = 'Page 404 | NAC IntelliDash';
    }, [navigate]);
    return (
        <div>
            <Header />
            <Container>
                <Image src="error-404.png" className='error-img'/>
                <Card.Text className='errortitle'>
                         Page Not Found
                </Card.Text>
                <Button className='custombt' onClick={() => navigate('/dashboard')}>Go Back To Home</Button>
            </Container>
            <Footer />
        </div>
    )
}