import React from 'react'
import "./Contact.css"
import  {useRef, useState} from 'react'
import { db } from "../../firebase.config"
import firebase from 'firebase';
import Fire from '../../firebase.config';

const Contact = () => {
    const [name,setName] = useState ("");
    const [email,setEmail] = useState ("");
    const [subject,setSubject] = useState ("");
    const [message,setMessage] = useState ("");
    
    let db = Fire.db;

    const handleSubmit = (e) =>{
        e.preventDefault();
        db.getCollection ('contacts').add({
           name:name, 
           email:email,
           subject:subject,
           message:message,
        })
        .then(() => {
          alert ('Message has been submitted.')  
        })
        .catch((error) =>{
            alert(error.message);
        });
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
    };
    return (
        <div>
        <h1 className="headline">CONTACT US 📞</h1>
        <form className = "form" onSubmit = {handleSubmit}>
            
            <div className ="container">
            <label className = "label">Name</label>
            <br/>
            <input 
            placeholder = "Name"
            className ="input"
            value={name}
            onChange ={(e) => setName(e.target.value)}
            ></input>
            <br/>
            <label  className = "label">Email</label>
            <br/>
            <input 
            placeholder = "Email" 
            className ="input"
            value={email}
            onChange ={(e) => setEmail(e.target.value)}
            ></input>
            <br/>
            <label  className = "label">Subject</label>
            <br/>
            <input
             placeholder = "Subject" 
             className ="input"
             value={subject}
            onChange ={(e) => setSubject(e.target.value)}
             ></input>
            <br/>

            <label  className = "label">Message</label>
            <br/>
            <textarea 
            placeholder="Message" 
            className ="input1"
            value={message}
            onChange ={(e) => setMessage(e.target.value)}
            ></textarea>
            <br/>
            </div>
            <br/>
           

            <button type = "submit" className="submitbutton">Submit</button>
        </form>
     </div>
    )
}

export default Contact;
