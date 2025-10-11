import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../api";
import "./StudentPortal.css";

const StudentPortal = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const { data } = await API.get("/tests");
        setTests(data);
      } catch (error) {
        console.error("Failed to fetch tests:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTests();
  }, []);

  if (loading)
    return (
      <div className="loading-message">Loading available assessments...</div>
    );

  return (
    <div className="student-portal">
      <h1>Available Assessments</h1>

      {tests.length === 0 ? (
        <p className="no-tests-message">No assessments are currently available.</p>
      ) : (
        <div className="tests-grid">
          {tests.map((test) => (
            <div key={test._id} className="test-card">
              <div className="test-card-header">
                <h2>{test.title}</h2>
                <span className={`difficulty ${test.difficulty?.toLowerCase()}`}>
                  {test.difficulty || "-"}
                </span>
              </div>

              <div className="test-card-body">
                <p>
                  <strong>Section:</strong> {test.section || "N/A"}
                </p>
              </div>

              <div className="test-card-footer">
                <Link to={`/test/${test._id}`}>
                  <button className="start-test-btn">Start Assessment</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentPortal;
