import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app, { auth } from "./firebase";
import { toast } from "react-toastify";
import { getDatabase,ref,set,push, } from "firebase/database";
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
      if (result.user) {
        const newDocRef = push(ref(db,"Users"))
        set(newDocRef,{
          name:name,
          email:email,
          profilePhoto:profilePhoto

          
        }).then(()=>{
          toast.success("User logged in Successfully", {
            position: "top-center",
            
          });
          const user = result.user;
          const userData = {
            displayName: user.displayName,
            email:user.email,
          };
          localStorage.setItem('user', JSON.stringify(userData));
          const queryParams = new URLSearchParams(userData).toString();     
    
          window.location.href = `/profile?${queryParams}`;

        }).catch((err)=>{
          toast.error(err.message)

        })
      }
    });
  }
  return (
    <div>
      <p className="continue-p">--Or continue with--</p>
      <div
        style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
        onClick={googleLogin}
      >
        <img className="google" src={require("../google.png")}   alt="google"/>
        {/* <h4 style={{backgroundColor:"blue"}}>SignInwithGoogle</h4> */}
    
      </div>
  
    </div>
  );
}
export default SignInwithGoogle;
