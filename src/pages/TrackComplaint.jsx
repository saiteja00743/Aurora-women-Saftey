import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function TrackComplaint() {
  const navigate = useNavigate();
  const [trackingId, setTrackingId] = useState("");
  const [complaintStatus, setComplaintStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!trackingId.trim()) {
      setError("Please enter a valid Tracking ID.");
      return;
    }

    setLoading(true);
    setError("");
    setComplaintStatus(null);

    try {
      // Remove any # prefix if the user typed it
      const cleanId = trackingId.replace(/^#/, "").trim();
      const response = await API.get(`/api/complaints/track/${cleanId}`);
      setComplaintStatus(response.data);
    } catch (err) {
      console.error("Tracking Error:", err);
      if (err.response && err.response.status === 404) {
        setError("Invalid Tracking ID. Please check the ID and try again.");
      } else {
        setError("Failed to fetch complaint status. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen flex flex-col justify-center items-center text-center px-6 aurora-bg text-white"
    >
      <motion.h1
        className="text-4xl font-bold text-white mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Track Your Complaint
      </motion.h1>

      <motion.p
        className="text-white/80 mb-8 max-w-md text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Enter your secure Tracking ID below to check the real-time status of your complaint safely and privately.
      </motion.p>

      <form
        onSubmit={handleTrack}
        className="bg-black/50 backdrop-blur-lg border border-red-500/30 rounded-3xl shadow-2xl p-8 w-full max-w-md text-left"
      >
        <label className="block mb-2 text-red-400 font-medium">Tracking ID:</label>
        <input
          type="text"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          placeholder="e.g. 12 or #12"
          className="w-full mb-4 px-4 py-3 rounded-xl border border-red-500/30 bg-black/40 text-white placeholder-white/40 focus:ring-2 focus:ring-red-500 outline-none text-center tracking-widest text-lg font-mono"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 mt-2 bg-gradient-to-r from-red-700 to-red-900 text-white font-medium rounded-xl hover:from-red-600 hover:to-red-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Tracking..." : "Check Status"}
        </button>

        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-4 text-center text-red-400 bg-red-900/20 p-3 rounded-xl border border-red-500/30 text-sm"
          >
            {error}
          </motion.div>
        )}

        <AnimatePresence>
          {complaintStatus && (
            <motion.div
              initial={{ opacity: 0, y: 10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 pt-6 border-t border-red-500/30"
            >
              <h3 className="text-xl font-bold text-center mb-4">Complaint Status</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-black/40 p-3 rounded-lg border border-white/10">
                  <span className="text-white/60">Complaint ID</span>
                  <span className="font-mono text-lg font-bold">#{complaintStatus.id}</span>
                </div>
                
                <div className="flex justify-between items-center bg-black/40 p-3 rounded-lg border border-white/10">
                  <span className="text-white/60">Current Status</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                    complaintStatus.status === 'Pending' 
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                      : 'bg-green-500/20 text-green-400 border border-green-500/30'
                  }`}>
                    {complaintStatus.status === 'Pending' ? '⏳ Pending Review' : '✅ Reviewed by Authorities'}
                  </span>
                </div>

                <div className="flex justify-between items-center bg-black/40 p-3 rounded-lg border border-white/10">
                  <span className="text-white/60">Submitted On</span>
                  <span className="text-sm font-medium">{formatDate(complaintStatus.created_at)}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>

      <motion.button
        onClick={() => navigate("/dashboard")}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.2 }}
        className="mt-8 text-red-400 font-medium underline text-sm hover:text-red-300"
      >
        ← Back to Dashboard
      </motion.button>
    </motion.div>
  );
}
