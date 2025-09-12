import React from 'react';

const mockResults = [
    { id: 1, studentName: 'Dhruv Sharma', testTitle: 'React Hooks Quiz', score: '13/15', date: '2025-09-12' },
    { id: 2, studentName: 'Rakshita Garg', testTitle: 'React Hooks Quiz', score: '15/15', date: '2025-09-12' },
    { id: 3, studentName: 'Test User', testTitle: 'Advanced CSS', score: '18/20', date: '2025-09-11' },
];

const UploadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>;

export default function TeacherDashboard() {
    return (
        <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-gray-900">Faculty Dashboard</h1>
                <p className="mt-1 text-lg text-gray-600">Manage tests and view student results.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Upload New Test Section */}
                <div className="lg:col-span-1 bg-white p-8 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-800 border-b pb-4 mb-6">Create New Test</h2>
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="testTitle" className="block text-sm font-medium text-gray-700">Test Title</label>
                            <input type="text" id="testTitle" placeholder="e.g., React Hooks Quiz" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" />
                        </div>
                        <div>
                            <label htmlFor="csvFile" className="block text-sm font-medium text-gray-700">Upload Questions (CSV)</label>
                            <input type="file" id="csvFile" accept=".csv" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100" />
                        </div>
                        <div className="pt-2">
                            <button type="submit" className="w-full flex items-center justify-center px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors">
                                <UploadIcon/>
                                Create Test
                            </button>
                        </div>
                    </form>
                </div>

                {/* Test Results Section */}
                <div className="lg:col-span-2">
                     <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Student Results</h2>
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test Title</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {mockResults.map((result) => (
                                        <tr key={result.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{result.studentName}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.testTitle}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-800">{result.score}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}