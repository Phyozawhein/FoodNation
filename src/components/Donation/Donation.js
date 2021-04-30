import styles from './Donation.module.css';
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Fire from '../../firebase.config';
import { Button, Form, Alert } from 'react-bootstrap';

function Donation() {
  let db = Fire.db;
  const user = useAuth().currentUser.email;
  const ResName = useRef();
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
      db.getCollection('Donation')
        .doc()
        .set({
          resName: ResName.current.value,
          orgName: orgName,
          address: Address.current.value,
          itemLists: ItemLists.current.value,
          date: date.current.value,
          orgid: id,
          resid: ResName.current.value.toString().toLowerCase().replaceAll(' ', '-'),
        })
        .then((response) => {
          setSuccess('Donation appointment created');
        })
        .catch((error) => {
          console.log(error);
          setError(error.message);
        });
    } catch (err) {
      console.log(err);
      setError('');
      setError(err.message);
    }
  }

  useEffect(() => {
    db.getCollection('Users')
      .where('email', '==', user)
      .get()
      .then((snapShotQuery) => {
        let typeCheck = snapShotQuery.docs.filter((doc) => doc.data().type === 'restaurant').length;

        if (typeCheck === 1) {
          setView(true);
        }
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });

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
      setOrgName(zone.value); // FIX ME
      setId(zone.value.toString().toLowerCase().replaceAll(' ', '-'));
    }
  }

  const viewPage = (
    <div className={styles.rectangle}>
      <div>
        <h1 className={styles.headline}>Schedule a Donation</h1>
      </div>
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group id="resName">
          <Form.Label className={styles.label}>
            Restaurant Name
            <br />
          </Form.Label>
          <Form.Control className="input" type="text" ref={ResName} required />
        </Form.Group>
        <br />
        <Form.Group id="orgName">
          <Form.Label className={styles.label}>
            Organization Name
            <br />
          </Form.Label>

<<<<<<< HEAD
          <select id="idselect" className="form-select" className={styles.label1} onChange={updateId}>
=======
          <select id="idselect" class="form-select" className={styles.label1} onChange={updateId}>
>>>>>>> 52901070636dcbd3c6aa133a273c0d809ab0a7a5
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

  const cantViewPage = (
    <div>
      <h1 className="cantView">Not authorized to view this page</h1>
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
