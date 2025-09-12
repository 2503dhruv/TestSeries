import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Homepage from './pages/Homepage';
import AuthPage from './pages/AuthPage';
import StudentPortal from './pages/StudentPortal';
import TeacherDashboard from './pages/TeacherDashboard';

function App() {
  return (
    <Routes>
      {/* Routes that use the main layout with the navbar */}
      <Route element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path="student-portal" element={<StudentPortal />} />
        <Route path="teacher-dashboard" element={<TeacherDashboard />} />
      </Route>
      
      {/* Route for the combined login/signup page (it does not have the main navbar) */}
      <Route path="auth" element={<AuthPage />} />
    </Routes>
  );
}

export default App;

