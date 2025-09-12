import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const LogoIcon = () => (
    <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

export default function Layout() {
    const getNavLinkClass = ({ isActive }) =>
        `text-white hover:text-purple-200 font-medium transition-colors duration-200 ${isActive ? 'pb-1 border-b-2 border-purple-300' : ''}`;

    return (
        <div className="min-h-screen bg-gray-100 font-sans">
            <header className="bg-gradient-to-r from-purple-600 to-indigo-700 shadow-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <NavLink to="/" className="flex items-center space-x-3">
                            <LogoIcon />
                            <span className="text-2xl font-bold text-white">Assessify</span>
                        </NavLink>
                        <nav className="flex items-center space-x-6">
                            <NavLink to="/student-portal" className={getNavLinkClass}>Student Portal</NavLink>
                            <NavLink to="/teacher-dashboard" className={getNavLinkClass}>Faculty Portal</NavLink>
                            <NavLink to="/auth" className="px-4 py-2 text-sm font-medium text-purple-600 bg-white rounded-md hover:bg-gray-100 transition-colors">Login / Sign Up</NavLink>
                        </nav>
                    </div>
                </div>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
}

