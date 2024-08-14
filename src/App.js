

// import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./components/login";
// import Register from "./components/register";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Profile from "./components/profile";
// import { auth } from "./components/firebase";
// import PasswordReset from "./components/passwordReset";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import About from "./components/About";
// import Gemini from "./components/gemini";
// import Payment from "./components/payment";
// import Resume from "./components/resume";
// import Policy from "./components/policy";
// import { getDatabase, ref, get } from "firebase/database";
// import app from "./components/firebase";
// import Promocode from "./components/promocode";
// import Demo from "./components/demo";


// function App() {

//   const [component, setComponent] = useState("");

//   useEffect(() => {
//     const db = getDatabase(app);

//     auth.onAuthStateChanged(async (user) => {
//       // setUser(user);


//       if (user) {
        

//         const getApi = ref(db, `Users/${auth?.currentUser?.uid}/API`);
//          await get(getApi)

//         const getPaymentInformation = ref(db, `Users/${auth?.currentUser?.uid}/Payment/Subscriptiontype`);
//         const paymentSnapshot = await get(getPaymentInformation)
        


//         const getForm = ref(db,`Users/${auth?.currentUser?.uid}/forms`);
//         const formSnapshort = await get(getForm);
        

//         // Determine the component to render
//         if(auth.currentUser.emailVerified===false || !auth.currentUser.uid){
//           setComponent(<Login/>)
//         }
//         else if (!paymentSnapshot.exists()) {
//           // If Subscriptiontype is undefined, redirect to Gemini page
//           setComponent(<Gemini />);
//         } else if (paymentSnapshot.val() === "GetResume") {
//           // Redirect to Resume page if the subscription type is "GetResume"
//           setComponent(<Resume />);
//         } else if ((paymentSnapshot.val() === "FreeTrialStarted" || paymentSnapshot.val() === "Premium")&& formSnapshort.exists()) {
//           // Redirect to Demo page if the user has a FreeTrial or Premium subscription
//           setComponent(<Demo />);
//         } else {
//           // Fallback to Gemini if the subscription type is not recognized
//           setComponent(<Resume />);
//         }
//       } else {
//         // If the user is not authenticated, render the Login component
//         setComponent(<Login />);
//       }
    
    
//     });
  
       

//   },[]);

//   return (
//     <div>
//         <div className="ellipse ellipse-1"></div>
//         <div className="ellipse ellipse-2"></div>
//         <div className="ellipse ellipse-3"></div>
//         <div className="ellipse ellipse-4"></div>

//         <Router>
//           <Header />
//           <Routes>
//             <Route path="/" element={component} />
//             <Route path="/Login" element={<Login />} />
//             <Route path="/PasswordReset" element={<PasswordReset />} />
//             <Route path="/Register" element={<Register />} />
//             <Route path="/Profile" element={<Profile />} />
//             <Route path="/gemini" element={<Gemini />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/payment" element={<Payment />} />
//             <Route path="/resume" element={<Resume />} />
//             <Route path="/policy" element={<Policy />} />
//             <Route path="/promocode" element={<Promocode />} />
//             <Route path="/demo" element={<Demo />} />
//           </Routes>
//           <ToastContainer />
//           <Footer />
//         </Router>
//     </div>
//   );
// }

// export default App;
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

    const storedUid = readLocalStorage("user");
    const storedApi = readLocalStorage("api_key");
    const storedSubscriptionType = readLocalStorage("Subscriptiontype");
    console.log(storedUid,storedSubscriptionType,"Data T")
  

    // Check local storage first
    if (!storedUid ) {
      // User is not authenticated but UID is present
      setComponent(<Login />);
      return;
    } else if (storedUid && storedApi && storedSubscriptionType==="GetResume") {
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
        const getApi = ref(db, `Users/${uid}/API`);
        const apiSnapshot = await get(getApi);
        const getPaymentInformation = ref(db, `Users/${uid}/Payment/Subscriptiontype`);
        const paymentSnapshot = await get(getPaymentInformation);
        const getForm = ref(db, `Users/${uid}/forms`);
        const formSnapshot = await get(getForm);

        // Store data in local storage
        writeLocalStorage("user", uid);
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
      <div className="ellipse ellipse-1"></div>
      <div className="ellipse ellipse-2"></div>
      <div className="ellipse ellipse-3"></div>
      <div className="ellipse ellipse-4"></div>

      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Index/>}/>
          <Route path="/User" element={component} />
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
