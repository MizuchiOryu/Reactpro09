import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  // TODO
  apiKey: "AIzaSyAIVNVFXTcWh4g90mqwucvgHkp6Y9zd8Jw",
  authDomain: "qcmv3-265d2.firebaseapp.com",
  appId: "qcmv3-265d2",
  databaseURL: "https://qcmv3-265d2.firebaseio.com/",
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

export { firebase, database };