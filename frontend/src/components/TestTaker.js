import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

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

  useEffect(() => {
    const fetchTest = async () => {
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

  const handleAnswerChange = (questionId, selectedOption) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: selectedOption,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post(`/submit/${id}`, {
        studentName,
        studentEmail,
        answers: test.questions.map((q) => answers[q._id]),
      });
      setScore(data.score);
      setShowResults(true);
    } catch (error) {
      console.error("Failed to submit test:", error);
    }
  };

  if (!accepted) {
    return (
      <div>
        <h1>Test Information</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setAccepted(true);
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
          <button type="submit" disabled={!studentName || !studentEmail}>
            Start Test
          </button>
        </form>
      </div>
    );
  }

  if (loading) return <div>Loading test...</div>;

  if (showResults) {
    return (
      <div>
        <h1>Test Completed!</h1>
        <p>
          Your score: {score}/{test.questions.length}
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1>{test?.title}</h1>
      <form onSubmit={handleSubmit}>
        {test?.questions.map((q, index) => (
          <div key={q._id}>
            <h3>
              {index + 1}. {q.question}
            </h3>
            {q.options.map((option) => (
              <label key={option}>
                <input
                  type="radio"
                  name={`question-${q._id}`}
                  value={option}
                  checked={answers[q._id] === option}
                  onChange={() => handleAnswerChange(q._id, option)}
                />
                {option}
              </label>
            ))}
          </div>
        ))}
        <button type="submit">Submit Test</button>
      </form>
    </div>
  );
};

export default TestTaker;
