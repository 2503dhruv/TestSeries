import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeDashboard from './components/Home.jsx';
import StudentPortal from './components/StudentPortal';
import TestTaker from './components/TestTaker';
import TeacherDashboard from './components/TeacherDashboard';
import AdminPanel from './components/AdminPortal.jsx';
import PublicLayout from './components/layouts/PublicLayout';
import AdminLayout from './components/layouts/adminlayout.js';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <Router>
            <Routes>
                
                <Route element={<PublicLayout />}>
                    <Route path="/" element={<HomeDashboard />} />
                    <Route path="/Student" element={<StudentPortal />} />
                    <Route path="/test/:id" element={<TestTaker />} />
                    <Route path="/teacher" element={<TeacherDashboard />} />
                </Route>

                
                <Route element={<AdminLayout />}>
                    <Route path="/admin" element={<AdminPanel />} />
                </Route>
            </Routes>

            <ToastContainer position="top-right" autoClose={3000} />
        </Router>
    );
}

export default App;
