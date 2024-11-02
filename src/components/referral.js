import React, { useEffect, useState } from "react";
import app from "./firebase";
import { getDatabase, ref, get } from "firebase/database";
import box from "./image/box.svg";
import money from "./image/dollar-suitcase-svgrepo-com.svg";
import discount from "./image/discount-label-svgrepo-com.svg";
import news from "./image/health-message-text-mail-medical-inbox-hospital-svgrepo-com.svg";

// import "./Referral.css"; // Import the CSS file

const Referral = () => {
    const [isLogin, setIsLogin] = useState(null);
    const [fullName, setFullName] = useState("");
    const [copySuccess, setCopySuccess] = useState(""); // State to show copy success message
    const db = getDatabase(app);

    useEffect(() => {
        const fetchUserData = async () => {
            const loginStatus = localStorage.getItem("IsLogin");
            setIsLogin(loginStatus);

            const userId = localStorage.getItem("UID");
            if (userId) {
                const findUser = ref(db, `user/${userId}`);
                get(findUser).then((snapshot) => {
                    let Name = snapshot.val()?.name;
                    let fname = snapshot.val()?.fname;
                    let lname = snapshot.val()?.lname;
                    let user = "";
                    if (Name) {
                        user = Name;
                        const cleanedName = user.replace(/\s/g, "");
                        setFullName(cleanedName);
                    } else {
                        user = fname + " " + lname;
                        const cleanedName = user.replace(/\s/g, "");
                        setFullName(cleanedName);
                    }
                });
            }
        };

        fetchUserData();
    }, []);

    // Function to copy the URL to clipboard
    const copyToClipboard = () => {
        const referralURL = `https://jobformautomator.com/${fullName}`;
        navigator.clipboard.writeText(referralURL).then(() => {
            setCopySuccess("Copied!");
        }).catch(err => {
            setCopySuccess("Failed to copy!");
        });
    };

    return (

        <div>
            <main>

                <div class="ellipse ellipse-1"></div>
                <div class="ellipse ellipse-2"></div>
                <div class="ellipse ellipse-3"></div>
                <div class="ellipse ellipse-4"></div>

                <h1>Earn Money While You Job Hunt!</h1>
                <div class="contact-container">
                    <div class="message-section">

                        <div class="video-container">
                            <img class="referal-img" src={box} alt="description of image" />

                        </div>
                    </div>
                    <div class="form-section">
                        <form>
                            <h2>Start Earning Now🎉</h2>
                            <p>Refer a friend and earn $9 for every successful referral—no limits, just extra cash while you
                                search!</p>
                             {isLogin !== null && isLogin !== "null" ? (
                                <div>
                                    <div>
                                        {`https://jobformautomator.com/${fullName}`}
                                    </div><br></br>
                                    <button className="copy-btn" onClick={copyToClipboard}>
                                        Copy Your Referral Link
                                    </button>
                                    {copySuccess && <span className="copy-message">{copySuccess}</span>}
                                </div>
                            ) : (<div>
                                <div style={{"color":"red"}}>To Get Referral Link, Login First! </div><br></br>
                                <a href="/login" className="forgot-password">Login</a>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </main>

            <div class="wrapper">

                <div class="content-container">

                    <div class="features-section">

                        <div class="feature-item">
                            <div class="icon-background">
                                <img src={money} alt="money icon" class="icon" />
                            </div>
                            <div class="feature-content">
                                <h3 class="feature-title">Receive $9 per Paid user</h3>
                                <p class="feature-description">Get $9 for each new paid user you refer who installs our Chrome
                                    extension and automates their job form applications.</p>
                            </div>
                        </div>

                        <div class="feature-item">
                            <div class="icon-background">
                                <img src={discount} alt="mail icon" class="icon" />
                            </div>
                            <div class="feature-content">
                                <h3 class="feature-title">50% off when you share on LinkedIn</h3>
                                <p class="feature-description">
                                    Unlock 50% off on Job Form Automator! 🎉
                                    Share this post on LinkedIn and email us the link to claim your exclusive discount! </p>
                            </div>
                        </div>

                        <div class="feature-item">
                            <div class="icon-background">
                                <img src={news} alt="briefcase icon" class="icon" />
                            </div>
                            <div class="feature-content">
                                <h3 class="feature-title">Newsletter & Exclusive Offers </h3>
                                <p class="feature-description">Be the first to know about new features, updates, and special
                                    offers you can share with your audience.</p>
                            </div>

                        </div>
                    </div>

                    <div class="decorative-background">

                        <div class="vector-element"></div>
                        <div class="ellipse-element"></div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Referral;

