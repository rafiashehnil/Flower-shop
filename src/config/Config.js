import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
const firebaseConfig = {
    apiKey: "AIzaSyDDOWEuACtpUUK1Rf-TRSSvH8X-k2OV9vY",
    authDomain: "flower-shop-92d5b.firebaseapp.com",
    projectId: "flower-shop-92d5b",
    storageBucket: "flower-shop-92d5b.appspot.com",
    messagingSenderId: "470405578588",
    appId: "1:470405578588:web:78909f68d38beafd6ecb99",
    measurementId: "G-ZW2X1QNG6Y"
  };
firebase.initializeApp(firebaseConfig) ;
const auth =firebase.auth();
const db=firebase.firestore();
const storage=firebase.storage();
export{auth,db,storage}