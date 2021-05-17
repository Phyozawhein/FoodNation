import React from "react";
import { useState, useEffect } from "react";
import { Container, InputGroup, FormControl, Col, Row, Button, Form } from "react-bootstrap";
import Fire from "../../firebase.config";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import classes from "./description.module.css";

const Description = (props) => {
  const { currentUser } = useAuth();
  const [canEdit, setEdit] = useState(false);

  return (
    <>
      {canEdit === false ? (
        <>
          <div className={`${classes.postings} ${classes.font}`}>
            <p>Description:</p>
            <p>{props.description}</p>
          </div>
          {props.user === currentUser.email ? (
            <div className={`${classes.postsection} ${classes.font} align-items-center justify-content-center`}>
              <Row>
                <Button className={`w-100 ${classes.profilebutton}`} onClick={() => setEdit(true)}>
                  Edit
                </Button>
              </Row>
            </div>
          ) : (
            <></>
          )}
        </>
      ) : (
        <>
          <Form onSubmit={props.handleUpdateDescription}>
            <div className={`${classes.postings} ${classes.font}`}>
              <p>Description:</p>
              <Row>
                <InputGroup className="mt-0 mb-3 pr-4 pl-4" style={{ minWidth: "50%" }}>
                  <FormControl style={{ backgroundColor: "transparent", color: "white" }} defaultValue={props.description} as="textarea" aria-label="With textarea" rows="5" onInput={(e) => props.setField("description", e.target.value)} required />
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
        </>
      )}
    </>
  );
};

export default Description;
