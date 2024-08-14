import React from "react";
import { auth } from "./firebase";

const Demo = function () {
    let user = auth.currentUser;
    console.log(user)

    async function handleLogout() {
        try {
            await auth.signOut();
            localStorage.clear()
            window.location.href = "/login";
            console.log("User logged out successfully!");
            //Event Listner
            function notifyExtensionOnLogout(key) {
                const event = new CustomEvent('onLogout');
                document.dispatchEvent(event);
            }

            // Call this function after successful login
            notifyExtensionOnLogout();  // userUID is the UID of the logged-in user


        } catch (error) {
            console.error("Error logging out:", error.message);
        }
    }
    return (
        <div>
            <main>



                <h1>Guide</h1>
                <div className="contact-container">
                    <div className="message-section">

                        <div className="video-container">
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/f8MXg2ML6sQ?si=CelXj6CG_XysvMJO"
                                title="YouTube video player" frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                        </div>
                    </div>
                    <div className="form-section">
                        <form>
                            <h2>Welcome! Let's Get Started 🎉</h2>
                            <p>Auto-Apply jobs with our Chrome Extension</p>
                            <button type="submit">Auto Apply</button>
                        </form>
                    </div>

                </div>
                <button onClick={handleLogout}>Logout</button>
            </main>
        </div>
    )
}

export default Demo;