import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api";
import "./CourseViewer.css";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

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
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  if (loading)
    return (
      <div className="loader-page">
        <div className="loading-spinner"></div>
        <p>Loading course…</p>
      </div>
    );

  if (error || !course)
    return (
      <div className="course-viewer-error">
        <h2>Error</h2>
        <p>{error || "Course not found"}</p>
        <Link to="/student" className="back-nav">
          Back
        </Link>
      </div>
    );

  const lesson = course.lessons[currentLesson];
  const progress = ((currentLesson + 1) / course.lessons.length) * 100;

  return (
    <div className="course-viewer-new">
      {/* HEADER */}
      <div className="course-hero">
        <h1>{course.title}</h1>
        <p>{course.description}</p>

        <div className="course-progress">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>

        <Link to="/student" className="back-nav">
          ← Back to Courses
        </Link>
      </div>

      {/* MAIN LAYOUT */}
      <div className="content-layout">
        {/* SIDEBAR */}
        <aside className="lesson-sidebar-new">
          <h3>Lessons</h3>
          <div className="lesson-scroll">
            {course.lessons.map((l, i) => (
              <div
                key={i}
                className={`lesson-step ${i === currentLesson ? "active" : ""}`}
                onClick={() => setCurrentLesson(i)}
              >
                <span className="step-index">{i + 1}</span>
                <p className="step-title">{l.title}</p>
              </div>
            ))}
          </div>
        </aside>

        {/* LESSON PANEL */}
        <section className="lesson-panel">
          <h2>{lesson.title}</h2>

          <div className="lesson-body-new">
            <ReactMarkdown
              children={lesson.content}
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
            />
          </div>

          <div className="lesson-nav-buttons">
            <button
              disabled={currentLesson === 0}
              onClick={() => setCurrentLesson(currentLesson - 1)}
              className="prev-btn"
            >
              Previous
            </button>

            <span>
              {currentLesson + 1} / {course.lessons.length}
            </span>

            <button
              disabled={currentLesson === course.lessons.length - 1}
              onClick={() => setCurrentLesson(currentLesson + 1)}
              className="next-btn"
            >
              Next
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CourseViewer;
