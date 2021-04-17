import React, {useRef, useState} from 'react'
import {Card, Form, Button, Alert} from 'react-bootstrap';
import {useAuth} from '../../context/AuthContext';
import Fire from '../../firebase.config';
import classes from './SignUp.module.css'
export default function SignUp() {

    const emailRef =useRef();
    const passwordRef= useRef();
    const passwordConfirmRef = useRef();
    const {signup, currentUser} = useAuth();
    const [error,setError]=useState('');
    const [loading,setLoading]=useState(false);
    let db = Fire.db;
    async function  handleSubmit(e){
        e.preventDefault();

        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('Passwords do not match')
        }
        try{
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value);
            // need to add a measure to prevent duplicate account (using email address)


            db.getCollection('Users').doc().set({
                email: emailRef.current.value,
                password: passwordRef.current.value
                
            }).then(response=>{
                console.log("Success");
                
            }).catch(error=> setError(error.message));
            setLoading(false)
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
            <div className= "w-100 text-center mt-2">
                Already have an account ? Login
            </div>
        </>
    )
}
