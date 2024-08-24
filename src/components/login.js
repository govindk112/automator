import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
import { toast } from "react-toastify";
import SignInwithGoogle from "./signInWIthGoogle";
import { getDatabase, get, ref } from "firebase/database";
import "./styles.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const db = getDatabase();

  useEffect(() => {
    const uid = localStorage.getItem("UID");
    const apiKey = localStorage.getItem("api_key");


    const subscriptionType = localStorage.getItem("Subscriptiontype");
    console.log(subscriptionType, 'type')
    console.log(typeof(apiKey),apiKey,null)
    console.log(apiKey !== 'null')

    if (uid) {
      const redirectUser = async () => {
        try {
          const user = auth.currentUser;
          console.log(user, uid)

          if (uid) {
            console.log("hi")
            if (user && !user.emailVerified) {
              toast.error("Please verify your email first.", {
                position: "bottom-center",
              });
              // window.location.href = "/login";
              return;
            }



            if (apiKey !== 'null' && apiKey !== null) {
              if (subscriptionType && subscriptionType === "FreeTrialStarted") {
                window.location.href = "/demo";
              } else {
                window.location.href = "/resume";
              }
            } else {
              window.location.href = "/gemini";
            }
          } else {
            // window.location.href = "/login";
          }
        } catch (error) {
          console.error("Error fetching data from Firebase:", error);
          toast.error("An error occurred. Please try again.", {
            position: "bottom-center",
          });
        }
      };

      redirectUser();
    }
  },);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;

      // website-login.js (on your website)
      function notifyExtensionOnLogin(uid) {
        const event = new CustomEvent('userLoggedIn', { detail: { uid } });
        document.dispatchEvent(event);
      }

      // Call this function after successful login
      // userUID is the UID of the logged-in user

      if (user && user.emailVerified) {
        localStorage.setItem("UID", user.uid);
        notifyExtensionOnLogin(user.uid);
        toast.success("User logged in Successfully", { position: "top-center" });

        const subscriptionRef = ref(db, `Users/${user.uid}/Payment/Subscriptiontype`);
        const subscriptionSnapshot = await get(subscriptionRef);
        const subscriptionType = subscriptionSnapshot.val();
        localStorage.setItem("Subscriptiontype", subscriptionType);

        const apiRef = ref(db, `Users/${user.uid}/API/apikey`);
        const apiSnapshot = await get(apiRef);
        const apiKey = apiSnapshot.val();
        localStorage.setItem("api_key", apiKey);
        console.log(subscriptionType, apiKey)

        if (apiKey) {
          if (subscriptionType === "FreeTrialStarted" || subscriptionType === "Premium") {
            window.location.href = "/demo";
          } else {
            window.location.href = "/resume";
          }
        } else {
          window.location.href = "/gemini";
        }
      } else {
        toast.error("Email is not verified", { position: "bottom-center" });
      }
    } catch (error) {
      console.error("Login error:", error.message);
      toast.error(error.message, { position: "bottom-center" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="ellipse ellipse-1"></div>
      <div className="ellipse ellipse-2"></div>
      <h1>Sign In</h1>
      <div className="contact-container">
        <div className="message-section">
          <h2>Get your Dream Job with Us</h2>
          <p>Land your perfect job with ease! Try Job Form Automator today!</p>
        </div>
        <div className="form-section">
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
            <div className="form-options">
              <a href="/passwordReset" className="forgot-password">
                Forgot password
              </a>
            </div>
            <button type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </button>
            <SignInwithGoogle />
          </form>
          <p>
            Don't have an account?{" "}
            <a className="forgot-password" href="/register">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}

export default Login;
