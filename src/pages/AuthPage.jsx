import { motion } from "framer-motion";
import { useState } from "react";
import AuthForm from "../components/AuthForm";
import Dashboard from "./Dashboard";

export default function AuthPage({ onBack }) {
  const [showDashboard, setShowDashboard] = useState(false);

  if (showDashboard) return <Dashboard />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col justify-center items-center aurora-bg px-6"
    >
      <h1 className="text-5xl font-bold text-white mb-4">
        Welcome to Aurora
      </h1>

      <p className="text-white/70 mb-10 max-w-xl text-center">
        Login or create an account to begin your journey toward empowerment and safety.
      </p>

      <div className="bg-black/50 backdrop-blur-lg border border-red-500/30 rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <AuthForm />
      </div>

      <button
        onClick={onBack}
        className="mt-8 underline text-red-400 hover:text-red-300 transition-colors"
      >
        ← Back to Home
      </button>
    </motion.div>
  );
}
