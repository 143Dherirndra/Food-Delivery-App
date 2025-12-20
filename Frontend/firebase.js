// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_APIKEY ,
  authDomain: "vingo1-bc317.firebaseapp.com",
  projectId: "vingo1-bc317",
  storageBucket: "vingo1-bc317.firebasestorage.app",
  messagingSenderId: "574635042407",
  appId: "1:574635042407:web:07a9538a284816593ad6c2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth();
export {app,auth}
