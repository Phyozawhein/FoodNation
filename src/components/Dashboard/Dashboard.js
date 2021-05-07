import React, { useState, useEffect } from "react";
import { Card, CardColumns, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import classes from "./Dashboard.module.css";
import Fire from "../../firebase.config";
import SearchBar from "../../layouts/search/SearchBar";
export default function Dashboard() {
  const { db } = Fire;
  const [charities, setCharity] = useState([]);

  useEffect(() => {
    db.getCollection("Users").where("type","==","charity")
      .get()
      .then((querySnapShot) => {
        const charityArray = [];
        querySnapShot.forEach((doc) => {
          charityArray.push(doc.data());
        });
        setCharity(charityArray);
      })
      .catch((error) => console.log(error.message));
  }, []);

  return (
    <Container className={classes.cardContainer}>
      <SearchBar />
      <CardColumns>
        {charities.map((charity, id) => (
          <Card className={classes.charityCard} key={id}>
            <Link to={`/charity/${charity.id}`}>
              <Card.Img src={charity.imgUrl} />
            </Link>
          </Card>
        ))}
      </CardColumns>
    </Container>
  );
}
