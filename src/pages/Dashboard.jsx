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
      description: "A safe, confidential space for victims to file complaints with dignity and privacy.",
      button: "File Complaint",
      color: "from-red-600 to-red-800",
      route: "/complaint",
    },
    {
      title: "Track Status",
      description: "Check the real-time status of your previously submitted complaint securely.",
      button: "Track Now",
      color: "from-blue-600 to-indigo-800",
      route: "/track",
    },
    {
      title: "Law Bot",
      description: "AI-powered legal assistant explaining rights and protection laws clearly.",
      button: "Open Law Bot",
      color: "from-red-700 to-rose-600",
      route: "/lawbot",
    },
    {
      title: "Emergency Helplines",
      description: "Instant access to verified national helplines for victims in distress.",
      button: "Call Now",
      color: "from-orange-700 to-red-800",
      route: "/helplines",
    },
    {
      title: "AI Therapist",
      description: "Empathetic AI therapist who listens and helps victims heal emotionally.",
      button: "Start Healing",
      color: "from-red-500 to-orange-600",
      route: "/therapist",
    },
    {
      title: "Admin Dashboard",
      description: "Manage and review all submitted complaints. Centralized hub for authorities.",
      button: "Admin Panel",
      color: "from-neutral-800 to-black",
      route: "/admin",
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 aurora-bg text-white">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-4 tracking-tighter">
            DASHBOARD
          </h1>
          <p className="text-white/60 text-base sm:text-lg max-w-xl mx-auto font-medium">
            Empowering women through knowledge, safety, and compassionate emotional support.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {features
            .filter(feature => feature.title !== "Admin Dashboard" || isAdmin)
            .map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group relative h-full"
              >
                <div className={`absolute -inset-0.5 bg-gradient-to-br ${feature.color} rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500`}></div>
                <div className="relative h-full flex flex-col p-8 sm:p-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl group-hover:bg-white/10 transition-all duration-300">
                  <h2 className="text-2xl font-black text-white mb-3 tracking-tight">
                    {feature.title}
                  </h2>
                  <p className="text-white/50 text-base mb-8 leading-relaxed">
                    {feature.description}
                  </p>
                  <button
                    onClick={() => navigate(feature.route)}
                    className={`mt-auto w-full py-4 rounded-2xl bg-gradient-to-r ${feature.color} text-white font-black text-sm uppercase tracking-widest shadow-xl active:scale-[0.98] transition-transform`}
                  >
                    {feature.button}
                  </button>
                </div>
              </motion.div>
            ))}
        </div>

        {/* Back Link */}
        <motion.button
          onClick={() => navigate("/")}
          className="mt-16 text-white/40 hover:text-white font-black text-xs uppercase tracking-[0.2em] transition-colors flex items-center gap-2 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Return Home
        </motion.button>
      </div>
    </div>
  );
}
