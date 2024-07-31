// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyB7mEabVhmyybLx5Bvik8adukbJzau_V44",
    databaseUrl:"https://demo1-134d6-default-rtdb.firebaseio.com/",
    authDomain: "demo1-134d6.firebaseapp.com",
    projectId: "demo1-134d6",
    storageBucket: "demo1-134d6.appspot.com",
    messagingSenderId: "592161953378",
    appId: "1:592161953378:web:f372bb8eba68b57bfc633b",
    
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

 export const auth=getAuth();
 export default app;
