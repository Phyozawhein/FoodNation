import React from "react";
import { useState, useEffect } from "react";
import Fire from "../../firebase.config";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Row } from "react-bootstrap";
import classes from "./RecentReviews.module.css";
import ReactStars from "react-rating-stars-component";
import firebase from "firebase/app";

<<<<<<< HEAD
const RecentReviews = (props) => {
  return (
    <div>
      <div className={classes.postings}>
        {props.reviews &&
          props.reviews.map((rev, index) => (
            <Row key={index}>
              <div className={classes.container}>
                <ReactStars count={5} edit={false} size={24} value={rev.rating} isHalf={true} emptyIcon={<i className="far fa-star"></i>} halfIcon={<i className="fa fa-star-half-alt"></i>} fullIcon={<i className="fa fa-star"></i>} activeColor="#ffd700" />
                <p>Writer : {rev.writer}</p>
                <p>Review : {rev.review}</p>
              </div>
            </Row>
          ))}
      </div>
=======
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
>>>>>>> 5f5e0d42f5c7bb222588cae160da1be89f92b9b0
    </div>
  );
};

export default RecentReviews;
