import React from 'react';
import "./style.scss";




function App() {
  return <Desktop3 {...desktop3Data} />;
}

export default App;

function Desktop3(props) {
  const {
    desktop3,
    image4,
    image8,
    image7,
    search,
    vector2,
    login,
    findHelp,
    place,
    signUp,
    contactUs,
    image9,
    image10,
    image5,
    image14,
    image6,
    image11,
    rectangle25,
    image13,
    image12,
    component1Props,
  } = props;

  return (
    <div className="desktop-3" style={{ backgroundImage: `url(${desktop3})` }}>
      <div className="overlap-group">
        <img className="image-4" src={image4} />
        <img className="image-8" src={image8} />
        <img className="image-7" src={image7} />
        <div className="search sora-regular-normal-white-24px">{search}</div>
        <img
          className="vector"
          src="https://anima-uploads.s3.amazonaws.com/projects/607ba672c8a9f11a51cb9679/releases/607c5e996c32b1523e2a92df/img/vector@2x.svg"
        />
        <img className="vector-1" src={vector2} />
        <Component1
          component1={component1Props.component1}
          title={component1Props.title}
          vector2={component1Props.vector2}
          n={component1Props.n}
        />
        <div className="login sora-regular-normal-white-24px">{login}</div>
        <div className="find-help sora-regular-normal-white-24px">{findHelp}</div>
        <div className="place sora-regular-normal-white-24px">{place}</div>
        <div className="sign-up sora-regular-normal-white-24px">{signUp}</div>
        <div className="contact-us sora-regular-normal-white-24px">{contactUs}</div>
        <img className="image-9 smart-layers-pointers" src={image9} />
        <img className="image-10 smart-layers-pointers" src={image10} />
      </div>
      <div className="overlap-group2">
        <img className="image-5" src={image5} />
        <img className="image-14 smart-layers-pointers" src={image14} />
      </div>
      <div className="overlap-group1">
        <img className="image-6" src={image6} />
        <img className="image-11 smart-layers-pointers" src={image11} />
      </div>
      <img className="rectangle-25 smart-layers-pointers" src={rectangle25} />
      <img className="image-13 smart-layers-pointers" src={image13} />
      <img className="image-12 smart-layers-pointers" src={image12} />
    </div>
  );
}


function Component1(props) {
  const { component1, title, vector2, n } = props;

  return (
    <div className="component-1" style={{ backgroundImage: `url(${component1})` }}>
      <h1 className="title roboto-regular-normal-white-60px">{title}</h1>
      <div className="x">
        <img
          className="vector-3"
          src="https://anima-uploads.s3.amazonaws.com/projects/607ba672c8a9f11a51cb9679/releases/607c7b624b84add35d07f13a/img/vector-3@2x.svg"
        />
        <img className="vector-2" src={vector2} />
      </div>
      <div className="n roboto-regular-normal-white-60px">{n}</div>
    </div>
  );
}

const component1Data = {
    component1: "https://anima-uploads.s3.amazonaws.com/projects/607ba672c8a9f11a51cb9679/releases/607c661a06519b6f7046a574/img/ellipse-1-1@2x.svg",
    title: "F",
    vector2: "https://anima-uploads.s3.amazonaws.com/projects/607ba672c8a9f11a51cb9679/releases/607c661a06519b6f7046a574/img/vector-6@2x.svg",
    n: "N",
};

const desktop3Data = {
    desktop3: "https://anima-uploads.s3.amazonaws.com/projects/607ba672c8a9f11a51cb9679/releases/607c5e996c32b1523e2a92df/img/image-2@1x.png",
    image4: "https://anima-uploads.s3.amazonaws.com/projects/607ba672c8a9f11a51cb9679/releases/607c5e996c32b1523e2a92df/img/image-4@1x.png",
    image8: "https://anima-uploads.s3.amazonaws.com/projects/607ba672c8a9f11a51cb9679/releases/607c5e996c32b1523e2a92df/img/image-8@1x.png",
    image7: "https://anima-uploads.s3.amazonaws.com/projects/607ba672c8a9f11a51cb9679/releases/607c5e996c32b1523e2a92df/img/image-7@1x.png",
    search: "SEARCH",
    vector2: "https://anima-uploads.s3.amazonaws.com/projects/607ba672c8a9f11a51cb9679/releases/607c5e996c32b1523e2a92df/img/vector-1@2x.svg",
    login: "LOGIN",
    findHelp: "FIND HELP",
    place: "HOME",
    signUp: "SIGN UP",
    contactUs: "CONTACT US",
    image9: "https://anima-uploads.s3.amazonaws.com/projects/607ba672c8a9f11a51cb9679/releases/607c5e996c32b1523e2a92df/img/image-9@2x.png",
    image10: "https://anima-uploads.s3.amazonaws.com/projects/607ba672c8a9f11a51cb9679/releases/607c5e996c32b1523e2a92df/img/image-10@2x.png",
    image5: "https://anima-uploads.s3.amazonaws.com/projects/607ba672c8a9f11a51cb9679/releases/607c5e996c32b1523e2a92df/img/image-5@1x.png",
    image14: "https://anima-uploads.s3.amazonaws.com/projects/607ba672c8a9f11a51cb9679/releases/607c5e996c32b1523e2a92df/img/image-14@2x.png",
    image6: "https://anima-uploads.s3.amazonaws.com/projects/607ba672c8a9f11a51cb9679/releases/607bb693d533ec05131394c5/img/image-6@2x.png",
    image11: "https://anima-uploads.s3.amazonaws.com/projects/607ba672c8a9f11a51cb9679/releases/607c5e996c32b1523e2a92df/img/image-11@2x.png",
    rectangle25: "https://anima-uploads.s3.amazonaws.com/projects/607ba672c8a9f11a51cb9679/releases/607bb693d533ec05131394c5/img/rectangle-25@1x.png",
    image13: "https://anima-uploads.s3.amazonaws.com/projects/607ba672c8a9f11a51cb9679/releases/607c5e996c32b1523e2a92df/img/image-13@2x.png",
    image12: "https://anima-uploads.s3.amazonaws.com/projects/607ba672c8a9f11a51cb9679/releases/607c5e996c32b1523e2a92df/img/image-12@2x.png",
    component1Props: component1Data,
};



