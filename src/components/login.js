// import { signInWithEmailAndPassword } from "firebase/auth";
// import React, { useState, useEffect } from "react";
// import { auth } from "./firebase";
// import { toast } from "react-toastify";
// import SignInwithGoogle from "./signInWIthGoogle";
// import app from "./firebase";
// import { getDatabase, get, ref } from "firebase/database";
// import "./styles.css";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const db = getDatabase(app);

//   useEffect(() => {
//     const redirectUser = async () => {
//       try {
//         const user = auth.currentUser;

//         if (user) {

          
          

//           // Reference for Subscription status and Form status
//           const getSubscription = ref(db, `Users/${auth?.currentUser?.uid}/Payment/Subscriptiontype`);
//           const subscriptionSnapshot = await get(getSubscription)
//           const getForm = ref(db, `Users/${auth?.currentUser?.uid}/Form`);
//           const formSnapshot = await get(getForm)

        

//           const subscriptionType = subscriptionSnapshot.val();


//           console.log(subscriptionType+"Hello")
//           console.log(formSnapshot.val(),"form")
//           console.log(auth.currentUser.emailVerified,auth.currentUser.uid,"Hello")

//           // if(auth.currentUser.emailVerified===false || !auth.currentUser.uid){
//           //   window.location.href="/Login"
//           // }

//           if(auth.currentUser.emailVerified===false || !auth.currentUser.uid){
            
//           }
//           else if (!subscriptionType && auth.currentUser.emailVerified===true && auth.currentUser.uid) {
//             // If Subscriptiontype is undefined, redirect to Gemini page
//             window.location.href = "/gemini";
//           } else if (!formSnapshot.exists()) {
//             // Redirect to Resume page if resume is not uploaded
//             window.location.href = "/resume";
//           } else if (subscriptionType === "GetResume") {
//             // Redirect to Resume page if the subscription type is "GetResume"
//             window.location.href = "/resume";
//           } else if (subscriptionType === "FreeTrialStarted" || subscriptionType === "Premium") {
//             // Redirect to Demo page if the user has a FreeTrial or Premium subscription
//             window.location.href = "/demo";
//           } else {
//             // Fallback to Gemini if the subscription type is not recognized
//             window.location.href = "/gemini";
//           }
//         }
//       } catch (error) {
//         console.error("Redirection error:", error);
//         toast.error("An error occurred during redirection. Please try again.");
//       }
//     };

//     redirectUser();
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

    
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       const user = auth.currentUser;
//       localStorage.setItem('user',auth.currentUser.uid);
//       localStorage.setItem("Logout",false)
      
//       // const user = auth.currentUser;
//       if (user && user.emailVerified) {
//         toast.success("User logged in Successfully", { position: "top-center" });
//         // window.location.href = "/gemini";
//       } else {
//         toast.error("Email is not verified", { position: "bottom-center" });
//         return;
//       }

//         if (user) {
          

//           // Reference for Subscription status and Form status
//           const getSubscription = ref(db, `Users/${auth?.currentUser?.uid}/Payment/Subscriptiontype`);
//           const subscriptionSnapshot = await get(getSubscription)
//           const getForm = ref(db, `Users/${auth?.currentUser?.uid}/forms`);
//           const formSnapshot = await get(getForm)

     

//           const subscriptionType = subscriptionSnapshot.val();


//           console.log(subscriptionType+"Hello")
//           console.log(formSnapshot.val(),"form")

//           // console.log(auth.currentUser.emailVerified,auth.currentUser.uid,"Hello")

//           if(auth.currentUser.emailVerified===false || !auth.currentUser.uid){
            
//           }


//           else if (!subscriptionType) {
//             // If Subscriptiontype is undefined, redirect to Gemini page
//             window.location.href = "/gemini";
//           } else if (!formSnapshot.exists()) {
//             // Redirect to Resume page if resume is not uploaded
//             window.location.href = "/resume";
//           } else if (subscriptionType === "GetResume") {
//             // Redirect to Resume page if the subscription type is "GetResume"
//             window.location.href = "/resume";
//           } else if (subscriptionType === "Free" || subscriptionType === "Premium") {
//             // Redirect to Demo page if the user has a FreeTrial or Premium subscription
//             window.location.href = "/demo";
//           } else {
//             // Fallback to Gemini if the subscription type is not recognized
//             window.location.href = "/gemini";
//           }
//         }
          




//     } catch (error) {
//       console.error("Login error:", error.message);
//       toast.error(error.message, { position: "bottom-center" });
//     } finally {
//       setLoading(false);
//     }
//   }


//   return (
//     <main>
//       <h1>Sign In</h1>
//       <div className="contact-container">
//         <div className="message-section">
//           <h2>Get your Dream Job with Us</h2>
//           <p>Land your perfect job with ease! Try Job Form Automator today!</p>
//         </div>
//         <div className="form-section">
//           <form onSubmit={handleSubmit}>
//             <input
//               type="email"
//               placeholder="Email"
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               disabled={loading}
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               disabled={loading}
//             />
//             <div className="form-options">
//               <a href="/passwordReset" className="forgot-password">Forgot password</a>
//             </div>
//             <button type="submit" disabled={loading}>
//               {loading ? "Signing in..." : "Sign in"}
//             </button>
//             <SignInwithGoogle />
//           </form>
//           <p>
//             Don't have an account? <a className="forgot-password" href="/register">Sign up</a>
//           </p>
//         </div>
//       </div>
//     </main>
//   );
// }


// export default Login;

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
    const uid = localStorage.getItem("user");
    const apiKey = localStorage.getItem("api_key");
    const subscriptionType = localStorage.getItem("Subscriptiontype");

    if (uid) {
      const redirectUser = async () => {
        try {
          const user = auth.currentUser;

          if (user && user.uid === uid) {
            if (!user.emailVerified) {
              toast.error("Please verify your email first.", {
                position: "bottom-center",
              });
              // window.location.href = "/login";
              return;
            }

            if (apiKey) {
              if (subscriptionType === "FreeTrialStarted") {
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
  }, [db]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;

      if (user && user.emailVerified) {
        localStorage.setItem("user", user.uid);
        toast.success("User logged in Successfully", { position: "top-center" });

        const subscriptionRef = ref(db, `Users/${user.uid}/Payment/Subscriptiontype`);
        const subscriptionSnapshot = await get(subscriptionRef);
        const subscriptionType = subscriptionSnapshot.val();
        localStorage.setItem("Subscriptiontype", subscriptionType);

        const apiRef = ref(db, `Users/${user.uid}/API/apikey`);
        const apiSnapshot = await get(apiRef);
        const apiKey = apiSnapshot.val();
        localStorage.setItem("api_key", apiKey);

        if (apiKey) {
          if (subscriptionType === "FreeTrialStarted") {
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
