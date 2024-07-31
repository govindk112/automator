import React, { useEffect } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./components/profile";
import { useState } from "react";
import { auth } from "./components/firebase";
import PasswordReset from "./components/passwordReset";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";

function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  });

  return (
    <div>
    
    <Router>
      <div className="App">
            <Header/>
        
      
            <Routes>
              <Route
                path="/"
                element={user!=null ?<Navigate to="/Profile" state={user}/> : <Login/>}
              />
              <Route path="/Login" element={<Login />} />
              <Route path="/PasswordReset" element={<PasswordReset/>}/>
              <Route path="/Register" element={<Register />} />
              <Route path="/Profile" element={<Profile/>} />
              <Route path="/about" element={<About/>}/>
            </Routes>
            <ToastContainer />
       
      </div>
    </Router>
    <Footer/>
    </div>
  );
}

export default App;
