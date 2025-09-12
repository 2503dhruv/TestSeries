import React from 'react';

const mockTests = [
    { id: 1, title: 'Introduction to React Hooks', subject: 'React', questions: 15, duration: '25 mins' },
    { id: 2, title: 'Advanced CSS Concepts', subject: 'CSS', questions: 20, duration: '30 mins' },
    { id: 3, title: 'JavaScript Algorithms Quiz', subject: 'JavaScript', questions: 10, duration: '20 mins' },
    { id: 4, title: 'Python for Data Science', subject: 'Python', questions: 25, duration: '45 mins' },
];

const StatCard = ({ title, value, icon }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg flex items-center space-x-4">
        <div className="p-3 bg-purple-100 rounded-full">
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
    </div>
);

const CheckCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const ClipboardListIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>;
const ChartPieIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>;


export default function StudentPortal() {
    return (
        <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-gray-900">Welcome, Student!</h1>
                <p className="mt-1 text-lg text-gray-600">Here's your dashboard for today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <StatCard title="Tests Completed" value="1" icon={<CheckCircleIcon />} />
                <StatCard title="Tests Pending" value="3" icon={<ClipboardListIcon />} />
                <StatCard title="Average Score" value="90%" icon={<ChartPieIcon />} />
            </div>

            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Tests</h2>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <ul className="divide-y divide-gray-200">
                        {mockTests.map((test) => (
                            <li key={test.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                <div className="flex items-center space-x-4">
                                    <div className={`p-3 rounded-lg bg-purple-100 text-purple-700 font-bold`}>{test.subject.substring(0,3)}</div>
                                    <div>
                                        <p className="text-lg font-semibold text-gray-900">{test.title}</p>
                                        <p className="text-sm text-gray-500">{test.questions} Questions • {test.duration}</p>
                                    </div>
                                </div>
                                <button className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-transform transform hover:scale-105">
                                    Start Test
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}