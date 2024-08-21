import React from "react";

const About = function () {
    return (
        <div>
            <main>
                <section class="hero">
                    <h1>About Us</h1>
                    <p>We're passionate about creating innovative solutions for a better tomorrow.</p>
                </section>

                <section class="about-content">
                    <div class="mission">
                        <h2>Our Mission</h2>
                        <p>To empower businesses and individuals through cutting-edge technology and exceptional service.</p>
                    </div>
                    <div class="values">
                        <h2>Our Values</h2>
                        <ul>
                            <li>Innovation</li>
                            <li>Integrity</li>
                            <li>Collaboration</li>
                            <li>Excellence</li>
                        </ul>
                    </div>
                </section>

                <section class="team">
                    <h2>Meet Our Team</h2>
                    <div class="team-members">
                        <div class="member-card">
                            <div class="card-inner">
                                <div class="card-front">
                                    <img src="https://via.placeholder.com/300" alt="Jane Doe"/>
                                        <h3>Jane Doe</h3>
                                        <p>CEO & Founder</p>
                                </div>
                                <div class="card-back">
                                    <h3>Jane Doe</h3>
                                    <p>Visionary leader with 15+ years of experience in tech innovation.</p>
                                    <ul class="skills">
                                        <li>Strategic Planning</li>
                                        <li>Team Leadership</li>
                                        <li>Product Development</li>
                                    </ul>
                                    <div class="social-links">
                                        <a href="#" class="fab fa-linkedin"></a>
                                        <a href="#" class="fab fa-twitter"></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="member-card">
                            <div class="card-inner">
                                <div class="card-front">
                                    <img src="https://via.placeholder.com/300" alt="John Smith"/>
                                        <h3>John Smith</h3>
                                        <p>CTO</p>
                                </div>
                                <div class="card-back">
                                    <h3>John Smith</h3>
                                    <p>Tech guru with a passion for cutting-edge solutions.</p>
                                    <ul class="skills">
                                        <li>AI & Machine Learning</li>
                                        <li>Cloud Architecture</li>
                                        <li>Cybersecurity</li>
                                    </ul>
                                    <div class="social-links">
                                        <a href="#" class="fab fa-github"></a>
                                        <a href="#" class="fab fa-stack-overflow"></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="member-card">
                            <div class="card-inner">
                                <div class="card-front">
                                    <img src="https://via.placeholder.com/300" alt="Emily Brown" />
                                    <h3>Emily Brown</h3>
                                    <p>Lead Designer</p>
                                </div>
                                <div class="card-back">
                                    <h3>Emily Brown</h3>
                                    <p>Creative powerhouse turning ideas into stunning visuals.</p>
                                    <ul class="skills">
                                        <li>UI/UX Design</li>
                                        <li>Brand Identity</li>
                                        <li>Motion Graphics</li>
                                    </ul>
                                    <div class="social-links">
                                        <a href="#" class="fab fa-dribbble"></a>
                                        <a href="#" class="fab fa-behance"></a>
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
