import React, { useState } from "react";
import { auth } from "./firebase";
import app from "./firebase";
import { toast } from "react-toastify";
import { getDatabase, ref, update } from "firebase/database";
import { GoogleGenerativeAI } from "@google/generative-ai";


const Gemini = function () {

    const [loading, setLoading] = useState(false);
    const [gemini_key, setGeminikey] = useState("");
    const db = getDatabase(app);

    const sumbitHandler = async (e) => {
        e.preventDefault();

        setLoading(true);


        const genAI = new GoogleGenerativeAI(gemini_key);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = "Write a story about an AI and magic";
        try {
            // Initiate the content generation
            const result = await model.generateContent(prompt);
            const response = result.response;




            // Update the database with API key
            if (response) {
                toast.success("API Key Submitted Successfully");
                localStorage.setItem("api_key", gemini_key);
                //Event Listner
                // website-login.js (on your website)
                function notifyExtensionOnGeminiKey(key) {
                    const event = new CustomEvent('geminiKeySubmitted', { detail: { key } });
                    document.dispatchEvent(event);
                }

                // Call this function after successful login
                notifyExtensionOnGeminiKey(gemini_key);  // userUID is the UID of the logged-in user

                const newDocRef = ref(db, "user/" + auth.currentUser.uid);
                await update(newDocRef, {
                    API: {
                        apikey: gemini_key,
                    },
                });
                // Update payment details
                const currentDate = new Date();
                const formattedDateTime = currentDate.toISOString().replace("T", " ").split(".")[0];

                try {
                    const newPaymentRef = ref(db, "user/" + auth.currentUser.uid);
                    await update(newPaymentRef, {
                        Payment: {
                            Status: "Free",
                            Start_Date: formattedDateTime,
                            Subscriptiontype: "GetResume",
                        },
                    });
                    // console.log("Payment details updated successfully");
                } catch (err) {
                    console.error(err);
                }



                window.location.href = `/resume`;
            }
            else {
                toast.error("Invalid API key")
            }
        } catch (error) {
            toast.error("Invalid API key!");
            console.error(error);
            return;
        }
        finally {
            setLoading(false);
        }


    };

    return (
        <div>
            <main>
                <div className="ellipse ellipse-1"></div>
                <div className="ellipse ellipse-2"></div>
                <h1>Enter Free Gemini Key</h1>
                <div className="contact-container">
                    <div className="message-section">
                        {/* <h2 id="h2gemini">Demo:How To Get API Key</h2> */}


                        <div className="video-container">
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/f8MXg2ML6sQ?si=CelXj6CG_XysvMJO"
                                title="YouTube video player" frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                        </div>


                    </div>
                    <div className="form-section">
                        <form onSubmit={sumbitHandler}>
                            <input
                                type="text"
                                placeholder="Enter Your Gemini Key"
                                required
                                onChange={(e) => setGeminikey(e.target.value)}
                                disabled={loading}
                            />
                            <div className="form-options">
                                {/* <a href="#" className="forgot-password">
                                    Get Gemini key Here
                                </a> */}
                            </div>
                            
                            <a id="api_key" target="_blank"  href="https://aistudio.google.com/app/apikey" >Get Gemini key</a> <br></br><br></br>
                            
                            <button type="submit" disabled={loading}>{loading ? "Submitted..." : "Submit"}</button>
                        </form>
                        {/* <ul>
                            <li>Click on  <a id="api_key" target="_blank" href="https://aistudio.google.com/app/apikey" >"Get Gemini key Here"</a>to open the Gemini website.</li>
                        </ul> */}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Gemini;
