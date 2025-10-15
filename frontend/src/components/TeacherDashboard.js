import React, { useState, useEffect, useCallback } from "react";
import API from "../api";
import "./TeacherDashboard.css";
// Importing Lucide icons for a modern UI look
import { Upload, Download, Trash2, Gauge, Users, ListChecks, Eye, FileText, BarChart3, CloudUpload, Loader2, Plus, Minus, Check, X } from "lucide-react";

const TeacherDashboard = () => {
  const [file, setFile] = useState(null);
  const [testTitle, setTestTitle] = useState("");
  const [testSection, setTestSection] = useState("");
  const [testDifficulty, setTestDifficulty] = useState("Easy");
  const [uploadStatus, setUploadStatus] = useState("");
  const [results, setResults] = useState([]);
  const [deleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(true);

  // Course creation states
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [lessons, setLessons] = useState([{ title: "", content: "" }]);
  const [courseUploadStatus, setCourseUploadStatus] = useState("");

  // Courses management states
  const [courses, setCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [editingVisibility, setEditingVisibility] = useState(null);
  const [tempVisibility, setTempVisibility] = useState({});

  // --- Placeholder Data for New Sections ---
  const [currentTests, setCurrentTests] = useState([
    { _id: 't1', title: 'Data Structures Midterm', section: 'C++', difficulty: 'Hard', status: 'Draft' }, 
    { _id: 't2', title: 'Python Essentials Quiz', section: 'Python', difficulty: 'Easy', status: 'Draft' },
    { _id: 't3', title: 'JavaScript Final Exam', section: 'JavaScript', difficulty: 'Medium', status: 'Draft' }, 
    { _id: 't4', title: 'Networking Basics', section: 'Misc', difficulty: 'Medium', status: 'Draft' },
  ]);
  
  const [performanceStats, setPerformanceStats] = useState({
    totalSubmissions: 0,
    averageScore: 'N/A',
    // Calculate initial active tests count from placeholder data
    activeTests: currentTests.filter(t => t.status === 'Published').length, 
  });
  // --- End Placeholder Data ---

  // Fetch courses function
  const fetchCourses = useCallback(async () => {
    try {
      const { data } = await API.get("/courses");
      setCourses(data);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    } finally {
      setCoursesLoading(false);
    }
  }, []);

  // NOTE: Wrapped in useCallback to satisfy the useEffect dependency rule (React Hook Warning Fix)
  const fetchResults = useCallback(async () => {
    try {
      // Calculate the active tests count based on the current state array (Fixing the active count bug)
      setPerformanceStats(prev => {
        const liveCount = currentTests.filter(t => t.status === 'Published').length;
        return {
          ...prev,
          activeTests: liveCount,
        };
      });

      const { data } = await API.get("/results");
      setResults(data);

      const avgScore = data.length > 0 ? (data.reduce((sum, res) => sum + res.score, 0) / data.length / (data[0]?.totalQuestions || 1) * 100).toFixed(0) + '%' : 'N/A';

      setPerformanceStats(prev => ({
        ...prev,
        totalSubmissions: data.length,
        averageScore: avgScore,
      }));
    } catch (error) {
      console.error("Failed to fetch results:", error);
    } finally {
      setLoading(false);
    }
  }, [currentTests]); // currentTests is added as dependency

  useEffect(() => {
    fetchResults();
    fetchCourses();
  }, [fetchResults, fetchCourses]);

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

      setUploadStatus("Upload successful! Test is now available as DRAFT.");
      setTestTitle("");
      setTestSection("");
      setTestDifficulty("Easy");
      setFile(null);
      document.getElementById("file-upload").value = "";

      fetchResults();
      
      // Add new test to currentTests list (prepending to show immediately)
      const newTest = { 
          _id: data.test._id || Date.now(), 
          title: data.test.title, 
          section: data.test.section, 
          difficulty: data.test.difficulty, 
          status: 'Draft' 
      };
      setCurrentTests(prev => [newTest, ...prev]);

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
  
  const handleDownloadReport = () => {
    alert("Generating and downloading class performance report...");
  };
  
  const handleDeleteTest = (id) => {
    if (!window.confirm("Are you sure you want to delete this test?")) return;
    // Simulate API call to delete test
    setCurrentTests(prev => prev.filter(test => test._id !== id));
    fetchResults(); // Recalculate stats
  };

  // FUNCTIONAL CHANGE: Status is toggled by clicking the eye icon
  const handleToggleStatus = (id) => {
      // 1. Update the currentTests array
      setCurrentTests(prev => prev.map(test => 
        test._id === id ? { ...test, status: test.status === 'Published' ? 'Draft' : 'Published' } : test
      ));
      
      // 2. Update the activeTests count in the stats immediately
      setPerformanceStats(prev => ({
        ...prev,
        activeTests: prev.activeTests + (currentTests.find(t => t._id === id)?.status === 'Draft' ? 1 : -1)
      }));
  };
  
  // NOTE: This handles the click on the Eye/View button, which we are using for the toggle function
  const handleViewDetails = (id, status) => {
    // For simplicity, clicking the Eye icon triggers the Publish/Draft toggle
    handleToggleStatus(id);
    // In a production app, you would also open a modal here to view/edit test details.
    // if (status === 'Published') { // open edit modal } else { // open draft details }
  };

  // Course creation handlers
  const handleAddLesson = () => {
    setLessons([...lessons, { title: "", content: "" }]);
  };

  const handleRemoveLesson = (index) => {
    if (lessons.length > 1) {
      setLessons(lessons.filter((_, i) => i !== index));
    }
  };

  const handleLessonChange = (index, field, value) => {
    const updatedLessons = lessons.map((l, i) =>
      i === index ? { ...l, [field]: value } : l
    );
    setLessons(updatedLessons);
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();

    if (!courseTitle || lessons.some(l => !l.title || !l.content)) {
      setCourseUploadStatus("Please fill in all fields for title and all lessons.");
      return;
    }

    setCourseUploadStatus("Creating course...");

    try {
      const { data } = await API.post("/upload-course", {
        title: courseTitle,
        description: courseDescription,
        lessons,
        visibility: 'public', // Default to public for new courses
      });

      setCourseUploadStatus("Course created successfully!");
      setCourseTitle("");
      setCourseDescription("");
      setLessons([{ title: "", content: "" }]);
      fetchCourses(); // Refresh courses list
    } catch (error) {
      setCourseUploadStatus("Error: " + (error.response?.data?.message || error.message));
      console.error("Course creation failed:", error);
    }
  };

  // Course management handlers
  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm("Are you sure you want to delete this course? This action cannot be undone.")) return;

    try {
      await API.delete(`/courses/${courseId}`);
      setCourses(prev => prev.filter(course => course._id !== courseId));
      alert("Course deleted successfully!");
    } catch (error) {
      console.error("Failed to delete course:", error);
      alert("Failed to delete course. Please try again.");
    }
  };

  const handleToggleCourseVisibility = (courseId) => {
    setEditingVisibility(courseId);
    const course = courses.find(c => c._id === courseId);
    setTempVisibility({ [courseId]: course.visibility || 'public' });
  };

  const handleVisibilityChange = (courseId, newVisibility) => {
    setTempVisibility(prev => ({ ...prev, [courseId]: newVisibility }));
  };

  const handleSaveVisibility = async (courseId) => {
    const newVisibility = tempVisibility[courseId];
    try {
      await API.patch(`/courses/${courseId}`, { visibility: newVisibility });
      setCourses(prev => prev.map(course =>
        course._id === courseId ? { ...course, visibility: newVisibility } : course
      ));
      setEditingVisibility(null);
      setTempVisibility(prev => {
        const updated = { ...prev };
        delete updated[courseId];
        return updated;
      });
      alert("Course visibility updated successfully!");
    } catch (error) {
      console.error("Failed to update course visibility:", error);
      alert("Failed to update course visibility. Please try again.");
    }
  };

  const handleCancelVisibility = (courseId) => {
    setEditingVisibility(null);
    setTempVisibility(prev => {
      const updated = { ...prev };
      delete updated[courseId];
      return updated;
    });
  };

  const handleEditCourse = (course) => {
    alert("Edit course functionality is not implemented yet. Course details: " + JSON.stringify(course, null, 2));
  };

  // Helper component for Stat Cards
  const StatCard = ({ icon: Icon, value, label }) => (
    <div className="stat-card">
      <div className="stat-icon-wrap">
        <Icon className="stat-icon" />
      </div>
      <div>
        <div className="stat-value">{value}</div>
        <div className="stat-label">{label}</div>
      </div>
    </div>
  );


  if (loading) return <div className="teacher-dashboard-container loading-container"><Loader2 size={36} className="animate-spin text-indigo-600" /><div className="loading-message">Loading dashboard...</div></div>;

  return (
    <div className="teacher-dashboard-container">
      <div className="teacher-dashboard-card">
        
        <h1 className="main-title">Faculty Dashboard</h1>

        {/* 1. Performance Snapshot Section (Analytics) */}
        <h2 className="results-title">
          <BarChart3 className="icon-left" size={24} /> Performance Snapshot
        </h2>
        <div className="performance-stats-grid">
          <StatCard 
            icon={Users} 
            value={performanceStats.totalSubmissions} 
            label="Total Submissions Recorded" 
          />
          <StatCard 
            icon={Gauge} 
            value={performanceStats.averageScore}
            label="Overall Class Average" 
          />
          {/* <StatCard 
            icon={ListChecks} 
            value={performanceStats.activeTests} 
            label="Assessments Live" 
          /> */}
        </div>

        {/* Divider */}
       

        {/* 2. Manage Assessments Section */}
        {/* <h2 className="manage-header">
            <FileText className="icon-left" size={24} /> Manage Existing Assessments
        </h2> */}
        


        {/* Divider */}
        <hr className="divider" />

        {/* 3. Upload New Assessment Section */}
        <h2 className="upload-header">
          <CloudUpload className="icon-left" size={24} /> Bulk Upload Assessment (CSV/Excel)
        </h2>
        
        <form onSubmit={handleUpload} className="upload-form">
            {/* Group 1: Metadata Inputs */}
            <div className="form-metadata-group">
                <input
                    type="text"
                    placeholder="Assessment Title"
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
                    <option value="">-- Select Course/Section --</option>
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
            </div>
            
            
            <div className="form-file-group">
                <input
                    type="file"
                    id="file-upload"
                    onChange={(e) => setFile(e.target.files[0])}
                    accept=".csv, .xlsx"
                    required
                    className="file-input"
                />
                  <a href="/sample_assessment_template.xlsx" download className="download-sample-btn" title="Download sample Excel template to see the required format">
                                <Download size={18} className="icon-left" /> Sample File
                  </a>
                <button type="submit" className="upload-btn">
                    <Upload size={20} className="icon-right" />
                    Upload Test
                </button>
            </div>
        </form>
        <p className="upload-status">{uploadStatus}</p>

        {/* Divider */}
        <hr className="divider" />

        {/* 4. Create Course Section */}
        <h2 className="upload-header">
          <FileText className="icon-left" size={24} /> Create Learning Course
        </h2>

        <form onSubmit={handleCreateCourse} className="upload-form">
          {/* Course Metadata */}
          <div className="form-metadata-group">
            <input
              type="text"
              placeholder="Course Title (e.g., DSA)"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              required
              className="form-input"
            />

            <textarea
              placeholder="Course Description (optional)"
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
              className="form-textarea"
            />
          </div>

          {/* Lessons Section */}
          <div className="questions-section">
            <h3>Lessons</h3>
            {lessons.map((l, index) => (
              <div key={index} className="question-item">
                <div className="question-header">
                  <span>Lesson {index + 1}</span>
                  {lessons.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveLesson(index)}
                      className="remove-btn"
                    >
                      <Minus size={16} />
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  placeholder="Lesson Title"
                  value={l.title}
                  onChange={(e) => handleLessonChange(index, "title", e.target.value)}
                  required
                  className="lesson-title-input"
                />
                <textarea
                  placeholder="Lesson Content"
                  value={l.content}
                  onChange={(e) => handleLessonChange(index, "content", e.target.value)}
                  required
                  className="lesson-content-textarea"
                />
              </div>
            ))}
            <button type="button" onClick={handleAddLesson} className="add-question-btn">
              <Plus size={16} className="icon-left" /> Add Another Lesson
            </button>
          </div>

          <button type="submit" className="upload-btn">
            <Upload size={20} className="icon-right" />
            Create Course
          </button>
        </form>
        <p className="upload-status">{courseUploadStatus}</p>

        {/* Divider */}
        <hr className="divider" />

        {/* 5. Manage Courses Section */}
        <h2 className="results-title">
          <FileText className="icon-left" size={24} /> Manage Uploaded Courses
        </h2>

        <div className="courses-table-container">
          {coursesLoading ? (
            <div className="loading-container">
              <Loader2 size={24} className="animate-spin text-indigo-600" />
              <div className="loading-message">Loading courses...</div>
            </div>
          ) : courses.length === 0 ? (
            <p className="no-results-message">No courses created yet.</p>
          ) : (
            <table className="courses-table">
              <thead>
                <tr>
                  <th>Course Title</th>
                  <th>Description</th>
                  <th>Lessons</th>
                  <th>Created</th>
                  <th>Visibility</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course._id}>
                    <td>{course.title}</td>
                    <td>{course.description || "No description"}</td>
                    <td>{course.lessons?.length || 0} lessons</td>
                    <td>{new Date(course.createdAt).toLocaleDateString()}</td>
                    <td>
                      {editingVisibility === course._id ? (
                        <div className="visibility-edit">
                          <select
                            value={tempVisibility[course._id] || course.visibility || 'public'}
                            onChange={(e) => handleVisibilityChange(course._id, e.target.value)}
                            className="visibility-select"
                          >
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                          </select>
                          <button
                            className="action-btn save-btn"
                            onClick={() => handleSaveVisibility(course._id)}
                            title="Save"
                          >
                            <Check size={16} />
                          </button>
                          <button
                            className="action-btn cancel-btn"
                            onClick={() => handleCancelVisibility(course._id)}
                            title="Cancel"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <span className={`visibility-badge ${course.visibility || 'public'}`}>
                          {course.visibility || 'public'}
                        </span>
                      )}
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="action-btn visibility-btn"
                          onClick={() => handleToggleCourseVisibility(course._id, course.visibility || 'public')}
                          title={course.visibility === 'private' ? 'Make Public' : 'Make Private'}
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          className="action-btn edit-btn"
                          onClick={() => handleEditCourse(course)}
                          title="Edit Course"
                        >
                          <FileText size={16} />
                        </button>
                        <button
                          className="action-btn delete-btn"
                          onClick={() => handleDeleteCourse(course._id)}
                          title="Delete Course"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Divider */}
        <hr className="divider" />

        {/* 6. Test Results Section */}
        <div className="results-header">
            <h2 className="results-title">
                <BarChart3 className="icon-left" size={24} /> Student Results & Performance Analytics
            </h2>
            <div className="results-actions">
                  {/* {results.length > 0 && (
                      <button
                          className="download-btn"
                          onClick={handleDownloadReport}
                      >
                          <Download size={20} className="icon-left" /> Download Report (CSV)
                      </button>
                  )} */}
                {results.length > 0 && (
                    <button
                        className="clear-results-btn"
                        onClick={clearResults}
                        disabled={deleting}
                    >
                        <Trash2 size={20} className="icon-left" /> 
                        {deleting ? "Deleting..." : "Clear All Results"}
                    </button>
                )}
            </div>
        </div>

        <div className="results-table-container">
            {results.length === 0 ? (
                <p className="no-results-message">No student test results to display yet.</p>
            ) : (
                <table className="results-table">
                    <thead>
                        <tr>
                            <th>Student Name</th>
                            <th>Student Email</th>
                            <th>Course/Section</th>
                            <th>Assessment Title</th>
                            <th>Score</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((result) => (
                            <tr key={result._id}>
                                <td>{result.studentName}</td>
                                <td>{result.studentEmail}</td>
                                <td>{result.testId?.section || "N/A"}</td>
                                <td>{result.testId?.title || "Unknown Test"}</td>
                                <td className="score-cell">
                                    {result.score}/{result.totalQuestions}
                                </td>
                                <td>{new Date(result.timestamp).toLocaleDateString()}</td>
                                <td>
                                    <button className="view-submission-btn">
                                        <Eye size={18} /> View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
