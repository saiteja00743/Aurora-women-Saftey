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
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 aurora-bg text-white">
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        {/* Header */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="text-center mb-10"
        >
          <h1 className="text-4xl sm:text-5xl font-black mb-4 tracking-tighter uppercase text-center">
            Track Status
          </h1>
          <p className="text-white/60 font-medium text-center">
            Enter your secure Tracking ID to check your complaint status.
          </p>
        </motion.div>

        {/* Search Card */}
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           className="w-full bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl p-8 sm:p-12 mb-8"
        >
          <form onSubmit={handleTrack} className="flex flex-col gap-6">
            <div>
               <label className="block mb-4 text-xs font-black uppercase tracking-widest text-red-500 text-center">
                 Tracking ID
               </label>
               <input
                 type="text"
                 value={trackingId}
                 onChange={(e) => setTrackingId(e.target.value)}
                 placeholder="#0000"
                 className="w-full px-6 py-5 rounded-2xl border border-white/5 bg-white/5 text-white placeholder-white/20 focus:ring-2 focus:ring-red-600 outline-none transition-all text-center text-2xl font-black tracking-widest"
               />
            </div>
            
            <button
               type="submit"
               disabled={loading}
               className="w-full py-5 bg-gradient-to-r from-red-600 to-red-800 text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-red-600/20 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {loading ? "Checking..." : "Check Status"}
            </button>
            
            {error && (
               <motion.div
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 className="text-center text-red-400 text-sm font-bold bg-red-500/10 py-3 rounded-xl border border-red-500/20"
               >
                 {error}
               </motion.div>
            )}
          </form>

          {/* Results Area */}
          <AnimatePresence>
            {complaintStatus && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-10 pt-10 border-t border-white/5 flex flex-col gap-4"
              >
                 <div className="flex justify-between items-center bg-white/5 p-5 rounded-2xl border border-white/5">
                   <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Status</span>
                   <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${
                     complaintStatus.status === 'Pending' 
                       ? 'bg-amber-500/20 text-amber-500 border border-amber-500/10' 
                       : 'bg-green-500/20 text-green-500 border border-green-500/10'
                   }`}>
                     {complaintStatus.status}
                   </span>
                 </div>

                 <div className="flex justify-between items-center bg-white/5 p-5 rounded-2xl border border-white/5">
                   <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Submitted</span>
                   <span className="text-sm font-bold">{formatDate(complaintStatus.created_at)}</span>
                 </div>

                 <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40 block mb-2">Subject</span>
                    <p className="text-base font-bold">{complaintStatus.complaint_title}</p>
                 </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.button
          onClick={() => navigate("/dashboard")}
          className="mt-8 text-white/40 hover:text-white font-black text-xs uppercase tracking-[0.2em] transition-colors"
        >
          ← Back to Dashboard
        </motion.button>
      </div>
    </div>
  );
}
