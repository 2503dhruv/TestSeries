import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import StudentPortal from './components/StudentPortal';
import TestTaker from './components/TestTaker';
import TeacherDashboard from './components/TeacherDashboard';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <Router>
            <nav style={{ marginBottom: "20px" }}>
                <Link to="/" style={{ marginRight: "15px" }}>Student Portal</Link>
                <Link to="/teacher">Teacher Dashboard</Link>
            </nav>

            <Routes>
                <Route path="/" element={<StudentPortal />} />
                <Route path="/test/:id" element={<TestTaker />} />
                <Route path="/teacher" element={<TeacherDashboard />} />
            </Routes>

            
            <ToastContainer position="top-right" autoClose={3000} />
        </Router>
    );
}

export default App;
