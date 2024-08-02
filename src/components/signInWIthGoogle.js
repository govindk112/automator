import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app, { auth } from "./firebase";
import { toast } from "react-toastify";
import { getDatabase,ref,set,push, } from "firebase/database";
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
          // window.location.href = "/gemini"   
    
          window.location.href = `/profile?${queryParams}`;

        }).catch((err)=>{
          toast.error(err.message)

        })
      }
    });
  }
  return (
    
 
    <div>
    <button type="button" className="btn-google" onClick={googleLogin} >
        <img src={google} alt="Google icon"
            style={{ width: '20px',
              height: '20px',
              marginRight: '10px'}}/>
        Sign in with Google
    </button>
    </div>
  );
}
export default SignInwithGoogle;
