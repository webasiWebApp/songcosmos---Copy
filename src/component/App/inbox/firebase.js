// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArgd27ejjLLxDPJuGSlhUQi_erBOa-TJE",
  authDomain: "songcosmos-chatbox.firebaseapp.com",
  projectId: "songcosmos-chatbox",
  storageBucket: "songcosmos-chatbox.appspot.com",
  messagingSenderId: "905524657774",
  appId: "1:905524657774:web:478715b6328c48ea3c307f",
  measurementId: "G-G3K53PJDXN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);