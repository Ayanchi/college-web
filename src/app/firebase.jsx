import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAnB6wZRnfa8TbG_NDJUsHejO_IqB-DB3Q",
  authDomain: "college-web-ce60a.firebaseapp.com",
  projectId: "college-web-ce60a",
  storageBucket: "college-web-ce60a.appspot.com",
  messagingSenderId: "1091701822669",
  appId: "1:1091701822669:web:de4d0cf2b544d16c9c8584",
  measurementId: "G-N1K858RZDF"
};

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
