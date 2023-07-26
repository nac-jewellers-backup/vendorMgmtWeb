import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Container, Col, Row, Button, Image, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartBar, faChartColumn, faChartPie, faChartSimple, faSignIn } from '@fortawesome/free-solid-svg-icons';
import { faChartArea } from '@fortawesome/fontawesome-free-solid';

import './login.css';
import TextAlign from '../csscomponent/textalign';
import Padding from '../csscomponent/padding';
import Width from '../csscomponent/width';
import Text from '../csscomponent/fontweight';
import FontSize from '../csscomponent/fontsize';
import Color from '../csscomponent/color';
import TextDecoration from '../csscomponent/textdecoration';
import login from '../misc/login.json';
import { setUserSession, getUser } from '../misc/authService';

export default function Login() {
	const navigate = useNavigate();
	const [credentials, setCredentials] = useState({ email: '', password: '' });
	const [err, setErr] = useState('');
	const [sign, setSign] = useState(false);
	const emailValidation = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

	useEffect(() => {
		if (getUser()) { navigate('/dashboard'); }
		document.title = 'Login | NAC IntelliDash';
	}, [navigate]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const email = document.getElementById('formGroupEmail');
		const password = document.getElementById('formGroupPassword');
		setTimeout(() => { setErr(''); }, 2000);

		if (!credentials.email) {
			setErr('Enter EMail Address');
			setSign(false);
			email.focus();
		} else if (!credentials.email.match(emailValidation)) {
			setErr('Enter Valid EMail Address');
			setSign(false);
			email.focus();
		} else if (!credentials.password) {
			setErr('Enter Password');
			setSign(false);
			password.focus();
		} else {
			for (let i = 0; i < login.length; i++) {
				if (credentials.email === login[i].email && credentials.password === login[i].password) {
					setSign(true);
					setErr('');
					navigate("/dashboard");
					setUserSession(login[i]);
				} else {
					setSign(false);
					setErr('Invalid Credentials');
				}
			}
		}
	};

	return (
		<Container fluid>
			<Row>
				<Col lg="6" style={{ background: "#eee", margin: "10px 0" }}>
					<Form className='box center desktop-vmiddle' onSubmit={handleSubmit} method='POST'>
						<Width width="100%">
							<Image src="logo.png" rounded className='login-logo' />
							<TextDecoration textDecoration="underline"><TextAlign alignment="center"><Text fontWeight="bold"><FontSize fontSize="22px"> NAC IntelliDash</FontSize></Text></TextAlign></TextDecoration>
							<Form.Group className="mb-3" controlId="formGroupEmail">
								<TextAlign alignment="left">EMail Address</TextAlign>
								<Form.Control type="text" placeholder="Enter Email Address" style={{ padding: "10px" }} autoComplete='off' value={credentials.email} onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} />
							</Form.Group>
							<Form.Group className="mb-3" controlId="formGroupPassword">
								<TextAlign alignment="left">Password</TextAlign>
								<Form.Control type="password" placeholder="Password" style={{ padding: "10px" }} autoComplete='off' value={credentials.password} onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
							</Form.Group>
							<Form.Group>
								<Text>{err && <Color color="red">{err}</Color>}</Text>
								<Col sm={{ span: 12 }}>
									<Button type="submit" className='width100' disabled={sign}><Padding size="5px">Sign In <FontAwesomeIcon icon={faSignIn} /> </Padding></Button>
								</Col>
							</Form.Group>
						</Width>
					</Form>
				</Col>
				<Col lg="6" style={{ background: "#383990", height: "100vh" }} className='mobpad'>
					<Padding size="25px">
						<TextAlign alignment="left">
							<Text style={{ zIndex: "99999" }}>
								<Padding size="10px">
									<Text>
										<TextAlign alignment="center">
											<fontWeight fontWeight="bold">
												<FontSize fontSize="23px">
													<Color color="white">
														<TextDecoration textDecoration="underline">
															Experience the power of data-driven decision-making with Insight Hub.
														</TextDecoration>
													</Color>
												</FontSize>
											</fontWeight>
										</TextAlign>
									</Text>
								</Padding>
							</Text>
							<Color color="white">
								<Width width="300px">
									<TextAlign alignment="center">
										<Card.Text><Padding size="25px"><FontSize fontSize="30px"><Color color="rgb(238 152 73)"> <FontAwesomeIcon icon={faChartBar} /></Color></FontSize> Operational Reports</Padding></Card.Text>
									</TextAlign>
								</Width>
								<Width width="300px">
									<TextAlign alignment="center">
										<Card.Text><Padding size="25px"><FontSize fontSize="30px"><Color color="rgb(35 202 255)"><FontAwesomeIcon icon={faChartColumn} /></Color></FontSize>Financial Reports</Padding></Card.Text>
									</TextAlign>
								</Width>
								<Width width="300px">
									<TextAlign alignment="center">
										<Card.Text><Padding size="25px"><FontSize fontSize="30px"><Color color="rgb(238 152 73)"><FontAwesomeIcon icon={faChartArea} /></Color></FontSize>Performance Reports</Padding></Card.Text>
									</TextAlign>
								</Width>
								<Width width="300px">
									<TextAlign alignment="center">
										<Card.Text><Padding size="25px"><FontSize fontSize="30px"><Color color="rgb(35 202 255)"><FontAwesomeIcon icon={faChartPie} /></Color></FontSize>Analytical Reports</Padding></Card.Text>
									</TextAlign>
								</Width>
								<Width width="300px">
									<TextAlign alignment="center">
										<Card.Text><Padding size="25px"><FontSize fontSize="30px"><Color color="rgb(238 152 73)"><FontAwesomeIcon icon={faChartSimple} /></Color></FontSize>Executive Dashboard</Padding></Card.Text>
									</TextAlign>
								</Width>
							</Color>
						</TextAlign>
					</Padding>
					<Image src='man-img.png' rounded className='man-img' />
				</Col>
			</Row>
		</Container>
	);
}