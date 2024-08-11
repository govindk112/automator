import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
import app from "./firebase";
import { toast } from "react-toastify";
import { getDatabase, ref, set, push, get, update } from "firebase/database";



const Gemini = function () {

    let [user, setUser] = useState();
    const [api, setApi] = useState("")
    const [gemini_key, setGeminikey] = useState("")
    const db = getDatabase(app)


    // useEffect(() => {
    //     auth.onAuthStateChanged((user) => {
    //         setUser(user);
    //     });

    //     const getApi = ref(db, "Users/" + auth?.currentUser?.uid + "/API");

    //     get(getApi).then((snapshot) => {

    //         if (snapshot.exists()) {
    //             window.location.href = `/resume`;

    //         }






    //     })
    // })
    const sumbitHandler = async (e) => {
        e.preventDefault();
        const db = getDatabase(app)
        const newDocRef = ref(db, "Users/" + auth.currentUser.uid);
        await update(newDocRef, {
            "API": {
                "apikey": gemini_key

            }
        }).then(() => {
            window.location.href = `/resume`;
            toast.success("Api Key Submit Successfully")
        }).catch((err) => {
            toast.success(err)
        })

        // Create a new Date object
        const currentDate = new Date();

        // Get the date and time in different formats
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const day = currentDate.getDate().toString().padStart(2, '0');
        const hours = currentDate.getHours().toString().padStart(2, '0');
        const minutes = currentDate.getMinutes().toString().padStart(2, '0');
        const seconds = currentDate.getSeconds().toString().padStart(2, '0');

        // Format the date and time
        const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

        console.log(`Current Date and Time: ${formattedDateTime}`);


        const newPaymentRef = ref(db, "Users/" + auth.currentUser.uid);
        await update(newDocRef, {
            Payment: {
                Status: "Free",
                Start_Date:formattedDateTime,
                Subscriptiontype:"Free"
           }

        }).then(()=>{
            console.log("payment detailsupdate successfully")

        }).catch((err)=>{
            console.log(err)
        })



    }




    return (
        <div>
            <main>



                <h1>Enter Free Gemini Key</h1>
                <div class="contact-container">
                    <div class="message-section">
                        <h2 id="h2gemini">Instructions:</h2>
                        <p>1. Click on "Get Gemini key Here" to open the Gemini website.</p>
                        <p> 2. Create an API Key in your account settings.</p>
                        <p> 3. Copy the API Key.</p>
                        <p> 4. Paste the API Key into our website.</p>
                        <p> 5. Click Submit.</p>
                    </div>
                    <div class="form-section">
                        <form onSubmit={sumbitHandler}>
                            <input type="text" placeholder="Enter Your Gemini Key" required onChange={(e) => setGeminikey(e.target.value)} />
                            <div class="form-options">

                                <a href="#" class="forgot-password">Get Gemini key Here</a>
                            </div>
                            <button type="submit">Submit</button>

                        </form>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Gemini;