import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "./firebase";
import { toast } from "react-toastify";
import SignInwithGoogle from "./signInWIthGoogle";
import "./styles.css"



let currentUser;


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in Successfully");
      let user = auth.currentUser;
      currentUser = user.uid
      const isEmailVerified = user.emailVerified;
      console.log(user.email,user.displayName)


      
      const userData = {
        displayName: user.displayName,
        email:user.email,
      };

      localStorage.setItem('user', JSON.stringify(userData));
      
      const queryParams = new URLSearchParams(userData).toString();     

    

     if(isEmailVerified===true){
      alert("login successfull")
      // window.location.href = `/gemini`;
      window.location.href = `/profile?${queryParams}`;
      toast.success("User logged in Successfully", {
        position: "top-center",
      });

     }
     else{
      toast.error("Email is not verified")
     }
   
    } catch (error) {
      console.log(error.message);

      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };
  

  return (
    <main>
    {/* <div className="ellipse ellipse-1"></div>
    <div className="ellipse ellipse-2"></div> */}

    <h1>Sign In</h1>
    <div className="contact-container">
      <div className="message-section">
        <h2>Get your Dream Job with Us</h2>
        <p>Land your perfect job with ease! Try Job Form Automator today!</p>
      </div>
      <div className="form-section">
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
          <div className="form-options">
            <a href="/passwordReset" className="forgot-password">Forgot password</a>
          </div>
          <button type="submit">Sign in</button>

          <SignInwithGoogle/>
        </form>
        <p>
          Don't have an account? <a className="forgot-password" href="/register">Sign up</a>
        </p>
      </div>
    </div>
  </main>

    
  );
}

export{currentUser}
export default Login;
