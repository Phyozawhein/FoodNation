import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Container, InputGroup, FormControl, Col, Row, Button, Modal, Form, Card } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import "./Tab.module.css";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Description from "../Description/Description.js";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`full-width-tabpanel-${index}`} aria-labelledby={`full-width-tab-${index}`} {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

const AntTabs = withStyles({
  root: {
    borderBottom: "1px solid #ffffff",
    padding: ".2rem",
  },
  indicator: {
    backgroundColor: "rgb(243, 0, 0)",
  },
})(Tabs);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    opacity: 1,
    minWidth: 72,
    fontWeight: "bold",
    fontSize: "1rem",
    marginRight: theme.spacing(4),
    fontFamily: ["-apple-system", "BlinkMacSystemFont", '"Segoe UI"', "Roboto", '"Helvetica Neue"', "Arial", "sans-serif", '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"'].join(","),
    "&:hover": {
      color: "#bc0000",
      opacity: 1,
    },
    "&$selected": {
      color: "rgb(243, 0, 0)",
      fontWeight: "bolder",
    },
    "&:focus": {
      color: "rgb(243, 0, 0)",
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  padding: {
    padding: theme.spacing(3),
  },
  demo1: {
    backgroundColor: "transparent",
  },
}));

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function UserTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log(props.reviews);

  return (
    <div className={classes.root}>
      <div className={classes.demo1}>
        <AntTabs value={value} onChange={handleChange} aria-label="ant example">
          <AntTab label="Reviews" {...a11yProps(0)} />
          <AntTab label="About" {...a11yProps(1)} />
          <AntTab label="Events" {...a11yProps(2)} />
        </AntTabs>
        <TabPanel value={value} index={0}>
          <div className={`${classes.postings} ${classes.font}`}></div>

          {/* REVIEW TAB  */}
          <div className={`${classes.postsection} ${classes.font} align-items-center justify-content-center`}>
            {props.reviews &&
              props.reviews.map((rev) => (
                <Row>
                  <Card>
                    <Card.Body>
                      <ReactStars count={5} edit={false} size={24} value={rev.rating} isHalf={true} emptyIcon={<i className="far fa-star"></i>} halfIcon={<i className="fa fa-star-half-alt"></i>} fullIcon={<i className="fa fa-star"></i>} activeColor="#ffd700" />
                      <Card.Text>{rev.writer}</Card.Text>
                      <Card.Text>{rev.review}</Card.Text>
                    </Card.Body>
                  </Card>
                </Row>
              ))}
            {/* <Row><InputGroup className="mt-3 pr-4 pl-4" style={{ minWidth: "50%" }}>
                <FormControl placeholder="Post Something..." aria-label="Post Something..." aria-describedby="basic-addon2" />
                <InputGroup.Append>
                  <Button className={`${classes.postbutton}`}>Post</Button>
                </InputGroup.Append>
              </InputGroup></Row> */}
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div>
            <Description user={props.user} description={props.description} />
          </div>
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </div>
    </div>
  );
}
