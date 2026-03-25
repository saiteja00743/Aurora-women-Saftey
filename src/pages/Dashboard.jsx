import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Check if user is admin
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isAdmin = user.is_admin === 1;

  const features = [
    {
      title: "File a Complaint",
      description:
        "A safe, confidential space for victims to file complaints. We understand that many can’t take a public stand — Aurora ensures your voice is heard with dignity and privacy.",
      button: "File Complaint",
      color: "from-red-600 to-red-800",
      route: "/complaint",
    },
    {
      title: "Track Complaint Status",
      description:
        "Check the real-time status of your previously submitted complaint securely using your unique Tracking ID.",
      button: "Track Status",
      color: "from-blue-600 to-purple-800",
      route: "/track",
    },
    {
      title: "Law Bot",
      description:
        "An AI-powered legal assistant that explains women’s rights, protection laws, and the justice process — empowering you with accurate and compassionate guidance.",
      button: "Open Law Bot",
      color: "from-red-700 to-rose-600",
      route: "/lawbot",
    },
    {
      title: "Emergency Helplines",
      description:
        "Instant access to verified national helplines for victims in distress. Call authority numbers with a single click for immediate support.",
      button: "Call Helplines",
      color: "from-orange-700 to-red-800",
      route: "/helplines",
    },
    {
      title: "AI Therapist",
      description:
        "A calm, empathetic AI therapist who listens, guides, and helps victims heal emotionally. Because mental well-being is just as important as justice.",
      button: "Talk to AI Therapist",
      color: "from-red-500 to-orange-600",
      route: "/therapist",
    },
    {
      title: "Admin Dashboard",
      description:
        "Manage and review all submitted complaints. Track complaint status, view submission details, and mark cases as reviewed — a centralized hub for authorities.",
      button: "Open Admin Panel",
      color: "from-red-800 to-red-950",
      route: "/admin",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 aurora-bg text-white"
    >
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-5xl font-bold text-white mb-4"
      >
        Welcome to Aurora Dashboard
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-lg text-white/80 mb-10 max-w-2xl"
      >
        Empowering women through knowledge, safety, and emotional support.
      </motion.p>

      {/* Feature Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 w-full max-w-6xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        {features
          .filter(feature => feature.title !== "Admin Dashboard" || isAdmin)
          .map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className={`bg-black/40 backdrop-blur-lg border border-red-500/20 rounded-3xl shadow-2xl p-8 hover:shadow-red-500/30 hover:bg-black/50 transition-all duration-300`}
            >
              <h2 className="text-2xl font-semibold text-red-400 mb-3">
                {feature.title}
              </h2>
              <p className="text-white/70 mb-6 leading-relaxed">
                {feature.description}
              </p>
              <button
                onClick={() => navigate(feature.route)}
                className={`px-6 py-2 rounded-full bg-gradient-to-r ${feature.color} text-white font-medium hover:opacity-90 transition`}
              >
                {feature.button}
              </button>
            </motion.div>
          ))}
      </motion.div>

      {/* Back Button */}
      <motion.button
        onClick={() => navigate("/")}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.2 }}
        className="mt-12 text-red-400 font-medium underline text-sm hover:text-red-300"
      >
        ← Back to Home
      </motion.button>
    </motion.div>
  );
}
