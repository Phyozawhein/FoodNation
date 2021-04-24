import './Event.css';
import React, {useState, useRef} from 'react'
import {useAuth} from '../../context/AuthContext';
import Fire from '../../firebase.config';
import {Button,Form, Alert} from 'react-bootstrap';

function Event () {

    let db = Fire.db
    const user = useAuth().currentUser.email
    
    const OrgName = useRef()
    const Address = useRef()
    const ItemLists=useRef()
    const date     =useRef()
    const [error,setError]=useState('');
    const [success,setSuccess]=useState('');
    const [loading,setLoading]=useState(false);


    async function  handleSubmit(e){
        e.preventDefault();

        try{
            setLoading(true)

            db.getCollection('Events').doc().set({
                
                orgName: OrgName.current.value,
                address: Address.current.value,
                itemLists:ItemLists.current.value,
                date: date.current.value,
                id: OrgName.current.value.toString().toLowerCase().replaceAll(" ","-"),
                
            }).then(response=>{
                setSuccess("Event successfully created");
                
                
            }).catch(error=> setError(error.message));
            setLoading(false)

        }
        catch(err){

            setError('');
            setError(err.message);
            setLoading(false);
        }
        setLoading(false);
    }
    return (
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
}

export default Event;
