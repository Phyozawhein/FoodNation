import React, {useRef, useState} from 'react'
import {Container, Card, Col, Row, Form, Button, Alert} from 'react-bootstrap';
import {useAuth} from '../../context/AuthContext';
import Fire from '../../firebase.config';
import classes from './Profile.module.css';
import {ReactComponent as Logo} from '../../assets/FN-Logo.svg';


export default function Profile() {



    return (
        <>

        <Container className="d-flex align-items-center" style={{minHeight: "100vh"}}>
            <Row>
                <Col>
                    <Card className={`${classes.container} ${classes.font}`}>
                        <Card.Body>


                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>

        </>
    )
}