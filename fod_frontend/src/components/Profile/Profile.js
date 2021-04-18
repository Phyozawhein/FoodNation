import React, {useRef, useState} from 'react'
import {Container, InputGroup, FormControl, Card, Col, Row, Form, Button, Alert} from 'react-bootstrap';
import {useAuth} from '../../context/AuthContext';
import Fire from '../../firebase.config';
import classes from './Profile.module.css';
import {ReactComponent as Logo} from '../../assets/FN-Logo.svg';
import Test from '../../assets/gang.jpg';


export default function Profile() {



    return (
        <>

        <Container className="flex ml-4 align-items-center justify-content-center" style={{minHeight: "100vh"}}>
            <Row>
                <Col xs={12} md={3}>
                    <Row className="d-flex align-items-center justify-content-center">
                        <img class={`${classes.accountimage}`} src={Test}></img> {/* <== replace src*/}
                    </Row>
                    <div className="d-flex align-items-center justify-content-center">
                        <h4 className={`${classes.font} m-1`}>Name</h4>
                    </div>
                    <div>
                        <h6 className={`${classes.font} ml-2 mt-2`}>About Info</h6>
                    </div>
                    
                    <div className={`${classes.container} ${classes.font}`}>
                        <p className={`${classes.infolabel}`}>Address</p>   {/*Change me for dynamic text*/}
                        <p className ={`${classes.infotext}`}>420 69st Scranton, New York 16996 </p>
                        <p className={`${classes.infolabel}`}>Email</p>
                        <p className ={`${classes.infotext}`}>420blazeit@hotmail.com </p>
                        <p className={`${classes.infolabel}`}>Phone</p>
                        <p className ={`${classes.infotext}`}>347-420-6996 </p>
                        <p className={`${classes.infolabel}`}>About Us</p>
                        <p className ={`${classes.infotext}`}>I'mma hyuck you up, and fill you up with my charitable meat! </p>
                    </div>
                    <Button className={`w-100 ${classes.profilebutton}`} >Edit Profile</Button>
                </Col>
                <Col className="ml-3" xs={12} md={7}>
                    <Row>
                        <div className="w-100 align-items-center justify-content-center">
                            <h6 className={`${classes.font} m-3 mb-2`} style={{textAlign:"center"}}>Favorite blah blah</h6> {/*Replace with dynamic */}
                        </div>
                        <div className={`${classes.container} ${classes.font}`}>
                            {/* Insert carousel */}
                            <a
                            class={`m-3 align-items-center m-2 ${classes.favbox}`}
                            href='/profile'  
                            >    
                            {/*Change href to dynamic*/}
                                <img
                                    class={`m-3 rounded-circle d-inline-block ${classes.favimg}`}
                                    src={Test}
                                />
                            </a>
                        </div>
                    </Row>
                    <Row>
                        <div className="w-100 align-items-center justify-content-center">
                            <h6 className={`${classes.font} m-3 mt-4`} style={{textAlign:"center"}}>Recent blah blah</h6> {/*Replace with dynamic */}
                        </div>
                        <div className={`${classes.container} ${classes.font}`} style={{minHeight: '55vh'}}>
                            <div className={`${classes.postings} ${classes.font}`}>

                            </div>
                            
                            <div className={`${classes.postsection} ${classes.font} align-items-center justify-content-center`}>
                                <Row>
                                    <InputGroup className="mt-3 pr-4 pl-4" style={{minWidth: "50%"}}>
                                        <FormControl
                                        placeholder="Post Something..."
                                        aria-label="Post Something..."
                                        aria-describedby="basic-addon2"
                                        />
                                        <InputGroup.Append>
                                        <Button className={`${classes.postbutton}`}>Post</Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </Row>
                            </div>
                        </div>
                    </Row>
                </Col>
            </Row>
        </Container>

        </>
    )
}