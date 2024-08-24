import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app, { auth } from "./firebase";
import { toast } from "react-toastify";
import { getDatabase, ref, set, get } from "firebase/database";
import google from "./image/google.svg"
import "./styles.css"
function SignInwithGoogle() {
  function googleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (result) => {
      console.log(result);
      const user = result.user;
      let name = user.displayName;
      let email = user.email;
      let profilePhoto = user.photoURL
      const db = getDatabase(app)


      const userRef = ref(db, "Users/" + user.uid);
      get(userRef).then(async (snapshot) => {

        if (snapshot.exists()) {
          toast.success("User logged in Successfully", {
            position: "top-center",
          });
         
          const userData = {
            displayName: user.displayName,
            email: user.email,
          };
          localStorage.setItem('UID', user?.uid);
          try {

            const user = auth.currentUser;


            if (user) {


              // Reference for Subscription status and Form status
              const getSubscription = ref(db, `Users/${auth?.currentUser?.uid}/Payment/Subscriptiontype`);
              const subscriptionSnapshot = await get(getSubscription)
              const getForm = ref(db, `Users/${auth?.currentUser?.uid}/forms`);
              const formSnapshot = await get(getForm)
              const subscriptionType = subscriptionSnapshot.val();


              console.log(subscriptionType + "Hello")
              console.log(formSnapshot.val(), "form")

              // website-login.js (on your website)
              function notifyExtensionOnLogin(uid) {
                const event = new CustomEvent('userLoggedIn', { detail: { uid } });
                document.dispatchEvent(event);
              }
              notifyExtensionOnLogin(auth?.currentUser?.uid)


              if (!subscriptionType) {
                // If Subscriptiontype is undefined, redirect to Gemini page
                window.location.href = "/gemini";
              } else if (!formSnapshot.exists()) {
                // Redirect to Resume page if resume is not uploaded
                window.location.href = "/resume";
              } else if (subscriptionType === "GetResume") {
                // Redirect to Resume page if the subscription type is "GetResume"
                window.location.href = "/resume";
              } else if (subscriptionType === "FreeTrialStarted" || subscriptionType === "Premium") {
                // Redirect to Demo page if the user has a FreeTrial or Premium subscription
                window.location.href = "/demo";
              } else {
                // Fallback to Gemini if the subscription type is not recognized
                window.location.href = "/gemini";
              }
            }


          } catch (error) {
            console.error("Login error:", error.message);
            toast.error(error.message, { position: "bottom-center" });
          }



        }
        else {
          const newDocRef = ref(db, "Users/" + auth.currentUser.uid)
          set(newDocRef, {
            name: name,
            email: email,
            profilePhoto: profilePhoto


          }).then(async () => {
            toast.success("User logged in Successfully", {
              position: "top-center",

            });
            const user = result.user;
            const userData = {
              displayName: user.displayName,
              email: user.email,
            };
            localStorage.setItem('UID', user?.uid);
            // const queryParams = new URLSearchParams(userData).toString();
            try {

              const user = auth.currentUser;
              // const user = auth.currentUser;

              if (user) {


                // Reference for Subscription status and Form status
                const getSubscription = ref(db, `Users/${auth?.currentUser?.uid}/Payment/Subscriptiontype`);
                const subscriptionSnapshot = await get(getSubscription)
                const getForm = ref(db, `Users/${auth?.currentUser?.uid}/forms`);
                const formSnapshot = await get(getForm)


                const subscriptionType = subscriptionSnapshot.val();


                console.log(subscriptionType + "Hello")
                console.log(formSnapshot.val(), "form")


                if (!subscriptionType) {
                  // If Subscriptiontype is undefined, redirect to Gemini page
                  window.location.href = "/gemini";
                } else if (!formSnapshot.exists()) {
                  // Redirect to Resume page if resume is not uploaded
                  window.location.href = "/resume";
                } else if (subscriptionType === "GetResume") {
                  // Redirect to Resume page if the subscription type is "GetResume"
                  window.location.href = "/resume";
                } else if (subscriptionType === "Free" || subscriptionType === "Premium") {
                  // Redirect to Demo page if the user has a FreeTrial or Premium subscription
                  window.location.href = "/demo";
                } else {
                  // Fallback to Gemini if the subscription type is not recognized
                  window.location.href = "/gemini";
                }
              }

            } catch (error) {
              console.error("Login error:", error.message);
              toast.error(error.message, { position: "bottom-center" });
            }

          }).catch((err) => {
            toast.error(err.message)

          })
        }
      })


    });
  }
  return (


    <div>
      <button type="button" className="btn-google" onClick={googleLogin} >
        <img src={google} alt="Google icon"
          style={{
            width: '20px',
            height: '20px',
            marginRight: '10px'
          }} />
        Sign in with Google
      </button>
    </div>
  );
}
export default SignInwithGoogle;
