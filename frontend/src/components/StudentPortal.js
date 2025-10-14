import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../api";
import "./StudentPortal.css";

const StudentPortal = () => {
  const [tests, setTests] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("tests");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [testsRes, coursesRes] = await Promise.all([
          API.get("/tests"),
          API.get("/courses")
        ]);
        setTests(testsRes.data);
        setCourses(coursesRes.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="loading-message">Loading available content...</div>
    );

  return (
    <div className="student-portal">
      <h1>Student Portal</h1>

      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button
          className={`tab-button ${activeTab === "tests" ? "active" : ""}`}
          onClick={() => setActiveTab("tests")}
        >
          Tests
        </button>
        <button
          className={`tab-button ${activeTab === "courses" ? "active" : ""}`}
          onClick={() => setActiveTab("courses")}
        >
          Courses
        </button>
      </div>

      {/* Tests Tab */}
      {activeTab === "tests" && (
        <div className="tab-content">
          <h2>Available Assessments</h2>
          {tests.length === 0 ? (
            <p className="no-tests-message">No assessments are currently available.</p>
          ) : (
            <div className="tests-grid">
              {tests.map((test) => (
                <div key={test._id} className="test-card">
                  <div className="test-card-header">
                    <h3>{test.title}</h3>
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
      )}

      {/* Courses Tab */}
      {activeTab === "courses" && (
        <div className="tab-content">
          <h2>Available Courses</h2>
          {courses.length === 0 ? (
            <p className="no-courses-message">No courses are currently available.</p>
          ) : (
            <div className="courses-grid">
              {courses.map((course) => (
                <div key={course._id} className="course-card">
                  <div className="course-card-header">
                    <h3>{course.title}</h3>
                  </div>

                  <div className="course-card-body">
                    <p>{course.description || "No description available."}</p>
                    <p>
                      <strong>Lessons:</strong> {course.lessons?.length || 0}
                    </p>
                  </div>

                  <div className="course-card-footer">
                    <Link to={`/course/${course._id}`}>
                      <button className="view-course-btn">View Course</button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentPortal;
