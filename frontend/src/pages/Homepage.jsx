import React from 'react';
import { Link } from 'react-router-dom';

const FeatureCard = ({ icon, title, children }) => (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{children}</p>
    </div>
);

const DocumentIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const UploadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>;
const ChartBarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;

export default function Homepage() {
    return (
        <>
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-purple-600 to-indigo-700 text-white text-center py-20 md:py-32">
                 <div className="absolute inset-0 bg-black opacity-20"></div>
                 <div className="relative z-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Streamline Learning. Amplify Results.</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-purple-200">
                        Assessify is the all-in-one platform for educators and students. Manage assignments, create tests, and track progress with ease.
                    </p>
                    <div className="mt-8 flex justify-center gap-4">
                        <Link to="/auth" className="px-8 py-3 bg-white text-purple-600 font-semibold rounded-md shadow-md hover:bg-gray-100 transition-transform transform hover:scale-105">
                            Get Started
                        </Link>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-16 bg-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900">A Unified Platform for Modern Education</h2>
                        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
                            Everything you need, all in one place.
                        </p>
                    </div>
                    <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <FeatureCard title="Effortless Assignment Management" icon={<DocumentIcon />}>
                            Faculty can create and distribute assignments, while students can submit and track them seamlessly.
                        </FeatureCard>
                        <FeatureCard title="Bulk Test Creation" icon={<UploadIcon />}>
                            Save hours of work. Faculty can upload hundreds of questions at once using a simple CSV file.
                        </FeatureCard>
                        <FeatureCard title="Performance Analytics" icon={<ChartBarIcon />}>
                            Personalized dashboards provide deep insights into student and class performance with visual charts.
                        </FeatureCard>
                    </div>
                </div>
            </div>
        </>
    );
}

