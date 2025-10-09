import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../api";
import "./StudentPortal.css"; // KEEPING THE CSS IMPORT

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

  if (loading) return <div className="loading-message">Loading available assessments...</div>;

  return (
    <div className="student-portal">
      <h1>Available Assessments</h1>

      {tests.length === 0 ? (
        <p className="no-tests-message">No assessments are currently available.</p>
      ) : (
        <div className="tests-list-container">
          <table className="tests-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Section</th>
                <th>Difficulty</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tests.map((test) => (
                <tr key={test._id}>
                  <td>{test.title}</td>
                  <td>{test.section || "N/A"}</td>
                  <td>
                    {/* Dynamic Difficulty Badges using CSS classes */}
                    <span className={`difficulty ${test.difficulty?.toLowerCase()}`}>
                      {test.difficulty || "-"}
                    </span>
                  </td>
                  <td>
                    <Link to={`/test/${test._id}`}>
                      <button className="start-test-btn">Start Assessment</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentPortal;
