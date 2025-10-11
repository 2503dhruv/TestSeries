import React, { useState, useRef, useEffect } from "react";
import API from "../api";
import { useParams, useNavigate } from "react-router-dom";
import "./TestTaker.css";

const TestTaker = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [termsChecked, setTermsChecked] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [test, setTest] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);

  const [fullscreenExits, setFullscreenExits] = useState(0);
  const [fullscreenLost, setFullscreenLost] = useState(false);
  const testContainerRef = useRef(null);

  // Detect fullscreen changes
  useEffect(() => {
    if (!accepted) return;

    function handleFullscreenChange() {
      if (!document.fullscreenElement) {
        setFullscreenLost(true);
        setFullscreenExits((prev) => prev + 1);
      } else {
        setFullscreenLost(false);
      }
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [accepted]);

  // Alerts on fullscreen exit counts, ends session on two exits
  useEffect(() => {
    if (!accepted) return;

    if (fullscreenExits === 1) {
      alert(
        "Please stay in fullscreen mode during your assessment. If you exit fullscreen again, your test may be ended."
      );
    } else if (fullscreenExits >= 2) {
      alert("You have exited fullscreen mode twice. Your session will now end.");
      window.location.reload();
    }
  }, [fullscreenExits, accepted]);

  // Fetch test on acceptance
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

  // Track answers
  const handleAnswerChange = (questionId, selectedOption) => {
    const qId = questionId.toString();
    setAnswers((prev) => ({
      ...prev,
      [qId]: selectedOption,
    }));
  };

  // Start assessment and enter fullscreen
  const handleStartAssessment = (e) => {
    e.preventDefault();
    if (!studentName || !studentEmail || !termsChecked) return;

    if (testContainerRef.current && testContainerRef.current.requestFullscreen) {
      testContainerRef.current.requestFullscreen();
    }
    setAccepted(true);
  };

  // Submit answers
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(answers).length !== test.questions.length) {
      if (!window.confirm("Some questions are unanswered. Do you still want to submit?"))
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

  // BEFORE start: Login/Info form
  if (!accepted) {
    const isFormIncomplete = !studentName || !studentEmail;
    return (
      <div className="test-taker-main" ref={testContainerRef}>
        <div className="info-card">
          <h1>Assessment Information</h1>
          <form className="info-form" onSubmit={handleStartAssessment}>
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
                id="terms-checkbox"
                disabled={isFormIncomplete}
                checked={termsChecked}
                onChange={(e) => setTermsChecked(e.target.checked)}
                required={!isFormIncomplete}
              />
              <label
                htmlFor="terms-checkbox"
                style={isFormIncomplete ? { color: "#aaa", cursor: "not-allowed" } : {}}
              >
                I accept the terms and conditions.
              </label>
            </div>
            <button
              type="submit"
              disabled={isFormIncomplete || !termsChecked}
              className="start-btn"
            >
              Start Assessment
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Loading screen
  if (loading)
    return (
      <div className="test-taker-main loading-message">
        Loading assessment questions...
      </div>
    );

  // Results screen with Home button
  if (showResults) {
    return (
      <div className="test-taker-main results-card">
        <h1>Assessment Complete! 🎉</h1>
        <p>
          Your Final Score: <span className="score-value">{score}</span> / {test.questions.length}
        </p>
        <p className="results-subtext">Your results have been recorded and sent to the faculty.</p>
        <button className="home-btn" onClick={() => navigate("/")}>
          Home
        </button>
      </div>
    );
  }

  // MAIN test with overlay and disabled inputs while fullscreen lost
  return (
    <div className="test-taker-main" ref={testContainerRef} style={{ position: "relative" }}>
      {fullscreenLost && (
        <>
          <div className="fullscreen-warning">
            <p>You have exited fullscreen mode.</p>
            <button
              onClick={() => {
                if (testContainerRef.current && testContainerRef.current.requestFullscreen) {
                  testContainerRef.current.requestFullscreen();
                }
              }}
              className="reenter-fullscreen-btn"
            >
              Re-enter Fullscreen
            </button>
          </div>
          <div className="fullscreen-blocker" />
        </>
      )}

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
                    <label
                      key={i}
                      className={`option-label ${selectedOption === option ? "selected" : ""}`}
                    >
                      <input
                        type="radio"
                        name={`question-${qId}`}
                        value={option}
                        checked={selectedOption === option}
                        disabled={fullscreenLost}
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
            disabled={fullscreenLost || Object.keys(answers).length === 0}
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
