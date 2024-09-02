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
        // Optional: If needed, set the recipient email here
        to_email: "admin@example.com"  
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
      
  }
  return (
    <div>
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email Address:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Mobile Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Your Query:</label>
          <textarea
            name="userQuery"
            value={formData.userQuery}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ContactUs;
