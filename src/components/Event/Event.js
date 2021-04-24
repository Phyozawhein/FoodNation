import './Event.css';
import React, {useState, useRef,useEffect} from 'react'
import {useAuth} from '../../context/AuthContext';
import Fire from '../../firebase.config';
import {Button,Form, Alert} from 'react-bootstrap';
import {Link, useHistory} from 'react-router-dom';

function Event () {

    let db = Fire.db
    const user = useAuth().currentUser.email
    const OrgName = useRef()
    const Address = useRef()
    const ItemLists=useRef()
    const date     =useRef()
    const [error,setError]=useState('');
    const [success,setSuccess]=useState('');
    const [view,setView]=useState(false);
    const history = useHistory()
    const [optionPage, setOptionPage]=useState((<div></div>));

    async function handleSubmit(e){
        e.preventDefault();
   
        try{
            
            db.getCollection('Events').doc().set({
                    
                orgName: OrgName.current.value,
                address: Address.current.value,
                itemLists:ItemLists.current.value,
                date: date.current.value,
                id: OrgName.current.value.toString().toLowerCase().replaceAll(" ","-"),
                
            }).then(response=>{
                setSuccess("Event successfully created");
                
                
            }).catch(error=> setError(error.message));
        }
        catch(err){

            setError('');
            setError(err.message);
        }
    }

    useEffect(() => {

        db.getCollection("Users").where("email", "==", user)
        .get()
        .then((snapShotQuery) => {

            let typeCheck = snapShotQuery.docs.filter(doc => doc.data().type === "charity").length;
            console.log(typeCheck);
            if (typeCheck === 1) {
                setView(true);
            }

        }).catch(error => setError(error.message))
    },[])

    const viewPage = (
        <div className="rectangle">
        {error &&<Alert variant="danger">{error}</Alert>}


        <div>
            <h1 className="headline">
                Schedule an Event
            </h1>
        </div>
        {success &&<Alert variant="success">{success}</Alert>}

    <Form onSubmit={handleSubmit}>
        <Form.Group id="orgName">
            <Form.Label className="label">
                Organization Name
                <br/>
            </Form.Label>
            <Form.Control className = "input" type="text" ref={OrgName} required/>
        </Form.Group>
                <br/>
        <Form.Group id="address">
            <Form.Label className="label">
                Address
                <br/>
            </Form.Label>
            <Form.Control className = "input" type="text" ref={Address} required/>
        </Form.Group>
                <br/>
        <Form.Group id="itemLists">
            <Form.Label className="label">
                Item Lists
                <br/>
            </Form.Label>
            <Form.Control className = "input1" type="text-area" ref={ItemLists} required/>
        </Form.Group>
                <br/>
                <br/>
                
        <Form.Group id="date">
            <Form.Label className="label">
                Choose a Date
                <br/>
                <br/>
            </Form.Label>
            <Form.Control className="date" type="datetime-local" ref={date} required/>
        </Form.Group>
        <br/>
        <Button type="post" className="postbutton">
            Post
        </Button>
    </Form>

    
</div>    
    )

    const cantViewPage = (
        <div>
            <h1>Not authorized to view this page</h1>
        </div>
    )

    // const updateOption=()=>{
        
    //         if (view) {setOptionPage(viewPage);}

    //         if (!view) {setOptionPage(cantViewPage);}
    // }
        console.log(user)
    return (
        <div>
        
        {error &&<Alert variant="danger">{error}</Alert>}
 
        { view === true ?  viewPage   :  cantViewPage }

    </div>
    )
}

export default Event;
