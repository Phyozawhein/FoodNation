import React from 'react'
import  { useState, useEffect } from 'react';
import Fire from '../../firebase.config';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import classes from './RecentReviews.module.scss';

const RecentReviews = ()  =>{
    const {currentUser} = useAuth();
    const { id } = useParams();
    const { db } = Fire; 
    const [reviews, setReviews] = useState([]);
    // const [date, setDate] = useState('');
    // const [rating, setRating] = useState('');
    // const [review, setReview] = useState('');
    // const [writer, setWriter] = useState('');


    
    useEffect(() => {
        db.getCollection('CharityDetails')
        .where('id', '==', id)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc)=>{
                const reviews = doc.data().reviews;
                // let fordate = new Date(.date);
                // fordate = fordate.toLocaleString('en-US', { timeZone: 'America/New_York' });
                // const review = doc.data().review;
                // const rating = doc.data().rating;
                // const writer = doc.data().writer;
                // setDate(fordate);
                 setReviews(reviews.reverse());
                // setReview(review);
                // setRating(rating);
                // setWriter(writer);
            });

        })
        .catch((error) => {
            console.log('Error getting documents: ', error);
        });
    }, []);
   
        
//// reviews = [ review1 , review2 , review3]
//// review1 = { write, review , date, rating}
return(
    <div className ={classes.container}>
    {
            reviews.map(review =>(
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
            )
            )

        }
    </div>
        )
    
}

export default RecentReviews;
