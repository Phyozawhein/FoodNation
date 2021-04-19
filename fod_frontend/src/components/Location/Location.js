import React, {useRef, useState} from 'react'
import {Container, Card, Row, Col, Form, Button, Alert} from 'react-bootstrap';
import {useAuth} from '../../context/AuthContext';
import Fire from '../../firebase.config';
import classes from './Location.module.css';
import {Link} from 'react-router-dom';
import asset_img from '../../assets/map.png';




export default function () {



    return(
        
        <Container className="ml-4 align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <Row className="justify-content-center">
                <Col sm={12} md={4}>
                    <Row>
                        <h2 className={`${classes.head_name} d-flex`}>Search Queries</h2>
                    </Row>
                    <Row>
                        <div className={`${classes.container_child} ${classes.font}`}>

                            <Form>

                                <Form.Group>
                                    <Form.Label className={`${classes.forms_text}`} >
                                        Street Name
                        </Form.Label>
                                    <Form.Control />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label className={`${classes.forms_text}`}>
                                        State
                        </Form.Label>
                                    <Form.Control />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label className={`${classes.forms_text}`}>
                                        City
                        </Form.Label>
                                    <Form.Control />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label className={`${classes.forms_text}`}>
                                        Zip Code
                        </Form.Label>
                                    <Form.Control />
                                </Form.Group>

                                <Button type="submit" className="w-100" >Direction</Button>
                            </Form>

                        </div>

                    </Row>
                    <Row> <h3 className={`${classes.head_name}`}>Search Results</h3></Row>
                    <Row>
                
                        <div className={`${classes.container_child} ${classes.font}`}>


                        </div>
                    </Row>
                </Col>
                <Col sm={12} md={7}>
                <div className={`${classes.container_map} ${classes.font}`}>
                    
</div>
                </Col>
            </Row>

        </Container>




    )
}