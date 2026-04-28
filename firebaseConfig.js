// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZP_cfCHl846ZF1ql3II2UAy5__Ugwo98",
  authDomain: "tasks-b379b.firebaseapp.com",
  databaseURL: "https://tasks-b379b-default-rtdb.firebaseio.com",
  projectId: "tasks-b379b",
  storageBucket: "tasks-b379b.firebasestorage.app",
  messagingSenderId: "1023719584313",
  appId: "1:1023719584313:web:5588b3e9c3a74f48d2d3e8",
  measurementId: "G-J057M43F2X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and export it
export const db = getDatabase(app);