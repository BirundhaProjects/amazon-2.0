import firebase from 'firebase/app';
import 'firebase/firestore';
import admin from 'firebase-admin';

//secure connection to firebase

const serviceAccount = require('./permissions.json');

const firebaseConfig = {
    apiKey: "AIzaSyCBWPtNt0sYxLRt8fIs4MzypF_NkAPYyfU",
    authDomain: "amzn-2-85186.firebaseapp.com",
    projectId: "amzn-2-85186",
    storageBucket: "amzn-2-85186.appspot.com",
    messagingSenderId: "486287093475",
    appId: "1:486287093475:web:bb0aadd2ca9735a17a5fd6"
  };


  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
  // Initialize Firebase Admin
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      // Add any other necessary configuration options
    });
  }
  
  const firestore = firebase.firestore();
  const firestoreAdmin = admin.firestore();
  


  export { firebase, firestore, firestoreAdmin, admin};
