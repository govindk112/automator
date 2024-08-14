import React from "react";
import chrome from "./image/chrome.svg"

const Index = function () {
    const buttonSubmit = function () {
        window.location.href = "/Login"
    }
    return (
        <main>
            <div class="background">
                {/* <div class="ellipse ellipse-1"></div>
            <div class="ellipse ellipse-2"></div>
            <div class="ellipse ellipse-3"></div>
            <div class="ellipse ellipse-4"></div>
            <div class="ellipse ellipse-5"></div>
            <div class="ellipse ellipse-6"></div> */}
                <div class="content">

                    <h1 class="heading">Apply Smarter Not Harder with JobForm Automator</h1>
                    <p class="free-trial">Streamline your job application process and save time with the JobForm Automator
                        Chrome Extension.</p>
                    <div class="buttons">
                        <button class="add-to-chrome" onClick={buttonSubmit}>
                            <img src={chrome} alt="Chrome Icon" />
                            Add to Chrome
                        </button>
                    </div>
                    <p class="free-trial">Auto-Apply upto 10 jobs Daily free</p>
                </div>

            </div>
            <div class="container-demo">
                <div class="content">
                    <h1>To get your Dream Job</h1>
                    <div class="video-container">
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/f8MXg2ML6sQ?si=CelXj6CG_XysvMJO"
                            title="YouTube video player" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    </div>
                </div>
            </div>
        </main>

    )
}

export default Index;