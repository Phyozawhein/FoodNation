import React, { useState, useEffect } from "react";
import { Container, InputGroup, FormControl, Col, Row, Button, Modal, Form } from "react-bootstrap";
import ProfileTabsUser from "../ProfileTabs/ProfileTabsUser";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Fire,{storage} from "../../firebase.config";
import classes from "./Profile.module.css";
import sha256 from "js-sha256";

export default function Profile() {
  const { db } = Fire;
  const { currentUser } = useAuth();
  const [user, setUser] = useState([]);
  const { id } = useParams();
  const [imgUrl, setImgUrl] = useState("");
  const [image, setImg] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [address_display, setAddressDisplay] = useState({});

  //Handle inputs for edit profile field
  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value
    })
  }

  //Form Errors
  const findFormErrors = () => {
    const { username, first, last, phone} = form
    const {state} = form.address
    const newErrors = {}
    // Username errors
    if ( !username || username === '' ) newErrors.username = 'Username cannot be blank!'
    else if ( username.length > 30 ) newErrors.username = 'Username is too long! Cannot Exceed 30 Characters.'
    // First Name errors
    if ( !first || first === '' ) newErrors.first = 'First Name cannot be blank!'
    else if ( first.length > 30 ) newErrors.first = 'First Name is too long! Cannot Exceed 30 Characters.'
    // Last Name errors
    if ( !last || last === '' ) newErrors.last = 'Last Name cannot be blank!'
    else if ( last.length > 30 ) newErrors.last = 'Last Name is too long! Cannot Exceed 30 Characters.'
    // Phone errors
    if ( phone.length != 10 ) newErrors.phone = 'Must be 10 characters long'
    //State errors
    if ( state.length != 2 ) newErrors.state = 'Must be 2 characters long.'

    return newErrors
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleFileChange=(e)=>{
    if(e.target.files[0]){
      setImg(e.target.files[0])
    }
    else{
    console.log("no file found");
    }
  }


  async function handleSubmit(e) {
    e.preventDefault()
    
    // Check Errors
    
    const newErrors = findFormErrors()
    // Conditional logic:
    if ( Object.keys(newErrors).length > 0 ) {
      // Errors
      setErrors(newErrors)
    } else {
      // Profile Edit Confirmation
      db.getCollection("Users")
      .doc(user.email)
      .update({...form})
      .then(()=>{
        if(image !== null){
         handleUpload();
        }
      })
      .then(()=> {db.getCollection("Users").doc(user.email)
      .onSnapshot((doc) => {
        const res = doc.data(); // "res" will have all the details of the user with the id parameter we fetched from url
        console.log(res);
        setUser(res);
        setPhoneNumber(res.phone);
        setAddressDisplay(res.address);
      });} )
      .catch((err) => {
        console.error(err);
      });
      alert('Saved!');

    }
  }

  const handleUpload = () => {
    const uploadTask = storage.ref(`profiles/${user.email}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("profiles")
          .child(user.email)
          .getDownloadURL()
          .then((url) => {
            db.getCollection("Users").doc(user.email).update({
              imgUrl: url,
            });

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
        setUser(res);
        setForm(res);
        setAddressDisplay(res.address);
        setPhoneNumber(res.phone);
      })
      .catch((error) => console.log(error.message));
    // return () => {
    //   cleanup;
    // };
  }, [id]);


  return (

    <>
      <Modal size="lg" contentClassName={classes.custommodal} show={show} onHide={handleClose} animation={false}>
        <Modal.Header className={`${classes.custommodaltitle} ${classes.custommodalheader}`} closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} className={classes.EditForm}>
                <Form.Group >
                  <Form.Label>Username</Form.Label>
                  <Form.Control defaultValue={user.username} type="username" onChange={e => setField('username', e.target.value)} required  isInvalid={ !!errors.name }/>
                <Form.Control.Feedback type='invalid'>
                    { errors.username }
                </Form.Control.Feedback>
                </Form.Group>
                <Form.Group >
                  <Form.Label>First Name</Form.Label>
                  <Form.Control defaultValue={user.first} type="first" onChange={e => setField('first', e.target.value)} required isInvalid={ !!errors.first }/>
                <Form.Control.Feedback type='invalid'>
                    { errors.first }
                </Form.Control.Feedback>
                </Form.Group>
                <Form.Group >
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control defaultValue={user.last} type="last" onChange={e => setField('last', e.target.value)} required isInvalid={ !!errors.last }/>
                <Form.Control.Feedback type='invalid'>
                    { errors.last }
                </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Street Address</Form.Label>
                    <Form.Control defaultValue={address_display.street} type="street" onInput={e => setField('address', {...form.address, street: e.target.value})} required isInvalid={ !!errors.street }/>
                    <Form.Control.Feedback type='invalid'>
                        { errors.street }
                    </Form.Control.Feedback>
                    <Form.Text className="text-muted">
                     (e.g. 123 Tatooine St.)
                    </Form.Text>
                </Form.Group>
                <Form.Row>
                  <Form.Group className={classes.EditFormRow}>
                    <Form.Label>State</Form.Label>
                    <Form.Control defaultValue={address_display.state} type="state" onInput={e => setField('address', {...form.address, state: e.target.value})} required isInvalid={ !!errors.state }/>
                    <Form.Control.Feedback type='invalid'>
                        { errors.state }
                    </Form.Control.Feedback>
                    <Form.Text className="text-muted">
                      (For New York, enter "NY")
                    </Form.Text>
                  </Form.Group>
                  <Form.Group className={classes.EditFormRow}>
                    <Form.Label>City</Form.Label>
                    <Form.Control defaultValue={address_display.city} type="city" onInput={e => setField('address', {...form.address, city: e.target.value})} required isInvalid={ !!errors.city }/>
                    <Form.Control.Feedback type='invalid'>
                        { errors.city }
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as="number" className={classes.EditFormRow}>
                    <Form.Label>Zip Code</Form.Label>
                    <Form.Control  defaultValue={address_display.zip} type="zip" onInput={e => setField('address', {...form.address, zip: e.target.value})} required isInvalid={ !!errors.zip }/>
                    <Form.Control.Feedback type='invalid'>
                        { errors.zip }
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as="number" className={classes.EditFormRow}>
                    <Form.Label>Phone</Form.Label>
                    <Form.Control  defaultValue={user.phone} type="phone" onChange={e => setField('phone', e.target.value)} required isInvalid={ !!errors.phone }/>
                    <Form.Control.Feedback type='invalid'>
                        { errors.phone }
                    </Form.Control.Feedback>
                    <Form.Text className="text-muted">
                      (No dashes e.g. 1234567890)
                    </Form.Text>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group className={classes.EditFormRow}>
                  <Form.File
                    id="custom-file-translate-scss"
                    label="Profile Picture"
                    lang="en"
                    custom
                    onChange={handleFileChange}
                    />

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
              <img className={`${classes.accountimage}`} alt="pic" src={user.imgUrl} /> {/* <== replace src */}
            </Row>
            <div className="d-flex align-items-center justify-content-center">
              <h4 className={`${classes.font} m-1`}>{user.username}</h4>
            </div>
            <div>
              <h6 className={`${classes.font} ml-2 mt-2`}>Contact Info</h6>
            </div>

            <div className={`${classes.container} ${classes.font}`}>
              <p className={`${classes.infolabel}`}>Address</p> {/* Change me for dynamic text */}
              <p className={`${classes.infotext}`}>{`${address_display.street}, ${address_display.city}, ${address_display.state}, ${address_display.zip}`}</p>
              <p className={`${classes.infolabel}`}>Email</p>
              <p className={`${classes.infotext}`}>{user.email}</p>
              <p className={`${classes.infolabel}`}>Phone</p>
              <p className={`${classes.infotext}`}>{phoneNumber.substr(0, 3) + "-" + phoneNumber.substr(3, 3) + "-" + phoneNumber.substr(6)}</p>
              {currentUser.email === user.email ? 
              <>
              <p className={`${classes.infolabel}`}>Name</p>
              <p className={`${classes.infotext}`}>{`${user.first} ${user.last}`}</p> 
              </>
              : <></>}
              {/* <p className={`${classes.infolabel}`}>About Us</p>
              <p className={`${classes.infotext}`}>I'mma hyuck you up, and fill you up with my charitable meat! </p> */}
            </div>
            {currentUser.email === user.email ? <Button className={`w-100 ${classes.profilebutton}`} onClick={handleShow}>
              Edit Profile
            </Button>: <></>}
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
                  <img alt="profile-pic" className={`m-3 rounded-circle d-inline-block ${classes.favimg}`} src={user.imgUrl} />
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
                <ProfileTabsUser user={user.email} description={user.description}/>
              </div>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
