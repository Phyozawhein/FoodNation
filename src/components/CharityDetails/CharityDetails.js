import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Col, Row } from 'react-bootstrap';
import styles from './CharityDetails.module.css';
import { useAuth } from '../../context/AuthContext';
import Fire from '../../firebase.config';

function CharityDetails() {
  // let announcements=[]
  // let description  =""
  const { currentUser } = useAuth();

  const { id } = useParams();
  const { db } = Fire;
  const [announcements, setAnnouncement] = useState([]);
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    db.getCollection('CharityDetails')
      .where('id', '==', id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          const announcements = doc.data().Announcement;
          const { description } = doc.data();
          const imageUrl = doc.data().imgUrl;
          const date = announcements.Date.toDate().toLocaleString('en-US', { timeZone: 'America/New_York' }).toString();

          setAnnouncement(announcements);
          setDescription(description);
          setImageUrl(imageUrl);
          setDate(date);
        });
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
  }, []);

  return (
    <div>
      <img className={styles.tinyImg} src={imageUrl} />
      <br />
      <p style={{ color: 'white', fontSize: 40, marginLeft: '16%', maxWidth: '70%' }}>Description: {description}</p>
      <br />
      <p style={{ color: 'white', fontSize: 40, marginLeft: '16%', maxWidth: '70%' }}>Event Details: {announcements.EventDetails}</p>
      <br />
      <Row>
        <Col>
          <p style={{ color: 'white', fontSize: 40, marginLeft: '32%', maxWidth: '70%' }}>Venue: {announcements.Venue}</p>
        </Col>
        <Col>
          <Button className={styles.buttons}>Directions</Button>
        </Col>
      </Row>

      <br />
      <p style={{ color: 'white', fontSize: 40, marginLeft: '16%', maxWidth: '70%' }}>Date: {date}</p>
      <br />
      <div style={{ paddingLeft: '45%', minWidth: '50rem' }}>
        <Button className={styles.buttons}>Donate</Button>
      </div>
    </div>
  );
}

export default CharityDetails;
