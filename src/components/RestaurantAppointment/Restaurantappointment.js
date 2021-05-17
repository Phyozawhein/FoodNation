import styles from "./Restaurantappointments.module.css";
import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import Fire from "../../firebase.config";
import { Button, Form, Modal, Col, Row } from "react-bootstrap";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CancelIcon from "@material-ui/icons/Cancel";
import { IconButton } from "@material-ui/core";
import classes from "./Restaurantappointments.module.css";

function Restaurantappointments() {
  let db = Fire.db;
  const user = useAuth().currentUser.email;
  const [orgName, setOrgName] = useState(null);
  const [resName, setResName] = useState(null);
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

        if (typeCheck.type === "restaurant") {
          setId(typeCheck.id);
        }

        return typeCheck.id;
      })
      .then((id) => {
        db.getCollection("Donation")
          .where("resid", "==", id)
          .get()
          .then((querySnapshot) => {
            let array = [];
            querySnapshot.forEach((doc) => {
              array.push([doc.id, doc.data()]);
            });

            setStatusArray(array);

            setView(true);
          });
      })
      .catch((error) => setError(error.message));
  }, [copyarray]);

  function updateStatus(e) {
    e.preventDefault();

    if ((date && orgName && resName) != null) {
      if (status !== "Change Status") {
        db.getCollection("Donation")
          .doc(docid)
          .update({
            status: status,
          })
          .then(() => {
            db.getCollection("Donation")
              .doc(docid)
              .onSnapshot((doc) => {
                console.log(doc.data());
                setCopyArray([doc.id, doc.data()]);
                console.log("Updated");
              });
          })
          .catch((error) => setError(error.message));
      }
    }
  }

  
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
    db.getCollection("Donation")
      .doc(docid)
      .update({ itemLists: result })
      .then(() => {
        db.getCollection("Donation")
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

    db.getCollection("Donation")
      .doc(id)
      .update({
        itemLists: result,
      })
      .then(() => {
        db.getCollection("Donation")
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

      <h2>List of Appointments</h2>

      <div className={classes.statuses}>
        <div>
          <h3>Open</h3>
          <div className={classes.open}>
            {statusArray
              .filter((doc) => doc[1].status === "open")
              .map((item) => {
                let appDate = new Date(item[1].date);
                appDate = appDate.toLocaleString("en-US", { timeZone: "America/New_York" });

                return (
                  <div>
                    <Form onSubmit={updateStatus} className={classes.forms}>
                      <p id={item[1].id}>Address: {item[1].address}</p>
                      <p id={item[1].id}>Restaurant: {item[1].resName} </p>

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

                      {item[1].expiryEstimate === undefined ? (
                        <></>
                      ) : (
                        <>
                          <p id={item[1].id}>Expiry Estimate: {item[1].expiryEstimate}</p>
                        </>
                      )}

                      <p id={item[1].id}>Charity: {item[1].orgName}</p>
                      <p id={item[1].id}>Date: {appDate}</p>
                      <p id={item[1].id}>Status: {item[1].status}</p>

                      <Form.Group>
                        <select
                          id="statusSelect"
                          className={styles.label1}
                          onChange={(e) => {
                            setOrgName(item[1].orgName);
                            setResName(item[1].resName);
                            setDate(item[1].date);
                            setStatus(e.target.value);
                            setDocId(item[0]);
                          }}
                        >
                          <option selected>Change Status</option>
                          <option value="open">Open</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </Form.Group>
                      <Button type="submit" className={classes.button}>
                        Update
                      </Button>
                    </Form>
                  </div>
                );
              })}
          </div>
        </div>

        <div>
          <h3>Completed</h3>
          <div className={classes.completed}>
            {statusArray
              .filter((doc) => doc[1].status === "completed")
              .map((item) => {
                let appDate = new Date(item[1].date);
                appDate = appDate.toLocaleString("en-US", { timeZone: "America/New_York" });

                return (
                  <Form onSubmit={updateStatus} className={classes.forms}>
                    <p id={item[1].id}>Address: {item[1].address}</p>
                    <p id={item[1].id}>Restaurant: {item[1].resName} </p>
                    <p>Items:</p>
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

                    {item[1].expiryEstimate === undefined ? (
                      <></>
                    ) : (
                      <>
                        {" "}
                        <p id={item[1].id} style={{ color: "white" }}>
                          Expiry Estimate: {item[1].expiryEstimate}{" "}
                        </p>{" "}
                      </>
                    )}

                    <p id={item[1].id} style={{ color: "white" }}>
                      Charity: {item[1].orgName}{" "}
                    </p>
                    <p id={item[1].id} style={{ color: "white" }}>
                      Date: {appDate}{" "}
                    </p>
                    <p id={item[1].id} style={{ color: "white" }}>
                      Status: {item[1].status}{" "}
                    </p>

                    <Form.Group>
                      <select
                        id="statusSelect"
                        onClick={(e) => {
                          setOrgName(item[1].orgName);
                          setResName(item[1].resName);
                          setDate(item[1].date);
                          setStatus(e.target.value);
                          setDocId(item[0]);
                        }}
                      >
                        <option selected>Change Status</option>
                        <option value="open">Open</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </Form.Group>
                    <Button type="submit" className={classes.button}>
                      Update
                    </Button>
                  </Form>
                );
              })}
          </div>
        </div>

        <div>
          <h3>Cancelled</h3>
          <div className={classes.cancelled}>
            {statusArray
              .filter((doc) => doc[1].status === "cancelled")
              .map((item) => {
                let appDate = new Date(item[1].date);
                appDate = appDate.toLocaleString("en-US", { timeZone: "America/New_York" });

                return (
                  <Form onSubmit={updateStatus} className={classes.forms}>
                    <p id={item[1].id} style={{ color: "white" }}>
                      Address: {item[1].address}
                    </p>
                    <p id={item[1].id} style={{ color: "white" }}>
                      Restaurant: {item[1].resName}{" "}
                    </p>

                    <p>Items:</p>
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

                    {item[1].expiryEstimate === undefined ? (
                      <></>
                    ) : (
                      <>
                        {" "}
                        <p id={item[1].id} style={{ color: "white" }}>
                          Expiry Estimate: {item[1].expiryEstimate}{" "}
                        </p>{" "}
                      </>
                    )}

                    <p id={item[1].id} style={{ color: "white" }}>
                      Charity: {item[1].orgName}{" "}
                    </p>
                    <p id={item[1].id} style={{ color: "white" }}>
                      Date: {appDate}{" "}
                    </p>
                    <p id={item[1].id} style={{ color: "white" }}>
                      Status: {item[1].status}{" "}
                    </p>

                    <Form.Group>
                      <select
                        id="statusSelect"
                        onClick={(e) => {
                          setOrgName(item[1].orgName);
                          setResName(item[1].resName);
                          setDate(item[1].date);
                          setStatus(e.target.value);
                          setDocId(item[0]);
                        }}
                      >
                        <option selected>Change Status</option>
                        <option value="open">Open</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </Form.Group>
                    <Button type="submit" className={classes.button}>
                      Update
                    </Button>
                  </Form>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );


  const cantViewPage = (
    <div>
      <h1 className={styles.cantView}>Not authorized to view this page</h1>
    </div>
  );

  return <div>{view === true ? viewPage : cantViewPage}</div>;
}

export default Restaurantappointments;
