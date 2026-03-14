import React, { useState } from "react";
import "./Contact.css";
import Swal from "sweetalert2";   
import { FaGithub } from "react-icons/fa";
import API from "./Api";


const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API}/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        // ✅ SUCCESS ALERT
        Swal.fire({
          icon: "success",
          title: "Message Sent!",
          text: "Your message has been sent successfully.",
          confirmButtonColor: "#3085d6",
        });

        setFormData({ name: "", email: "", message: "" });
      } else {
        // ❌ FAILED ALERT
        Swal.fire({
          icon: "error",
          title: "Send Failed!",
          text: "Failed to send message.",
          confirmButtonColor: "#d33",
        });
      }
    } catch (error) {
      console.error(error);

      // ❌ SERVER ERROR ALERT
      Swal.fire({
        icon: "error",
        title: "Server Error!",
        text: "Something went wrong. Try again later.",
        confirmButtonColor: "#d33",
      });
    }

    setLoading(false);
  };

  return (
    <section className="contact">
      <div className="contact-container">
        <h2 className="contact-title">Contact Me</h2>
        <p className="contact-subtitle">
          Have a project or opportunity? Let’s talk.
        </p>

        <div className="contact-content">
          <div className="contact-info">
            <h3>Get in Touch</h3>
            <p>
              I’m open to full-time roles, freelance work, and collaborations.
              Feel free to reach out anytime.
            </p>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <textarea
              rows="5"
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>

    <div className="social-icons">
  <a
    href="https://github.com/kundanpaswan563-gitm"
    target="_blank"
    rel="noopener noreferrer"
  >
    <FaGithub size={35} />
  </a>
</div>

    </section>
  );
};

export default Contact;
