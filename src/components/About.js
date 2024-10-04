import React from "react";
import people from "./image/people.svg"


const About = function () {
    return (
        <div>
            <main>
                <section class="hero">
                    <h1>About Us</h1>
                    <p>Job Form Automator is your AI-powered job application assistant.
                        We automate job applications on major job sites and company websites
                        globally. Our tool helps you apply to multiple jobs daily, saving time
                        and maximizing your career opportunities.


                    </p>
                </section>

                <section class="about-content">
                    <div class="mission">
                        <h2>Our Mission</h2>
                        <p>"Job Form Automator is committed to revolutionizing the job application
                            process with advanced AI-powered automation. Our mission is to empower
                            job seekers by automating the tedious task of job applications, allowing
                            them to apply to thousands of jobs across leading platforms like LinkedIn,
                            Indeed, and Monster. With our AI job search assistant, users can efficiently
                            manage their job applications, reduce errors, and save valuable time.
                            We strive to provide a seamless experience that supports global job markets,
                            making it easier for users to land their desired roles. Our tool integrates
                            cutting-edge AI job application technology to auto-fill forms, streamline the
                            job search process, and enhance job-seeking outcomes. We are dedicated to continuous
                            innovation, ensuring that our job application automation platform meets the evolving
                            needs of today's job seekers. By simplifying job applications and leveraging AI for job
                            search automation, we aim to help users achieve their career goals faster and more effectively."</p>
                    </div>
                    <div class="values">
                        <h2>Our Values</h2>
                        <ul>
                            <li>Efficiency: We prioritize time-saving automation to help users apply for jobs quickly and effortlessly, allowing them to focus on what truly matters.</li>
                            <li>Innovation: We constantly push the boundaries of AI technology to enhance our platform, ensuring it remains at the forefront of job application automation.</li>
                            <li>User-Centricity: Our users are at the heart of everything we do. We design our tool to be intuitive, reliable, and tailored to meet the diverse needs of job seekers worldwide.</li>
                            <li>Integrity: We are committed to maintaining transparency, trust, and ethical practices in all our operations, ensuring that our users can rely on us for a fair and honest service.</li>
                        </ul>
                    </div>
                </section>

                <section class="team">
                    <h2>Meet Our Team</h2>
                    <div class="team-members">
                        <div class="member-card">
                            <div class="card-inner">
                                <div class="card-front">
                                    <img src={people}  alt="Jane Doe" />
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
                                        <a href="https://www.linkedin.com/in/saurabh-belote-76a32a152/"  target="_blank" rel="noreferrer" class="fab fa-linkedin"></a>
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
