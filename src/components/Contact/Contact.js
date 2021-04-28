import React, { useRef, useState } from 'react';
import classes from './Contact.module.scss';

import firebase from 'firebase';
import Fire, { db } from '../../firebase.config';
import { Form, Container, Button,Alert } from 'react-bootstrap';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [success,setSuccess]=useState('');

  const { db } = Fire;

  const handleSubmit = (e) => {
    e.preventDefault();
    db.getCollection('contacts')
      .add({
        name,
        email,
        subject,
        message,
      })
      .then(() => {
        setSuccess("Message has been submitted");
      })
      .catch((error) => {
        alert(error.message);
      });
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };
  //style={{ minHeight: '100vh' }} className={`${classes.Container} d-flex align-items-center justify-content-center`}
  return (
    <div>
      <h1 className={classes.headline}>CONTACT US 📞</h1>
      <div className= {classes.alert}>{success &&<Alert variant="success">{success}</Alert>}</div>
      
      <Container onSubmit={handleSubmit} className={classes.Container}>
        <Form className={classes.form}>
          <Form.Group className={classes.group}>
            <Form.Label>Name:*</Form.Label>
            <Form.Control type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          </Form.Group>
          <Form.Group className={classes.group}>
            <Form.Label>Email:*</Form.Label>
            <Form.Control type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Form.Group>
          <Form.Group className={classes.group}>
            <Form.Label>Subject:*</Form.Label>
            <Form.Control type="text" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} required />
          </Form.Group>
          <Form.Group className={classes.group}>
            <Form.Label>Message :*</Form.Label>
            <Form.Control as="textarea" rows={3} value={message} onChange={(e) => setMessage(e.target.value)} required />
          </Form.Group>
          <Button type="submit" className={classes.submitbutton}>
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Contact;