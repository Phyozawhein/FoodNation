import React from "react";
import { useState, useEffect } from "react";
import Fire from "../../firebase.config";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Row } from "react-bootstrap";
import classes from "./RecentReviews.module.css";
import ReactStars from "react-rating-stars-component";
import firebase from "firebase/app";

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
    </div>
  );
};

export default RecentReviews;
