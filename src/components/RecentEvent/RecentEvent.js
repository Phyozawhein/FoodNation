import React from 'react'
import  { useState, useEffect } from 'react';
import Fire from '../../firebase.config';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import classes from './recentevent.module.scss';

const recentevent = () => {
    const { currentUser } = useAuth();

  const { id } = useParams();
  const { db } = Fire;
  const [address, setAddress] = useState('');
  const [itemLists, setitemLists] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    db.getCollection('Events')
      .where('id', '==', id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
         
          const  itemLists  = doc.data().itemLists;
          const  address  = doc.data().address;
          
           let fordate = new Date(doc.data().date);
           fordate = fordate.toLocaleString('en-US', { timeZone: 'America/New_York' });
            
          setAddress(address);
          setitemLists(itemLists)
          setDate(fordate);
          
        });
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
  }, []);
    return (
        <div>
            <div className ={classes.container}>
            <br />
                <p style={{ color: 'white', fontSize: 35, marginLeft: '16%', maxWidth: '70%' }}>Address: {address}</p>
                <br />
                <p style={{ color: 'white', fontSize: 35, marginLeft: '16%', maxWidth: '70%' }}>ItemLists: {itemLists}</p>
                <br/>
                <p style={{ color: 'white', fontSize: 35, marginLeft: '16%', maxWidth: '70%' }}>Date: {date}</p>
                <br/>
            
            </div>
             
        </div>
    )
}

export default recentevent;
