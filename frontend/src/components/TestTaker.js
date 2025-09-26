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

    // Optional: alert if some questions are unanswered
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
        answers, // answers keyed by string questionId
      });
      setScore(data.score);
      setShowResults(true);
    } catch (error) {
      console.error("Failed to submit test:", error);
      alert("Failed to submit test. Please try again.");
    }
  };

  // Render: Start Form
  if (!accepted) {
    return (
      <div className="TestTaker">
        <h1>Test Information</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (studentName && studentEmail) setAccepted(true);
          }}
        >
          <label>Name:</label>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            required
          />
          <br />
          <label>Email:</label>
          <input
            type="email"
            value={studentEmail}
            onChange={(e) => setStudentEmail(e.target.value)}
            required
          />
          <br />
          <label>
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              required
            />
            I accept the terms and conditions.
          </label>
          <br />
          <button
            type="submit"
            disabled={!studentName || !studentEmail || !accepted}
          >
            Start Test
          </button>
        </form>
      </div>
    );
  }

  // Render: Loading state
  if (loading) return <div className="TestTaker loading">Loading test...</div>;

  // Render: Results
  if (showResults) {
    return (
      <div className="TestTaker results-display">
        <h1>Test Completed!</h1>
        <p>
          Your score: {score}/{test.questions.length}
        </p>
      </div>
    );
  }

  // Render: Test questions
  return (
    <div className="TestTaker">
      <h1>{test?.title}</h1>
      <form onSubmit={handleSubmit}>
        {test?.questions.map((q, index) => {
          const qId = q._id.toString(); // convert ObjectId to string
          return (
            <div key={qId} className="question-container">
              <h3>
                {index + 1}. {q.question}
              </h3>
              {q.options.map((option, i) => (
                <label key={i}>
                  <input
                    type="radio"
                    name={`question-${qId}`}
                    value={option}
                    checked={answers[qId] === option}
                    onChange={() => handleAnswerChange(qId, option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          );
        })}

        <button
          type="submit"
          disabled={Object.keys(answers).length === 0} 
        >
          Submit Test
        </button>
      </form>
    </div>
  );
};

export default TestTaker;  