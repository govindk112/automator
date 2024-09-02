import React,{useState} from "react";
import { toast } from "react-toastify";
import app from "./firebase";
import { auth } from "./firebase";
import { getDatabase, ref, update } from "firebase/database";
import { GoogleGenerativeAI } from "@google/generative-ai";
const UpdateGemini = function () {
    const [gemini_key, setGeminikey] = useState("");
    const db = getDatabase(app);

    const sumbitHandler = async (e) => {
        e.preventDefault();

        const genAI = new GoogleGenerativeAI(gemini_key);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = "Write a story about an AI and magic";
        try {
            // Initiate the content generation
            const result = await model.generateContent(prompt);
            const response = result.response;




            // Update the database with API key
            if (response) {
                localStorage.setItem("api_key", gemini_key);
                toast.success("API Key Updated Successfully!");
                //Event Listner
                // website-login.js (on your website)
                function notifyExtensionOnUpdateGeminiKey(key) {
                    const event = new CustomEvent('geminiKeyUpdated', { detail: { key } });
                    document.dispatchEvent(event);
                }

                // Call this function after successful login
                notifyExtensionOnUpdateGeminiKey(gemini_key);  // userUID is the UID of the logged-in user
                // console.log(auth?.currentUser?.uid,"Hii")

                const newDocRef = ref(db, "user/" + auth.currentUser.uid);
                await update(newDocRef, {
                    API: {
                        apikey: gemini_key,
                    },
                }).then(()=>{
                   
                    window.location.href = `/User`;
                }).catch((err)=>{
                    toast.error(err)
                })



                
            }
            else {
                toast.error("Invalid API key")
            }
        } catch (error) {
            toast.error("Invalid API key!😒😒");
            console.error(error);
            return;
        }


    };
    return(
    <div>
        <main>

            <div class="ellipse ellipse-1"></div>
            <div class="ellipse ellipse-2"></div>
            <h1>Enter Free Gemini Key</h1>
            <div className="contact-container">
                <div className="message-section">
                    <h2 id="h2gemini">Instructions:</h2>
                    <ol>
                        <li>Click on "Get Gemini key Here" to open the Gemini website.</li>
                        <li>Create an API Key in your account settings.</li>
                        <li>Copy the API Key.</li>
                        <li>Paste the API Key into our website.</li>
                        <li>Click Submit.</li>
                    </ol>
                </div>
                <div className="form-section">
                    <form onSubmit={sumbitHandler}>
                        <input
                            type="text"
                            placeholder="Enter Your Gemini Key"
                            required
                            onChange={(e) => setGeminikey(e.target.value)}
                        />
                        <div className="form-options">

                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </main>
    </div >
    )
}

export default UpdateGemini