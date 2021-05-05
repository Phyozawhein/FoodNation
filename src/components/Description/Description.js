import React from 'react'
import  { useState, useEffect } from 'react';
import Fire from '../../firebase.config';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import classes from './description.module.css';




const Description = (props) => {
 
    return (
     
            
                <p >Description: {props.description}</p>

                 )
               }

export default Description;
