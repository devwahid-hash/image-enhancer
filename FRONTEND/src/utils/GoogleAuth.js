// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGSGRQwP0colIpoWMjJwn-9nvNBdv5kpM",
  authDomain: "authlearnvora.firebaseapp.com",
  projectId: "authlearnvora",
  storageBucket: "authlearnvora.firebasestorage.app",
  messagingSenderId: "1007237481320",
  appId: "1:1007237481320:web:a1aae435ced894f2db4cdd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth=getAuth(app)
const provider=new GoogleAuthProvider()

export {auth,provider};