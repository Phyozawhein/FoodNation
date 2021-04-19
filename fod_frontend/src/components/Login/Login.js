import React, {useRef, useState} from 'react'
import {Container, Card, Row, Form, Button, Alert} from 'react-bootstrap';
import Fire from '../../firebase.config';
import classes from './Login.module.css';
import {Link, useHistory} from 'react-router-dom';
import {ReactComponent as Logo} from '../../assets/FN-Logo.svg';
import firebase from 'firebase';

export default function Login() {
    
    const history = useHistory()
    const emailRef =useRef();
    const passwordRef= useRef();
    const [error,setError]=useState('');
    const [loading,setLoading]=useState(false);

    let db = Fire.db;


    async function  handleSubmit(e){
        e.preventDefault();

        try{
            setLoading(true)
            
            firebase.auth().signInWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
            .then((userCredential) => {
              // Signed in
              var user = userCredential.user;
              // ...
              console.log("Logged in");
              history.push("/charitydetails");
            })
            .catch((error) => {
              let errorCode = error.code;
              let errorMessage = error.message;
              setError(error.message)
            });

        }
        catch(err){

            setError('');
            setError(err.message);
            setLoading(false);
        }
        setLoading(false);
    }   

    return (
        <>
        <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
            <div className="w-100" style={{maxWidth: "500px"}}>
            <Card className={`${classes.container} ${classes.font}`}>
                <Card.Body>
                <Row className="d-flex align-items-center justify-content-center">
                   <Logo className={classes.logo}/>
                </Row>
                {error &&<Alert variant="danger">{error}</Alert>}
                
                <Form onSubmit={handleSubmit} > 
                    <Form.Group  className={classes.contact}>
                        <Form.Label>
                            Email
                        </Form.Label>
                        <Form.Control type="email" ref={emailRef} required/>
                    </Form.Group>                 
                    <Form.Group id="password">
                        <Form.Label>
                            Password
                        </Form.Label>
                        <Form.Control type="password" ref={passwordRef} required/>
                    </Form.Group>                  

                    <Button type="submit" className={`w-100 ${classes.submitbutton}`} disabled={loading}>Log in</Button>
                </Form>
                </Card.Body>
            </Card>
            <div className= {`${classes.font} w-100 text-center mt-2`}>
               <b style={{color: "white"}}>
                   Don't have an account ? <Link to="/signup">Signup</Link>
                </b> 
            </div>
            </div>
            </Container>
        </>
    )
}