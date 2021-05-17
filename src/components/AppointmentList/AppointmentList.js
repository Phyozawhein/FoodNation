import styles from './AppointmentList.module.css'
import React, {useState,useEffect} from 'react'
import {useAuth} from '../../context/AuthContext';
import Fire from '../../firebase.config';
import {Button,Form, Alert, Col,Row} from 'react-bootstrap';
import classes from './AppointmentList.module.css';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CancelIcon from '@material-ui/icons/Cancel';
import {IconButton} from '@material-ui/core'

function AppointmentList() {

    let db = Fire.db
    const user = useAuth().currentUser.email
    const [orgName, setOrgName]=useState(null);
    const [resName, setResName]=useState(null);
    const [date,setDate]=useState(null);
    let itemLists=[];
    const [id, setId]=useState(null);
    const [docid, setDocId]= useState("");
    const [view,setView]=useState(false);
    const [status,setStatus]= useState('');
    const [statusArray, setStatusArray]=useState([]);
    const [error,setError]=useState('');
    const [copyarray, setCopyArray]=useState([]);

    const [tagForm, setTagForm] = useState([]); //For tag editing form
    const [canEditTag, setEditTag] = useState(false); //For editing tag display

    useEffect(() => {

                db.getCollection("Users").doc(user).get()
                .then((doc) => {

                    const typeCheck = doc.data();
                    
                    if (typeCheck.type==="charity") {

                        
                        setId(typeCheck.id);
                    }
                    
                    return typeCheck.id;
                  }
                  )
                  .then((id)=>{

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

        
    },[copyarray])

    const setField = (field, value, index, list) => {

        list[index] = value
        setTagForm({
          [field]: list
        })
      }

    function updateStatus(e) {
        e.preventDefault();

        if ((date && orgName && resName) !=null) {
            
            if (status !== "" || status !=="Change Status") {
               
                    db.getCollection("Donation")
                    .doc(docid)
                    .update({
                        status : status
                    })
                    .then(()=> {
                        db.getCollection("Donation").doc(docid)
                        .onSnapshot((doc)=>{

                            console.log(doc.data());
                            setCopyArray([doc.id,doc.data()]);
                            console.log("Updated");
                        })
                        })
                    .catch((error) => setError(error.message));
                
            }
        }
      }

    async function handleEdit(value,docid,index,e){
        setEditTag(true);
    }
    async function handleCancel(e){
        setEditTag(false);
    }

    function handleDelete(value,id,e){
        e.preventDefault();

            let result = itemLists.filter(num => num !==value);
            console.log(result);
            
            db.getCollection("Donation")
            .doc(id)
            .update({
                itemLists : result
            })
            .then(()=> {
                db.getCollection("Donation").doc(id)
                .onSnapshot((doc)=>{

                    
                    setCopyArray([doc.id,doc.data()]);
                    console.log("Updated");
                })
                })
            .catch((error) => setError(error.message));
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

                    <p style={{color: "white"}}>
                    Items: 
                    {canEditTag === false ?
                        <>
                    {item[1].itemLists.map((stuff, index) => (
                    
                    <Row>
                        
                        <Col>
                            <ul id={index}>{ stuff } </ul>
                        </Col>
                        <Col>
                            <div>
                                <IconButton
                                    onClick={(e) => {
                                        itemLists=item[1].itemLists;
                                        handleEdit(stuff,item[0],index,e);
                                        console.log(e.target.value);
                                    }}>

                                <EditIcon style={{margin: "5px"}} /  >
                                </IconButton>
                                <IconButton
                                    onClick={(e) => {

                                    itemLists = item[1].itemLists;
                                    handleDelete(stuff,item[0],e);
                                    }}>

                                    <DeleteIcon style={{margin: "15px"}} 
                                        />
                                </IconButton>
                                
                            </div>
                        </Col>
                        
                        {/* <><IconButton
                             onClick={(e) => {
                            handleCancel(e);
                            console.log(e.target.value);}}>
                                    <CancelIcon/>
                                    </IconButton> </> */}
                        
                    </Row>
                        
                    ))}
                </>
                :
                <>
                <Form onSubmit={handleSubmit}>
                {item[1].itemLists.map((stuff, index) => (
                    
                    <Row>
                        
                        <Col>
                        <InputGroup className="mt-0 mb-3 pr-4 pl-4" style={{ minWidth: "80%" }}>
                      <FormControl defaultValue={stuff} as="textarea" aria-label="With textarea" rows="5" 
                      onInput={e => setField('itemLists', e.target.value, index, item[1].itemLists)} required/>
                    </InputGroup>
                            <ul id={index}>{ stuff } </ul>
                        </Col>
                        <Col>
                            <div>
                                <IconButton
                                    onClick={(e) => {
                                        handleEdit(stuff,item[0],index,e);
                                        console.log(e.target.value);
                                    }}>

                                <EditIcon style={{margin: "5px"}} /  >
                                </IconButton>
                                <IconButton
                                    onClick={(e) => {

                                    itemLists = item[1].itemLists;
                                    handleDelete(stuff,item[0],e);
                                    }}>

                                    <DeleteIcon style={{margin: "15px"}} 
                                        />
                                </IconButton>
                                
                            </div>
                        </Col>
                        
                        {/* <><IconButton
                             onClick={(e) => {
                            handleCancel(e);
                            console.log(e.target.value);}}>
                                    <CancelIcon/>
                                    </IconButton> </> */}
                        
                    </Row>
                        
                    ))}
                    </Form>
                    </>
                }
                    </p>

                    {item[1].expiryEstimate === undefined ? <></> : 
                    <> <p id={item[1].id} style={{color: "white"}}>
                        Expiry Estimate: {item[1].expiryEstimate} </p>
                    </> }

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

                        <p style={{color: "white"}}>
                        Items: 
                        {item[1].itemLists.map((stuff,index) => (
                        <Row>
                        <Col>
                            <ul id={index}>{ stuff } </ul>
                        </Col>
                        <Col>
                            <div>
                                <IconButton
                                    onClick={(e) => {
                                        handleEdit(stuff,item[0],index,e);
                                        console.log(e.target.value);
                                    }}>

                                    <EditIcon style={{margin: "5px"}} /  >
                                </IconButton>
                            <IconButton
                                onClick={(e) => {

                                itemLists = item[1].itemLists;
                                handleDelete(stuff,item[0],e);
                                }}>

                                <DeleteIcon style={{margin: "15px"}} 
                                    />
                                </IconButton> 
                            </div>
                            </Col>
                        </Row>
                        ))}
                        </p>

                    {item[1].expiryEstimate === undefined ? <></> : 
                        <> <p id={item[1].id} style={{color: "white"}}>
                        Expiry Estimate: {item[1].expiryEstimate} </p> </> }

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

                        <p style={{color: "white"}}>
                            Items: 
                            {item[1].itemLists.map((stuff,index) => (
                        <Row>
                            <Col>
                                <ul id={index}>{ stuff } </ul>
                            </Col>
                            <Col>
                                <div>
                                    <IconButton
                                        onClick={(e) => {
                                            handleEdit(stuff,item[0],index,e);
                                            console.log(e.target.value);
                                        }}>

                                    <EditIcon style={{margin: "5px"}} /  >
                                </IconButton>
                                <IconButton
                                 onClick={(e) => {

                                    itemLists = item[1].itemLists;
                                    handleDelete(stuff,item[0],e);
                                    }}>

                                    <DeleteIcon style={{margin: "15px"}} 
                                        />
                                </IconButton> 

                            </div>
                            </Col>
                        </Row>
                            ))}
                        </p>

                        {item[1].expiryEstimate === undefined ? <></> : 
                            <> <p id={item[1].id} style={{color: "white"}}>
                            Expiry Estimate: {item[1].expiryEstimate} </p> </> }

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
