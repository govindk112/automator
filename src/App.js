

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./components/profile";
import { auth } from "./components/firebase";
import PasswordReset from "./components/passwordReset";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import Gemini from "./components/gemini";
import Payment from "./components/payment";
import Resume from "./components/resume";
import Policy from "./components/policy";
import { getDatabase, ref, get } from "firebase/database";
import app from "./components/firebase";
import Promocode from "./components/promocode";
import Demo from "./components/demo";
import DelayedComponent from "./components/delay";

function App() {
  const [api, setApi] = useState("");
  const [payment, setPayment] = useState("");
  const [user, setUser] = useState(null);
  const [component, setComponent] = useState("");

  useEffect(() => {
    const db = getDatabase(app);

    auth.onAuthStateChanged(async (user) => {
      setUser(user);


      if (user) {
        const userId = user.uid;

        // Get API data
        const getApi = ref(db, `Users/${auth?.currentUser?.uid}/API`);
        const apiSnapshot = await get(getApi)
        setApi(apiSnapshot.exists() ? "exist" : "");

        // Get Payment/Subscriptiontype data
        const getPaymentInformation = ref(db, `Users/${auth?.currentUser?.uid}/Payment/Subscriptiontype`);
        const paymentSnapshot = await get(getPaymentInformation)
        setPayment(paymentSnapshot.exists() ? paymentSnapshot.val() : "");


        const getForm = ref(db,`Users/${auth?.currentUser?.uid}/forms`);
        const formSnapshort = await get(getForm);
        

        // Determine the component to render
        if (!paymentSnapshot.exists()) {
          // If Subscriptiontype is undefined, redirect to Gemini page
          setComponent(<Gemini />);
        } else if (paymentSnapshot.val() === "GetResume") {
          // Redirect to Resume page if the subscription type is "GetResume"
          setComponent(<Resume />);
        } else if ((paymentSnapshot.val() === "Free" || paymentSnapshot.val() === "Premium")&& formSnapshort.exists()) {
          // Redirect to Demo page if the user has a FreeTrial or Premium subscription
          setComponent(<Demo />);
        } else {
          // Fallback to Gemini if the subscription type is not recognized
          setComponent(<Resume />);
        }
      } else {
        // If the user is not authenticated, render the Login component
        setComponent(<Login />);
      }
    
    
    });
  
       

  },[]);

  return (
    <div>
        <div className="ellipse ellipse-1"></div>
        <div className="ellipse ellipse-2"></div>
        <div className="ellipse ellipse-3"></div>
        <div className="ellipse ellipse-4"></div>

        <Router>
          <Header />
          <Routes>
            <Route path="/" element={component} />
            <Route path="/Login" element={<Login />} />
            <Route path="/PasswordReset" element={<PasswordReset />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/gemini" element={<Gemini />} />
            <Route path="/about" element={<About />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/policy" element={<Policy />} />
            <Route path="/promocode" element={<Promocode />} />
            <Route path="/demo" element={<Demo />} />
          </Routes>
          <ToastContainer />
          <Footer />
        </Router>
    </div>
  );
}

export default App;
