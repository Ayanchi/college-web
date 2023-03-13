import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"


const firebaseConfig = {
  apiKey: "AIzaSyBp9EX7MitBD4vo7suaFAE_f0wJ9sfZeRQ",
  authDomain: "startupomania.firebaseapp.com",
  projectId: "startupomania",
  storageBucket: "startupomania.appspot.com",
  messagingSenderId: "236958229930",
  appId: "1:236958229930:web:241310f454e4e4ae33b7d3",
  measurementId: "G-DMJJ0BGNKN"
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

// const firebaseConfig = {
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
