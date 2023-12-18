// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCejm4jfUevrR894OzwanugYbQtnDAaq3s",
  authDomain: "chat-songcosmos.firebaseapp.com",
  projectId: "chat-songcosmos",
  storageBucket: "chat-songcosmos.appspot.com",
  messagingSenderId: "198137517034",
  appId: "1:198137517034:web:9bd84ac4af6ed970769893"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);