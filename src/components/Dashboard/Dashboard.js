import React, { useState, useEffect } from "react";
import { Card, CardColumns, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import classes from "./Dashboard.module.css";
import Fire from "../../firebase.config";
import SearchBar from "../../layouts/search/SearchBar";
import { useAuth } from "../../context/AuthContext";

export default function Dashboard() {
  const { db } = Fire;
  const [charities, setCharity] = useState([]);
  const currentUser = useAuth();
  useEffect(() => {
    db.getCollection("Users")
      .where("type", "==", "charity")
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
      <hr />
      <CardColumns>
        {charities.map((charity) => {
          const linkUrl = currentUser !== undefined ? `/profile/${charity.id}` : `charity/${charity.id}`;
          return (
            <Card className={classes.charityCard} key={charity.id} data-testid="card">
              <Link to={linkUrl}>
                <Card.Img src={charity.imgUrl} />
              </Link>
            </Card>
          );
        })}
      </CardColumns>
    </Container>
  );
}
