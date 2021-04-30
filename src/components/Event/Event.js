import styles from './Event.module.scss';
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Fire from '../../firebase.config';
import { Button, Form, Alert } from 'react-bootstrap';

function Event() {
  let db = Fire.db;
  const user = useAuth().currentUser.email;
  const Address = useRef();
  const ItemLists = useRef();
  const date = useRef();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [view, setView] = useState(false);
  const [array, setArray] = useState([]);
  const [id, setId] = useState('');
  const [orgName, setOrgName] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      db.getCollection('Events')
        .doc()
        .set({
          orgName: orgName,
          address: Address.current.value,
          itemLists: ItemLists.current.value,
          date: date.current.value,
          id: id,
        })
        .then((response) => {
          setSuccess('Event successfully created');
        })
        .catch((error) => setError(error.message));
    } catch (err) {
      setError('');
      setError(err.message);
    }
  }

  useEffect(() => {
    db.getCollection('Users')
      .where('email', '==', user)
      .get()
      .then((snapShotQuery) => {
        const typeCheck = snapShotQuery.docs.filter((doc) => doc.data().type === 'charity').length;
        console.log(typeCheck);
        if (typeCheck === 1) {
          setView(true);
        }
      })
      .catch((error) => setError(error.message));
  }, []);

  useEffect(() => {
    db.getCollection('Users')
      .where('email', '==', user)
      .get()
      .then((snapShotQuery) => {
        let typeCheck = snapShotQuery.docs.filter((doc) => doc.data().type === 'charity').length;

        if (typeCheck === 1) {
          setView(true);
        }
      })
      .catch((error) => setError(error.message));

    let array = [];
    db.getCollection('CharityDetails')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          array.push(doc.data().orgName);
        });
        setArray(array);
      });
  }, []);

  function updateId() {
    let zone = document.getElementById('idselect');

    if (zone && zone.value != null) {
      setOrgName(zone.value);
      setId(zone.value.toString().toLowerCase().replaceAll(' ', '-'));
    }
  }

  const viewPage = (
    <div className={styles.rectangle}>
      <div>
        <h1 className={styles.headline}>Schedule an Event</h1>
      </div>
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group id="orgName">
          <Form.Label className={styles.label}>
            Organization Name
            <br />
          </Form.Label>

          <select id="idselect" class="form-select" className={styles.label1} onChange={updateId}>
            <option selected>Choose a Charity</option>

            {array.map((item) => (
              <option value={item}>{item}</option>
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
        <Button type="post" className={styles.postbutton}>
          Post
        </Button>
      </Form>
    </div>
  );

  let cantViewPage = (
    <div>
      <h1>Not authorized to view this page</h1>
    </div>
  );

  cantViewPage = (
    <div>
      <h1 className={styles.cantView}>Not authorized to view this page</h1>
    </div>
  );

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}

      {view === true ? viewPage : cantViewPage}

      {view === true ? viewPage : cantViewPage}
    </div>
  );
}

export default Event;
