import styles from './AppointmentList.module.css'
import React, {useState,useEffect} from 'react'
import {useAuth} from '../../context/AuthContext';
import Fire from '../../firebase.config';
import {Button,Form, Alert, Col,Row} from 'react-bootstrap';
import classes from './AppointmentList.module.css';

function AppointmentList() {

    let db = Fire.db
    const user = useAuth().currentUser.email
    const [orgName, setOrgName]=useState(null);
    const [resName, setResName]=useState(null);
    const [date,setDate]=useState(null);
    const [id, setId]=useState(null);
    const [docid, setDocId]= useState("");
    const [view,setView]=useState(false);
    const [status,setStatus]= useState('');
    const [statusArray, setStatusArray]=useState([]);
    const [error,setError]=useState('');
    
    useEffect(() => {

                db.getCollection("Users").where("email", "==", user). get().then((querySnapshot) => {
                   let id;
                    if(!querySnapshot.empty){
                        
                        querySnapshot.forEach((doc) => {

                            id = doc.data().id;
                            
                           setId(id);
              
                    })
                }
                    
                  return id;
                }).then((id)=>{



                db.getCollection("Donation").where("orgid", "==", id).get().
                then((querySnapshot) => {
                    let array=[];
                    querySnapshot.forEach((doc) => {
                        array.push([doc.id, doc.data()]);

                    }
                    );
                    setStatusArray(array);
                    
                    setView(true);    
                })

                }).catch(error => setError(error.message))

        
    },[statusArray])

    function updateStatus(e) {
        e.preventDefault();

        let zone = document.getElementById('statusSelect');
        if ((date && orgName && resName) !=null) {
            
            if (status !== "") {
                
               

                    console.log("Hi")
                    db.getCollection("Donation")
                    .doc(docid)
                    .update({
                        status : status
                    })
                    .then(()=> {
                        console.log("Successful, ",docid);
                        })
                    .catch((error) => setError(error.message));
                
            }
        }
      }

    const viewPage = (
        <div className={styles.rectangle}>
            <div className={styles.headline}>
                <h1 >
                    List of Appointments
                </h1>
            </div>

        <Row>
            <Col>
            <div className = {classes.open}>
            <h1>Open</h1>
            </div>

                {statusArray.filter(doc => doc[1].status === "open").map(item => {
                   
                    let appDate = new Date(item[1].date)
                    appDate = appDate.toLocaleString('en-US', { timeZone: 'America/New_York' });

                   return (
                <Form className={styles.container} onSubmit={updateStatus}>

                   <p id={item[1].id} style={{color: "white"}}>
                       Address: {item[1].address}</p>
                   <p id={item[1].id} style={{color: "white"}}>
                        Restaurant: {item[1].resName} </p>
                    <p id={item[1].id} style={{color: "white"}}>
                        Items: {item[1].itemLists} </p>
                    <p id={item[1].id} style={{color: "white"}}>
                        Charity: {item[1].orgName} </p>
                    <p id={item[1].id} style={{color: "white"}}>
                        Date: {appDate} </p>
                    <p id={item[1].id} style={{color: "white"}}>
                        Status: {item[1].status} </p>

                    <Form.Group className={styles.label}>

                        <select id="statusSelect" className={styles.label1} 
                            onChange={(e) => {
                                setOrgName(item[1].orgName);
                                setResName(item[1].resName);
                                setDate(item[1].date);
                                setStatus(e.target.value);
                                setDocId(item[0]);
                               }}>
                            <option selected>Change Status</option>
                            <option value="open">Open</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>   
                    </Form.Group>
                    <Button type="submit" >
                        Update
                    </Button>
                </Form>
                   )
                })}
            </Col>
            <Col>
            <div className = {classes.completed}>
                <h1>Completed</h1>
                </div>
                    {statusArray.filter(doc => doc[1].status === "completed").map(item => {

                        let appDate = new Date(item[1].date)
                        appDate = appDate.toLocaleString('en-US', { timeZone: 'America/New_York' });

                    return (
                    <Form className={styles.container} onSubmit={updateStatus}>

                   <p id={item[1].id} style={{color: "white"}}>
                       Address: {item[1].address}</p>
                   <p id={item[1].id} style={{color: "white"}}>
                        Restaurant: {item[1].resName} </p>
                    <p id={item[1].id} style={{color: "white"}}>
                        Items: {item[1].itemLists} </p>
                    <p id={item[1].id} style={{color: "white"}}>
                        Charity: {item[1].orgName} </p>
                    <p id={item[1].id} style={{color: "white"}}>
                        Date: {appDate} </p>
                    <p id={item[1].id} style={{color: "white"}}>
                        Status: {item[1].status} </p>

                    <Form.Group className={styles.label}>

                        <select id="statusSelect" className={styles.label1} 
                            onClick={(e) => {
                                setOrgName(item[1].orgName);
                                setResName(item[1].resName);
                                setDate(item[1].date);
                                setStatus(e.target.value);
                                setDocId(item[0]);
                               }}>
                            <option selected>Change Status</option>
                            <option value="open">Open</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>   
                    </Form.Group>
                    <Button type="submit">
                        Update
                    </Button>
                </Form>
                   )
                })}
            </Col>
            <Col>
            <div className = {classes.completed}>
                <h1>Cancelled</h1>
                </div>
                    {statusArray.filter(doc => doc[1].status === "cancelled").map(item => {

                        let appDate = new Date(item[1].date)
                        appDate = appDate.toLocaleString('en-US', { timeZone: 'America/New_York' });

                    return (
                        <Form className={styles.container} onSubmit={updateStatus}>

                        <p id={item[1].id} style={{color: "white"}}>
                            Address: {item[1].address}</p>
                        <p id={item[1].id} style={{color: "white"}}>
                             Restaurant: {item[1].resName} </p>
                         <p id={item[1].id} style={{color: "white"}}>
                             Items: {item[1].itemLists} </p>
                         <p id={item[1].id} style={{color: "white"}}>
                             Charity: {item[1].orgName} </p>
                         <p id={item[1].id} style={{color: "white"}}>
                             Date: {appDate} </p>
                         <p id={item[1].id} style={{color: "white"}}>
                             Status: {item[1].status} </p>
     
                         <Form.Group className={styles.label}>
     
                             <select id="statusSelect" className={styles.label1} 
                                 onClick={(e) => {
                                    setOrgName(item[1].orgName);
                                    setResName(item[1].resName);
                                    setDate(item[1].date);
                                    setStatus(e.target.value);
                                    setDocId(item[0]);
                                    }}>
                                 <option selected>Change Status</option>
                                 <option value="open">Open</option>
                                 <option value="completed">Completed</option>
                                 <option value="cancelled">Cancelled</option>
                             </select>   
                         </Form.Group>
                         <Button type="submit" >
                        Update
                    </Button>
                     </Form>
                   )
                })}
            </Col>
        </Row>
 
        </div>
        )

        const cantViewPage = (
            <div>
                <h1 className={styles.cantView}>Not authorized to view this page</h1>
            </div>
        )
    

    return (
        <div>
           { view === true ?  viewPage   :  cantViewPage } 
        </div>
    )
}

export default AppointmentList;
