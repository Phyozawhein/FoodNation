import React from 'react'
import  { useState, useEffect } from 'react';
import Fire from '../../firebase.config';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import classes from './description.module.scss';




const Description = () => {
 const { currentUser } = useAuth();

  const { id } = useParams();
  const { db } = Fire;
  
  
  const [description, setDescription] = useState('');

  useEffect(() => {
    db.getCollection('CharityDetails')
      .where('id', '==', id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          
          const { description } = doc.data();
          setDescription(description);
         
          
       
        });
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
  }, []);

    return (
     
            <div >
                <div className ={classes.container}>
                <p style={{ color: 'white', fontSize: 40, marginLeft: '16%', maxWidth: '70%' }}>Description: {description}</p>
                </div>
            </div>
                 )
               }
                 
            
                
     
     
            

export default Description;
