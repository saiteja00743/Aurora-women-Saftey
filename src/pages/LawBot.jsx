import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { Link } from "react-router-dom";


export default function LawBot() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const suggestions = [
    "What are my rights if I face workplace harassment?",
    "What to do if someone stalks or threatens me?",
    "How to file a domestic violence complaint in India?",
    "What is the punishment for sexual assault under Indian law?",
    "Can women get free legal aid in India?",
  ];

  const handleAsk = async (q) => {
    const query = q || question;
    if (!query.trim()) return;

    setLoading(true);
    setResponse("");

    try {
      console.log("🔵 Sending request to LawBot API...");
      const res = await API.post("/api/lawbot/ask", { question: query });

      console.log("✅ Response data:", res.data);

      if (res.data.response) {
        setResponse(res.data.response);
      } else {
        setResponse("No response received.");
      }
    } catch (error) {
      console.error("❌ API/Network error:", error);
      const errorMsg = error.response?.data?.detail || error.message || "Server error. Please try again.";
      setResponse(`⚠️ Error: ${errorMsg}. Make sure the backend is running.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col justify-center items-center aurora-bg px-6 py-14 text-white"
    >
      {/* MAIN CHATBOT CARD */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-black/50 backdrop-blur-xl border border-red-500/30 
                 rounded-3xl shadow-2xl p-10 w-full max-w-3xl"
      >
        <h1 className="text-4xl font-bold text-white text-center mb-3">
          LawBot: Women’s Legal Assistant
        </h1>

        <p className="text-center text-white/70 mb-6">
          Ask questions about women’s rights, legal protections & safety in India.
        </p>

        {/* INPUT + ASK BUTTON */}
        <div className="flex items-center space-x-3 mb-6">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your question here..."
            className="flex-1 px-4 py-3 rounded-xl bg-black/40 text-white 
                     placeholder-white/50 shadow-md border border-red-500/30
                     focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <button
            onClick={() => handleAsk()}
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-red-700 to-red-900 
                     text-white rounded-xl font-semibold shadow-md 
                     hover:scale-105 transition disabled:opacity-40"
          >
            {loading ? "Thinking..." : "Ask"}
          </button>
        </div>

        {/* FLOATING SUGGESTIONS */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {suggestions.map((s, i) => (
            <motion.button
              key={i}
              onClick={() => {
                setQuestion(s);
                handleAsk(s);
              }}
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 text-sm bg-black/40 text-white 
                       rounded-full border border-red-500/30 
                       hover:bg-red-900/40 transition-all shadow-sm"
            >
              {s}
            </motion.button>
          ))}
        </motion.div>

        {/* AI RESPONSE BOX */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-black/40 p-5 rounded-xl min-h-[140px] border border-red-500/20 text-white/90 shadow-inner"
        >
          {loading ? "LawBot is typing..." : response || "Your answer will appear here."}
        </motion.div>
      </motion.div>

      {/* CENTERED BACK BUTTON — MATCHES COMPLAINT FORM */}
      <div className="text-center mt-8">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-red-400 hover:text-red-300 underline text-sm font-medium transition"
        >
          ← Back to Dashboard
        </button>
      </div>
    </motion.div>
  );

}