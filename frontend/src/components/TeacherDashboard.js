import React, { useState, useEffect } from "react";
import API from "../api";
import "./TeacherDashboard.css";

const TeacherDashboard = () => {
  const [file, setFile] = useState(null);
  const [testTitle, setTestTitle] = useState("");
  const [testSection, setTestSection] = useState(""); 
  const [testDifficulty, setTestDifficulty] = useState("Easy"); 
  const [uploadStatus, setUploadStatus] = useState("");
  const [results, setResults] = useState([]);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const { data } = await API.get("/results");
      setResults(data);
    } catch (error) {
      console.error("Failed to fetch results:", error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file || !testTitle || !testSection || !testDifficulty) {
      setUploadStatus("Please fill in all fields and select a file.");
      return;
    }

    setUploadStatus("Uploading...");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", testTitle);
    formData.append("section", testSection);
    formData.append("difficulty", testDifficulty);

    try {
      const { data } = await API.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Uploaded Test:", data.test);

      setUploadStatus("Upload successful! Test is now available.");
      setTestTitle("");
      setTestSection("");
      setTestDifficulty("Easy");
      setFile(null);
      document.getElementById("file-upload").value = "";

      fetchResults();
    } catch (error) {
      setUploadStatus("Error: " + (error.response?.data?.error || error.message));
      console.error("Upload failed:", error);
    }
  };

  const clearResults = async () => {
    if (!window.confirm("Are you sure you want to delete all results? This action cannot be undone.")) return;

    try {
      setDeleting(true);
      await API.delete("/results/clear");
      setResults([]);
      alert("All results have been deleted!");
    } catch (error) {
      console.error("Failed to clear results:", error);
      alert("Failed to delete results from server");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="teacher-dashboard-container">
      <div className="teacher-dashboard-card">
        <h1>Faculty Dashboard</h1>

        {/* Upload Section */}
        <h2 className="upload-header">Upload New Assessment (CSV/Excel)</h2>
        <form onSubmit={handleUpload} className="upload-form">
          <input
            type="text"
            placeholder="Test Title (e.g., Data Structures Final)"
            value={testTitle}
            onChange={(e) => setTestTitle(e.target.value)}
            required
            className="form-input"
          />
          
          <select
            value={testSection}
            onChange={(e) => setTestSection(e.target.value)}
            required
            className="form-select"
          >
            <option value="">--Select a Course/Section--</option>
            <option value="C++">C++</option>
            <option value="Java">Java</option>
            <option value="Python">Python</option>
            <option value="JavaScript">JavaScript</option>
            <option value="React">React</option>
            <option value="SQL">SQL</option>
          </select>

          <select
            value={testDifficulty}
            onChange={(e) => setTestDifficulty(e.target.value)}
            required
            className="form-select"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <input
            type="file"
            id="file-upload"
            onChange={handleFileChange}
            accept=".csv, .xlsx"
            required
            className="file-input"
          />
          <button type="submit" className="upload-btn">Upload Test</button>
        </form>
        <p className="upload-status">{uploadStatus}</p>

        <hr className="divider" />

        {/* Results Section */}
        <div className="results-header">
          <h2 className="results-title">Test Results & Performance Analytics</h2>
          {results.length > 0 && (
            <button
              className="clear-results-btn"
              onClick={clearResults}
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "✖ Clear All Results"}
            </button>
          )}
        </div>

        {results.length === 0 ? (
          <p className="no-results-message">No student test results to display yet.</p>
        ) : (
          <div className="results-table-container">
            <table className="results-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Student Email</th>
                  <th>Course/Section</th>
                  <th>Assessment Title</th>
                  <th>Score</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result) => (
                  <tr key={result._id}>
                    <td data-label="Student Name">{result.studentName}</td>
                    <td data-label="Student Email">{result.studentEmail}</td>
                    <td data-label="Course/Section">{result.testId?.section || "N/A"}</td>
                    <td data-label="Assessment Title">{result.testId?.title || "Unknown Test"}</td>
                    <td data-label="Score" className="score-cell">
                      {result.score}/{result.totalQuestions}
                    </td>
                    <td data-label="Date">{new Date(result.timestamp).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;
