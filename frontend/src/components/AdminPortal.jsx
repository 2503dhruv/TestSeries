import React, { useState, useEffect } from "react";
import "./AdminPortal.css";
import API from "../api";


const AdminPanel = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [viewingTest, setViewingTest] = useState(null); // for modal
  const [error, setError] = useState(null);

  // Fetch all tests
  useEffect(() => {
    const fetchTests = async () => {
      try {
        const { data } = await API.get("/admin/tests"); // local route
        setTests(data);
      } catch (err) {
        console.error("Error fetching tests:", err);
        setError("Failed to load tests.");
      } finally {
        setLoading(false);
      }
    };
    fetchTests();
  }, []);

  // Delete a test
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this test?")) return;

    try {
      setDeletingId(id);
      await API.delete(`/admin/tests/${id}`);
      setTests(tests.filter((test) => test._id !== id));
    } catch (err) {
      console.error("Failed to delete test:", err);
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
      console.error("Failed to fetch test details:", err);
      setError("Failed to fetch test details.");
    }
  };

  const closeModal = () => setViewingTest(null);

  if (loading) return <div className="loading-message">Loading tests...</div>;

  return (
    <div className="admin-panel">
      <h1>Admin Panel - Manage Tests</h1>

      {error && <div className="error-message">{error}</div>}

      {tests.length === 0 ? (
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
                  <button
                    className="view-btn"
                    onClick={() => viewDetails(test._id)}
                  >
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

      {/* Modal for viewing test questions */}
      {viewingTest && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{viewingTest.title}</h2>
            <p>
              <strong>Section:</strong> {viewingTest.section || "-"}
            </p>
            <p>
              <strong>Difficulty:</strong> {viewingTest.difficulty || "-"}
            </p>
            <h3>Questions:</h3>
            <ol>
              {viewingTest.questions.map((q, idx) => (
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
  );
};

export default AdminPanel;
