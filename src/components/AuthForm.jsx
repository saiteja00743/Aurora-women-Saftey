import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function AuthForm() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      if (isLogin) {
        const res = await API.post("/auth/login", {
          email: form.email,
          password: form.password,
        });
        localStorage.setItem("token", res.data.access_token);
        setMessage("✅ Login successful!");
        setTimeout(() => navigate("/dashboard"), 500);
      } else {
        const res = await API.post("/auth/register", {
          username: form.username,
          email: form.email,
          password: form.password,
        });
        setMessage("✅ " + res.data.message);
      }
    } catch (err) {
      setMessage("❌ " + (err.response?.data?.detail || "Something went wrong"));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <AnimatePresence mode="wait">
        <motion.form
          key={isLogin ? "login" : "register"}
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          {!isLogin && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-xl border border-red-500/30 bg-black/40 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-xl border border-red-500/30 bg-black/40 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-xl border border-red-500/30 bg-black/40 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-red-700 to-red-900 text-white rounded-xl hover:from-red-600 hover:to-red-800 shadow-lg hover:shadow-red-500/30 transition-all"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </motion.form>
      </AnimatePresence>

      {message && (
        <p
          className={`mt-3 text-sm ${
            message.includes("✅") ? "text-green-700" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}

      <p className="mt-5 text-sm text-white/80">
        {isLogin ? "Don’t have an account?" : "Already registered?"}{" "}
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="text-red-400 underline hover:text-red-300"
        >
          {isLogin ? "Create one" : "Login here"}
        </button>
      </p>
    </motion.div>
  );
}
