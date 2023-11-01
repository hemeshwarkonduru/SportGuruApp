// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB0LFw1CwE5Jq5mYuma5ZlyDlI8qYw0lr4",
  authDomain: "sportguru-f9f7f.firebaseapp.com",
  projectId: "sportguru-f9f7f",
  storageBucket: "sportguru-f9f7f.appspot.com",
  messagingSenderId: "176052305861",
  appId: "1:176052305861:web:6f35d4882c99c62c3bd5ac",
  measurementId: "G-N6NDBP8SBJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// android :   50490491314-9gvr45vr3km52bdftcgrpthgafpqbtiv.apps.googleusercontent.com
