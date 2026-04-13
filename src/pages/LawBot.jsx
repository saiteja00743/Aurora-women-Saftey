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
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 aurora-bg text-white">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Header */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="text-center mb-10"
        >
          <h1 className="text-4xl sm:text-5xl font-black mb-4 tracking-tighter uppercase">
            LawBot
          </h1>
          <p className="text-white/60 font-medium max-w-xl">
            Your private legal companion for rights and protection laws in India.
          </p>
        </motion.div>

        {/* Chat Interface */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl p-6 sm:p-10 flex flex-col gap-8"
        >
          {/* Input Section */}
          <div className="flex flex-col sm:row items-stretch gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
                placeholder="Ask about your rights..."
                className="w-full px-6 py-5 rounded-2xl border border-white/5 bg-white/5 text-white placeholder-white/20 focus:ring-2 focus:ring-red-600 outline-none transition-all"
              />
            </div>
            <button
              onClick={() => handleAsk()}
              disabled={loading}
              className="sm:w-32 py-5 bg-gradient-to-r from-red-600 to-red-800 text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-red-600/20 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {loading ? "..." : "Ask"}
            </button>
          </div>

          {/* Suggestions */}
          <div className="flex flex-wrap gap-2 justify-center">
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => {
                  setQuestion(s);
                  handleAsk(s);
                }}
                className="px-4 py-2 text-[10px] sm:text-xs font-black uppercase tracking-[0.1em] bg-white/5 border border-white/5 rounded-full hover:bg-white/10 hover:border-red-500/30 transition-all text-white/60 hover:text-white"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Response area */}
          <div className="mt-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500 mb-4 px-2">
              Response
            </h3>
            <div className="min-h-[200px] p-6 sm:p-8 bg-black/40 rounded-3xl border border-white/5 text-white/80 leading-relaxed font-medium">
              {loading ? (
                <div className="flex items-center gap-3 animate-pulse">
                  <div className="w-2 h-2 rounded-full bg-red-600"></div>
                  <span>LawBot is reviewing the law...</span>
                </div>
              ) : response || "I am here to help you understand your legal rights. Ask me anything."}
            </div>
          </div>
        </motion.div>

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