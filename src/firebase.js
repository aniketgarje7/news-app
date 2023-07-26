// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDmO_ej3V_oi05aABGKvzSylwVUP2sovd8",
  authDomain: "news-app-cb268.firebaseapp.com",
  projectId: "news-app-cb268",
  storageBucket: "news-app-cb268.appspot.com",
  messagingSenderId: "505418269837",
  appId: "1:505418269837:web:d4b1e2e8f4312643fe0ec4",
  measurementId: "G-SKH8RBSNPJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
 const auth = getAuth(app);
 export {db,auth}
 