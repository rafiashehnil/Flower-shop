import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDDOWEuACtpUUK1Rf-TRSSvH8X-k2OV9vY",
  authDomain: "flower-shop-92d5b.firebaseapp.com",
  projectId: "flower-shop-92d5b",
  storageBucket: "flower-shop-92d5b.appspot.com",
  messagingSenderId: "470405578588",
  appId: "1:470405578588:web:78909f68d38beafd6ecb99",
  measurementId: "G-ZW2X1QNG6Y"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

export { auth, db, storage };