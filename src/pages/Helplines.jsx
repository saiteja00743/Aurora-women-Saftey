import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Helplines() {
  const navigate = useNavigate();

  const helplines = [
    {
      number: "1091",
      name: "Women Helpline",
      description: "Dedicated national helpline for women in distress, harassment, or emergency situations.",
      category: "Emergency",
      color: "from-red-600 to-red-800"
    },
    {
      number: "181",
      name: "Domestic Abuse Helpline",
      description: "Support for women facing domestic violence, physical, or emotional abuse at home.",
      category: "Support",
      color: "from-rose-600 to-rose-800"
    },
    {
      number: "112",
      name: "All-in-One Emergency",
      description: "Unified emergency number for Police, Fire, and Medical assistance across India.",
      category: "Emergency",
      color: "from-neutral-700 to-neutral-900"
    },
    {
      number: "1094",
      name: "Student/Child Helpline",
      description: "Protection and support for students and young girls facing bullying or harassment.",
      category: "Support",
      color: "from-blue-600 to-blue-800"
    },
    {
      number: "155260",
      name: "Cyber Crime Reporting",
      description: "Instant reporting for online harassment, stalking, or financial fraud.",
      category: "Cyber Safety",
      color: "from-indigo-600 to-indigo-800"
    },
    {
      number: "011-23219733",
      name: "National Commission for Women",
      description: "Direct line to the NCW for complaints regarding rights violations.",
      category: "Legal",
      color: "from-amber-600 to-amber-800"
    }
  ];

  const safetyTips = [
    {
      tip: "Keep your phone charged and reachable at all times.",
      icon: "📱"
    },
    {
      tip: "Memorize at least two emergency contact numbers.",
      icon: "🧠"
    },
    {
      tip: "Use the 'Quick Exit' button or Esc key if you feel watched.",
      icon: "🚪"
    },
    {
      tip: "Trust your intuition; if a situation feels wrong, leave immediately.",
      icon: "⚡"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen aurora-bg py-20 px-6 text-white"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-4">Emergency Helplines</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            You are never alone. Reach out to these verified national helplines for immediate assistance, support, or guidance.
          </p>
        </motion.div>

        {/* Helpline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {helplines.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03, y: -5 }}
              className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col justify-between shadow-2xl hover:border-red-500/30 transition-all"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-red-400 bg-red-400/10 px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>
                <h2 className="text-2xl font-bold mb-2">{item.name}</h2>
                <p className="text-white/60 text-sm mb-6 leading-relaxed">
                  {item.description}
                </p>
              </div>
              
              <a
                href={`tel:${item.number}`}
                className={`w-full py-4 rounded-2xl bg-gradient-to-r ${item.color} text-center font-bold text-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-3`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {item.number}
              </a>
            </motion.div>
          ))}
        </div>

        {/* Safety Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[3rem] p-12"
        >
          <h2 className="text-3xl font-bold mb-10 text-center">Safety Awareness & Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {safetyTips.map((tip, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <span className="text-4xl mb-4">{tip.icon}</span>
                <p className="text-white/70 text-sm leading-relaxed">{tip.tip}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Footer Navigation */}
        <div className="mt-20 text-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-red-400 font-medium underline text-sm hover:text-red-300"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </motion.div>
  );
}
