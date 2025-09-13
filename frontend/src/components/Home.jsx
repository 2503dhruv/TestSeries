import { BookOpen, Award, Users, Laptop, PenTool, Mail } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { Link } from "react-router-dom";
import Footer from "../components/Footer/Footer";

import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h1>
            Welcome to <span>TechForTechie</span>
          </h1>
          <p>
            Your one-stop platform for practicing technical tests, tracking
            progress, and preparing for real-world challenges.
          </p>
          <Link to="/student">
            <button className="cta-btn">Start Learning</button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section">
        <h3>Why Choose TechForTechie?</h3>
        <div className="card-grid">
          <Card className="card">
            <CardContent>
              <BookOpen className="icon" />
              <h4>Expert Tutorials</h4>
              <p>
                In-depth notes and tutorials covering programming, data science,
                AI, and more.
              </p>
            </CardContent>
          </Card>

          <Card className="card">
            <CardContent>
              <Award className="icon" />
              <h4>Free Certifications</h4>
              <p>
                Earn certificates in Python, JavaScript, SQL, Linux, and other
                top technologies.
              </p>
            </CardContent>
          </Card>

          <Card className="card">
            <CardContent>
              <Users className="icon" />
              <h4>1-on-1 Guidance</h4>
              <p>
                Personalized online sessions with experts to help you achieve
                your learning goals.
              </p>
            </CardContent>
          </Card>

          <Card className="card">
            <CardContent>
              <Laptop className="icon" />
              <h4>Job Readiness</h4>
              <p>
                Build practical skills that prepare you for real-world tech
                careers.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Tutorials Section */}
      <section id="tutorials" className="section alt-bg">
        <h3>Explore Our Tutorials</h3>
        <div className="card-grid-2">
          {[
            "Python Programming",
            "JavaScript Essentials",
            "Data Structures & Algorithms",
            "Data Science Basics",
            "Artificial Intelligence",
            "SQL & Databases",
          ].map((title) => (
            <Card key={title} className="card">
              <CardContent>
                <h4>{title}</h4>
                <p>
                  Detailed notes, step-by-step tutorials, and practical
                  exercises to help you master {title}.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      

      {/* Certifications Section */}
      <section id="certifications" className="section">
        <h3>Earn Free Certifications</h3>
        <p className="section-subtext">
          Complete quizzes and assessments to receive verified certificates in
          top programming languages and technologies.
        </p>
        <div className="cert-list">
          {["Python", "JavaScript", "Java", "C++", "Linux", "SQL"].map(
            (cert) => (
              <span key={cert} className="cert-badge">
                {cert}
              </span>
            )
          )}
        </div>
      </section>

      {/* Blogs Section */}
      <section id="blogs" className="section alt-bg-1">
        <h3>Latest From Our Experts</h3>
        <div className="card-grid">
          {[1, 2, 3].map((id) => (
            <Card key={id} className="card">
              <CardContent>
                <PenTool className="icon" />
                <h4>Tech Blog #{id}</h4>
                <p>
                  Insightful articles and resources on emerging technologies,
                  tools, and best practices.
                </p>
                <Button variant="link" className="read-more">
                  Read More →
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section">
        <h3>Get in Touch</h3>
        <p className="section-subtext">
          Have questions or want to book a 1-on-1 session? Reach out to us and
          we’ll be happy to help.
        </p>
        <button className="contact-btn">
          <Mail className="btn-icon" /> Contact Us
        </button>
      </section>

      {/* External Footer */}
      <Footer />
    </div>
  );
}
