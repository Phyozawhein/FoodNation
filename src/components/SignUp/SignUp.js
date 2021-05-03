import React, { useState } from "react";
import { Container, Card, Row, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { useAuth } from "../../context/AuthContext";
import Fire from "../../firebase.config";
import classes from "./SignUp.module.css";
import { ReactComponent as Logo } from "../../assets/FN-Logo.svg";
import { sha256, sha224 } from "js-sha256";

export default function SignUp() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [CID, setCID] = useState(""); // charity identification reference
  const [fName, setFName] = useState(""); // first Name
  const [lName, setLName] = useState(""); // last Name
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [optionPage, setOptionPage] = useState(<div />);
  const [userType, setUserType] = useState("");

  const { db } = Fire;

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== passwordConfirm) {
      return setError("Passwords do not match");
    }
    try {
      setLoading(true);
      await signup(email, password);
      // need to add a measure to prevent duplicate account (using email address)

      db.getCollection("Users")
        .doc(email)
        .set({
          CID: CID,
          id: sha256(email),
          username: userName.trim(),
          firstName: fName.trim(),
          lastName: lName.trim(),
          email: email.toLowerCase(),
          password: password,
          imgUrl: "https://firebasestorage.googleapis.com/v0/b/food-nation-d70ea.appspot.com/o/profiles%2Fdefault.jpg?alt=media&token=2545aed8-026a-497c-a82f-97abeaf7925f",
          type: userType,
          phone: phoneNumber.trim()
        })
        .then((response) => {
          console.log("Success");
        })
        .catch((error) => setError(error.message));
      setLoading(false);

      const user = firebase.auth().currentUser;

      user
        .sendEmailVerification()
        .then(function () {
          // Email sent.
        })
        .catch(function (error) {
          // An error happened.
        });

      // Redirect
    } catch (err) {
      setError("");
      setError(err.message);
      setLoading(false);
    }
    setLoading(false);
  }

  const UserPage = (
    <>
      <Form.Group id="userName">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" onChange={(e) => setUserName(e.target.value)} required />
      </Form.Group>
      <Form.Group id="firstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" onChange={(e) => setFName(e.target.value)} required />
      </Form.Group>
      <Form.Group id="lastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" onChange={(e) => setLName(e.target.value)} required />
      </Form.Group>
    </>
  );

  const CharityPage = (
    <>
      <Form.Group id="cid">
        <Form.Label>Charity Identity Number (CIN)</Form.Label>
        <Form.Control type="text" onChange={(e) => setCID(e.target.value)} required />
      </Form.Group>
      <Form.Group id="ogranizationName">
        <Form.Label>Organization Name</Form.Label>
        <Form.Control type="text" onChange={(e) => setUserName(e.target.value)} required />
      </Form.Group>
    </>
  );

  const RestaurantPage = (
    <>
      <Form.Group id="restaurantName">
        <Form.Label>Restaurant Name</Form.Label>
        <Form.Control type="text" onChange={(e) => setUserName(e.target.value)} required />
      </Form.Group>
    </>
  );

  const updateOption = (e) => {
    const option = parseInt(e.target.value);
    switch (option) {
      case 1:
        setUserType("regular");
        setOptionPage(UserPage);
        break;
      case 2:
        setUserType("charity");
        setOptionPage(CharityPage);
        break;
      case 3:
        setUserType("restaurant");
        setOptionPage(RestaurantPage);
        break;
      default:
        setUserType("regular");
        setOptionPage(UserPage);
        break;
    }
  };

  return (
    <>
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <div className="w-100" style={{ maxWidth: "500px" }}>
          <Card className={`${classes.container} ${classes.font}`}>
            <Card.Body>
              <Row className="d-flex align-items-center justify-content-center">
                <Logo className={classes.logo} />
              </Row>
              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit} className={classes.loginForm}>
                {optionPage}
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} required />
                </Form.Group>
                <Form.Group id="password-confirm">
                  <Form.Label>Password Confirmation</Form.Label>
                  <Form.Control type="password" onChange={(e) => setPasswordConfirm(e.target.value)} required />
                </Form.Group>
                <Form.Row>
                  <Form.Group className={classes.contact}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} required />
                  </Form.Group>
                  <Form.Group className={classes.contact}>
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text" onChange={(e) => setPhoneNumber(e.target.value)} required />
                  </Form.Group>
                </Form.Row>
                <Form.Group>
                  <Form.Check inline type="radio" label="User" id="options" value="1" name="option" onClick={updateOption} />
                  <Form.Check inline type="radio" label="Charity" id="options" value="2" name="option" onClick={updateOption} />
                  <Form.Check inline type="radio" label="Restaurant" id="options" value="3" name="option" onClick={updateOption} />
                </Form.Group>

                <Button type="submit" className={classes.submitbutton} disabled={loading}>
                  Sign up
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className={`${classes.font} w-100 text-center mt-2`}>
            Already have an account ? <Link to="/login">Login</Link>
          </div>
        </div>
      </Container>
    </>
  );
}
