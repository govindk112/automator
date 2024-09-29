import React, { useEffect, useState } from "react";
import app from "./firebase";
import { getDatabase, ref, get } from "firebase/database";
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
        <div className="referral-container">
            {isLogin !== null && isLogin !== "null" ? (
                <div className="referral-box">
                    <div className="referral-url">
                        {`https://jobformautomator.com/${fullName}`}
                    </div>
                    <button className="copy-btn" onClick={copyToClipboard}>
                        Copy Link
                    </button>
                    {copySuccess && <span className="copy-message">{copySuccess}</span>}
                </div>
            ) : (
                <div>Login First</div>
            )}
        </div>
    );
};

export default Referral;

