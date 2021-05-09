import React from 'react'
import  { useState, useEffect } from 'react';
import { Container, InputGroup, FormControl, Col, Row, Button, Form } from "react-bootstrap";
import Fire from '../../firebase.config';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';


const NumOfDonation = () => {
    const { db } = Fire;
    const { currentUser } = useAuth();
    const []
    return (
        <div>
            
        </div>
    )
}

export default NumOfDonation;
