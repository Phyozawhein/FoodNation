import React from 'react'
import  { useState, useEffect } from 'react';
import Fire from '../../firebase.config';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import classes from './RecentReviews.module.css';
import firebase from 'firebase/app';

const RecentReviews = ()  =>{
    const {currentUser} = useAuth();
    const { id } = useParams();
    const { db } = Fire; 
    const [reviews, setReviews] = useState([]);
    
    useEffect(() => {
        db.getCollection('Users')
        .where('id', '==', id)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc)=>{
                const reviews = doc.data().reviews;
                 setReviews(reviews.reverse());
               console.log(reviews);
            });

        })
        .catch((error) => {
            console.log('Error getting documents: ', error);
        });
    }, []);
   
        

return(
    <div >
    {
            reviews.map(review =>(
                <div className ={classes.container}>
                <div key={review.id}>
                <br />
                <p style={{ color: 'white', fontSize: 40, marginLeft: '16%', maxWidth: '70%' }}>Writer: {review.writer}</p>
                <br />
                <p style={{ color: 'white', fontSize: 40, marginLeft: '16%', maxWidth: '70%' }}>Rating: {review.rating}</p>
                <br />
                <br />
                <p style={{ color: 'white', fontSize: 40, marginLeft: '16%', maxWidth: '70%' }}>Date: {review.date.toDate().toLocaleString('en-US', { timeZone: 'America/New_York' })}</p>
                <br />
                <br />
                <p style={{ color: 'white', fontSize: 40, marginLeft: '16%', maxWidth: '70%' }}>Review: {review.review}</p>
                <br />
                </div>
               
            </div>
            )
            )

        }
    </div>
        )
    
}

export default RecentReviews;
