import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import RecentReviews from "../RecentReviews/RecentReviews";
import RecentEvent from "../RecentEvent/RecentEvent";
import "./Tab.module.css";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { makeStyles, withStyles } from "@material-ui/core/styles";
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

          <RecentReviews reviews={props.reviews} users={props.user} userType={props.userType} />
          {/* <Row><InputGroup className="mt-3 pr-4 pl-4" style={{ minWidth: "50%" }}>
                <FormControl placeholder="Post Something..." aria-label="Post Something..." aria-describedby="basic-addon2" />
                <InputGroup.Append>
                  <Button className={`${classes.postbutton}`}>Post</Button>
                </InputGroup.Append>
              </InputGroup></Row> */}
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div>
            <Description user={props.user} description={props.description} />
          </div>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <RecentEvent user={props.user} userType={props.userType} events={props.events} />
        </TabPanel>
      </div>
    </div>
  );
}
