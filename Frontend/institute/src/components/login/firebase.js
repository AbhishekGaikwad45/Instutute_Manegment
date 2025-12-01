// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDa4o2ifLdlfwhI8S5XAMRiuVOvi9bBupM",
  authDomain: "institute-4b1a2.firebaseapp.com",
  projectId: "institute-4b1a2",
  storageBucket: "institute-4b1a2.appspot.com",
  messagingSenderId: "1052669108940",
  appId: "1:1052669108940:web:8019963676c6fdf18b5869"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
