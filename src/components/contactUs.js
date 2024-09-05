import React, { useState } from "react";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    userQuery: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceId = process.env.REACT_APP_SERVICEID;
    const templateId = process.env.REACT_APP_TEMPLATEID;
    const userId = process.env.REACT_APP_USERID;

    const templateParams = {
      user_name: formData.name,
      from_email: formData.email,
      phoneNumber: formData.phoneNumber,
      userQuery: formData.userQuery,
      to_email: "admin@example.com",
    };

    emailjs
      .send(serviceId, templateId, templateParams, userId)
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          toast.success("Your query has been sent successfully!");
          setFormData({
            name: "",
            email: "",
            phoneNumber: "",
            userQuery: "",
          });
        },
        (error) => {
          console.error("FAILED...", error);
          alert("There was an issue sending your query. Please try again later.");
        }
      );
  };

  return (
    <div>
      <main>
        <div className="ellipse ellipse-1"></div>
        <div className="ellipse ellipse-2"></div>

        <h1>Contact</h1>
        <div className="contact-container">
          <div className="message-section">
            <h2>Our Message</h2>
            <p>If you're interested in collaboration, job openings, or product suggestions, we value your input.
              Let's discuss potential partnerships, employment, or product enhancements. Feel free to share
              your ideas, and let's explore exciting opportunities together.</p>
          </div>
          <div className="form-section">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"  // Add the name attribute
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="phoneNumber"  // Add the name attribute
                placeholder="Mobile Number"
                value={formData.phoneNumber}
                onChange={handleChange}
                pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                required
              />
              <input
                type="email"
                name="email"  // Add the name attribute
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <textarea
                name="userQuery"  // Add the name attribute
                placeholder="Message"
                value={formData.userQuery}
                onChange={handleChange}
                required
              ></textarea>
              <button type="submit">Send Message</button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactUs;
