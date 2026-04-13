import { useState, useRef, useEffect } from "react";
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

  // 🎙️ Start voice recognition
  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support voice recognition.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput((prev) => prev + transcript);
    };
    recognition.onerror = (e) => console.error("Speech error:", e.error);
    recognitionRef.current = recognition;
    recognition.start();
  };

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
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 aurora-bg text-white">
      <div className="max-w-3xl mx-auto flex flex-col items-center h-[calc(100vh-120px)]">
        {/* Header */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="text-center mb-6"
        >
          <h1 className="text-4xl sm:text-5xl font-black mb-2 tracking-tighter uppercase">
            Therapist
          </h1>
          <p className="text-white/60 font-medium">
            A safe, private space to breathe and heal.
          </p>
        </motion.div>

        {/* Chat Box */}
        <div className="flex-1 w-full bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-4 no-scrollbar">
            {messages.length === 0 && (
               <div className="h-full flex flex-col items-center justify-center text-white/20 text-center p-10">
                 <span className="text-6xl mb-4">🌿</span>
                 <p className="font-black uppercase tracking-widest text-xs">Start your healing journey</p>
               </div>
            )}
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: m.role === "user" ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-6 py-4 rounded-[2rem] text-sm sm:text-base font-medium shadow-xl ${
                    m.role === "user"
                      ? "bg-gradient-to-br from-red-600 to-red-800 text-white rounded-tr-none"
                      : "bg-white/10 border border-white/10 text-white rounded-tl-none"
                  }`}
                >
                  {m.text}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 sm:p-6 bg-black/40 border-t border-white/5">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="How are you feeling?"
                className="flex-1 px-6 py-4 rounded-2xl bg-white/5 border border-white/5 text-white placeholder-white/20 focus:ring-2 focus:ring-red-600 outline-none transition-all"
              />
              <button
                onClick={startListening}
                className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                title="Voice Input"
              >
                🎙️
              </button>
              <button
                onClick={sendMessage}
                className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-800 text-white font-black uppercase tracking-widest rounded-2xl shadow-xl active:scale-95 transition-all"
              >
                Send
              </button>
            </div>
            <button
               onClick={clearChat}
               className="mt-4 text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-red-500 transition-colors mx-auto block"
            >
              Clear Conversation
            </button>
          </div>
        </div>

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
