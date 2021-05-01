import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Button } from 'react-bootstrap';
// import {useAuth} from '../../context/AuthContext';
import Fire, { storage } from '../../firebase.config';
import classes from './Test.module.css';
// import {ReactComponent as Logo} from '../../assets/FN-Logo.svg';

export default function Test() {
  const [image, setImage] = useState(null);
  const [imgUrl, setImgUrl] = useState('');
  const { db } = Fire;

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`profiles/pzh@gmail.com`).put(image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref('profiles')
          .child('pzh@gmail.com')
          .getDownloadURL()
          .then((url) => {
            db.getCollection('Users').doc('pzh@gmail.com').update({
              imgUrl: url,
            });

            setImgUrl(url);
          })
          .catch((error) => console.log(error.message));
      }
    );
  };

  useEffect(() => {
    db.getCollection('Users')
      .doc('pzh@gmail.com')
      .get()
      .then((doc) => {
        console.log(doc.data());
        // if(doc.exist){
        //     setImgUrl(doc.data().profile_picture);
        // }

        setImgUrl(doc.data().imgUrl);
      });
  }, [imgUrl]);

  return (
    <>
      <Container className="flex ml-4 align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <Row>
          <Col xs={12} md={3}>
            <Row className="d-flex align-items-center justify-content-center">
              <img className={`${classes.accountimage}`} alt="pic" src={imgUrl} /> {/* <== replace src */}
            </Row>
            <div className="d-flex align-items-center justify-content-center">
              <h4 className={`${classes.font} m-1`}>Name</h4>
            </div>
            <div>
              <h6 className={`${classes.font} ml-2 mt-2`}>About Info</h6>
            </div>

            <div className={`${classes.container} ${classes.font}`}>
              <p className={`${classes.infolabel}`}>Address</p> {/* Change me for dynamic text */}
              <p className={`${classes.infotext}`}>420 69st Scranton, New York 16996 </p>
              <p className={`${classes.infolabel}`}>Email</p>
              <p className={`${classes.infotext}`}>420blazeit@hotmail.com </p>
              <p className={`${classes.infolabel}`}>Phone</p>
              <p className={`${classes.infotext}`}>347-420-6996 </p>
              <p className={`${classes.infolabel}`}>About Us</p>
              <p className={`${classes.infotext}`}>I'mma hyuck you up, and fill you up with my charitable meat! </p>
            </div>
            <Button className={`w-100 ${classes.profilebutton}`}>Edit Profile</Button>
          </Col>
          <Col className="ml-3" xs={12} md={7}>
            <Row>
              <div className="w-100 align-items-center justify-content-center">
                <h6 className={`${classes.font} m-3 mb-2`} style={{ textAlign: 'center' }}>
                  Favorite blah blah
                </h6>{' '}
                {/* Replace with dynamic */}
              </div>
              <div className={`${classes.container} ${classes.font}`}>
                {/* Insert carousel */}
                <a className={`m-3 align-items-center m-2 ${classes.favbox}`} href="/profile">
                  {/* Change href to dynamic */}
                  <img alt="profile-pic" className={`m-3 rounded-circle d-inline-block ${classes.favimg}`} src={imgUrl} />
                </a>
              </div>
            </Row>
            <Row>
              <div className="w-100 align-items-center justify-content-center">
                <h6 className={`${classes.font} m-3 mt-4`} style={{ textAlign: 'center' }}>
                  Recent blah blah
                </h6>{' '}
                {/* Replace with dynamic */}
              </div>
              <div className={`${classes.container} ${classes.font}`} style={{ minHeight: '55vh' }}>
                <div className={`${classes.postings} ${classes.font}`} />

                <div className={`${classes.postsection} ${classes.font} align-items-center justify-content-center`}>
                  <Row>
                    {/* <InputGroup className="mt-3 pr-4 pl-4" style={{minWidth: "50%"}}>
                                        <FormControl
                                        placeholder="Post Something..."
                                        aria-label="Post Something..."
                                        aria-describedby="basic-addon2"
                                        />
                                        <InputGroup.Append>
                                        <Button className={`${classes.postbutton}`}>Post</Button>
                                        </InputGroup.Append>
                                    </InputGroup> */}
                    <input type="file" onChange={handleChange} />
                    <button onClick={handleUpload}>Upload</button>
                  </Row>
                </div>
              </div>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
