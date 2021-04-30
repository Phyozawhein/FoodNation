import React, { useRef, useState } from 'react';
import classes from './Contact.module.css';

import firebase from 'firebase';
import Fire, { db } from '../../firebase.config';
import { Form, Container, Button } from 'react-bootstrap';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

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
        alert('Message has been submitted.');
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
      <Container className={classes.Container}>
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

// <form className="form" onSubmit={handleSubmit}>
// <div className="container">
//   <label className="label">Name</label>
//   <br />
//   <input placeholder="Name" className="input" value={name} onChange={(e) => setName(e.target.value)} />
//   <br />
//   <label className="label">Email</label>
//   <br />
//   <input placeholder="Email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
//   <br />
//   <label className="label">Subject</label>
//   <br />
//   <input placeholder="Subject" className="input" value={subject} onChange={(e) => setSubject(e.target.value)} />
//   <br />

//   <label className="label">Message</label>
//   <br />
//   <textarea placeholder="Message" className="input1" value={message} onChange={(e) => setMessage(e.target.value)} />
//   <br />
// </div>
// <br />

// <button type="submit" className="submitbutton">
//   Submit
// </button>
// </form>
