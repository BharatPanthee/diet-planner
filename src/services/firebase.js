// Firebase Initialization Module for AuraDiet
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC4V9VkcYNeg-MFif4bw-EwIx87yBezM3Y",
  authDomain: "cook-connectapp.firebaseapp.com",
  projectId: "cook-connectapp",
  storageBucket: "cook-connectapp.firebasestorage.app",
  messagingSenderId: "223735091243",
  appId: "1:223735091243:web:57df46e8f14b5d29349a6e",
  measurementId: "G-87B5ZWQ494"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase Services
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider };
