import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, pending, reviewed
    const [searchTerm, setSearchTerm] = useState('');

    // Check if user is admin
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        if (user.is_admin !== 1) {
            alert("⚠️ Access Denied: Admin privileges required!");
            navigate('/dashboard');
        }
    }, [navigate]);

    useEffect(() => {
        fetchComplaints();
    }, []);

    const fetchComplaints = async () => {
        try {
            setLoading(true);
            const response = await API.get('/api/complaints/admin/all');
            setComplaints(response.data.complaints);
        } catch (error) {
            console.error('Error fetching complaints:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (complaintId, newStatus) => {
        try {
            await API.patch(`/api/complaints/admin/${complaintId}/status`, {
                status: newStatus
            });
            // Refresh complaints after update
            fetchComplaints();
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const filteredComplaints = complaints.filter(complaint => {
        const matchesFilter = filter === 'all' || complaint.status.toLowerCase() === filter;
        const matchesSearch =
            complaint.victim_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            complaint.complaint_title.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const stats = {
        total: complaints.length,
        pending: complaints.filter(c => c.status === 'Pending').length,
        reviewed: complaints.filter(c => c.status === 'Reviewed').length
    };

    return (
        <div className="min-h-screen aurora-bg py-8 px-4 text-white">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl font-bold text-white mb-2">
                        🛡️ Admin Dashboard
                    </h1>
                    <p className="text-white/80">Manage and review all complaints</p>
                </motion.div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 shadow-xl"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-blue-100 text-sm font-medium">Total Complaints</p>
                                <p className="text-4xl font-bold text-white mt-2">{stats.total}</p>
                            </div>
                            <div className="bg-white/20 p-4 rounded-xl">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 shadow-xl"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-orange-100 text-sm font-medium">Pending Review</p>
                                <p className="text-4xl font-bold text-white mt-2">{stats.pending}</p>
                            </div>
                            <div className="bg-white/20 p-4 rounded-xl">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 shadow-xl"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-green-100 text-sm font-medium">Reviewed</p>
                                <p className="text-4xl font-bold text-white mt-2">{stats.reviewed}</p>
                            </div>
                            <div className="bg-white/20 p-4 rounded-xl">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Filters and Search */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 shadow-xl"
                >
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search by victim name or title..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 pl-12 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-500"
                                />
                                <svg className="w-5 h-5 text-white/50 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>

                        {/* Filter Buttons */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => setFilter('all')}
                                className={`px-6 py-3 rounded-xl font-medium transition-all ${filter === 'all'
                                    ? 'bg-red-600 text-white shadow-lg'
                                    : 'bg-black/40 text-white/70 hover:bg-black/60 border border-red-500/30'
                                    }`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => setFilter('pending')}
                                className={`px-6 py-3 rounded-xl font-medium transition-all ${filter === 'pending'
                                    ? 'bg-amber-500 text-white shadow-lg'
                                    : 'bg-white/10 text-purple-200 hover:bg-white/20'
                                    }`}
                            >
                                Pending
                            </button>
                            <button
                                onClick={() => setFilter('reviewed')}
                                className={`px-6 py-3 rounded-xl font-medium transition-all ${filter === 'reviewed'
                                    ? 'bg-green-500 text-white shadow-lg'
                                    : 'bg-white/10 text-purple-200 hover:bg-white/20'
                                    }`}
                            >
                                Reviewed
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Complaints List */}
                <div className="space-y-4">
                    {loading ? (
                        <div className="text-center py-12">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
                            <p className="text-white/80 mt-4">Loading complaints...</p>
                        </div>
                    ) : filteredComplaints.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 text-center"
                        >
                            <svg className="w-16 h-16 text-purple-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                            <p className="text-xl text-white/80">No complaints found</p>
                            <p className="text-white/70 mt-2">Try adjusting your filters or search terms</p>
                        </motion.div>
                    ) : (
                        filteredComplaints.map((complaint, index) => (
                            <motion.div
                                key={complaint.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-black/40 backdrop-blur-lg rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all border border-red-500/20 hover:border-red-500/50"
                            >
                                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                                    {/* Main Content */}
                                    <div className="flex-1">
                                        <div className="flex items-start gap-4">
                                            {/* ID Badge */}
                                            <div className="bg-red-900/50 text-red-200 border border-red-500/30 px-3 py-1 rounded-lg text-sm font-mono">
                                                #{complaint.id}
                                            </div>

                                            <div className="flex-1">
                                                {/* Title */}
                                                <h3 className="text-xl font-bold text-white mb-2">
                                                    {complaint.complaint_title}
                                                </h3>

                                                {/* Meta Info */}
                                                <div className="flex flex-wrap gap-4 mb-3">
                                                    <div className="flex items-center gap-2 text-white/80">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                        </svg>
                                                        <span className="text-sm">Victim: <span className="font-medium">{complaint.victim_name}</span></span>
                                                    </div>

                                                    {complaint.culprit_name && (
                                                        <div className="flex items-center gap-2 text-red-300">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                                            </svg>
                                                            <span className="text-sm">Culprit: <span className="font-medium">{complaint.culprit_name}</span></span>
                                                        </div>
                                                    )}

                                                    <div className="flex items-center gap-2 text-white/80">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                        <span className="text-sm">{formatDate(complaint.created_at)}</span>
                                                    </div>
                                                </div>

                                                {/* Description */}
                                                <p className="text-white/80 text-sm leading-relaxed">
                                                    {complaint.incident_description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Status & Actions */}
                                    <div className="flex flex-col items-end gap-3">
                                        {/* Status Badge */}
                                        <span className={`px-4 py-2 rounded-full text-sm font-semibold ${complaint.status === 'Pending'
                                            ? 'bg-amber-500/20 text-amber-200 border border-amber-400/30'
                                            : 'bg-green-500/20 text-green-200 border border-green-400/30'
                                            }`}>
                                            {complaint.status === 'Pending' ? '⏳ Pending' : '✅ Reviewed'}
                                        </span>

                                        {/* Action Button */}
                                        {complaint.status === 'Pending' ? (
                                            <button
                                                onClick={() => updateStatus(complaint.id, 'Reviewed')}
                                                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-2 rounded-xl font-medium transition-all shadow-lg hover:shadow-xl"
                                            >
                                                Mark as Reviewed
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => updateStatus(complaint.id, 'Pending')}
                                                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-6 py-2 rounded-xl font-medium transition-all shadow-lg hover:shadow-xl"
                                            >
                                                Mark as Pending
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
