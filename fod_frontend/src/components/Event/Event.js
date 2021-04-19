import React from 'react'
import './Event.css';
import {Button, Alert} from 'react-bootstrap';

const Event = ()  =>{
    return (
        <div >
        <div className="rectangle">
            <form>
                <div>
                    <h1 className="headline">
                        Schedule an Event
                    </h1>
                </div>
                
                <div >
                    <label className="label"> 
                      Organization Name
                     <br/>
                     <input className = "input"
                      type = 'text'
                      name = 'Organization Name'
                      placeholder = 'Type your organization name'
                      />
                      <br/>
                    </label>
                     <label className="label"> 
                          Address
                         <br/>
                         <input className = "input"
                          type = 'text'
                          name = 'Address'
                          placeholder = 'Address'
                          />
                          <br/>
                    </label>
                    </div>
                         <label className="label"> 
                          Item Lists
                         <br/>
                         <input className = "input1"
                          type = 'text-area'
                          name = 'Itemlist'
                          placeholder = 'Item lists'
                          />
                          <br/>
                          <br/>
                          <br/>
                          <label>Choose a Date</label>
                         
                          <input type="datetime-local"  className="date" name="Date"/>
                          <br/>
                          <br/>
                        </label>
                        <br/>
                        <Button 
                            type="submit"
                            className="submitbutton">
                            Sign up
                        </Button>
                            
                    </form>
                </div>
            </div>
    )
}

export default Event;
