import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import "firebase/auth";

var firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyASmSxYKQt0nGfRnVlIxgCkY87UlGfIXyk",
    authDomain: "food-nation-d70ea.firebaseapp.com",
    databaseURL: "https://food-nation-d70ea-default-rtdb.firebaseio.com",
    projectId: "food-nation-d70ea",
    storageBucket: "food-nation-d70ea.appspot.com",
    messagingSenderId: "237141240982",
    appId: "1:237141240982:web:21824fd2925842408de6b7"
  });
  
  class Fire {
    

      getCollection = (collection) => {
          return firebase.firestore().collection(collection);
      }
  
      // Used for realtime database
      getRef = (reference) => {
          return firebase.database().ref(reference);
      }

      getStorage = () =>{
          return firebase.storage().ref();
      }
  
      off() {
          this.ref.off();
      }
      getTime = () =>{
        return firebase.firestore.Timestamp.now();
    }
  }
  
  Fire.db = new Fire();
  export const auth = firebaseConfig.auth();
  export default Fire;
  //export const TestsFire = firebase.initializeApp(firebaseConfig);