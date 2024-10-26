import React, { useState,useEffect } from "react";
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
    const [stater,setStater] = useState("₹0");
    const[premium,setPremium] = useState("₹499");
    const [diamond,setDiamond] = useState("₹999")

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

                        <h1 class="heading">AI Powered Job Application Automation Tool</h1>
                        <p class="free-trial">Automate your job application on LinkedIn, Indeed, & Monster
                            with our AI bot which applies to job application on behalf of you, with universal
                            Auto-Fill technology, architecture based on advanced AI Compatible with 90%
                            company websites globally.</p>
                        <div class="buttons">
                            <button class="add-to-chrome" onClick={buttonSubmit}>
                                <img id="chrome" src={chrome} alt="Chrome Icon" />
                                Add to Chrome
                            </button>
                        </div>
                    </div>

                </div>
                <div class="container-demo">
                    <div class="content">
                        <h1>To get your Dream Job</h1>
                        <div class="video-container">
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/f8MXg2ML6sQ?si=CelXj6CG_XysvMJO"
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
                    <h1>Your Success, Simplified</h1>
                    <div class="benefits-grid">
                        <div class="benefit-item">
                            <img src={time} alt="Be First Icon" />
                            <h3>SAVE TIME</h3>
                            <p>Our service speeds up your job hunt process, automating form-filling.</p>
                        </div>
                        <div class="benefit-item">
                            <img src={more} alt="Save Time Icon" />
                            <h3>APPLY 10X</h3>
                            <p>Without it, you miss out on hundreds of jobs on LinkedIn and Indeed.</p>
                        </div>
                        <div class="benefit-item">
                            <img src={interview} alt="Apply More Icon" />
                            <h3>MORE INTERVIEW</h3>
                            <p>Being first to apply increases your chances of securing interviews.</p>
                        </div>
                        <div class="benefit-item">
                            <img src={offer} alt="Quality Applications Icon" />
                            <h3>MORE OFFERS</h3>
                            <p>With more job applications and interviews, you'll naturally receive more job offers.</p>
                        </div>
                    </div>
                </div>
            </div>


            <div class="pricing-container">
                <div class="background2">
                    <h1>Pricing</h1>
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
                        <h1>Real User Stories</h1>
                        <div class="testimonial-row">
                            <div class="testimonial">
                                <p>"This extension has revolutionized the way I approach job hunting."</p>
                                <div class="client-info">
                                    <img src={user} alt="Client" />
                                    <div>
                                        <strong>Godchoice Bright</strong>
                                        <span>Human Resources Manager</span>
                                    </div>
                                </div>
                            </div>
                            <div class="testimonial">
                                <p>"Thanks to JobFrom Automator, I've seen a significant increase in my job application efficiency."</p>
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
                                <p>"JobForm Automator is an excellent tool for streamlining the job application process, offering significant time savings."</p>
                                <div class="client-info">
                                    <img src={user} alt="Client" />
                                    <div>
                                        <strong>Aditya Verma</strong>
                                        <span>Software Engineer</span>
                                    </div>
                                </div>
                            </div>
                            <div class="testimonial">
                                <p>"The Job From Automator is very useful extension tool for filling the job application , offering significant time savings in India Job Market"</p>
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
