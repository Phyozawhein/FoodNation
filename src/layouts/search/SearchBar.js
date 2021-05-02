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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange = (e) => {
    if (errorMsg) {
      setErrorMsg("");
    }
    const searchVal = e.target.value.trim();

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
  };

  return (
    <>
      <Button variant="light" onClick={handleShow}>
        Search
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Form.Control type="text" onChange={handleChange} />
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
              <Link to={url}>
                <Card key={match.email}>
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
