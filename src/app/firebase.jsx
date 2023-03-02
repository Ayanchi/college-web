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


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const database = getFirestore(app);

export const storage = getStorage(app)
