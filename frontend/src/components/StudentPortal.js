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

  if (loading) return <div>Loading tests...</div>;

return (
  <div className="StudentPortal">
    <h1>Available Tests</h1>
    {tests.length === 0 ? (
      <p>No tests are currently available.</p>
    ) : (
      <ul>
        {tests.map((test) => (
          <li key={test._id}>
            {test.title}
            <Link to={`/test/${test._id}`} style={{ marginLeft: "10px" }}>
              <button>Start Test</button>
            </Link>
          </li>
        ))}
      </ul>
    )}
  </div>
);
};

export default StudentPortal;
