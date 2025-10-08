import React, { useState, useEffect } from "react";
import "./AdminPortal.css";
import API from "../api";

const AdminPanel = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [viewingTest, setViewingTest] = useState(null);
  const [error, setError] = useState(null);
  const [hasKey, setHasKey] = useState(!!sessionStorage.getItem("adminKey"));
  const [nav, setNav] = useState("dashboard");

  // Fetch tests
  const fetchTests = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await API.get("/admin/tests");
      setTests(data);
    } catch (err) {
      if (err.response?.status === 403) {
        sessionStorage.removeItem("adminKey");
        setHasKey(false);
        setError("Invalid or missing Admin Key.");
      } else {
        setError("Failed to load tests.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasKey) fetchTests();
    else setLoading(false);
  }, [hasKey]);

  // Delete a test
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this test?")) return;
    try {
      setDeletingId(id);
      await API.delete(`/admin/tests/${id}`);
      setTests((prev) => prev.filter((test) => test._id !== id));
    } catch (err) {
      setError("Failed to delete test.");
    } finally {
      setDeletingId(null);
    }
  };

  // View test details
  const viewDetails = async (id) => {
    try {
      const { data } = await API.get(`/tests/${id}`);
      setViewingTest(data);
    } catch (err) {
      setError("Failed to fetch test details.");
    }
  };

  const closeModal = () => setViewingTest(null);

  // Admin key modal handler
  const handleKeySubmit = () => {
    const input = document.querySelector(".admin-login-card input");
    if (input?.value) {
      sessionStorage.setItem("adminKey", input.value.trim());
      setHasKey(true);
      setError(null);
      setLoading(true);
    }
  };

  // For demo, completed tests = those with difficulty "Hard"
  const completedCount = tests.filter(t => t.difficulty === "Hard").length;

  return (
    <div className="new-admin-root">
      {!hasKey && (
        <div className="blur-overlay">
          <div className="admin-login-card">
            <h2>Admin Access Required</h2>
            <input
              type="password"
              placeholder="Enter Admin Key"
              onKeyDown={e => e.key === "Enter" && handleKeySubmit()}
            />
            <button className="login-btn" onClick={handleKeySubmit}>
              Unlock Dashboard
            </button>
            {error && <div className="error-message">{error}</div>}
          </div>
        </div>
      )}

      <aside className="side-nav">
        <div className="side-logo">TechForTechie</div>
        <div className="side-section">Admin Access</div>
        <nav className="side-menu">
          <div
            className={nav === "dashboard" ? "side-link active" : "side-link"}
            onClick={() => setNav("dashboard")}
          >
            Dashboard
          </div>
          <div
            className={nav === "tests" ? "side-link active" : "side-link"}
            onClick={() => setNav("tests")}
          >
            Tests
          </div>
        </nav>
      </aside>

      <main className={`new-admin-main ${!hasKey ? "blur-bg" : ""}`}>
        {nav === "dashboard" ? (
          <div className="dashboard-redesign">
            {/* Top row: Total Tests + Admin Active */}
            <div className="top-stats-row">
              <div className="stat-card gradient">
                <div className="stat-icon">&#128221;</div>
                <div>
                  <div className="stat-label">Total Tests Live</div>
                  <div className="stat-count">{tests.length}</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">&#128100;</div>
                <div>
                  <div className="stat-label">Admin Active</div>
                  <div className="stat-count"></div>
                </div>
              </div>
            </div>
            {/* Next row: Completed tests */}
            <div className="completed-row">
              <div className="stat-card">
                <div className="stat-icon">&#9989;</div>
                <div>
                  <div className="stat-label">Completed Tests</div>
                  <div className="stat-count">{completedCount}</div>
                </div>
              </div>
            </div>
            {/* Next row: Recent Tests */}
            <div className="recent-tests-section">
              <div className="activity-title">Recent Tests</div>
              <ul className="activity-list">
                {loading ? (
                  <span className="loading-message">Loading test names...</span>
                ) : tests.length === 0 ? (
                  <span className="no-tests-msg">No tests available.</span>
                ) : (
                  tests.slice(0, 5).map((t, i) => (
                    <li key={t._id || i} className="activity-item">
                      <span>{t.title}</span>
                      <span className="activity-meta">{t.difficulty}</span>
                    </li>
                  ))
                )}
              </ul>
              <div className="quick-actions">
                <button className="view-btn" onClick={() => setNav('tests')}>
                  Manage Tests
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="tests-view">
            <h1>Test Management</h1>
            {error && <div className="error-message">{error}</div>}
            {loading ? (
              <div className="loading-message">Loading tests...</div>
            ) : tests.length === 0 ? (
              <p>No tests available.</p>
            ) : (
              <table className="test-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Section</th>
                    <th>Difficulty</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tests.map((test) => (
                    <tr key={test._id}>
                      <td>{test.title}</td>
                      <td>{test.section || "-"}</td>
                      <td>{test.difficulty || "-"}</td>
                      <td>
                        <button className="view-btn" onClick={() => viewDetails(test._id)}>
                          View Details
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(test._id)}
                          disabled={deletingId === test._id}
                        >
                          {deletingId === test._id ? "Deleting..." : "Delete"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {viewingTest && (
              <div className="modal-overlay" onClick={closeModal}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                  <h2>{viewingTest.title}</h2>
                  <p>
                    <strong>Section:</strong> {viewingTest.section || "-"}
                  </p>
                  <p>
                    <strong>Difficulty:</strong> {viewingTest.difficulty || "-"}
                  </p>
                  <h3>Questions:</h3>
                  <ol>
                    {viewingTest.questions?.map((q, idx) => (
                      <li key={idx}>
                        <p>{q.question}</p>
                        <ul>
                          {q.options.map((opt, i) => (
                            <li key={i}>{opt}</li>
                          ))}
                        </ul>
                        <p>
                          <strong>Answer:</strong> {q.correctAnswer}
                        </p>
                      </li>
                    ))}
                  </ol>
                  <button className="close-btn" onClick={closeModal}>
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPanel;
