import React from "react";
import { Link } from "react-router-dom";
import { Button, Row } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import classes from "./recentevent.module.css";

const recentevent = (props) => {
  const { currentUser } = useAuth();
  let url = "";
  let urlEditEvents = "";
  let urlEditDonations = "";
  let buttonName = "";

  if (props.userType === "charity") {
    url = "/charity-event";
    urlEditEvents = "/";
    urlEditDonations = "/appointments";
    buttonName = "Host an Event";
  } else if (props.userType === "restaurant") {
    url = "/restaurant-donation";
    urlEditDonations = "/appointments";
    buttonName = "Host an Event";
    buttonName = "Make a Donation";
  }
  console.log(props.user);
  console.log(props.userType !== "regular" && currentUser.email === props.user);
  return (
    <div className={`${classes.postsection} ${classes.font} align-items-center justify-content-center`}>
      <div className={classes.postings}>
        {props.events &&
          props.events.map((rev, index) => (
            <Row key={index}>
              <div className={classes.container}></div>
            </Row>
          ))}
      </div>
      {props.userType === "charity" && currentUser.email === props.user ? (
        <div className={classes.buttonGroup}>
          <Link to={url}>
            <Button className={`w-30 ${classes.profilebutton}`}>{buttonName}</Button>
          </Link>
          <Link to={urlEditEvents}>
            <Button className={`w-30 ${classes.profilebutton}`}>Edit Events</Button>
          </Link>
          <Link to={urlEditDonations}>
            <Button className={`w-30 ${classes.profilebutton}`}>Edit Appointments </Button>
          </Link>
        </div>
      ) : null}
      {props.userType === "restaurant" && currentUser.email === props.user ? (
        <div className={classes.buttonGroup}>
          <Link to={url}>
            <Button className={`w-20 ${classes.profilebutton}`}>{buttonName}</Button>
          </Link>
          <Link to={urlEditDonations}>
            <Button className={`w-20 ${classes.profilebutton}`}>Edit Appointments </Button>
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default recentevent;
