import styles from './AppointmentList.module.css'
import React, {useState,useEffect} from 'react'
import {useAuth} from '../../context/AuthContext';
import Fire from '../../firebase.config';
import {Button,Form, Alert} from 'react-bootstrap';

function AppointmentList() {

    let db = Fire.db
    const user = useAuth().currentUser.email
    // const [address,setAddress]= useState([]);
    // const [itemLists,setItemLists] = useState("");
    // const [date,setDate]=useState("");
    // const [orgName, setOrgName]=useState('');
    // const [resName, setResName]=useState('');
    const [id, setId]=useState('');
    const [view,setView]=useState(false);
    const [status,setStatus]= useState('');
    const [error,setError]=useState('');
    const [array,setArray]=useState([]);

    useEffect(() => {

        db.getCollection("Users").where("email", "==", user)
        .get()
        .then((snapShotQuery) => {
            let typeCheck = snapShotQuery.docs.filter(doc => doc.data().type === "charity").length;

          
            if (typeCheck === 1) {
                setView(true);
               
                db.getCollection("CharityDetails").where("email", "==", user). get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                       
                   let id = doc.data().id;
                  
                   setId(id);
                    }
                    );
                }).catch(error => setError(error.message))


        
                let myarray =[]
                db.getCollection("Donation").where("orgid", "==", id).get().
                then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        console.log(doc.data());
                    
                    myarray.push(doc.data());
                    
                    }
                    );
                    console.log(myarray);
                    setArray(myarray);    
                });
            }
        }).catch(error => setError(error.message))
        
    },[])

    const viewPage = (
        <div className={styles.rectangle}>
            <div className={styles.headline}>
                <h1 >
                    List of Appointments
                </h1>
            </div>
            <div>
                {array.map(item => {
                   <p style={{color: "white"}}>
                       {item.address}
                   </p> 
                })}
                
            </div>

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

export default AppointmentList
