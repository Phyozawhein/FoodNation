
import React, {useRef, useState} from 'react'
import {Card, Form, Button, Alert} from 'react-bootstrap';
import {useAuth} from '../../context/AuthContext';
import Fire from '../../firebase.config';
import classes from './Login.module.css';
import {Link} from 'react-router-dom';
import firebase from 'firebase';

export default function Login() {
    
    const emailRef =useRef();
    const passwordRef= useRef();
    const {signup, currentUser} = useAuth();
    const [error,setError]=useState('');
    const [loading,setLoading]=useState(false);
    let db = Fire.db;


    async function  handleSubmit(e){
        e.preventDefault();
        }
        
        try{
            setLoading(true)
            
            firebase.auth().signInWithEmailAndPassword(emailRef, passwordRef)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
  });
        }
        catch(err){

            setError('');
            setError(err.message);
            setLoading(false);
        }
        setLoading(false);
       

    
    return (
        <>
        <Card className={`${classes.container} ${classes.font}`}>
            <Card.Body>
            <h2 className="text-center mb-4">Log In</h2>
            {error &&<Alert variant="danger">{error}</Alert>}
            
            <Form onSubmit={handleSubmit} >
                <Form.Group id="email">
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

                <Button type="submit" className="w-100" disabled={loading}>Log in</Button>
            </Form>
            </Card.Body>
        </Card>
        <div className= "w-100 text-center mt-2">
           <b style={{color:"white"}}>
            Don't have an account ? <Link to="/signup">Signup</Link>
            </b>
        </div>
    </>
    )
}
