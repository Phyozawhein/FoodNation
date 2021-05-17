import React from 'react'
import  { useState, useEffect } from 'react';
import { Container, InputGroup, FormControl, Col, Row, Button, Form } from "react-bootstrap";
import Fire from '../../firebase.config';
import { useAuth } from '../../context/AuthContext';
import classes from './Donationlist.module.css';


const Donationlist = () => {
    const { db } = Fire;
    const user = useAuth().currentUser.email
    const [view,setView]=useState(false);
    const [display, setDisplay] = useState([]);
    const [error, setError] = useState({});

    useEffect(() => {
        let id;
        
        db.getCollection("Users").doc(user).get()
                .then((doc) => {

                    const typeCheck = doc.data();
                    
                    if (typeCheck.type==="restaurant") {

                        id = typeCheck.id;
                        return id;
                        
        
                    }
                  }
                    
            )
            .then((id)=>{
            db.getCollection("Donation")
            .where("resid", "==", id)
            .where("status", "==", "completed")
            .get().
            then((querySnapshot) => {
            
              let display = [];
              querySnapshot.forEach((doc) => {
                display.push(doc.data().orgName);
                });
                console.log(display);
                setDisplay(display);
            })
          })
          .catch((error) => {
            console.log(error);
            setError(error.message);
          
          });
          
    
        }, []);

    return (
        <div >
          <p className ={classes.container1}>List of charity the restaurant has donated. </p>
        {
                display.map(view =>(
                    <div className ={classes.container}>
                    <div key={view.id}>
                    <br />
                    <p style={{ color: 'white', fontSize: 40, marginLeft: '16%', maxWidth: '70%' }}>Charity: {view}</p>
                    <br />
                    </div>
                   
                </div>
                )
                )
    
            }
        </div>
    )
}


export default Donationlist;
