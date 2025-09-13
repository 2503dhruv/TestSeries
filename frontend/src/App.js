import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentPortal from './components/StudentPortal';
import TestTaker from './components/TestTaker';
import TeacherDashboard from './components/TeacherDashboard';
import Navbar from './components/Navbar/Navbar'; 
import AdminPanel from './components/AdminPortal.jsx';
import HomeDashboard from './components/Home.jsx';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <Router>
            
            <Navbar />

            <Routes>
                <Route path="/" element={<HomeDashboard />} />
                <Route path="/Student" element={<StudentPortal />} />
                <Route path="/test/:id" element={<TestTaker />} />
                <Route path="/teacher" element={<TeacherDashboard />} />
                <Route path="/admin" element={<AdminPanel />} />
            </Routes>

            <ToastContainer position="top-right" autoClose={3000} />
        </Router>
    );
}

export default App;