import React from "react";
import chrome from "./image/chrome.svg";
import time from "./image/time.svg";
import more from "./image/more.svg";
import interview from "./image/interview.svg";
import offer from "./image/offer.svg";
import user from "./image/user.svg"

const Index = function () {
    const buttonSubmit = function () {
        window.location.href = "/User"
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

                        <h1 class="heading">Apply Smarter Not Harder with JobForm Automator</h1>
                        <p class="free-trial">Streamline your job application process and save time with the JobForm Automator
                            Chrome Extension.</p>
                        <div class="buttons">
                            <button class="add-to-chrome" onClick={buttonSubmit}>
                                <img src={chrome} alt="Chrome Icon"/>
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
                            <img src={time} alt="Be First Icon"/>
                                <h3>SAVE TIME</h3>
                                <p>Applying late means missed opportunities. Our shortcut keeps you ahead.</p>
                        </div>
                        <div class="benefit-item">
                            <img src={more} alt="Save Time Icon"/>
                                <h3>APPLY 10X</h3>
                                <p>Manually filling forms slows you down. Our service speeds up your job hunt.</p>
                        </div>
                        <div class="benefit-item">
                            <img src={interview} alt="Apply More Icon"/>
                                <h3>MORE INTERVIEW</h3>
                                <p>Without it, you miss out on hundreds of jobs on LinkedIn and Indeed.</p>
                        </div>
                        <div class="benefit-item">
                            <img src={offer} alt="Quality Applications Icon"/>
                                <h3>MORE OFFERS</h3>
                                <p>Manual work leads to burnout. Use our tool for better results, faster. Don't fall behind—get
                                    JobForm
                                    Automator today.</p>
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
                            <p class="description">Perfect for side or hobby projects</p>
                            <p class="price">$0</p>
                            <ul>
                                <li>Limited offer: Free access</li>
                                <li>Auto-Apply 10 jobs Daily</li>
                                <li>AI-powered Auto-Fills</li>
                                <li>Delete your data anytime</li>
                            </ul>
                            <button class="sign-up">Start Now</button>
                        </div>

                        <div class="pricing-card premium">
                            <h3>Premium</h3>
                            <span class="popular">Popular</span>
                            <p class="description">Perfect for small teams</p>
                            <p class="price">$10 <span class="price-subtitle">for limited time</span></p>
                            <ul>
                                <li>All in Beginner plan</li>
                                <li>Call & Mail Support</li>
                                <li>Auto-Apply 100 jobs Daily</li>
                                <li>Personalized Interview Tips</li>
                            </ul>
                            <button class="sign-up">Start Now</button>
                        </div>

                        <div class="pricing-card diamond">
                            <h3>Diamond</h3>
                            <p class="description">Perfect for organizations</p>
                            <p class="price">$30</p>
                            <ul>
                                <li>All in Premium Plan</li>
                                <li>Advanced AI model</li>
                                <li>LinkedIn Profile Optimization</li>
                                <li>Skill Gap Analysis</li>
                            </ul>
                            <button class="sign-up">Start Now</button>
                        </div>
                    </div>

                </div>
            </div>

            <section class="testimonial-section">

                <div class="container">
                    <div class="background">
                        <h1>What Our Clients Say</h1>
                        <div class="testimonial-row">
                            <div class="testimonial">
                                <p>"This is the best service I have ever received. Highly recommend!"</p>
                                <div class="client-info">
                                    <img src={user} alt="Client-Photo"/>
                                        <div>
                                            <strong>John Doe</strong>
                                            <span>CEO, Company Name</span>
                                        </div>
                                </div>
                            </div>
                            <div class="testimonial">
                                <p>"The team was incredibly professional and the results were amazing."</p>
                                <div class="client-info">
                                    <img src={user} alt="Client Photo"/>
                                        <div>
                                            <strong>Jane Smith</strong>
                                            <span>Marketing Manager, Company Name</span>
                                        </div>
                                </div>
                            </div>
                        </div>
                        <div class="testimonial-row">
                            <div class="testimonial">
                                <p>"I am extremely satisfied with the work done. Will definitely use their services again."</p>
                                <div class="client-info">
                                    <img src={user} alt="Client Photo"/>
                                        <div>
                                            <strong>Emily Johnson</strong>
                                            <span>CTO, Tech Company</span>
                                        </div>
                                </div>
                            </div>
                            <div class="testimonial">
                                <p>"The quality of their work is outstanding. I highly recommend them to anyone."</p>
                                <div class="client-info">
                                    <img src={user} alt="Client Photo"/>
                                        <div>
                                            <strong>Michael Brown</strong>
                                            <span>Director, Finance Firm</span>
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