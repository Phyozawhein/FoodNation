import styles from "./EventList.module.css";
import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import Fire from "../../firebase.config";
import { Button, Form, Modal, Col, Row } from "react-bootstrap";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CancelIcon from "@material-ui/icons/Cancel";
import { IconButton } from "@material-ui/core";
import classes from "./EventList.module.css";

function AppointmentList() {
  let db = Fire.db;
  const user = useAuth().currentUser.email;
  const [orgName, setOrgName] = useState(null);
  const [average, setAverage] = useState(null);
  const [date, setDate] = useState(null);
  let itemLists = [];
  const [id, setId] = useState(null);
  const [docid, setDocId] = useState("");
  const [view, setView] = useState(false);
  const [status, setStatus] = useState("");
  const [statusArray, setStatusArray] = useState([]);
  const [error, setError] = useState("");
  const [copyarray, setCopyArray] = useState([]);
  const [itemName, setItemName] = useState("");
  const [list, setList] = useState([]);
  const [oldName, setOldName] = useState("");

  const [canEditTag, setEditTag] = useState(false); //For editing tag display

  useEffect(() => {
    db.getCollection("Users")
      .doc(user)
      .get()
      .then((doc) => {
        const typeCheck = doc.data();

        if (typeCheck.type === "charity") {
          setId(typeCheck.id);
        }

        return typeCheck.id;
      })
      .then((id) => {
        db.getCollection("Events")
          .where("id", "==", id)
          .get()
          .then((querySnapshot) => {
            let array = [];
            querySnapshot.forEach((doc) => {
              array.push([doc.id, doc.data()]);
            });
            console.log(array);
            setStatusArray(array);
            setView(true);
          });
      })
      .catch((error) => setError(error.message));
  }, [copyarray]);


  async function showEdit(ItemName, DocID) {
    setEditTag(true);
    setDocId(DocID);
    setOldName(ItemName);
  }
  async function handleCancel() {
    setEditTag(false);
  }
  async function handleEdit(e) {
    e.preventDefault();
    let result = list;
    console.log(result);
    if (result.length) {
      result[result.indexOf(oldName)] = itemName;
    }

    console.log(result);
    db.getCollection("Events")
      .doc(docid)
      .update({ itemLists: result })
      .then(() => {
        db.getCollection("Events")
          .doc(id)
          .onSnapshot((doc) => {
            setCopyArray([doc.id, doc.data()]);
            console.log("Updated");
          });
      });
  }

  const handleChange = (e) => {
    setItemName(e.target.value);
  };

  async function handleDelete(value, id, e) {
    e.preventDefault();

    let result = itemLists.filter((num) => num !== value);
    console.log(result);

    db.getCollection("Events")
      .doc(id)
      .update({
        itemLists: result,
      })
      .then(() => {
        db.getCollection("Events")
          .doc(id)
          .onSnapshot((doc) => {
            setCopyArray([doc.id, doc.data()]);
            console.log("Updated");
          });
      })
      .catch((error) => setError(error.message));
  }

  const viewPage = (
    <div className={classes.container}>
      <Modal size="lg" contentClassName={styles.custommodal} show={canEditTag} onHide={handleCancel} animation={false}>
        <Modal.Header className={`${styles.custommodaltitle} ${styles.custommodalheader}`} closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">Change item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEdit} className={styles.EditForm}>
            <Form.Group>
              <Form.Label>Item name : </Form.Label>
              <Form.Control style={{ backgroundColor: "rgba(196, 196, 196, 0.27) " }} required onChange={handleChange} />
            </Form.Group>

            <Button className={`w-100 ${styles.button}`} type="submit">
              Edit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <h2>List of Events</h2>

      <div className={classes.statuses}>
        <div>
          <div className={classes.open}>

            {statusArray.map((item) => {
                let appDate = new Date(item[1].date);
                appDate = appDate.toLocaleString("en-US", { timeZone: "America/New_York" });

                return (
                  <div>
                    <Form className={classes.forms}>
                      <p id={item[1].id}>Address: {item[1].address}</p>

                      <div>
                        <p> Items:</p>

                        {canEditTag === false ? (
                          <ul className={classes.lists}>
                            {item[1].itemLists.map((stuff, index) => (
                              <li id={index}>
                                <div className={classes.itemLists}>
                                  <span> {stuff}</span>
                                  <div>
                                    <IconButton
                                      onClick={(e) => {
                                        setList(item[1].itemLists);
                                        showEdit(stuff, item[0]);
                                      }}
                                    >
                                      <EditIcon className={classes.icons} />
                                    </IconButton>

                                    <IconButton
                                      onClick={(e) => {
                                        itemLists = item[1].itemLists;
                                        handleDelete(stuff, item[0], e);
                                      }}
                                    >
                                      <DeleteIcon className={classes.icons} />
                                    </IconButton>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <ul className={classes.lists}>
                            <Form className={classes.forms}>
                              {item[1].itemLists.map((stuff, index) => (
                                <li id={index}>
                                  <div className={classes.itemLists}>
                                    <p> {stuff}</p>
                                    <div>
                                      <IconButton
                                        onClick={(e) => {
                                          setList(item[1].itemLists);
                                          showEdit(stuff, item[0]);
                                        }}
                                      >
                                        <EditIcon className={classes.icons} />
                                      </IconButton>

                                      <IconButton
                                        onClick={(e) => {
                                          itemLists = item[1].itemLists;
                                          handleDelete(stuff, item[0], e);
                                        }}
                                      >
                                        <DeleteIcon className={classes.icons} />
                                      </IconButton>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </Form>
                          </ul>
                        )}
                      </div>
                      <p id={item[1].id}>Charity: {item[1].orgName}</p>
                      <p id={item[1].id}>Date: {appDate}</p>
                      <p id={item[1].id}>Avg. Crowd: {item[1].average}</p>
                    </Form>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );

  const cantViewPage = (
    <div>
      <h3>Not authorized to view this page</h3>
    </div>
  );

  return <div>{view === true ? viewPage : cantViewPage}</div>;
}

export default AppointmentList;
