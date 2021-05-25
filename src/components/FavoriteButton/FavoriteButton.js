import React, { useState, useEffect } from "react";
import { Container, InputGroup, FormControl, Col, Row, Button, Modal, Form } from "react-bootstrap";
import ProfileTabsUser from "../ProfileTabs/ProfileTabsUser";
import Favorites from "../Favorites/Favorites";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Fire, { storage } from "../../firebase.config";
import classes from "./FavoriteButton.module.css";
import sha256 from "js-sha256";
import ReactStars from "react-rating-stars-component";
import firebase from "firebase/app";
import { IconButton } from "@material-ui/core";
import FavoriteIcon from '@material-ui/icons/Favorite';

export default function FavoriteButton(props){

    const { db } = Fire;
    const { currentUser } = useAuth();
    let [favby, setFavby] = useState();
    let [favorited, setFavorited] = useState(false);

    // async function favorite(){
    //     db.getCollection("Users")
    //     .doc(currentUser.email)
    //     .get()
    //     .then((doc) => {
    //         if (doc.exists) {
    //             db.getCollection("Users")
    //             .doc(currentUser.email)
    //             .update({ favorites: {...doc.data().favorites, [props.email]: props.imgUrl}})
    //         }
    //     })
    //     .then(
    //         db.getCollection("Users")
    //         .doc(props.email)
    //         .get()
    //         .then((doc) => {
    //             if (doc.exists) {
    //                 db.getCollection("Users")
    //                 .doc(props.email)
    //                 .update({ favoritedBy: firebase.firestore.FieldValue.arrayUnion(currentUser.email)})
    //             }
    //         })
    //     )
    //     .then(() => {
    //       db.getCollection("Users")
    //         .doc(props.email)
    //         .onSnapshot((doc) => {
    //           const res = doc.data(); // "res" will have all the details of the user with the id parameter we fetched from url
    //           // console.log(res);
    //          setFavby(res.favoritedBy);
    //         });
    //     })
    //     .catch((error) => console.log(error.message));
    // }

    // const checkFavoritedBy = () => {
    //     if
    //         favby.includes(currentUser.email)
    // }


    return(
        <>
        {props.favoritedBy != null ? 
        <>{props.favoritedBy.includes(currentUser.email) ? <>
            <IconButton onClick={() => { alert('Unfavorited :('); {props.handleFavoriteDelete()}; }} className={`${classes.profilebutton}`} >
                <FavoriteIcon className={classes.iconsfavorited}/> 
            </IconButton>
        </> :
            <IconButton onClick={() => { alert('Favorited!'); {props.handleFavorite()}; }} className={`${classes.profilebutton}`} >
                <FavoriteIcon className={classes.icons}/> 
            </IconButton>
        }</> :
        <><IconButton onClick={() => { alert('Favorited!'); {props.handleFavorite()};}} className={`${classes.profilebutton}`} >
                <FavoriteIcon className={classes.icons}/> 
            </IconButton></>
        }
        </>

    );

}

