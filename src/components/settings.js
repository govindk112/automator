import React from "react";
import { auth } from "./firebase";

const Settings = function () {
    let user = auth.currentUser;
    async function updateKey() {
        window.location.href = "/updategemini"


    }
    async function updateData() {
        window.location.href = "/updateresume"

    }
    async function deleteAccount() {
        window.location.href  = "/deleteaccount"

    }
    async function handleLogout() {
        try {
            await auth.signOut();
            localStorage.clear()
            window.location.href = "/login";
            // console.log("User logged out successfully!");
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
                <div class="ellipse ellipse-1"></div>
                <div class="ellipse ellipse-2"></div>
                <div class="ellipse ellipse-3"></div>
                <div class="ellipse ellipse-4"></div>

                <h1>Settings</h1>



                <div class="settings-container">
                    <div class="settings-section">
                        <h2>Update Gemini Key</h2>
                        <button class="btn" onClick={updateKey}>Update Key</button>
                    </div>
                    <div class="settings-section">
                        <h2>Update Data</h2>
                        <button class="btn" onClick={updateData}>Update Data</button>
                    </div>
                    <div class="settings-section">
                        <h2>Delete Account</h2>
                        <button class="btn delete-btn" onClick={deleteAccount}>Delete Account</button>
                    </div>
                    <div class="settings-section">
                        <h2>Logout</h2>
                        <button class="btn logout-btn" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </main>

        </div>
    )
}
export default Settings;