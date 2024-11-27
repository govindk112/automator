import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState, useEffect } from "react";
import app, { auth } from "./firebase";
import { toast } from "react-toastify";
import SignInwithGoogle from "./signInWIthGoogle";
import { getDatabase, get, ref, set } from "firebase/database";
import "./styles.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const db = getDatabase(app);
  //Call Event Listner
  function notifyExtensionOnLogin(uid) {
    const event = new CustomEvent('userLoggedIn', { detail: { uid } });
    document.dispatchEvent(event);
  }

  useEffect(() => {
    const uid =  localStorage.getItem("UID");
    const apiKey =  localStorage.getItem("api_key");
    const IsLogin =  localStorage.getItem("IsLogin")
    console.log(IsLogin, "login", !IsLogin, "uid", uid)


    const subscriptionType = localStorage.getItem("SubscriptionType");
    
    console.log(uid,"user Id",typeof(uid))


    if (uid) {
      const redirectUser = async () => {
        try {
          const user = auth.currentUser;
          // console.log(user, uid)

          if (uid && IsLogin) {
            // console.log("hi")
            notifyExtensionOnLogin(uid);
            if (user && !user.emailVerified) {
              toast.error("Email is not verified.Please Verify your email, then try to login again!", {
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
              // console.log("gemini")

            }
          } else {
            // window.location.href = "/login";
            // console.log("login")

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
  },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;

      // website-login.js (on your website)


      // Call this function after successful login
      // userUID is the UID of the logged-in user

      if (user && user.emailVerified) {
        localStorage.setItem("UID", user.uid);
        localStorage.setItem("IsLogin", true);
        localStorage.setItem("UserName", user.displayName);
        //**CALL EVENT LISTNER */
        notifyExtensionOnLogin(user.uid);
        //** STORE REFERAL ID  IN LOCAL STORAGE **//
        const getReferralCodeFromCookie = () => {
          const cookie = document.cookie.split('; ').find(row => row.startsWith('referral='));
          return cookie ? cookie.split('=')[1] : null;
        };
        const referralCode = getReferralCodeFromCookie()
        console.log(referralCode, "code", typeof (referralCode))
        //** SAVE REFERAL CODE IN DATABASE  */
        const currentDate = new Date();
        const formattedDateTime = currentDate.toISOString().replace("T", " ").split(".")[0];
        let currentUser = auth.currentUser.uid;

        if (referralCode) {
          console.log("Save in database/firebase")
          const newDocRef = ref(db, `/referrals/${referralCode}/${currentUser}`);
          console.log(newDocRef, typeof (newDocRef), "referrals");
          get(newDocRef).then((snapshot) => {
            if (!snapshot.exists()) {
              // If the referral code doesn't exist, create a new entry
              set(newDocRef, {
                signupDate: formattedDateTime,
                amount: 0,
              }).then(() => {

              })
            }
          })
        }


        toast.success("User logged in Successfully", { position: "top-center" });

        const subscriptionRef = ref(db, `user/${user.uid}/Payment/SubscriptionType`);
        const subscriptionSnapshot = await get(subscriptionRef);
        const subscriptionType = subscriptionSnapshot.val();
        localStorage.setItem("SubscriptionType", subscriptionType);

        const apiRef = ref(db, `user/${user.uid}/API/apikey`);
        const apiSnapshot = await get(apiRef);
        const apiKey = apiSnapshot.val();
        localStorage.setItem("api_key", apiKey);
        // console.log(subscriptionType, apiKey)

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
        toast.error("Email is not verified.Please Verify your email, then try to login again!", { position: "bottom-center" });
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
