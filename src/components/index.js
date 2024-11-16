import React, { useState, useEffect } from "react";
import chrome from "./image/chrome.svg";
import time from "./image/time.svg";
import more from "./image/more.svg";
import interview from "./image/interview.svg";
import offer from "./image/offer.svg";
import user from "./image/user.svg";
import { logEvent } from 'firebase/analytics';
import { analytics } from './firebase';
import { useParams } from "react-router-dom";



logEvent(analytics, 'page_view', { page_title: 'Home Page' });

const Index = function () {
    const { id } = useParams();
    console.log("id=", id);
    const [stater, setStater] = useState("₹0");
    const [premium, setPremium] = useState("₹499");
    const [diamond, setDiamond] = useState("₹999")

    const saveReferralCode = (referralCode) => {
        // If referralCode is undefined or null, store the string 'null' or 'undefined' in the cookie
        const valueToStore = referralCode != null ? referralCode : String(referralCode);

        document.cookie = `referral=${valueToStore}; path=/; max-age=${30 * 24 * 60 * 60}`;  // 30-day expiration
    };

    saveReferralCode(id);
    useEffect(() => {
        // Detect user's country and set currency
        fetch("https://ipapi.co/json/")
            .then((response) => response.json())
            .then((data) => {

                if (data.country !== "IN") {
                    setStater("$0");
                    setPremium("$20");
                    setDiamond("$50")

                }
            });
    }, []);


    const buttonSubmit = function () {
        logEvent(analytics, 'button_click', {
            button_name: 'Go_To_Extension', // Add custom parameters as needed
        });
        window.location.href = "https://chromewebstore.google.com/detail/jobform-automator/lknamgjmcmbfhcjjeicdndokedcmpbaa?pli=1"
    }

    const youtube = function () {
        logEvent(analytics, 'button_click', {
            button_name: 'Youtube_Video', // Add custom parameters as needed
        });

    }
    return (
        <div>

            <main>
                <div class="background">
                    <div class="ellipse ellipse-1"></div>
                    <div class="ellipse ellipse-2"></div>
                    <div class="ellipse ellipse-3"></div>
                    <div class="ellipse ellipse-4"></div>
                    <div class="ellipse ellipse-5"></div>
                    <div class="ellipse ellipse-6"></div>
                    <div class="content">

                        <h1 class="heading">Land Your Dream Job Effortlessly</h1>
                        <p class="free-trial">Effortless job hunting. JobForm Automator auto-fills, auto-applies, and accelerates your search across top platforms and 90% of company sites worldwide.</p>
                        <div class="buttons">
                            <button class="add-to-chrome" onClick={buttonSubmit}>
                                <img id="chrome" src={chrome} alt="Chrome Icon" />
                                Add to Chrome
                            </button>

                        </div>
                        <p className="free-trial">Auto-Apply upto 10 jobs Daily free forever</p>
                    </div>

                </div>

                <div class="container-demo">
                    <div class="content">
                        <h1>See JobForm Automator in Action</h1>
                        <div class="video-container">
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/z6JgvamQCb0?si=0AqOKMFjZQSCUEZN"
                                title="YouTube video player" frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerpolicy="strict-origin-when-cross-origin" onClick={youtube} allowfullscreen></iframe>
                        </div>
                    </div>
                </div>
            </main>

            <div class="ellipse ellipse-7"></div>
            <div class="ellipse ellipse-8"></div>
            <div class="ellipse ellipse-9"></div>
            <div class="ellipse ellipse-10"></div>
            <div class="ellipse ellipse-11"></div>
            <div class="ellipse ellipse-12"></div>
            <div class="background">
                <div class="benefits">
                    <h1>See JobForm Automator in Action</h1>
                    <div class="benefits-grid">
                        <div class="benefit-item">
                            <img src={time} alt="Be First Icon" />
                            <h3>SAVE TIME</h3>
                            <p>Stop spending hours on repetitive applications. Automate the process and focus on what truly matters.
                            </p>
                        </div>
                        <div class="benefit-item">
                            <img src={more} alt="Save Time Icon" />
                            <h3>APPLY 10X</h3>
                            <p>Target your niche and apply to more relevant jobs effortlessly.
                            </p>
                        </div>
                        <div class="benefit-item">
                            <img src={interview} alt="Apply More Icon" />
                            <h3>MORE INTERVIEW</h3>
                            <p> By being among the first applicants, you increase your chances of getting noticed.
                            </p>
                        </div>
                        <div class="benefit-item">
                            <img src={offer} alt="Quality Applications Icon" />
                            <h3>MORE OFFERS</h3>
                            <p>More applications lead to more interviews, which lead to more job offers.
                            </p>
                        </div>
                    </div>
                </div>
            </div>


            <div class="pricing-container">
                <div class="background2">
                    <h1>Choose the Plan That's Right for You</h1>
                    <div class="pricing-cards">
                        <div class="pricing-card starter">
                            <h3>Starter</h3>
                            <p class="description">Perfect To Get Started</p>
                            <p class="price">{stater}</p>
                            <ul>
                                <li>Limited offer: Free access</li>
                                <li>Auto-Apply 10 jobs Daily</li>
                                <li>AI-powered Auto-Fills</li>
                                <li>Delete your data anytime</li>
                            </ul>
                            <button class="sign-up" onClick={buttonSubmit}>Start Now</button>
                        </div>

                        <div class="pricing-card premium">
                            <h3>Premium</h3>
                            <span class="popular">Popular</span>
                            <p class="description">Perfect To Apply more Jobs</p>
                            <p class="price">{premium} <span class="price-subtitle">for limited time</span></p>
                            <ul>
                                <li>All in Beginner plan</li>
                                <li>Call & Mail Support</li>
                                <li>Auto-Apply 100 jobs Daily</li>
                                <li>Personalized Interview Tips</li>
                            </ul>
                            <button class="sign-up" onClick={buttonSubmit}>Start Now</button>
                        </div>

                        <div class="pricing-card diamond">
                            <h3>Diamond</h3>
                            <p class="description">Perfect To Get Personalized Assistance</p>
                            <p class="price">{diamond}</p>
                            <ul>
                                <li>All in Premium Plan</li>
                                <li>Advanced AI model</li>
                                <li>LinkedIn Profile Optimization</li>
                                <li>Skill Gap Analysis</li>
                            </ul>
                            <button class="sign-up" onClick={buttonSubmit}>Start Now</button>
                        </div>
                    </div>

                </div>
            </div>

            <section class="testimonial-section">

                <div class="container">
                    <div class="background">
                        <h1>Real Stories from Our Tribe</h1>
                        <div class="testimonial-row">
                            <div class="testimonial">
                                <p>JobForm Automator didn't just save me time; it transformed my job search experience.</p>
                                <div class="client-info">
                                    <img src={user} alt="Client" />
                                    <div>
                                        <strong>Godchoice Bright</strong>
                                        <span>Human Resources Manager</span>
                                    </div>
                                </div>
                            </div>
                            <div class="testimonial">
                                <p>I landed interviews at companies I thought were out of reach. This tool is a game-changer.</p>
                                <div class="client-info">
                                    <img src={user} alt="Client" />
                                    <div>
                                        <strong>Adão</strong>
                                        <span>Job Seeker</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="testimonial-row">
                            <div class="testimonial">
                                <p>he efficiency and ease are unparalleled. It's like having a personal assistant for my job hunt.</p>
                                <div class="client-info">
                                    <img src={user} alt="Client" />
                                    <div>
                                        <strong>Aditya Verma</strong>
                                        <span>Software Engineer</span>
                                    </div>
                                </div>
                            </div>
                            <div class="testimonial">
                                <p>he efficiency and ease are unparalleled. It's like having a personal assistant for my job hunt.</p>
                                <div class="client-info">
                                    <img src={user} alt="Client" />
                                    <div>
                                        <strong>Arun Kumar</strong>
                                        <span>Software Testing Engineer</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    )
}

export default Index;
