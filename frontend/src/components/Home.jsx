import React, { useState } from "react";
import { Users, Laptop, Mail, GraduationCap, FileText, BarChart3, Clock, CheckCircle, Shield, Code } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Login from "./Login";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const featureList = [
    { icon: FileText, title: "Assignment Management", description: "Faculty can create, distribute, and evaluate assignments efficiently in a structured digital workflow." },
    { icon: GraduationCap, title: "Bulk Test Creation", description: "Teachers can upload large sets of test questions using CSV/Excel files, saving preparation time." },
    { icon: BarChart3, title: "Performance Tracking", description: "Personalized dashboards show assignment submissions, test scores, and learning progress." },
    { icon: Laptop, title: "Integrated Learning", description: "Students gain access to centralized digital learning resources like notes, presentations, and recorded lectures." }
  ];

  const complianceList = [
      { icon: Shield, title: "FERPA/GDPR Compliance" },
      { icon: CheckCircle, title: "Secure Data Encryption" },
      { icon: Code, title: "LMS Integration Ready" },
  ];

  return (
    <div className="home-container">

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h1>
            Welcome to <span className="brand-emphasis">Assessify</span>
          </h1>
          <p>
            The unified platform for streamlined academic automation, intelligent assessment, and efficient learning management.
          </p>
          <Link to="/">
            <button className="cta-btn">Begin Your Assessment Journey</button>
          </Link>
        </div>
      </section>

      {/* Features Section - Card-based modern grid */}
      <section id="features" className="section feature-section">
        <h3>Assessify: Designed for the Future of Education</h3>
        <div className="card-grid">
          {featureList.map((feature, index) => (
            <div key={index} className="feature-card">
              <feature.icon className="feature-icon" />
              <h4>{feature.title}</h4>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process/How it Works Section - Visual timeline feel */}
      <section id="process" className="section alt-bg">
        <h3>Our Core Functions</h3>
        <div className="card-grid">
            <div className="process-step">
                <div className="step-icon-wrapper"><FileText className="step-icon" /></div>
                <h4 className="step-title">1. Faculty Uploads</h4>
                <p>Teachers use the intuitive dashboard to upload assignments and bulk create tests via CSV.</p>
            </div>
            <div className="process-step">
                <div className="step-icon-wrapper"><Clock className="step-icon" /></div>
                <h4 className="step-title">2. Automated Scheduling</h4>
                <p>Deadlines and test windows are automatically scheduled, triggering instant notifications.</p>
            </div>
            <div className="process-step">
                <div className="step-icon-wrapper"><Users className="step-icon" /></div>
                <h4 className="step-title">3. Student Submission</h4>
                <p>Students access resources, complete assignments, and take tests directly in the unified portal.</p>
            </div>
            <div className="process-step">
                <div className="step-icon-wrapper"><BarChart3 className="step-icon" /></div>
                <h4 className="step-title">4. Instant Analytics</h4>
                <p>Objective tests are graded immediately, providing students and faculty with real-time performance data.</p>
            </div>
        </div>
      </section>

      {/* NEW SECTION: Integration & Compliance */}
      {/* <section id="compliance" className="section integration-section">
          <h3>Built for the Ecosystem: Integration & Security</h3>
          <p className="section-subtext">
              Assessify meets institutional security needs and is designed for seamless integration with existing Learning Management Systems (LMS).
          </p>
          <div className="compliance-badge-grid">
              {complianceList.map((item, index) => (
                  <div key={index} className="compliance-badge">
                      <item.icon className="badge-icon" />
                      <span>{item.title}</span>
                  </div>
              ))}
          </div> */}
          {/* Placeholder for LMS Logos */}
          {/* <div className="lms-logo-grid">

              <img src="https://placehold.co/100x40/dddddd/475569?text=LMS%20Canvas" alt="LMS Placeholder 1" />
              <img src="https://placehold.co/100x40/dddddd/475569?text=LMS%20Moodle" alt="LMS Placeholder 2" />
              <img src="https://placehold.co/100x40/dddddd/475569?text=LMS%20Blackboard" alt="LMS Placeholder 3" />
              <img src="https://placehold.co/100x40/dddddd/475569?text=LMS%20Custom" alt="LMS Placeholder 4" />
          </div>
      </section> */}

      {/* Contact Section */}
      <section id="contact" className="section contact-section">
        <h3>Connect with Our Support Team</h3>
        <p className="section-subtext">
          Ready to integrate Assessify into your academic ecosystem? Reach out to our dedicated support for a seamless transition.
        </p>
        <button className="contact-btn" onClick={() => navigate("/About")}>
          <Mail className="btn-icon" /> Request Demo or Support
        </button>
      </section>

      <Footer />

      {/* Login Modal */}
      {showLoginModal && (
        <>
          <div className="blur-overlay" onClick={() => setShowLoginModal(false)}></div>
          <div className="login-modal">
            <Login onClose={() => setShowLoginModal(false)} />
          </div>
        </>
      )}
    </div>
  );
}
