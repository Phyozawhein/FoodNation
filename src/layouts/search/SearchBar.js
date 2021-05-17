import React, { useState } from "react";
import { Form, Button, Card, Modal } from "react-bootstrap";
import Fire from "../../firebase.config";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import classes from "./SearchBar.module.css";

const SearchBar = () => {
  const { currentUser } = useAuth();
  const { db } = Fire;
  const [show, setShow] = useState(false);
  const [matches, setMatches] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [filter, setFilter] = useState([]);
  const [textSearch, setTextSearch] = useState(true);
  const [buttonName, setButtonName] = useState("Search by Tag");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const toggleSearchType = () => {
    let txt = textSearch;
    setTextSearch(!txt);
    setMatches([]);
    if (txt) {
      setButtonName("Search by Text");
    } else {
      setButtonName("Search by Tag");
    }
  };

  const handleChange = (e) => {
    if (errorMsg) {
      setErrorMsg("");
    }
    const searchVal = e.target.value.trim();
    if (searchVal.length) {
      db.getCollection("Users")
        .where("username", ">=", searchVal)
        .where("username", "<=", searchVal + "\uf8ff")
        .get()
        .then((querySnapShot) => {
          if (!querySnapShot.empty) {
            let query = [];
            querySnapShot.forEach((doc) => query.push(doc.data()));
            setMatches(query);
          } else {
            setErrorMsg("No match found");
          }
        })
        .catch((error) => setErrorMsg(error.message));
    } else {
      setMatches([]);
    }
  };

  const handleRadiokbox = (e) => {
    db.getCollection("Users")
      .where("foodTag", "array-contains-any", [e.target.value])
      .get()
      .then((querySnapShot) => {
        let query = [];

        if (!querySnapShot.empty) {
          querySnapShot.forEach((doc) => {
            query.push(doc.data());
          });
        }
        console.log(query);
        setMatches(query);
      })
      .catch((error) => setErrorMsg(error.message));
  };

  return (
    <>
      <Button variant="light" onClick={handleShow}>
        Search
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          {textSearch ? (
            <Form.Control type="text" onChange={handleChange} />
          ) : (
            <>
              <Form.Check inline type="radio" label="Halal" id="options" value="Halal" name="option" onClick={handleRadiokbox} />
              <Form.Check inline type="radio" label="Kosher" id="options" value="Kosher" name="option" onClick={handleRadiokbox} />
              <Form.Check inline type="radio" label="Vegetarian" id="options" value="Vegetarian" name="option" onClick={handleRadiokbox} />
            </>
          )}
        </Modal.Header>
        <Modal.Header>
          <Button onClick={toggleSearchType}>{buttonName}</Button>
        </Modal.Header>
        <Modal.Body>
          {matches.map((match) => {
            let url;
            if (match.type !== "charity" && !currentUser) {
              url = `charity/${match.id}`;
            } else {
              url = `profile/${match.id}`;
            }
            return (
              <Link to={url} key={match.email}>
                <Card>
                  <Card.Body className={classes.results}>
                    <Card.Img src={match.imgUrl} />
                    <Card.Text>{match.username}</Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            );
          })}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SearchBar;
