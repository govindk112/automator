
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
import Index from "./components";
import UpdateGemini from "./components/updateGemini";
import UpdateResume from "./components/updateResume";
import Blog from "./components/blog";
import Protected from "./components/protected";
import ContactUs from "./components/contactUs";
import GetId from "./components/getI";
import Referral from "./components/referral";
import NotFound  from "./components/Notfound";

function App() {
  const [component, setComponent] = useState(<Login />);

  const readLocalStorage = (key) => {
    return localStorage.getItem(key);
  };

  const writeLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
  };

  useEffect(() => {
    const db = getDatabase(app);

    const storedUid = readLocalStorage("UID");
    const storedApi = readLocalStorage("api_key");
    const storedSubscriptionType = readLocalStorage("Subscriptiontype");

    console.log(storedUid, storedApi, storedSubscriptionType)
    // Check local storage first
    if (!storedUid) {
      // User is not authenticated but UID is present
      setComponent(<Login />);
      return;
    }
    else if (storedUid && storedApi === 'null') {
      setComponent(<Gemini />)
      return;

    }
    else if (storedUid && storedApi !== 'null' && storedSubscriptionType === "GetResume") {
      // UID and API key are present
      setComponent(<Resume />);
      return;
    } else if (storedUid && storedSubscriptionType === "FreeTrialStarted") {
      // UID is present and user is in FreeTrial
      setComponent(<Demo />);
      return;
    }

    // Fetch from Firebase if local storage doesn't have required data
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const uid = user.uid;
        const getApi = ref(db, `user/${uid}/API`);
        const apiSnapshot = await get(getApi);
        const getPaymentInformation = ref(db, `user/${uid}/Payment/Subscriptiontype`);
        const paymentSnapshot = await get(getPaymentInformation);
        const getForm = ref(db, `user/${uid}/forms`);
        const formSnapshot = await get(getForm);

        // Store data in local storage
        // Disable console.log


        writeLocalStorage("UID", uid);
        if (apiSnapshot.exists()) {
          writeLocalStorage("api_key", apiSnapshot.val());
        }
        if (paymentSnapshot.exists()) {
          writeLocalStorage("Subscriptiontype", paymentSnapshot.val());
        }

        // Determine the component to render
        if (!user.emailVerified || !user.uid) {
          setComponent(<Login />);
        } else if (!paymentSnapshot.exists()) {
          setComponent(<Gemini />);
        } else if (paymentSnapshot.val() === "GetResume") {
          setComponent(<Resume />);
        } else if ((paymentSnapshot.val() === "FreeTrialStarted" || paymentSnapshot.val() === "Premium") && formSnapshot.exists()) {
          setComponent(<Demo />);
        } else {
          setComponent(<Resume />);
        }
      } else {
        setComponent(<Login />);
      }
    });

    return () => unsubscribe(); // Clean up subscription on unmount
  }, []);

  return (
    <div>


      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/:id" element={<Index />} />
          <Route path="/getid" element={<GetId />} />
          <Route path="/login" element={<Login />} />
          <Route path="/User" element={component} />
          <Route path="/PasswordReset" element={<Protected Component={PasswordReset} />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Profile" element={<Protected Component={Profile} />} />
          <Route path="/gemini" element={<Protected Component={Gemini} />} />
          <Route path="/updategemini" element={<Protected Component={UpdateGemini} />} />
          <Route path="/about" element={<About />} />
          <Route path="/payment" element={<Protected Component={Payment} />} />
          <Route path="/resume" element={<Protected Component={Resume} />} />
          <Route path="/updateresume" element={<Protected Component={UpdateResume} />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/promocode" element={<Promocode />} />
          <Route path="/demo" element={<Protected Component={Demo} />} />
          <Route path="/blog_list" element={<Blog />} />
          <Route path="/contact" element={<Protected Component={ContactUs} />} />
          <Route path="/referral" element={<Referral/>}/>
          <Route path="*" element={<NotFound />} />

        </Routes>
        <ToastContainer />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
