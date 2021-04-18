import React, {useRef, useState} from 'react'
import {Card, Form, Button, Alert} from 'react-bootstrap';
import {useAuth} from '../../context/AuthContext';
import Fire from '../../firebase.config';
import classes from './SignUp.module.css';
import {Link} from 'react-router-dom';

export default function SignUp() {

    const userNameRef = useRef();
    const emailRef =useRef();
    const phoneNumberRef= useRef();
    const passwordRef= useRef();
    const passwordConfirmRef = useRef();
    const CIDRef = useRef(); // charity identification reference
    const fNameRef =useRef(); // first Name
    const lNameRef = useRef(); // last Name
    const oNameRef = useRef(); //organization Name
    const rNameRef = useRef(); // restaurant Name
    const {signup} = useAuth();
    const [error,setError]=useState('');
    const [loading,setLoading]=useState(false);
    const [optionPage, setOptionPage]=useState((<div></div>));

    

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

    const UserPage= (
        <Form.Row>
            <Form.Group id="email">
                <Form.Label>
                    Username
                </Form.Label>
                <Form.Control type="text" ref={userNameRef} required/>
            </Form.Group>
            <Form.Group id="email">
                <Form.Label>
                    First Name
                </Form.Label>
                <Form.Control type="text" ref={fNameRef} required/>
            </Form.Group>
            <Form.Group id="email">
                <Form.Label>
                    Last Name
                </Form.Label>
                <Form.Control type="text" ref={lNameRef} required/>
            </Form.Group>
        </Form.Row>
    )

    const CharityPage=(
    <Form.Row>
        <Form.Group id="cid">
            <Form.Label>
                Charity Identity Number (CIN)
            </Form.Label>
            <Form.Control type="text" ref={CIDRef} required/>
        </Form.Group>
        <Form.Group id="ogranizationName">
            <Form.Label>
                Organization Name
            </Form.Label>
            <Form.Control type="text" ref={oNameRef} required/>
        </Form.Group>
    </Form.Row>
    )

    const RestaurantPage =(
        <Form.Row>
        <Form.Group id="restaurantName">
            <Form.Label>
                Restaurant Name
            </Form.Label>
            <Form.Control type="text" ref={rNameRef} required/>
        </Form.Group>
    </Form.Row>

    )

    const updateOption=(e)=>{
        let option = parseInt(e.target.value)
        switch(option){
            case 1: setOptionPage(UserPage); break;
            case 2: setOptionPage(CharityPage);break;
            case 3: setOptionPage(RestaurantPage);break;
            default:setOptionPage(UserPage);break;
        }
    }


    return (
        <>
            <Card className={`${classes.container} ${classes.font}`}>
                <Card.Body>
                <h2 className="text-center mb-4">Sign Up</h2>
                {error &&<Alert variant="danger">{error}</Alert>}
                
                <Form onSubmit={handleSubmit} > 
                     {optionPage}                 
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
                    <Form.Row>
                        <Form.Group id="email">
                            <Form.Label>
                                Email
                            </Form.Label>
                            <Form.Control type="email" ref={emailRef} required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="text" ref={phoneNumberRef} required />
                        </Form.Group>
                    </Form.Row>
                    <Form.Group>
                  
                        <Form.Check
                            inline
                            type="radio"
                            label="User" 
                            id="options"
                            value="1"
                            name="option"
                            onClick={updateOption}
                            />
                        <Form.Check
                            inline
                            type="radio"
                            label="Charity" 
                            id="options"
                            value="2"
                            name="option"
                            onClick={updateOption}                         
                            />
                        <Form.Check
                            inline
                            type="radio"
                            label="Restaurant" 
                            id="options"
                            value="3"
                            name="option"
                            onClick={updateOption}
                            />
                     
                    </Form.Group>

                    <Button type="submit" className={`w-100 ${classes.submitbutton}`} disabled={loading}>Sign up</Button>
                </Form>
                </Card.Body>
            </Card>
            <div className= "w-100 text-center mt-2 color-white">
                Already have an account ? <Link to="/login">Login</Link>
            </div>
        </>
    )
}
