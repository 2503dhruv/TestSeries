import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LogoIcon = () => (
    <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (role === 'student') {
            navigate('/student-portal');
        } else {
            navigate('/teacher-dashboard');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700 p-4">
            <div className="w-full max-w-md">
                <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20">
                    <div className="flex justify-center mb-6">
                        <div className="bg-white/20 p-3 rounded-full">
                           <LogoIcon />
                        </div>
                    </div>
                    <h2 className="text-center text-3xl font-extrabold text-white mb-2">
                        Welcome Back!
                    </h2>
                    <p className="text-center text-purple-200 mb-8">Login to continue to your portal.</p>
                    
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="relative">
                             <select
                                id="role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full bg-white/20 text-white placeholder-purple-200 px-4 py-3 rounded-md border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all"
                            >
                                <option value="student" className="text-black">I am a Student</option>
                                <option value="teacher" className="text-black">I am a Teacher</option>
                            </select>
                        </div>
                        <div className="relative">
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white/20 text-white placeholder-purple-200 px-4 py-3 rounded-md border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all"
                                placeholder="Email address"
                            />
                        </div>
                        <div className="relative">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/20 text-white placeholder-purple-200 px-4 py-3 rounded-md border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all"
                                placeholder="Password"
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent text-lg font-bold rounded-md text-purple-700 bg-white hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-300 transition-transform transform hover:scale-105"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                    <p className="text-center text-sm text-purple-200 mt-8">
                        Don't have an account?{' '}
                        <Link to="/signup" className="font-medium text-white hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

