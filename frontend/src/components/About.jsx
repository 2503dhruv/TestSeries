import React, { useState } from "react";
import { MapPin, Mail, Phone } from "lucide-react";     
import "./About.css";
import Footer from "./Footer/Footer";   // already imported

export default function AboutUs() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
    howDidYouHear: ""
  });
  const [formStatus, setFormStatus] = useState("");

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus("Sending...");
    setTimeout(() => setFormStatus("Request sent! Our team will reach out soon."), 1200);
  };

  return (
    <>
      <div className="about-support-root">

        {/* About + Support Form Row */}
        <div className="about-support-row">
          {/* About Column */}
          <div className="about-content">
            <h2>Get Started</h2>
            <h4 style={{ color: "#0074B6", margin: "0 0 12px 0" }}>
              UNLOCK EFFICIENT EDUCATION WITH ASSESSIFY'S SMART AUTOMATION SOLUTIONS
            </h4>
            <p>
              Assessify empowers schools, colleges, and educators to streamline academic administration, automate assessments, and enhance the digital learning experience for everyone. Our platform is built to handle everything from assignment creation and test scheduling to real-time analytics and resource distribution, so your team can focus on what truly matters: inspiring student success.
            </p>
            <p>
              With customizable workflows and powerful automation, Assessify adapts to the unique needs of your institution—whether you’re managing daily classroom tasks or launching institution-wide exams. Experience improved collaboration, secure data management, and sustainable academic growth through a single, integrated solution.
            </p>
          </div>

          {/* Support Form */}
          <form className="support-form about-form" onSubmit={handleSubmit}>
            <h2>Let’s find the right assistance for you!</h2>
            <div className="form-row">
              <input
                type="text"
                name="firstName"
                placeholder="First Name*"
                value={form.firstName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name*"
                value={form.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row">
              <input
                type="tel"
                name="phone"
                placeholder="Phone*"
                value={form.phone}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email*"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <textarea
              name="message"
              placeholder="Message"
              rows={3}
              value={form.message}
              onChange={handleChange}
            />
            <input
              name="howDidYouHear"
              placeholder="How did you hear about us?*"
              value={form.howDidYouHear}
              onChange={handleChange}
              required
            />
            <button type="submit" className="about-submit-btn">
              SUBMIT REQUEST
            </button>
            {formStatus && <p className="form-status">{formStatus}</p>}
          </form>
        </div>

        {/* Contact Info Grid */}
        <div className="contact-info-grid">
          <div className="contact-card">
            <MapPin className="contact-icon" />
            <h3>UPES, Dehradun</h3>
            <span>University of Petroleum and Energy Studies, Dehradun, Uttarakhand, India - 248007</span>
          </div>
          <div className="contact-card">
            <Mail className="contact-icon" />
            <h3>Email Us</h3>
            <span>techfortechies1@gmail.com</span>
          </div>
          <div className="contact-card">
            <Phone className="contact-icon" />
            <h3>Let's Talk</h3>
            <span>98154-52265</span>
          </div>
        </div>

        {/* Map */}
        <div className="about-mapbox">
          <iframe
            title="Company Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3440.713316716706!2d77.96417207536!3d30.415874674738685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3908d4890d7c1735%3A0x22d3ae324c238e3c!2sUPES!5e0!3m2!1sen!2sin!4v1760154929083!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          />
        </div>

      </div>

      {/* EXTERNAL FOOTER */}
      <Footer />
    </>
  );
}
