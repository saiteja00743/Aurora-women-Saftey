import { useState, useRef } from "react";
import { motion } from "framer-motion";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Therapist() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(() => {
    // Load chat history from localStorage on initial load
    const savedChat = localStorage.getItem("therapist_history");
    return savedChat ? JSON.parse(savedChat) : [];
  });
  const recognitionRef = useRef(null);
  const navigate = useNavigate();

  // Save chat to localStorage whenever messages change
  useEffect(() => {
    localStorage.setItem("therapist_history", JSON.stringify(messages));
  }, [messages]);

  // 🔊 Speak AI response
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    speechSynthesis.speak(utterance);
  };

  // ... (startListening stays the same)

  // 📤 Send message
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");

    try {
      // Prepare history for API (map 'text' to 'content')
      const history = messages.map(msg => ({
        role: msg.role === "ai" ? "assistant" : msg.role,
        content: msg.text
      }));

      const res = await API.post("/api/therapist/chat", {
        message: userMsg.text,
        history: history
      });

      const aiMsg = { role: "ai", text: res.data.reply };
      setMessages((prev) => [...prev, aiMsg]);
      speak(aiMsg.text);

    } catch (err) {
      console.error(err);
      alert("Therapist is unavailable right now");
    }
  };

  const clearChat = () => {
    if (window.confirm("Are you sure you want to clear your conversation history?")) {
      setMessages([]);
      localStorage.removeItem("therapist_history");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen aurora-bg flex flex-col items-center p-6"
    >
      <h1 className="text-4xl font-bold text-white mb-4">
        AI Therapist
      </h1>
      <p className="text-white/70 mb-6">
  A safe space to talk, breathe, and feel heard.
</p>


      {/* 💬 Chat Box */}
      <div className="w-full max-w-2xl bg-black/40 backdrop-blur-xl rounded-2xl p-4 mb-4 overflow-y-auto h-[60vh]">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`mb-3 ${
              m.role === "user" ? "text-right" : "text-left"
            }`}
          >
            <span
              className={`inline-block px-4 py-2 rounded-xl ${
                m.role === "user"
                  ? "bg-red-700 text-white"
                  : "bg-black/60 border border-red-500/30 text-white"
              }`}
            >
              {m.text}
            </span>
          </div>
        ))}
      </div>

      {/* 📝 Input + Mic */}
      <div className="flex gap-2 w-full max-w-2xl">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Talk or type how you feel..."
          className="flex-1 px-4 py-2 rounded-xl outline-none bg-black/40 border border-red-500/30 text-white placeholder-white/50 focus:ring-2 focus:ring-red-500"
        />

        <button
          onClick={startListening}
          className="px-3 py-2 bg-red-900/50 text-white border border-red-500/30 hover:bg-red-800/50 rounded-xl transition"
        >
          🎙️
        </button>

        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-gradient-to-r from-red-700 to-red-900 hover:from-red-600 hover:to-red-800 text-white rounded-xl transition"
        >
          Send
        </button>
      </div>
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
