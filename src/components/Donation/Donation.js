import styles from "./Donation.module.css";
import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import Fire from "../../firebase.config";
import { Button, Form, Alert, Container } from "react-bootstrap";
import sha256 from "js-sha256";

function Donation() {
  let db = Fire.db;
  const user = useAuth().currentUser.email;
  const Address = useRef();
  const ItemLists = useRef();
  const date = useRef();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [view, setView] = useState(false);
  const [array, setArray] = useState([]);
  const [charid, setCharId] = useState("");
  const [resid, setResId] = useState("");
  const [orgName, setOrgName] = useState("");
  const [resName, setResName] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      db.getCollection("Donation")
        .doc()
        .set({
          resName: resName,
          orgName: orgName,
          address: Address.current.value,
          itemLists: ItemLists.current.value,
          date: date.current.value,
          orgid: charid,
          resid: resid,
          status: "open",
        })
        .then((response) => {
          setSuccess("Donation appointment created");
        })
        .catch((error) => {
          console.log(error);
          setError(error.message);
        });
    } catch (err) {
      console.log(err);
      setError("");
      setError(err.message);
    }
  }

  useEffect(() => {
    db.getCollection("Users")
      .where("email", "==", user)
      .get()
      .then((snapShotQuery) => {
        const typeCheck = snapShotQuery.docs.find((doc) => doc.data().type === "restaurant");
        if (typeCheck) {
          setView(true);
          setResName(typeCheck.data().username);
          setResId(typeCheck.data().id);
        }
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });

    db.getCollection("Users")
      .where("type", "==", "charity")
      .get()
      .then((querySnapshot) => {
        let array = [];
        querySnapshot.forEach((doc) => {
          array.push([doc.id, doc.data().username]);
        });
        setArray(array);
      });
  }, []);

  function updateId(e) {
    let zone = e.target.value;

    let pone = zone.split(",");

    if (zone != null) {
      setCharId(sha256(pone[0]));
      setOrgName(pone[1]);
    }
  }

  const viewPage = (
    <Container className={styles.container}>
      <div className={styles.rectangle}>
        <div>
          <h1 className={styles.headline}>Schedule a Donation</h1>
        </div>
        {success && <Alert variant="success">{success}</Alert>}

        <Form onSubmit={handleSubmit}>
          <br />
          <Form.Group id="orgName">
            <Form.Label className={styles.label}>
              Organization Name
              <br />
            </Form.Label>

            <select id="idselect" className={styles.label1} onChange={updateId}>
              <option selected>Choose a Charity</option>

              {array.map((item) => (
                <option value={item}> {item[1]} </option>
              ))}
            </select>
          </Form.Group>
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
          <Button type="post" className={`  w-100 text-center mt-2 ${styles.postbutton}`}>
            Post
          </Button>
        </Form>
      </div>
    </Container>
  );

  const cantViewPage = (
    <div>
      <h1 className={styles.cantView}>Not authorized to view this page</h1>
    </div>
  );

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}

      {view === true ? viewPage : cantViewPage}
    </div>
  );
}

export default Donation;
