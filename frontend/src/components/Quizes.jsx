import React from "react";
import { useNavigate } from "react-router-dom";
import "./Quizes.css";
import Footer from "./Footer/Footer";

const Quizes = () => {
  const navigate = useNavigate();

  return (
    <div className="quizes-container">
      <div className="quizes-box">
        <h1>🛠️ We are under maintenance right now 🛠️</h1>
        <p>We will be back shortly!</p>
        <button onClick={() => navigate("/")} className="home-btn">
          Go to Home
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default Quizes;
