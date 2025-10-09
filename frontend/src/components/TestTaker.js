import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import "./TestTaker.css";

const TestTaker = () => {
  const { id } = useParams();
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [test, setTest] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch test after acceptance
  useEffect(() => {
    const fetchTest = async () => {
      setLoading(true);
      try {
        const { data } = await API.get(`/tests/${id}`);
        setTest(data);
      } catch (error) {
        console.error("Failed to fetch test:", error);
      } finally {
        setLoading(false);
      }
    };
    if (accepted) fetchTest();
  }, [id, accepted]);

  // Handle option change
  const handleAnswerChange = (questionId, selectedOption) => {
    const qId = questionId.toString(); // convert ObjectId to string
    setAnswers((prev) => ({
      ...prev,
      [qId]: selectedOption,
    }));
  };

  // Submit test
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(answers).length !== test.questions.length) {
      if (
        !window.confirm(
          "Some questions are unanswered. Do you still want to submit?"
        )
      )
        return;
    }

    try {
      const { data } = await API.post(`/submit/${id}`, {
        studentName,
        studentEmail,
        answers,
      });
      setScore(data.score);
      setShowResults(true);
    } catch (error) {
      console.error("Failed to submit test:", error);
      alert("Failed to submit test. Please try again.");
    }
  };

  // Render: Start Form (Login/Info)
  if (!accepted) {
    return (
      <div className="test-taker-main">
        <div className="info-card">
          <h1>Assessment Information</h1>
          <form
            className="info-form"
            onSubmit={(e) => {
              e.preventDefault();
              // Note: Accepted checkbox must be checked to proceed, handled by required attribute
              if (studentName && studentEmail) setAccepted(true); 
            }}
          >
            <div className="form-group">
              <label>Full Name:</label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="terms-checkbox-group">
              <input
                type="checkbox"
                onChange={(e) => setAccepted(e.target.checked)}
                required
                id="terms-checkbox"
              />
              <label htmlFor="terms-checkbox">
                I accept the terms and conditions.
              </label>
            </div>
            
            <button
              type="submit"
              disabled={!studentName || !studentEmail || !accepted}
              className="start-btn"
            >
              Start Assessment
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Render: Loading state
  if (loading) return <div className="test-taker-main loading-message">Loading assessment questions...</div>;

  // Render: Results
  if (showResults) {
    return (
      <div className="test-taker-main results-card">
        <h1>Assessment Complete! 🎉</h1>
        <p>
          Your Final Score: <span className="score-value">{score}</span> / {test.questions.length}
        </p>
        <p className="results-subtext">Your results have been recorded and sent to the faculty.</p>
      </div>
    );
  }

  // Render: Test questions
  return (
    <div className="test-taker-main">
      <div className="test-card">
        <h1 className="test-title">{test?.title}</h1>
        <form onSubmit={handleSubmit} className="questions-form">
          {test?.questions.map((q, index) => {
            const qId = q._id.toString();
            const selectedOption = answers[qId];
            
            return (
              <div key={qId} className="question-container">
                <h3 className="question-text">
                  {index + 1}. {q.question}
                </h3>
                <div className="options-group">
                {q.options.map((option, i) => (
                  <label key={i} className={`option-label ${selectedOption === option ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name={`question-${qId}`}
                      value={option}
                      checked={selectedOption === option}
                      onChange={() => handleAnswerChange(qId, option)}
                      className="option-radio"
                    />
                    {option}
                  </label>
                ))}
                </div>
              </div>
            );
          })}

          <button
            type="submit"
            disabled={Object.keys(answers).length === 0}
            className="submit-btn"
          >
            Submit Assessment
          </button>
        </form>
      </div>
    </div>
  );
};

export default TestTaker;
