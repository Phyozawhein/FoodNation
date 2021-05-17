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
    urlEditEvents = "/events";
    urlEditDonations = "/appointments";
    buttonName = "Host an Event";
  } else if (props.userType === "restaurant") {
    url = "/restaurant-donation";
    urlEditDonations = "/restaurant-appointments";
    buttonName = "Host an Event";
    buttonName = "Make a Donation";
  }

  return (
    <div className={`${classes.postsection} ${classes.font} align-items-center justify-content-center`}>
      <div className={classes.postings}>
        {props.events &&
          props.events.map((ev, index) => (
            <Row key={index}>
              <div className={classes.container}>
                <p>Address : {ev.address}</p>
                <p>Date : {ev.date}</p>
                <p>Avg. crowd: {ev.average}</p>
                <p>Items: </p>
                <ul className={classes.itemList}>
                  {ev.itemLists.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
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
