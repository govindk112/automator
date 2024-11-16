import React from "react";

const DeleteAccount = function () {
    return (
        <div>
            <main>

                <div className="ellipse ellipse-1"></div>
                <div className="ellipse ellipse-2"></div>

                <h1>Delete Account</h1>
                <div className="contact-container">
                    <div className="message-section">
                        <h2>Are You Sure You Want to Delete Your Account?</h2>
                        <p>Deleting your account will permanently remove all data except your resume, which we keep to aid in
                            future job opportunities. This action is irreversible.

                            To delete your resume, please contact us.</p>
                    </div>
                    <div className="form-section">
                        <form id="deleteAccountForm">
                            <input type="email" name="email" placeholder="Email" required/>
                                <textarea name="message" placeholder="Message" required></textarea>
                                <button type="submit">Delete Account</button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    )
}
export default DeleteAccount;