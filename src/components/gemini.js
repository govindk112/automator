import React, { useState } from "react";
import { auth } from "./firebase";
import app from "./firebase";
import { toast } from "react-toastify";
import { getDatabase, ref, update } from "firebase/database";
import { GoogleGenerativeAI } from "@google/generative-ai";

const Gemini = function () {

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
                toast.success("API Key Submitted Successfully");
                const newDocRef = ref(db, "Users/" + auth.currentUser.uid);
                await update(newDocRef, {
                    API: {
                        apikey: gemini_key,
                    },
                });
                // Update payment details
                const currentDate = new Date();
                const formattedDateTime = currentDate.toISOString().replace("T", " ").split(".")[0];

                try {
                    const newPaymentRef = ref(db, "Users/" + auth.currentUser.uid);
                    await update(newPaymentRef, {
                        Payment: {
                            Status: "Free",
                            Start_Date: formattedDateTime,
                            Subscriptiontype: "Free",
                        },
                    });
                    console.log("Payment details updated successfully");
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

 
    };

    return (
        <div>
            <main>
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
                                {/* <a href="#" className="forgot-password">
                                    Get Gemini key Here
                                </a> */}
                            </div>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Gemini;
