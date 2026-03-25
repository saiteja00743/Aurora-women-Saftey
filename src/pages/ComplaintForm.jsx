import { useState } from "react";
import { motion } from "framer-motion";
import API from "../services/api";
import { useNavigate } from "react-router-dom";


export default function ComplaintForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    victim_name: "",
    complaint_title: "",
    culprit_name: "",
    incident_description: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("⏳ Submitting complaint...");

    try {
      // 🔹 1. Save complaint to your backend
      const res = await API.post("/api/complaints/create", form);

      // 🔹 2. Send email notification via Web3Forms
      const formData = new FormData();
      formData.append("access_key", "8733db19-6f85-4906-b92b-1629fabb701a");
      formData.append("subject", `🚨 New Complaint: ${form.complaint_title}`);
      formData.append("from_name", "Aurora Complaint System");
      formData.append("email", "gajavellisaiteja123@gmail.com");

      // Add complaint details in a formatted way
      const emailBody = `
📋 COMPLAINT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 Victim Name: ${form.victim_name}
📌 Complaint Title: ${form.complaint_title}
⚠️ Culprit Name: ${form.culprit_name || "Not specified"}

📝 Incident Description:
${form.incident_description}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Submitted via Aurora - A Strong Voice Platform
    `;

      formData.append("message", emailBody);

      const emailResponse = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const emailResult = await emailResponse.json();

      if (!emailResult.success) {
        console.error("Email sending failed:", emailResult);
        setMessage("⚠️ Complaint saved but email notification failed. Please contact support.");
        return;
      }

      // 🔹 UI success
      setMessage(`✅ Complaint submitted successfully! Your Tracking ID is: #${res.data.complaint_id}. Email notification sent.`);

      // Reset form
      setForm({
        victim_name: "",
        complaint_title: "",
        culprit_name: "",
        incident_description: "",
      });

    } catch (error) {
      console.error("Submission error:", error);
      setMessage("❌ " + (error.response?.data?.detail || "Submission failed. Please try again."));
    }
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen flex flex-col justify-center items-center text-center px-6 aurora-bg text-white"
    >
      <motion.h1
        className="text-4xl font-bold text-white mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        File a Complaint
      </motion.h1>

      <form
        onSubmit={handleSubmit}
        className="bg-black/50 backdrop-blur-lg border border-red-500/30 rounded-3xl shadow-2xl p-8 w-full max-w-lg text-left"
      >
        <label className="block mb-2 text-red-400 font-medium">
          Victim Name:
        </label>
        <input
          type="text"
          name="victim_name"
          value={form.victim_name}
          onChange={handleChange}
          required
          className="w-full mb-4 px-4 py-2 rounded-xl border border-red-500/30 bg-black/40 text-white placeholder-white/50 focus:ring-2 focus:ring-red-500 outline-none"
        />

        <label className="block mb-2 text-red-400 font-medium">
          Complaint Title:
        </label>
        <input
          type="text"
          name="complaint_title"
          value={form.complaint_title}
          onChange={handleChange}
          required
          className="w-full mb-4 px-4 py-2 rounded-xl border border-red-500/30 bg-black/40 text-white placeholder-white/50 focus:ring-2 focus:ring-red-500 outline-none"
        />

        <label className="block mb-2 text-red-400 font-medium">
          Culprit Name (if known):
        </label>
        <input
          type="text"
          name="culprit_name"
          value={form.culprit_name}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 rounded-xl border border-red-500/30 bg-black/40 text-white placeholder-white/50 focus:ring-2 focus:ring-red-500 outline-none"
        />

        <label className="block mb-2 text-red-400 font-medium">
          Incident Description:
        </label>
        <textarea
          name="incident_description"
          value={form.incident_description}
          onChange={handleChange}
          rows="5"
          required
          className="w-full mb-4 px-4 py-2 rounded-xl border border-red-500/30 bg-black/40 text-white placeholder-white/50 focus:ring-2 focus:ring-red-500 outline-none"
        ></textarea>

        <button
          type="submit"
          className="w-full py-2 mt-2 bg-gradient-to-r from-red-700 to-red-900 text-white font-medium rounded-xl hover:from-red-600 hover:to-red-800 transition"
        >
          Submit Complaint
        </button>

        {message && (
          <p
            className={`mt-4 text-sm ${message.includes("✅") ? "text-green-600" : "text-red-500"
              }`}
          >
            {message}
          </p>
        )}
      </form>

      {/* ⭐ FIXED BACK BUTTON */}
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
