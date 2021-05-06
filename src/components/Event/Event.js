import React, { useState, useRef, useEffect } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import styles from "./Event.module.css";
import { useAuth } from "../../context/AuthContext";
import Fire from "../../firebase.config";

function Event() {
  const { db } = Fire;
  const user = useAuth().currentUser.email;
  const Address = useRef();
  const ItemLists = useRef();
  const date = useRef();
  const average = useRef();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [view, setView] = useState(false);
  const [id, setId] = useState("");
  const [orgName, setOrgName] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      db.getCollection("Events")
        .doc()
        .set({
          orgName,
          address: Address.current.value,
          itemLists: ItemLists.current.value,
          date: date.current.value,
          average: average.current.value,
          id,
        })
        .then((response) => {
          setSuccess("Event successfully created");
        })
        .catch((error) => setError(error.message));
    } catch (err) {
      setError("");
      setError(err.message);
    }
  }

  useEffect(() => {
    db.getCollection("Users")
      .where("email", "==", user)
      .get()
      .then((snapShotQuery) => {
        const typeCheck = snapShotQuery.docs.find((doc) => doc.data().type === "charity");
        if (typeCheck) {
          setView(true);
          setOrgName(typeCheck.data().username);
          setId(typeCheck.data().id);
        }
      })
      .catch((error) => setError(error.message));
  }, []);

  function updateId() {
    const zone = document.getElementById("idselect");

    if (zone && zone.value != null) {
      setOrgName(zone.value);
      setId(zone.value.toString().toLowerCase().replaceAll(" ", "-"));
    }
  }

  const viewPage = (
    <div className={styles.rectangle}>
      <div>
        <h1 className={styles.headline}>Schedule an Event</h1>
      </div>
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleSubmit}>
        <br />
        <Form.Group id="address">
          <Form.Label className={styles.label}>
            Address
            <br />
          </Form.Label>
          <Form.Control className="input" type="text" ref={Address} required />
        </Form.Group>
        <br />
        <Form.Group id="itemLists">
          <Form.Label className={styles.label}>
            Item Lists
            <br />
          </Form.Label>
          <Form.Control className="input1" type="textarea" ref={ItemLists} required />
        </Form.Group>
        <br />
        <br />

        <Form.Group id="date">
          <Form.Label className={styles.label}>
            Choose a Date
            <br />
            <br />
          </Form.Label>
          <Form.Control className="date" type="datetime-local" ref={date} required />
        </Form.Group>
        <br />
        <Form.Group id="average">
          <Form.Label className={styles.label}>
            Estimated No. of People
            <br />
          </Form.Label>
          <Form.Control className="input" type="text" ref={average} required />
        </Form.Group>
        <Button type="post" className={styles.postbutton}>
          Post
        </Button>
      </Form>
    </div>
  );

  let cantViewPage = (
    <div className={styles.cantView}>
      <h1>Not authorized to view this page</h1>
    </div>
  );

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}

      {view === true ? viewPage : cantViewPage}

    </div>
  );
}

export default Event;