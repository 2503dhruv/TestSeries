import React, { useState, useEffect } from "react";
import API from "../api";

const TeacherDashboard = () => {
  const [file, setFile] = useState(null);
  const [testTitle, setTestTitle] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const [results, setResults] = useState([]);

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
    if (!file || !testTitle) return;

    setUploadStatus("Uploading...");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", testTitle);

    try {
      await API.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUploadStatus("Upload successful!");
      setTestTitle("");
      setFile(null);
      document.getElementById("file-upload").value = "";
      fetchResults();
    } catch (error) {
      setUploadStatus("Error: " + error.message);
    }
  };

  return (
    <div>
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
        <input
          type="file"
          id="file-upload"
          onChange={handleFileChange}
          accept=".csv, .xlsx"
          required
        />
        <button type="submit">Upload</button>
      </form>
      <p>{uploadStatus}</p>

      <hr />

      <h2>Test Results</h2>
      {results.length === 0 ? (
        <p>No test results to display.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Student Email</th>
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
