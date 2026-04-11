import React, { useEffect, useState } from 'react';
import { Trash2, Search, Download } from 'lucide-react';

const Admin = () => {
    const [submissions, setSubmissions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const stored = localStorage.getItem('consultationSubmissions');
        if (stored) {
            setSubmissions(JSON.parse(stored).reverse());
        }
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this submission?')) {
            const updated = submissions.filter(sub => sub.id !== id);
            setSubmissions(updated);
            localStorage.setItem('consultationSubmissions', JSON.stringify(updated));
        }
    };

    const filteredSubmissions = submissions.filter(sub => 
        sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.mobile.includes(searchTerm) ||
        sub.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-dark">Admin Dashboard</h1>
                        <p className="text-gray-500">Manage consultation requests</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input 
                                type="text" 
                                placeholder="Search..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 w-64"
                            />
                        </div>
                        <button className="bg-white border border-gray-200 text-dark px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50">
                            <Download size={18} /> Export
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Date</th>
                                    <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Name</th>
                                    <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Contact</th>
                                    <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Details</th>
                                    <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Interests</th>
                                    <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredSubmissions.length > 0 ? (
                                    filteredSubmissions.map((sub) => (
                                        <tr key={sub.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{sub.date}</td>
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-dark">{sub.name}</div>
                                                <div className="text-xs text-gray-400">{sub.gender}, {sub.age}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-600">{sub.mobile}</div>
                                                <div className="text-xs text-gray-400">{sub.email}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-600 max-w-xs truncate" title={sub.notes}>
                                                    {sub.notes || '-'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-wrap gap-1">
                                                    {sub.services.map((s, i) => (
                                                        <span key={i} className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded-full">{s}</span>
                                                    ))}
                                                    {sub.challenges.map((c, i) => (
                                                        <span key={i} className="px-2 py-0.5 bg-red-50 text-red-600 text-xs rounded-full">{c}</span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button 
                                                    onClick={() => handleDelete(sub.id)}
                                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center text-gray-400">
                                            No submissions found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
