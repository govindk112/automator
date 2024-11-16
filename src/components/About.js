import React from "react";
import people from "./image/people.svg"


const About = function () {
    return (
        <div>
            <main>
                <section class="hero">
                    <h1>About Us</h1>
                    <p>At JobForm Automator, we're transforming the job search landscape with our AI-powered automation tool. We understand that the job application process can be tedious and time-consuming. That's why we've created a remarkable solution that automates applications on major job sites and company websites globally. By leveraging advanced AI technology, we help you apply to multiple jobs daily, saving you time and maximizing your career opportunities.</p>
                </section>

                <section class="about-content">
                    <div class="mission">
                        <h2>Our Mission</h2>
                        <p>To revolutionize the job application process by empowering job seekers with AI-driven automation, enabling them to focus on what truly matters.

                            We believe in making change happen. Our mission is to eliminate the repetitive tasks in job hunting, allowing you to apply to thousands of jobs across leading platforms like LinkedIn, Indeed, and Monster. With our AI job search assistant, you can efficiently manage your applications, reduce errors, and save valuable time. We're dedicated to continuous innovation, ensuring our platform meets the evolving needs of today's job seekers.
                        </p>
                    </div>
                    <div class="values">
                        <h2>Our Values</h2>
                        <ul>
                            <li> ⁠🚀 Innovation
                                We constantly push the boundaries of AI technology to offer a unique and remarkable tool that stands out in the crowded marketplace.
                            </li>
                            <li>⏱ Efficiency
                                Your time is valuable. Our goal is to save you hours by automating tedious tasks, so you can focus on preparing for interviews and honing your skills.
                            </li>
                            <li>🤝 User-Centricity
                                You're at the heart of everything we do. We build our tool with you in mind, ensuring it's intuitive, reliable, and tailored to meet your needs.
                            </li>
                            <li>🌐 Integrity
                                Transparency and ethical practices are the cornerstones of our operations. You can trust us to provide a fair and honest service.
                            </li>
                        </ul>
                    </div>
                </section>

                <section class="team">
                    <h2>Meet Our Team</h2>
                    <div class="team-members">
                        <div class="member-card">
                            <div class="card-inner">
                                <div class="card-front">
                                    <img src={people} alt="Jane Doe" />
                                    <h3>Saurabh Belote</h3>
                                    <p>CEO & Founder</p>
                                </div>
                                <div class="card-back">
                                    <h3>Saurabh Belote</h3>
                                    <p>Innovating tech, leading teams, developing products.</p>
                                    <ul class="skills">
                                        <li>AI & Machine Learning</li>
                                        <li>Cloud Architecture</li>
                                        <li>Product Development</li>
                                    </ul>
                                    <div class="social-links">
                                        <a href="https://www.linkedin.com/in/saurabh-belote-76a32a152/" target="_blank" rel="noreferrer" class="fab fa-linkedin"></a>
                                        <a href="#" target="_blank" rel="noreferrer" class="fab fa-twitter"></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="member-card">
                            <div class="card-inner">
                                <div class="card-front">
                                    <img src={people} alt="Suman Bera" />
                                    <h3>Suman Bera</h3>
                                    <p>Lead Product Engineer</p>
                                </div>
                                <div class="card-back">
                                    <h3>Suman Bera</h3>
                                    <p>Innovative engineer dedicated to building scalable solutions.</p>
                                    <ul class="skills">
                                        <li>MERN Stack</li>
                                        <li>Data Structure</li>
                                        <li>Cloud Architecture</li>
                                        <li>Chrome Extension</li>
                                    </ul>
                                    <div class="social-links">
                                        <a href="https://www.linkedin.com/in/suman-bera-816642191/" target="_blank" rel="noreferrer" class="fab fa-linkedin"></a>
                                        <a href="#" target="_blank" rel="noreferrer" class="fab fa-stack-overflow"></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="member-card">
                            <div class="card-inner">
                                <div class="card-front">
                                    <img src={people} alt="Emily Brown" />
                                    <h3>Sachin Dhawan</h3>
                                    <p>Marketing Head</p>
                                </div>
                                <div class="card-back">
                                    <h3>Sachin Dhawan</h3>
                                    <p>Crafting visuals, branding, and SEO.</p>
                                    <ul class="skills">
                                        <li>Content Marketing</li>
                                        <li>Brand Identity</li>
                                        <li>Search Engine Optimization (SEO)</li>
                                    </ul>
                                    <div class="social-links">
                                        <a href="https://www.linkedin.com/in/sachin-dhawan-03875425a/" target="_blank" class="fab fa-linkedin"></a>
                                        <a href="#" target="_blank" rel="noreferrer" class="fab fa-behance"></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}
export default About;
