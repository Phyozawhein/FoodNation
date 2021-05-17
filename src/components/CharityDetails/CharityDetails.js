import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import styles from "./CharityDetails.module.css";
import Fire from "../../firebase.config";
import { useParams } from "react-router-dom";

function CharityDetails() {

  const { id } = useParams();
  const { db } = Fire;

  const [address, setAddress] = useState([]);
  const [itemLists, setItemLists] = useState([]);
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [date, setDate] = useState("");
  const [average, setAverage] = useState("...");
  const [error,setError]=useState('');

  const dates = {
    convert(d) {
      // Converts the date in d to a date-object. The input can be:
      //   a date object: returned without modification
      //  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
      //   a number     : Interpreted as number of milliseconds
      //                  since 1 Jan 1970 (a timestamp)
      //   a string     : Any format supported by the javascript engine, like
      //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
      //  an object     : Interpreted as an object with year, month and date
      //                  attributes.  **NOTE** month is 0-11.
      return d.constructor === Date ? d : d.constructor === Array ? new Date(d[0], d[1], d[2]) : d.constructor === Number ? new Date(d) : d.constructor === String ? new Date(d) : typeof d === "object" ? new Date(d.year, d.month, d.date) : NaN;
    },
    compare(a, b) {
      // Compare two dates (could be of any type supported by the convert
      // function above) and returns:
      //  -1 : if a < b
      //   0 : if a = b
      //   1 : if a > b
      // NaN : if a or b is an illegal date
      // NOTE: The code inside isFinite does an assignment (=).
      return isFinite((a = this.convert(a).valueOf())) && isFinite((b = this.convert(b).valueOf())) ? (a > b) - (a < b) : NaN;
    },
  };

  useEffect(() => {
    db.getCollection("Users")
      .where("id", "==", id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const { description } = doc.data();
          const imageUrl = doc.data().imgUrl;

          setImageUrl(imageUrl);
          setDescription(description);
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });

    // starting of inner data fetching
    const todayDate = new Date();
    db.getCollection("Events")
    .where("id", "==", id)
    .get()
    .then((querySnapshot) => {
      let array = [];
      let flag = false;
      let count = 0;
      let dateArray = [];
      let lowest = new Date(2070,12,12);
      let docid ;
        querySnapshot.forEach((doc) => {

          array.push([doc.id,doc.data()]);

        });

        array.map(item => {
          dateArray.push([item[0],item[1].date]);

        })

        dateArray.map(item => {
          
          let newDate = new Date(item[1]);
          
          count = count + 1;
          if ((dates.compare( lowest, newDate) == 1) && ((dates.compare( newDate, todayDate) == 1)||(dates.compare( newDate, todayDate) == 0))){
            lowest = item[1];
            docid = item[0];
            flag=true;
          }
        })
        
        if (flag==false && count !=0) {
          const itemLists = "No upcoming event yet. Please be patient";
          const address = "...";
          const eventDate = "...";
          const avg = "..."
          setAddress(address);
          setItemLists(itemLists);
          setDate(eventDate);
          setAverage(avg);
          
        }

        db.getCollection("Events").doc(docid).get()
        .then((doc)=> {
          
          setAddress(doc.data().address);
          setItemLists(doc.data().itemLists);
          let eventDate = new Date(doc.data().date);
          eventDate = eventDate.toLocaleString("en-US", { timeZone: "America/New_York" });
          setDate(eventDate);
          setAverage(doc.data().average);
        })
        .catch((error) => setError(error.message));

      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    // end of inner data fetching
  }, []);

  return (
    <div className={styles.colormarlam}>
      <img className={styles.tinyImg} src={imageUrl} alt="" />
      <br />
      <p style={{ color: "white", fontSize: 40, marginLeft: "16%", maxWidth: "70%" }}>Description: {description}</p>
      <br />
      <p style={{ color: "white", fontSize: 40, marginLeft: "16%", maxWidth: "70%" }}>
        Item Details: 
        {itemLists.map((stuff) => (
            <ul>{stuff}</ul>
          ))}
      </p>
      <br />
      <Row>
        <Col>
          <p style={{ color: "white", fontSize: 40, marginLeft: "32%", maxWidth: "70%" }}>Address: {address}</p>
        </Col>
        <Col>
          <Button className={styles.buttons}>Directions</Button>
        </Col>
      </Row>
      <br />
      <p style={{ color: "white", fontSize: 40, marginLeft: "16%", maxWidth: "70%" }}>Estimated people: {average}</p>
      <br />
      <p style={{ color: "white", fontSize: 40, marginLeft: "16%", maxWidth: "70%" }}>Date: {date}</p>
    </div>
  );
}

export default CharityDetails
