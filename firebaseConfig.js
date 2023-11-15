// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB4kDEO3huP0dW3rlvYdS5BhmOXNu1hoPU",
  authDomain: "sportguruapp.firebaseapp.com",
  projectId: "sportguruapp",
  storageBucket: "sportguruapp.appspot.com",
  messagingSenderId: "253032592500",
  appId: "1:253032592500:web:9d106678f985476f12cd21"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// android :   50490491314-9gvr45vr3km52bdftcgrpthgafpqbtiv.apps.googleusercontent.com
