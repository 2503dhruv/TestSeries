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
  const [deleting, setDeleting] = useState(false); // NEW: loading state

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

      setUploadStatus("Upload successful!");
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

  // UPDATED: Clear results with backend
  const clearResults = async () => {
    if (!window.confirm("Are you sure you want to delete all results?")) return;

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
    <div className="TeacherDashboard">
      <h1>Teacher Dashboard</h1>

      <h2>Upload New Test</h2>
      <form onSubmit={handleUpload}>
        <input
          type="text"
          placeholder="Test Title"
          value={testTitle}
          onChange={(e) => setTestTitle(e.target.value)}
          required
        />
        
        <select
          value={testSection}
          onChange={(e) => setTestSection(e.target.value)}
          required
        >
          <option value="">--Select a Section--</option>
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
        />
        <button type="submit">Upload Test</button>
      </form>
      <p>{uploadStatus}</p>

      <hr />

      <div className="results-header">
        <h2>Test Results</h2>
        {results.length > 0 && (
          <button
            className="clear-results-btn"
            onClick={clearResults}
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "✖ Clear Results"}
          </button>
        )}
      </div>

      {results.length === 0 ? (
        <p>No test results to display.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Student Email</th>
              <th>Test Section</th>
              <th>Test Title</th>
              <th>Score</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result._id}>
                <td>{result.studentName}</td>
                <td>{result.studentEmail}</td>
                <td>{result.testId?.section || "N/A"}</td>
                <td>{result.testId?.title || "Unknown Test"}</td>
                <td>
                  {result.score}/{result.totalQuestions}
                </td>
                <td>{new Date(result.timestamp).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TeacherDashboard;
