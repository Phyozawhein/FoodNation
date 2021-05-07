import React from 'react'
import  { useState, useEffect } from 'react';
import { Container, InputGroup, FormControl, Col, Row, Button, Form } from "react-bootstrap";
import Fire from '../../firebase.config';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import classes from './description.module.css';




const Description = (props) => {

    const { db } = Fire;
    const { currentUser } = useAuth();
    const [canEdit, setEdit] = useState(false);
    const [form, setForm] = useState({});

    useEffect(() => {
        setForm(props);
        console.log(props.user);
    }, []);

    const setField = (field, value) => {
    setForm({
      [field]: value
    })
    }


  async function handleSubmit(e) {
    e.preventDefault()
    // Profile Edit Confirmation
    db.getCollection("Users")
    .doc(currentUser.email)
    .update({...form})
    .then(()=> {db.getCollection("Users").doc(currentUser.email)
    .onSnapshot((doc) => {
      const res = doc.data(); // "res" will have all the details of the user with the id parameter we fetched from url
    });} )
    .catch((err) => {
      console.error(err);
    });
    setEdit(false);
    alert('Saved!');
  }

  return (
    <>
          
            {canEdit === false ? 
            <>
            <div className={`${classes.postings} ${classes.font}`}>
              <p>Description:</p>
              <p>{form.description}</p>
            </div>
            {props.user === currentUser.email ?
            <div className={`${classes.postsection} ${classes.font} align-items-center justify-content-center`}>
              <Row>
                <Button className={`w-100 ${classes.profilebutton}`} onClick={() => setEdit(true)} >
                  Edit
                </Button>
              </Row>
            </div>
            :
            <></>}
            
            </>
            : 
            <>
            <Form onSubmit={handleSubmit}>
              <div className={`${classes.postings} ${classes.font}`}>
              <p>Description:</p>
              <Row>
                    <InputGroup className="mt-0 mb-3 pr-4 pl-4" style={{ minWidth: "50%" }}>
                      <FormControl style={{ backgroundColor: "transparent", color: "white" }} defaultValue={form.description} as="textarea" aria-label="With textarea" rows="5" 
                      onInput={e => setField('description', e.target.value)} required/>
                    </InputGroup>
              </Row>
            
            </div>
            <div className={`${classes.postsection} ${classes.font} align-items-center justify-content-center`}>
                <Button className={`w-100 ${classes.profilebutton}`} type="submit">
                  Save Changes
                </Button>
                <Button className={`w-100 ${classes.profilebutton}`} onClick={() => setEdit(false)}>
                  Cancel
                </Button>
            </div>
            </Form>
            </>}
          

    </>
  )  
}

export default Description;
