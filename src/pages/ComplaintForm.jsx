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
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 aurora-bg text-white">
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="text-center mb-10"
        >
          <h1 className="text-4xl sm:text-5xl font-black mb-4 tracking-tighter uppercase">
            File Complaint
          </h1>
          <p className="text-white/60 font-medium">
            Your safety is our priority. All information is encrypted and handled with utmost confidentiality.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          onSubmit={handleSubmit}
          className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl p-8 sm:p-12 w-full text-left"
        >
          <div className="space-y-6">
            <div>
              <label className="block mb-2 text-xs font-black uppercase tracking-widest text-red-500">
                Victim Name:
              </label>
              <input
                type="text"
                name="victim_name"
                value={form.victim_name}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 rounded-2xl border border-white/5 bg-white/5 text-white placeholder-white/20 focus:ring-2 focus:ring-red-600 outline-none transition-all"
                placeholder="Full Name"
              />
            </div>

            <div>
              <label className="block mb-2 text-xs font-black uppercase tracking-widest text-red-500">
                Complaint Title:
              </label>
              <input
                type="text"
                name="complaint_title"
                value={form.complaint_title}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 rounded-2xl border border-white/5 bg-white/5 text-white placeholder-white/20 focus:ring-2 focus:ring-red-600 outline-none transition-all"
                placeholder="What happened?"
              />
            </div>

            <div>
              <label className="block mb-2 text-xs font-black uppercase tracking-widest text-red-500">
                Culprit Name (if known):
              </label>
              <input
                type="text"
                name="culprit_name"
                value={form.culprit_name}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-2xl border border-white/5 bg-white/5 text-white placeholder-white/20 focus:ring-2 focus:ring-red-600 outline-none transition-all"
                placeholder="Name of the person"
              />
            </div>

            <div>
              <label className="block mb-2 text-xs font-black uppercase tracking-widest text-red-500">
                Incident Description:
              </label>
              <textarea
                name="incident_description"
                value={form.incident_description}
                onChange={handleChange}
                rows="5"
                required
                className="w-full px-5 py-4 rounded-2xl border border-white/5 bg-white/5 text-white placeholder-white/20 focus:ring-2 focus:ring-red-600 outline-none transition-all resize-none"
                placeholder="Please describe the incident in detail..."
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-5 mt-10 bg-gradient-to-r from-red-600 to-red-800 text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-red-600/20 active:scale-[0.98] transition-transform"
          >
            Submit Complaint
          </button>

          {message && (
            <div className={`mt-6 p-4 rounded-xl text-center text-sm font-bold ${message.includes("✅") ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
              {message}
            </div>
          )}
        </motion.form>

        <motion.button
          onClick={() => navigate("/dashboard")}
          className="mt-12 text-white/40 hover:text-white font-black text-xs uppercase tracking-[0.2em] transition-colors"
        >
          ← Back to Dashboard
        </motion.button>
      </div>
    </div>
  );
}
