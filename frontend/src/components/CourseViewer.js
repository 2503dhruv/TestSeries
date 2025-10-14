import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api";
import "./CourseViewer.css";

const CourseViewer = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(0);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await API.get(`/courses/${id}`);
        setCourse(data);
      } catch (err) {
        setError("Failed to load course details.");
        console.error("Error fetching course:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <div className="course-viewer-loading">
        <div className="loading-spinner"></div>
        <p>Loading course...</p>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="course-viewer-error">
        <h2>Error</h2>
        <p>{error || "Course not found."}</p>
        <Link to="/student-portal" className="back-btn">
          Back to Student Portal
        </Link>
      </div>
    );
  }

  const lesson = course.lessons[currentLesson];

  return (
    <div className="course-viewer">
      <div className="course-header">
        <h1>{course.title}</h1>
        <p className="course-description">{course.description}</p>
        <Link to="/student" className="back-btn">
          ← Back to Courses
        </Link>
      </div>

      <div className="course-content">
        <div className="lesson-sidebar">
          <h3>Lessons</h3>
          <div className="lesson-list">
            {course.lessons.map((lesson, index) => (
              <button
                key={index}
                className={`lesson-item ${currentLesson === index ? "active" : ""}`}
                onClick={() => setCurrentLesson(index)}
              >
                <span className="lesson-number">{index + 1}</span>
                <span className="lesson-title">{lesson.title}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="lesson-content">
          <div className="lesson-header">
            <h2>{lesson.title}</h2>
          </div>
          <div className="lesson-body">
            <p>{lesson.content}</p>
          </div>
          <div className="lesson-navigation">
            <button
              className="nav-btn prev-btn"
              disabled={currentLesson === 0}
              onClick={() => setCurrentLesson(currentLesson - 1)}
            >
              ← Previous
            </button>
            <span className="lesson-counter">
              {currentLesson + 1} of {course.lessons.length}
            </span>
            <button
              className="nav-btn next-btn"
              disabled={currentLesson === course.lessons.length - 1}
              onClick={() => setCurrentLesson(currentLesson + 1)}
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseViewer;
