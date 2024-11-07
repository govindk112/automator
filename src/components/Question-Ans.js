import React from "react";
import { useState,useEffect } from "react";

const QuestionAns = function () {
    return (
        <div>
            <main>

                <div class="ellipse ellipse-1"></div>
                <div class="ellipse ellipse-2"></div>

                <h1>Unanswered</h1>
                <div class="contact-container">
                    <div class="message-section">
                        <h2>AI isn’t confident here.</h2>
                        <p>Review these sections carefully, as AI couldn't provide accurate answers. Please check and fill these answers to make sure everything is accurate.</p>
                    </div>
                    <div class="form-section">
                        <form>
                        </form>
                    </div>
                </div>
            </main>


        </div>
    )
}

export default QuestionAns;