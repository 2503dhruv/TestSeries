import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const LogoIcon = () => (
    <div className="p-3 bg-white rounded-full shadow-md">
        <svg className="h-10 w-10 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
    </div>
);

const InputIcon = ({ children }) => <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{children}</div>;
const UserIcon = () => <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const MailIcon = () => <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const LockIcon = () => <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>;

export default function AuthPage() {
    const [isLoginView, setIsLoginView] = React.useState(true);
    const [role, setRole] = React.useState('student');
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
        <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-800 flex flex-col justify-center items-center p-4 font-sans">
            <div className="text-center mb-8">
                <div className="inline-block mb-4">
                    <LogoIcon />
                </div>
                <h1 className="text-4xl font-bold text-white">Assessify</h1>
                <p className="text-purple-200 text-lg mt-1">{isLoginView ? "Welcome back!" : "Join us today!"}</p>
            </div>

            <div className="w-full max-w-sm">
                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    {/* Toggle Buttons */}
                    <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
                        <button
                            onClick={() => setIsLoginView(true)}
                            className={`w-1/2 py-2 rounded-md text-sm font-semibold transition-all duration-300 ${isLoginView ? 'bg-white shadow text-purple-600' : 'text-gray-500'}`}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => setIsLoginView(false)}
                            className={`w-1/2 py-2 rounded-md text-sm font-semibold transition-all duration-300 ${!isLoginView ? 'bg-white shadow text-purple-600' : 'text-gray-500'}`}
                        >
                            Sign Up
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                             <label htmlFor="role" className="sr-only">Role</label>
                             <select id="role" value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white">
                                <option value="student">I am a Student</option>
                                <option value="teacher">I am a Faculty</option>
                            </select>
                        </div>

                        {!isLoginView && (
                            <div className="relative">
                                <InputIcon><UserIcon /></InputIcon>
                                <input type="text" placeholder="Full Name" required className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
                            </div>
                        )}
                        <div className="relative">
                            <InputIcon><MailIcon /></InputIcon>
                            <input type="email" placeholder="Email Address" required className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
                        </div>
                        <div className="relative">
                            <InputIcon><LockIcon /></InputIcon>
                            <input type="password" placeholder="Password" required className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
                        </div>
                         {!isLoginView && (
                            <div className="relative">
                                <InputIcon><LockIcon /></InputIcon>
                                <input type="password" placeholder="Confirm Password" required className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
                            </div>
                        )}
                        
                        <div className="pt-2">
                             <button type="submit" className="w-full py-3 text-lg font-bold text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                                {isLoginView ? 'Sign In' : 'Create Account'}
                            </button>
                        </div>
                    </form>
                </div>
                <Link to="/" className="block text-center mt-6 text-purple-200 hover:text-white hover:underline">
                    Back to Homepage
                </Link>
            </div>
        </div>
    );
}

