import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { toast } from "react-toastify";
import app from "./firebase";
import { getDatabase, ref, set } from "firebase/database";
import "./styles.css"


function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");



  const handleRegister = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const sendVerificationEmail = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          await sendEmailVerification(user);
          console.log('Verification email sent!');
        } else {
          console.log('No user is signed in.');
        }
      } catch (error) {
        console.error('Error sending verification email:', error);
      }
    };

    let displayName = fname + " " + lname
    // console.log(displayName)
    const setDisplayName = (user, displayName) => {
      updateProfile(user, {
        displayName: displayName
      }).then(() => {
        // Profile updated successfully!
        // console.log("Display name updated successfully!");
      }).catch((error) => {
        // An error occurred
        toast.error("Error updating display name:", error);
      });
    };
    auth.onAuthStateChanged((user) => {
      if (user) {
        setDisplayName(user, displayName);
      }
    });
    try {
      // console.log(email, password)

      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      // console.log(user);
      await sendVerificationEmail()



      const db = getDatabase(app)
      if (user) {
        const newDocRef = ref(db, "user/" + auth.currentUser.uid);
        set(newDocRef, {
          fname: fname,
          lname: lname,
          email: email,
          password: password,

        }).then(() => {
          // console.log("User Registered Successfully!!");
          toast.success("User Registered Successfully!!", {
            position: "top-center",
          });
          toast.success("Email Verification Link Send Successfully : Please check your email!", {
            position: "top-center",
          });


        })

      }
    } catch (error) {
      // console.log(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <main>

      <div class="ellipse ellipse-1"></div>
      <div class="ellipse ellipse-2"></div>

      <h1>Sign Up</h1>
      <div className="contact-container">
        <div className="message-section">
          <h2>Start Auto-applying now!</h2>
          <p>
            Achieve career success with Job Form Automator! Start Auto-applying now!</p>
        </div>
        <div className="form-section">
          <form onSubmit={handleRegister}>
            <input type="text" placeholder="First Name" onChange={(e) => setFname(e.target.value)} required />
            <input type="text" placeholder="Last Name" onChange={(e) => setLname(e.target.value)} required />
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
            <br/>

            <button type="submit">Sign Up</button><br />
            Already registered <a href="/login" className="forgot-password">Login</a>


          </form>
        </div>
      </div>
    </main>

  );
}
export default Register;
