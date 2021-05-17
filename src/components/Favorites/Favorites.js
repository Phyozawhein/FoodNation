import React from "react";
import { useState, useEffect } from "react";
import { Container, InputGroup, FormControl, Col, Row, Button, Form } from "react-bootstrap";
import Fire from "../../firebase.config";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import classes from "./Favorites.module.css";
import Tiles from "../Tiles/Tiles";


const Favorites = (props) => {
  
  return (
    <>
      <Tiles slidesPerView={5} favorites={props.favorites}/>
    </>
  );
};

export default Favorites;
