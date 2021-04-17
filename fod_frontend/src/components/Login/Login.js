
import React, {useRef, useState} from 'react'
import {Card, Form, Button, Alert} from 'react-bootstrap';
import {useAuth} from '../../context/AuthContext';
import Fire from '../../firebase.config';
import classes from './Login.module.css';
import {Link} from 'react-router-dom';
export default function Login() {
    
    const emailRef =useRef();
    const passwordRef= useRef();
    const passwordConfirmRef = useRef();
    const {signup, currentUser} = useAuth();
    const [error,setError]=useState('');
    const [loading,setLoading]=useState(false);
    let db = Fire.db;
    return (
        <>
        <Card className={`${classes.container} ${classes.font}`}>
            <Card.Body>
            <h2 className="text-center mb-4">Sign Up</h2>
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
                <Form.Group id="password-confirm">
                    <Form.Label>
                        Password Confirmation
                    </Form.Label>
                    <Form.Control type="password" ref={passwordConfirmRef} required/>
                </Form.Group>
                <Button type="submit" className="w-100" disabled={loading}>Sign up</Button>
            </Form>
            </Card.Body>
        </Card>
        <div className= "w-100 text-center mt-2 color-white">
            Already have an account ? <Link to="/login">Login</Link>
        </div>
    </>
    )
}
