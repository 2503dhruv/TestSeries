import React, { useState, useEffect } from "react";
import "./AdminPortal.css";
import API from "../api";
import { FileText, UserPlus, Trash2, Edit, Calendar, Eye, BookOpen } from "lucide-react";

const AdminPanel = () => {
  const [tests, setTests] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [viewingTest, setViewingTest] = useState(null);
  const [viewingCourse, setViewingCourse] = useState(null);
  const [error, setError] = useState(null);
  const [hasKey, setHasKey] = useState(!!sessionStorage.getItem("adminKey"));
  const [nav, setNav] = useState("dashboard");
  const [results, setResults] = useState([]);
  const [resultsLoading, setResultsLoading] = useState(true);
  const [resultsError, setResultsError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedTests, setSelectedTests] = useState([]);
  const [resultSearchTerm, setResultSearchTerm] = useState("");
  const [selectedResults, setSelectedResults] = useState([]);
  const [deletingResultId, setDeletingResultId] = useState(null);
  const [resultSortKey, setResultSortKey] = useState(null);
  const [resultSortOrder, setResultSortOrder] = useState("asc");
  const [courseSearchTerm, setCourseSearchTerm] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [deletingCourseId, setDeletingCourseId] = useState(null);
  const [users, setUsers] = useState([]);
  const [userSearchTerm, setUserSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [deletingUserId, setDeletingUserId] = useState(null);
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'student' });
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState({ _id: '', name: '', email: '', role: 'student' });
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
    if (hasKey) {
      fetchTests();
      fetchCourses();
    } else setLoading(false);
  }, [hasKey]);

  // Fetch results
  const fetchResults = async () => {
    setResultsLoading(true);
    setResultsError(null);
    try {
      const { data } = await API.get("/admin/results");

      setResults(data);
    } catch (err) {
      setResultsError("Failed to fetch results.");
    } finally {
      setResultsLoading(false);
    }
  };

  useEffect(() => {
    if (nav === "results" && hasKey) fetchResults();
  }, [nav, hasKey]);

  // Fetch courses
  const fetchCourses = async () => {
    try {
      const { data } = await API.get("/admin/courses");
      setCourses(data);
    } catch (err) {
      console.error("Failed to fetch courses:", err);
    }
  };

  useEffect(() => {
    if (nav === "courses" && hasKey) fetchCourses();
  }, [nav, hasKey]);

  // Fetch users
  const fetchUsers = async () => {
    try {
      const { data } = await API.get("/admin/users");
      setUsers(data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  useEffect(() => {
    if (nav === "users" && hasKey) fetchUsers();
  }, [nav, hasKey]);

  // Delete a test
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this test?")) return;
    try {
      setDeletingId(id);
      await API.delete(`/admin/tests/${id}`);
      setTests((prev) => prev.filter((test) => test._id !== id));
      setSelectedTests((prev) => prev.filter(selectedId => selectedId !== id));
    } catch (err) {
      setError("Failed to delete test.");
    } finally {
      setDeletingId(null);
    }
  };

  // Bulk delete selected tests
  const handleBulkDelete = async () => {
    if (selectedTests.length === 0) return;
    if (!window.confirm(`Are you sure you want to delete ${selectedTests.length} tests?`)) return;
    try {
      for (const id of selectedTests) {
        await API.delete(`/admin/tests/${id}`);
      }
      setTests(prev => prev.filter(test => !selectedTests.includes(test._id)));
      setSelectedTests([]);
    } catch (err) {
      setError("Failed to delete selected tests.");
    }
  };

  const handleDeleteResult = async (id) => {
  if (!window.confirm("Are you sure you want to delete this result?")) return;
  try {
    setDeletingResultId(true);
    await API.delete("/admin/results/clear");
    setResults([]);
    // setResults(prev => prev.filter(res => res._id !== id));
    // setSelectedResults(prev => prev.filter(selectedId => selectedId !== id));
  } catch (err) {
    setResultsError("Failed to delete result.");
  } finally {
    setDeletingResultId(null);
  }
};

const handleBulkDeleteResults = async () => {
  if (selectedResults.length === 0) return;
  if (!window.confirm(`Are you sure you want to delete ${selectedResults.length} results?`)) return;
  try {
    // Ideally, you should send one API call for many deletions, but for now, loop
    for (const id of selectedResults) {
      await API.delete(`/admin/results/${id}`);
    }
    setResults(prev => prev.filter(res => !selectedResults.includes(res._id)));
    setSelectedResults([]);
  } catch (err) {
    setResultsError("Failed to bulk delete results.");
  }
};

// Delete a course
const handleDeleteCourse = async (id) => {
  if (!window.confirm("Are you sure you want to delete this course?")) return;
  try {
    setDeletingCourseId(id);
    await API.delete(`/admin/courses/${id}`);
    setCourses((prev) => prev.filter((course) => course._id !== id));
    setSelectedCourses((prev) => prev.filter(selectedId => selectedId !== id));
  } catch (err) {
    setError("Failed to delete course.");
  } finally {
    setDeletingCourseId(null);
  }
};

// Bulk delete selected courses
const handleBulkDeleteCourses = async () => {
  if (selectedCourses.length === 0) return;
  if (!window.confirm(`Are you sure you want to delete ${selectedCourses.length} courses?`)) return;
  try {
    for (const id of selectedCourses) {
      await API.delete(`/admin/courses/${id}`);
    }
    setCourses(prev => prev.filter(course => !selectedCourses.includes(course._id)));
    setSelectedCourses([]);
  } catch (err) {
    setError("Failed to delete selected courses.");
  }
};

// Delete a user
const handleDeleteUser = async (id) => {
  if (!window.confirm("Are you sure you want to delete this user?")) return;
  try {
    setDeletingUserId(id);
    await API.delete(`/admin/users/${id}`);
    setUsers((prev) => prev.filter((user) => user._id !== id));
    setSelectedUsers((prev) => prev.filter(selectedId => selectedId !== id));
  } catch (err) {
    setError("Failed to delete user.");
  } finally {
    setDeletingUserId(null);
  }
};

// Bulk delete selected users
const handleBulkDeleteUsers = async () => {
  if (selectedUsers.length === 0) return;
  if (!window.confirm(`Are you sure you want to delete ${selectedUsers.length} users?`)) return;
  try {
    for (const id of selectedUsers) {
      await API.delete(`/admin/users/${id}`);
    }
    setUsers(prev => prev.filter(user => !selectedUsers.includes(user._id)));
    setSelectedUsers([]);
  } catch (err) {
    setError("Failed to delete selected users.");
  }
};

// Create a new user
const handleCreateUser = async (e) => {
  e.preventDefault();
  try {
    await API.post("/admin/users", newUser);
    setNewUser({ name: '', email: '', password: '', role: 'student' });
    setShowCreateUserModal(false);
    fetchUsers(); // Refresh the users list
  } catch (err) {
    setError("Failed to create user.");
  }
};

// Update an existing user
const handleUpdateUser = async (e) => {
  e.preventDefault();
  try {
    await API.put(`/admin/users/${editingUser._id}`, {
      name: editingUser.name,
      email: editingUser.email,
      role: editingUser.role
    });
    setEditingUser({ _id: '', name: '', email: '', role: 'student' });
    setShowEditUserModal(false);
    fetchUsers(); // Refresh the users list
  } catch (err) {
    setError("Failed to update user.");
  }
};

// Open edit modal with user data
const openEditModal = (user) => {
  setEditingUser({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
  });
  setShowEditUserModal(true);
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

  // View course details
  const viewCourseDetails = async (id) => {
    try {
      const { data } = await API.get(`/courses/${id}`);
      setViewingCourse(data);
    } catch (err) {
      setError("Failed to fetch course details.");
    }
  };

  // Modal close
  const closeModal = () => {
    setViewingTest(null);
    setViewingCourse(null);
  };

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

  // Filter and sort tests
  const filteredTests = tests
    .filter(t =>
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedDifficulty ? t.difficulty === selectedDifficulty : true)
    )
    .sort((a, b) => {
      if (!sortKey) return 0;
      let aVal = a[sortKey] || "";
      let bVal = b[sortKey] || "";
      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  const filteredResults = results.filter(r =>
  (r.studentName || "").toLowerCase().includes(resultSearchTerm.toLowerCase()) ||
  (r.studentEmail || "").toLowerCase().includes(resultSearchTerm.toLowerCase()) ||
  (r.testId?.section || "").toLowerCase().includes(resultSearchTerm.toLowerCase()) ||
  (r.testId?.title || "").toLowerCase().includes(resultSearchTerm.toLowerCase())
    );

  const filteredCourses = courses.filter(c =>
    c.title.toLowerCase().includes(courseSearchTerm.toLowerCase())
  ).sort((a, b) => {
    if (!sortKey) return 0;
    let aVal = a[sortKey] || "";
    let bVal = b[sortKey] || "";
    if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
    if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(userSearchTerm.toLowerCase())
  );

    
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
          <div
            className={nav === "courses" ? "side-link active" : "side-link"}
            onClick={() => setNav("courses")}
          >
            Courses
          </div>
          <div
            className={nav === "results" ? "side-link active" : "side-link"}
            onClick={() => setNav("results")}
          >
            Results
          </div>
          <div
            className={nav === "users" ? "side-link active" : "side-link"}
            onClick={() => setNav("users")}
          >
            Users
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
        ) : nav === "tests" ? (
          <div className="tests-view">
            <h1>Test Management</h1>
            {error && <div className="error-message">{error}</div>}
            {/* Filters */}
            <div className="filters-row">
              <input
                type="text"
                placeholder="Search tests..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <select
                value={selectedDifficulty}
                onChange={e => setSelectedDifficulty(e.target.value)}
                className="filter-select"
              >
                <option value="">All Difficulties</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
              <select
                value={sortKey || ""}
                onChange={e => {
                  const key = e.target.value || null;
                  if (key === sortKey) {
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                  } else {
                    setSortKey(key);
                    setSortOrder("asc");
                  }
                }}
                className="sort-select"
              >
                <option value="">Sort By</option>
                <option value="title">Title</option>
                <option value="difficulty">Difficulty</option>
                <option value="section">Section</option>
              </select>
            </div>
            {/* Bulk Delete Button */}
            {selectedTests.length > 0 && (
              <button onClick={handleBulkDelete} className="delete-btn bulk-delete-btn">
                Delete Selected ({selectedTests.length})
              </button>
            )}
            {loading ? (
              <div className="loading-message">Loading tests...</div>
            ) : filteredTests.length === 0 ? (
              <p>No tests available.</p>
            ) : (
              <table className="test-table">
                <thead>
                  <tr>
                    <th>
                      <input
                        type="checkbox"
                        checked={selectedTests.length === filteredTests.length && filteredTests.length > 0}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedTests(filteredTests.map(t => t._id));
                          } else {
                            setSelectedTests([]);
                          }
                        }}
                      />
                    </th>
                    <th>Title</th>
                    <th>Section</th>
                    <th>Difficulty</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTests.map((test) => (
                    <tr key={test._id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedTests.includes(test._id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedTests([...selectedTests, test._id]);
                            } else {
                              setSelectedTests(selectedTests.filter(id => id !== test._id));
                            }
                          }}
                        />
                      </td>
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
                  <p><strong>Section:</strong> {viewingTest.section || "-"}</p>
                  <p><strong>Difficulty:</strong> {viewingTest.difficulty || "-"}</p>
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
                        <p><strong>Answer:</strong> {q.correctAnswer}</p>
                      </li>
                    ))}
                  </ol>
                  <button className="close-btn" onClick={closeModal}>Close</button>
                </div>
              </div>
            )}
          </div>
        ) : nav === "courses" ? (
          <div className="courses-view">
            <h1>Course Management</h1>
            {error && <div className="error-message">{error}</div>}
            {/* Filters */}
            <div className="filters-row">
              <input
                type="text"
                placeholder="Search courses..."
                value={courseSearchTerm}
                onChange={e => setCourseSearchTerm(e.target.value)}
                className="search-input"
              />
              <select
                value={sortKey || ""}
                onChange={e => {
                  const key = e.target.value || null;
                  if (key === sortKey) {
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                  } else {
                    setSortKey(key);
                    setSortOrder("asc");
                  }
                }}
                className="sort-select"
              >
                <option value="">Sort By</option>
                <option value="title">Title</option>
                <option value="description">Description</option>
              </select>
            </div>
            {/* Bulk Delete Button */}
            {selectedCourses.length > 0 && (
              <button onClick={handleBulkDeleteCourses} className="delete-btn bulk-delete-btn">
                Delete Selected ({selectedCourses.length})
              </button>
            )}
            {loading ? (
              <div className="loading-message">Loading courses...</div>
            ) : filteredCourses.length === 0 ? (
              <p>No courses available.</p>
            ) : (
              <div className="courses-grid">
                {filteredCourses.map((course) => (
                  <div key={course._id} className="course-card">
                    <div className="card-header">
                      <input
                        type="checkbox"
                        checked={selectedCourses.includes(course._id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedCourses([...selectedCourses, course._id]);
                          } else {
                            setSelectedCourses(selectedCourses.filter(id => id !== course._id));
                          }
                        }}
                        className="card-checkbox"
                      />
                      <BookOpen size={20} className="card-icon" />
                    </div>
                    <div className="card-content">
                      <h3 className="card-title">{course.title}</h3>
                      <p className="card-description">
                        {course.description ? course.description.substring(0, 100) + (course.description.length > 100 ? "..." : "") : "No description available."}
                      </p>
                    </div>
                    <div className="card-actions">
                      <button className="view-btn" onClick={() => viewCourseDetails(course._id)}>
                        <Eye size={16} /> View Details
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteCourse(course._id)}
                        disabled={deletingCourseId === course._id}
                      >
                        <Trash2 size={16} />
                        {deletingCourseId === course._id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {viewingCourse && (
              <div className="modal-overlay" onClick={closeModal}>
                <div className="modal-content course-modal" onClick={e => e.stopPropagation()}>
                  <h2><BookOpen size={24} style={{ marginRight: '10px' }} />{viewingCourse.title}</h2>
                  <div className="course-description">
                    <strong>Description:</strong> {viewingCourse.description || "No description available."}
                  </div>
                  <h3>Lessons ({viewingCourse.lessons?.length || 0})</h3>
                  {viewingCourse.lessons && viewingCourse.lessons.length > 0 ? (
                    <div className="lessons-list">
                      {viewingCourse.lessons.map((lesson, idx) => (
                        <div key={idx} className="lesson-item">
                          <div className="lesson-header">
                            <span className="lesson-number">{idx + 1}.</span>
                            <h4 className="lesson-title">{lesson.title}</h4>
                          </div>
                          <div className="lesson-content">
                            {lesson.content}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No lessons available for this course.</p>
                  )}
                  <button className="close-btn" onClick={closeModal}>Close</button>
                </div>
              </div>
            )}
          </div>
        ) : nav === "results" ? (
        <div className="results-view">
        <h1>Test Results</h1>
  <div className="filters-row">
    <input
      type="text"
      placeholder="Search results..."
      value={resultSearchTerm}
      onChange={e => setResultSearchTerm(e.target.value)}
      className="search-input"
    />
    {selectedResults.length > 0 && (
      <button className="delete-btn bulk-delete-btn" onClick={handleBulkDeleteResults}>
        Delete Selected ({selectedResults.length})
      </button>
    )}
  </div>
  {resultsError && <div className="error-message">{resultsError}</div>}
  {resultsLoading ? (
    <div>Loading results...</div>
  ) : filteredResults.length === 0 ? (
    <div>No results to display.</div>
  ) : (
    <table className="test-table">
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              checked={selectedResults.length === filteredResults.length && filteredResults.length > 0}
              onChange={e => {
                if (e.target.checked) {
                  setSelectedResults(filteredResults.map(r => r._id));
                } else {
                  setSelectedResults([]);
                }
              }}
            />
          </th>
          <th>Student Name</th>
          <th>Email</th>
          <th>Section</th>
          <th>Test Title</th>
          <th>Score</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredResults.map((result) => (
          <tr key={result._id}>
            <td>
              <input
                type="checkbox"
                checked={selectedResults.includes(result._id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedResults([...selectedResults, result._id]);
                  } else {
                    setSelectedResults(selectedResults.filter(id => id !== result._id));
                  }
                }}
              />
            </td>
            <td data-label="Student Name">{result.studentName}</td>
            <td data-label="Email">{result.studentEmail}</td>
            <td data-label="Section">{result.testId?.section || "N/A"}</td>
            <td data-label="Test Title">{result.testId?.title || "Unknown Test"}</td>
            <td data-label="Score">{result.score}/{result.totalQuestions}</td>
            <td data-label="Date">{new Date(result.timestamp).toLocaleDateString()}</td>
            {/* <td>
              <button
                className="delete-btn"
                onClick={() => handleDeleteResult(result._id)}
                disabled={deletingResultId === result._id}
              >
                {deletingResultId === result._id ? "Deleting..." : "Delete"}
              </button>
            </td> */}
          </tr>
        ))}
      </tbody>
    </table>
  )}
        </div>

        ) : nav === "users" ? (
          <div className="users-view">
            <h1>User Management</h1>
            {error && <div className="error-message">{error}</div>}
            {/* Filters */}
            <div className="filters-row">
              <input
                type="text"
                placeholder="Search users..."
                value={userSearchTerm}
                onChange={e => setUserSearchTerm(e.target.value)}
                className="search-input"
              />
              <button className="view-btn create-user-btn" onClick={() => setShowCreateUserModal(true)}>
                <UserPlus size={16} /> Create User
              </button>
            </div>
            {/* Bulk Delete Button */}
            {selectedUsers.length > 0 && (
              <button onClick={handleBulkDeleteUsers} className="delete-btn bulk-delete-btn">
                <Trash2 size={16} /> Delete Selected ({selectedUsers.length})
              </button>
            )}
            {loading ? (
              <div className="loading-message">Loading users...</div>
            ) : filteredUsers.length === 0 ? (
              <p>No users available.</p>
            ) : (
              <table className="test-table users-table">
                <thead>
                  <tr>
                    <th>
                      <input
                        type="checkbox"
                        checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedUsers(filteredUsers.map(u => u._id));
                          } else {
                            setSelectedUsers([]);
                          }
                        }}
                      />
                    </th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Created At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user._id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user._id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedUsers([...selectedUsers, user._id]);
                            } else {
                              setSelectedUsers(selectedUsers.filter(id => id !== user._id));
                            }
                          }}
                        />
                      </td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`role-badge ${user.role}`}>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                      </td>
                      <td>
                        <Calendar size={14} style={{ marginRight: '5px' }} />
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td>
                        <button
                          className="view-btn"
                          onClick={() => openEditModal(user)}
                          style={{ marginRight: '5px' }}
                        >
                          <Edit size={16} />
                          Edit
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => handleDeleteUser(user._id)}
                          disabled={deletingUserId === user._id}
                        >
                          <Trash2 size={16} />
                          {deletingUserId === user._id ? "Deleting..." : "Delete"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {showCreateUserModal && (
              <div className="modal-overlay" onClick={() => setShowCreateUserModal(false)}>
                <div className="modal-content user-modal" onClick={e => e.stopPropagation()}>
                  <h2><UserPlus size={20} style={{ marginRight: '10px' }} />Create New User</h2>
                  <form onSubmit={handleCreateUser} className="user-form">
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        placeholder="Enter full name"
                        value={newUser.name}
                        onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        placeholder="Enter email address"
                        value={newUser.email}
                        onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Password</label>
                      <input
                        type="password"
                        placeholder="Enter password"
                        value={newUser.password}
                        onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Role</label>
                      <select
                        value={newUser.role}
                        onChange={e => setNewUser({ ...newUser, role: e.target.value })}
                      >
                        <option value="student">Student</option>
                        <option value="faculty">Faculty</option>
                      </select>
                    </div>
                    <div className="form-actions">
                      <button type="submit" className="view-btn">
                        <UserPlus size={16} /> Create User
                      </button>
                      <button type="button" className="close-btn" onClick={() => setShowCreateUserModal(false)}>
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            {showEditUserModal && (
              <div className="modal-overlay" onClick={() => setShowEditUserModal(false)}>
                <div className="modal-content user-modal" onClick={e => e.stopPropagation()}>
                  <h2><Edit size={20} style={{ marginRight: '10px' }} />Edit User</h2>
                  <form onSubmit={handleUpdateUser} className="user-form">
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        placeholder="Enter full name"
                        value={editingUser.name}
                        onChange={e => setEditingUser({ ...editingUser, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        placeholder="Enter email address"
                        value={editingUser.email}
                        onChange={e => setEditingUser({ ...editingUser, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Role</label>
                      <select
                        value={editingUser.role}
                        onChange={e => setEditingUser({ ...editingUser, role: e.target.value })}
                      >
                        <option value="student">Student</option>
                        <option value="faculty">Faculty</option>
                      </select>
                    </div>
                    <div className="form-actions">
                      <button type="submit" className="view-btn">
                        <Edit size={16} /> Update User
                      </button>
                      <button type="button" className="close-btn" onClick={() => setShowEditUserModal(false)}>
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        ) : null}
      </main>
    </div>
  );
};

export default AdminPanel;