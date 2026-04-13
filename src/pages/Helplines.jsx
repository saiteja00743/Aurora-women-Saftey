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
    <div className="min-h-screen aurora-bg pt-24 pb-20 px-4 sm:px-6 text-white">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="text-center mb-12 sm:mb-16"
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-4 tracking-tighter uppercase">
            Helplines
          </h1>
          <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto font-medium">
            You are never alone. Reach out to these verified national helplines for immediate assistance, support, or guidance.
          </p>
        </motion.div>

        {/* Helpline Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full mb-20">
          {helplines.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col justify-between group hover:bg-white/10 transition-all duration-300 shadow-2xl"
            >
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500 mb-4 block">
                   {item.category}
                </span>
                <h2 className="text-2xl font-black mb-3">{item.name}</h2>
                <p className="text-white/40 text-sm mb-10 leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>
              
              <a
                href={`tel:${item.number}`}
                className={`w-full py-4 rounded-2xl bg-gradient-to-r ${item.color} text-center font-black text-xl shadow-xl active:scale-[0.98] transition-transform flex items-center justify-center gap-3`}
              >
                <svg className="w-5 h-5 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
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
          className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-[3rem] p-10 sm:p-16 mb-10"
        >
          <h2 className="text-3xl font-black mb-12 text-center uppercase tracking-tight">Safety Awareness</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {safetyTips.map((tip, index) => (
              <div key={index} className="flex flex-col items-center sm:items-start text-center sm:text-left group">
                <span className="text-5xl mb-6 group-hover:scale-110 transition-transform inline-block">{tip.icon}</span>
                <p className="text-white/50 text-sm font-bold leading-relaxed">{tip.tip}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.button
          onClick={() => navigate("/dashboard")}
          className="mt-16 text-white/40 hover:text-white font-black text-xs uppercase tracking-[0.2em] transition-colors"
        >
          ← Back to Dashboard
        </motion.button>
      </div>
    </div>
  );
}
