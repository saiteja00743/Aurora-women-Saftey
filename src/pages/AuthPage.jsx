import { motion } from "framer-motion";
import { useState } from "react";
import AuthForm from "../components/AuthForm";
import Dashboard from "./Dashboard";

export default function AuthPage({ onBack }) {
  const [showDashboard, setShowDashboard] = useState(false);

  if (showDashboard) return <Dashboard />;

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 aurora-bg text-white">
      <div className="max-w-xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl sm:text-6xl font-black mb-4 tracking-tighter uppercase">
            JOIN US
          </h1>
          <p className="text-white/60 text-base sm:text-lg font-medium">
            Login or create an account to begin your journey toward empowerment and safety.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl p-8 sm:p-12 w-full"
        >
          <AuthForm />
        </motion.div>

        <button
          onClick={onBack}
          className="mt-12 text-white/40 hover:text-white font-black text-xs uppercase tracking-[0.2em] transition-colors"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
}
