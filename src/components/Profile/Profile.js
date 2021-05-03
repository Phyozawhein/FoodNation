import React, { useState, useEffect } from "react";
import { Container, InputGroup, FormControl, Col, Row, Button, Modal, Form } from "react-bootstrap";
import ProfileTabsUser from "../ProfileTabs/ProfileTabsUser";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Fire from "../../firebase.config";
import classes from "./Profile.module.css";
import sha256 from "js-sha256";

export default function Profile() {
  const { db } = Fire;
  const { currentUser } = useAuth();
  const { id } = useParams();
  const [imgUrl, setImgUrl] = useState("");
  const [image, setImg] = useState(null);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [CID, setCID] = useState(""); // charity identification reference
  const [fName, setFName] = useState(""); // first Name
  const [lName, setLName] = useState(""); // last Name
  const [show, setShow] = useState(false);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function handleSubmit(e) {
    console.log("DEEZ NUTZ");
  }


  const handleUpload = () => {
    const uploadTask = storage.ref(`profiles/${currentUser.email}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("profiles")
          .child(currentUser.email)
          .getDownloadURL()
          .then((url) => {
            db.getCollection("Users").doc(currentUser.email).update({
              imgUrl: url,
            });

            setImgUrl(url);
          })
          .catch((error) => console.log(error.message));
      }
    );
  };

  useEffect(() => {
    let queryID = id;
    if (id === undefined) {
      // if the url does not have id parameter then it will pull logged in user's detail
      queryID = sha256(currentUser.email);
    }
    console.log(id);
    db.getCollection("Users")
      .where("id", "==", queryID)
      .get()
      .then((querySnapShot) => {
        console.log(querySnapShot.docs);
        const res = querySnapShot.docs.find((doc) => doc.data().id === queryID).data(); // "res" will have all the details of the user with the id parameter we fetched from url
        console.log(res);
        setImgUrl(res.imgUrl);
        setUserName(res.username);
        setEmail(res.email);
        setPhoneNumber(res.phone);
        setCID(res.CID);
        setFName(res.firstName);
        setLName(res.lastName);
      })
      .catch((error) => console.log(error.message));
    // return () => {
    //   cleanup;
    // };
  }, [id]);

  return (
    <>
    <Modal size='lg' contentClassName={classes.custommodal} show={show} onHide={handleClose} animation={false}>
        <Modal.Header className={`${classes.custommodaltitle} ${classes.custommodalheader}`} closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Edit Profile
          </Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <Form onSubmit={handleSubmit} className={classes.EditForm}>
                <Form.Group >
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="username" onChange={(e) => setUserName(e.target.value)} required />
                </Form.Group>
                <Form.Group >
                  <Form.Label>First</Form.Label>
                  <Form.Control type="first" onChange={(e) => setFName(e.target.value)} required />
                </Form.Group>
                <Form.Group >
                  <Form.Label>Last</Form.Label>
                  <Form.Control type="last" onChange={(e) => setLName(e.target.value)} required />
                </Form.Group>
                <Form.Row>
                  <Form.Group className={classes.EditFormRow}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} required />
                  </Form.Group>
                  <Form.Group className={classes.EditFormRow}>
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text" onChange={(e) => setPhoneNumber(e.target.value)} required />
                  </Form.Group>
                </Form.Row>

                <Button className={`w-100 ${classes.profilebutton}`} type="submit">
                  Save
                </Button>
              </Form>
        </Modal.Body>
      </Modal>
      <Container className="flex ml-4 align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <Row>
          <Col xs={12} md={3}>
            <Row className="d-flex align-items-center justify-content-center">
              <img className={`${classes.accountimage}`} alt="pic" src={imgUrl} /> {/* <== replace src */}
            </Row>
            <div className="d-flex align-items-center justify-content-center">
              <h4 className={`${classes.font} m-1`}>{userName}</h4>
            </div>
            <div>
              <h6 className={`${classes.font} ml-2 mt-2`}>About Info</h6>
            </div>

            <div className={`${classes.container} ${classes.font}`}>
              <p className={`${classes.infolabel}`}>Address</p> {/* Change me for dynamic text */}
              <p className={`${classes.infotext}`}>420 69st Scranton, New York 16996 </p>
              <p className={`${classes.infolabel}`}>Email</p>
              <p className={`${classes.infotext}`}>{email}</p>
              <p className={`${classes.infolabel}`}>Phone</p>
              <p className={`${classes.infotext}`}>{phoneNumber.substr(0,3) + '-' + phoneNumber.substr(3,3) + '-' + phoneNumber.substr(6)}</p>
              {/* <p className={`${classes.infolabel}`}>About Us</p>
              <p className={`${classes.infotext}`}>I'mma hyuck you up, and fill you up with my charitable meat! </p> */}
            </div>
            <Button className={`w-100 ${classes.profilebutton}`} onClick={handleShow}>Edit Profile</Button>
          </Col>
          <Col className="ml-3" xs={12} md={7}>
            <Row>
              <div className="w-100 align-items-center justify-content-center">
                <h6 className={`${classes.font} m-3 mb-2`} style={{ textAlign: "center" }}>
                  Favorites
                </h6>{" "}
                {/* Replace with dynamic */}
              </div>
              <div className={`${classes.container} ${classes.font}`}>
                {/* Insert carousel */}
                <a className={`m-3 align-items-center m-2 ${classes.favbox}`} href="/profile">
                  {/* Change href to dynamic */}
                  <img alt="profile-pic" className={`m-3 rounded-circle d-inline-block ${classes.favimg}`} src={imgUrl} />
                </a>
              </div>
            </Row>
            <Row>
              <div className="w-100 align-items-center justify-content-center">
                <h6 className={`${classes.font} m-3 mt-4`} style={{ textAlign: "center" }}>
                  Explore
                </h6>{" "}
                {/* Replace with dynamic */}
              </div>
              <div className={`${classes.container} ${classes.font}`} style={{ minHeight: "55vh" }}>
                {/*<div className={`${classes.postings} ${classes.font}`}>
                </div>

                <div className={`${classes.postsection} ${classes.font} align-items-center justify-content-center`}>
                  <Row>
                    <InputGroup className="mt-3 pr-4 pl-4" style={{ minWidth: "50%" }}>
                      <FormControl placeholder="Post Something..." aria-label="Post Something..." aria-describedby="basic-addon2" />
                      <InputGroup.Append>
                        <Button className={`${classes.postbutton}`}>Post</Button>
                      </InputGroup.Append>
                    </InputGroup>
                  </Row>
                  
                </div>*/}
                <ProfileTabsUser/>
              </div>
            </Row>
          </Col>
        </Row>
      </Container>

      
    </>
  );
}