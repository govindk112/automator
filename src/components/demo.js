import React from "react";
import { auth } from "./firebase";

const Demo = function () {
    let user = auth.currentUser;
    // console.log(user)

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

    const onApply = function () {
            window.postMessage({
                type: 'FROM_PAGE',
                Itemtext: 'Auto-Apply Jobs'  // This matches the expected input in your background script
            }, '*');
    }
    return (
        <div>
            <main>
                <div class="background">
                    <div className="ellipse ellipse-1"></div>
                    <div className="ellipse ellipse-2"></div>
                    <div className="ellipse ellipse-3"></div>
                    <div className="ellipse ellipse-4"></div>

                    <div class="content">
                        <h1 class="heading">Auto-Apply Instantly with LinkedIn</h1>
                        <p class="free-trial">Ready to Apply? Just Click 'Auto-Apply'!</p>
                        <div class="buttons">
                            <button class="add-to-chrome" id="autoApplyButton" onClick={onApply}>
                                Auto-Apply Now
                            </button>
                        </div>
                        <p class="free-trial">Auto-Apply up to 10 jobs Daily free forever</p>
                    </div>

                </div>
            </main>
            <main>
                <div class="background">
                    <div class="container-demo">
                        <div class="content">
                            <h1>Watch and Learn!</h1>
                            <div class="video-container">
                                <iframe width="560" height="315"
                                    src="https://www.youtube.com/embed/XUybldvVcc4?si=VxhSLMzEGcgT3W94"
                                    title="YouTube video player" frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Demo;