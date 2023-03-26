import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"


const firebaseConfig = {
  apiKey: "AIzaSyAnB6wZRnfa8TbG_NDJUsHejO_IqB-DB3Q",
  authDomain: "college-web-ce60a.firebaseapp.com",
  projectId: "college-web-ce60a",
  storageBucket: "college-web-ce60a.appspot.com",
  messagingSenderId: "1091701822669",
  appId: "1:1091701822669:web:de4d0cf2b544d16c9c8584",
  measurementId: "G-N1K858RZDF"
};


// Erzhany

// const firebaseConfig = {
//   apiKey: "AIzaSyDF0bFadz3S5DxrxVmufjqaVI8EAx0l6iU",
//   authDomain: "react-firtebase.firebaseapp.com",
//   projectId: "react-firtebase",
//   storageBucket: "react-firtebase.appspot.com",
//   messagingSenderId: "570948240941",
//   appId: "1:570948240941:web:a1c46ac151c3958b999aa4",
//   measurementId: "G-G92GS5798C"
// };

// Artur

/*const firebaseConfig = {
  apiKey: "AIzaSyDMX-hk02cBNZs6c53POEpVZv3ZuLst47w",
  authDomain: "startup-5ca02.firebaseapp.com",
  projectId: "startup-5ca02",
  storageBucket: "startup-5ca02.appspot.com",
  messagingSenderId: "290688509998",
  appId: "1:290688509998:web:da309b144cc6a3fe4917bf"
};*/

// const fire baseConfig = {
//   apiKey: "AIzaSyBp9EX7MitBD4vo7suaFAE_f0wJ9sfZeRQ",
//   authDomain: "startupomania.firebaseapp.com",
//   projectId: "startupomania",
//   storageBucket: "startupomania.appspot.com",
//   messagingSenderId: "236958229930",
//   appId: "1:236958229930:web:241310f454e4e4ae33b7d3",
//   measurementId: "G-DMJJ0BGNKN"
// };


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const database = getFirestore(app);

export const storage = getStorage(app)
