import styles from "./CharityDetails.module.css"
import React, {useState, useEffect} from 'react'
import Fire from '../../firebase.config';
import {useParams} from 'react-router-dom'
import {Button, Col, Row} from 'react-bootstrap';

function CharityDetails() {

    let {id} = useParams();
    let db = Fire.db
      
    const [address,setAddress]= useState([]);
    const [itemLists,setItemLists] = useState("");
    const [description,setDescription] = useState("");
    const [imageUrl,setImageUrl] = useState("");
    const [date,setDate]=useState("");


    const dates = {
        convert:function(d) {
            // Converts the date in d to a date-object. The input can be:
            //   a date object: returned without modification
            //  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
            //   a number     : Interpreted as number of milliseconds
            //                  since 1 Jan 1970 (a timestamp) 
            //   a string     : Any format supported by the javascript engine, like
            //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
            //  an object     : Interpreted as an object with year, month and date
            //                  attributes.  **NOTE** month is 0-11.
            return (
                d.constructor === Date ? d :
                d.constructor === Array ? new Date(d[0],d[1],d[2]) :
                d.constructor === Number ? new Date(d) :
                d.constructor === String ? new Date(d) :
                typeof d === "object" ? new Date(d.year,d.month,d.date) :
                NaN
            );
        },
        compare:function(a,b) {
            // Compare two dates (could be of any type supported by the convert
            // function above) and returns:
            //  -1 : if a < b
            //   0 : if a = b
            //   1 : if a > b
            // NaN : if a or b is an illegal date
            // NOTE: The code inside isFinite does an assignment (=).
            return (
                isFinite(a=this.convert(a).valueOf()) &&
                isFinite(b=this.convert(b).valueOf()) ?
                (a>b)-(a<b) :
                NaN
            );
        }
    }

    useEffect(()=>{

        db.getCollection("CharityDetails").where("id", "==", id)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                
                let description = doc.data().description
                let imageUrl = doc.data().imgUrl

                setImageUrl(imageUrl);
                setDescription(description);    
    

                });
            })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
    
        //starting of inner data fetching
        const todayDate = new Date();
        db.getCollection("Events").where("id", "==", id)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
            
                let eventDate = new Date(doc.data().date);
                
                if (dates.compare(eventDate,todayDate)== 1 ){

                    let itemLists = doc.data().itemLists
                    let address= doc.data().address
                    eventDate = eventDate.toLocaleString('en-US',{ timeZone: "America/New_York" })
                    setAddress(address);
                    setItemLists(itemLists);
                    setDate(eventDate);    
                }
                else {
                    let itemLists = "No upcoming event yet. Please be patient"
                    let address= "..."
                    eventDate = "..."
                    setAddress(address);
                    setItemLists(itemLists);
                    setDate(eventDate);
                }

            });
            })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
        // end of inner data fetching
    
    },[])

    return (
        <div className={styles.colormarlam}>
            <img className={styles.tinyImg} src={imageUrl} />
            <br/>
            <p style={{color:"white",fontSize:40, marginLeft:"16%",maxWidth: "70%"}}>
                Description: {description}
            </p>
            <br/>
            <p style={{color:"white",fontSize:40, marginLeft:"16%",maxWidth: "70%"}}>
                Event Details: {itemLists}
            </p>
            <br/>
            <Row>
                <Col>
                    <p style={{color:"white",fontSize:40, marginLeft:"32%",maxWidth: "70%"}}>
                    Address: {address}
                    </p>
                </Col>
                <Col>
                  
                        <Button className={styles.buttons} >Directions</Button>
                  
                </Col>
                
            </Row>
            
            <br/>
            <p style={{color:"white",fontSize:40, marginLeft:"16%",maxWidth: "70%"}}>
                Date: {date}
            </p>

        </div>
    )
}

export default CharityDetails
