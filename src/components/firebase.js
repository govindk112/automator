// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDDrfKs64q7t2bZibGgjnylPDbZxf5hoig",
    authDomain: "jobform-automator-website.firebaseapp.com",
    projectId: "jobform-automator-website",
    storageBucket: "jobform-automator-website.appspot.com",
    messagingSenderId: "741162222470",
    appId: "1:741162222470:web:debef6d2d8e2befaca2207",
    measurementId: "G-X9649YYRVT"
  
  
    
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

 export const auth=getAuth();
 export default app;
