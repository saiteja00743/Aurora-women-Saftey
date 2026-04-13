import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import im1 from "../assets/im1.jpg";
import im2 from "../assets/im2.jpg";

export default function Landing({ onGetStarted }) {
  // --- Animation Hooks ---
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: false, margin: "-50px" });
  const heroControls = useAnimation();
  useEffect(() => {
    heroInView ? heroControls.start("show") : heroControls.start("hidden");
  }, [heroInView, heroControls]);

  const breakRef = useRef(null);
  const breakInView = useInView(breakRef, { once: false, margin: "-50px" });
  const breakControls = useAnimation();
  useEffect(() => {
    breakInView ? breakControls.start("show") : breakControls.start("hidden");
  }, [breakInView, breakControls]);

  const whyRef = useRef(null);
  const whyInView = useInView(whyRef, { once: false, margin: "-50px" });
  const whyControls = useAnimation();
  useEffect(() => {
    whyInView ? whyControls.start("show") : whyControls.start("hidden");
  }, [whyInView, whyControls]);

  return (
    <div className="aurora-bg text-white overflow-x-hidden">
      {/* HERO SECTION */}
      <section
        ref={heroRef}
        className="min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6 pt-20 pb-10"
      >
        <motion.h1
          initial="hidden"
          animate={heroControls}
          variants={{
            hidden: { opacity: 0, y: 30 },
            show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
          }}
          className="text-5xl sm:text-6xl md:text-8xl font-black text-white mb-2 tracking-tighter"
        >
          AURORA
        </motion.h1>

        <motion.h2
          initial="hidden"
          animate={heroControls}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { delay: 0.3, duration: 0.8 } },
          }}
          className="text-xl sm:text-2xl md:text-3xl font-bold text-red-500 mb-8 uppercase tracking-widest"
        >
          A Strong Voice
        </motion.h2>

        <motion.div
          initial="hidden"
          animate={heroControls}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { delay: 0.5, duration: 0.8 } },
          }}
          className="max-w-xs sm:max-w-md md:max-w-2xl space-y-4 mb-10"
        >
          <p className="text-white/80 font-medium">
            Imagine a woman trapped in silence, enduring daily fear and abuse,
            unable to seek help because her every move is monitored.
          </p>
          <p className="text-white/90">
            Introducing <span className="text-white font-bold underline decoration-red-600 underline-offset-4">Aurora</span> — an AI-powered lifeline, offering
            discreet support, mental health care, and legal guidance safely.
          </p>
        </motion.div>

        <motion.button
          onClick={onGetStarted}
          initial="hidden"
          animate={heroControls}
          variants={{
            hidden: { opacity: 0, scale: 0.9 },
            show: { opacity: 1, scale: 1, transition: { delay: 0.8 } },
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full sm:w-auto px-10 py-5 rounded-2xl text-white font-black text-lg
          bg-gradient-to-br from-red-600 to-red-900 shadow-2xl shadow-red-600/30 hover:shadow-red-500/50 transition-all border border-red-500/20"
        >
          Get Started →
        </motion.button>
      </section>

      {/* SECTION 2 - Break the Silence */}
      <section
        id="next"
        ref={breakRef}
        className="py-20 px-4 sm:px-6"
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-20">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, x: -30 },
              show: { opacity: 1, x: 0, transition: { duration: 0.8 } },
            }}
            className="w-full md:w-1/2 space-y-6 text-center md:text-left order-2 md:order-1"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight">
              Break the <br className="hidden md:block" />
              <span className="text-red-600">Silence</span>
            </h2>
            <div className="space-y-4 text-white/70 text-base sm:text-lg">
              <p>
                Aurora empowers women to reclaim their voice and safety. We’re reshaping the future for women facing abuse through technology that protects.
              </p>
              <p>
                Every voice shared becomes a spark of change. Let’s create a world where courage speaks louder than violence.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, scale: 0.9, rotate: -2 },
              show: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.8 } },
            }}
            className="w-full md:w-1/2 flex justify-center order-1 md:order-2"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-red-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <img
                src={im1}
                alt="Break the silence"
                className="relative w-full max-w-sm rounded-[2rem] shadow-2xl border border-white/10"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3 - Why Choose Aurora */}
      <section
        ref={whyRef}
        className="py-20 px-4 sm:px-6 bg-black/20"
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-20">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, scale: 0.9, rotate: 2 },
              show: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.8 } },
            }}
            className="w-full md:w-1/2 flex justify-center"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-red-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <img
                src={im2}
                alt="It's okay to ask for help"
                className="relative w-full max-w-sm rounded-[2rem] shadow-2xl border border-white/10"
              />
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, x: 30 },
              show: { opacity: 1, x: 0, transition: { duration: 0.8 } },
            }}
            className="w-full md:w-1/2 space-y-8"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-center md:text-left leading-tight">
              Why <span className="text-red-600 text-gradient-red">Aurora?</span>
            </h2>

            <div className="grid gap-6">
              {[
                { title: "Discreet and Secure", desc: "Built with privacy at its core, allowing women to seek help safely without fear." },
                { title: "24/7 Support", desc: "Compassionate AI-based emotional and psychological support — anytime, anywhere." },
                { title: "Legal Empowerment", desc: "Clear and private legal guidance to navigate complex situations confidently." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-red-500/20 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-red-600 mt-2.5 shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-white/60 text-sm sm:text-base">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4 - Lifeline Features */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-6">
              More than an App, <br />
              <span className="text-red-600 uppercase">It’s a Lifeline</span>
            </h2>
          </motion.div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                id: 1,
                title: "Discreet SOS",
                desc: "Covert tool that hides signals within everyday images, enabling safe support requests.",
              },
              {
                id: 2,
                title: "AI Mental Health",
                desc: "Compassionate companion for personalized support, addressing anxiety and trauma privately.",
              },
              {
                id: 3,
                title: "Legal Rights AI",
                desc: "Powerful guide explaining abuse and rights, equipping women to stand up for themselves.",
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] group hover:bg-white/10 transition-all duration-500"
              >
                <div className="text-5xl font-black text-red-600/20 group-hover:text-red-600/40 transition-colors mb-4">
                  0{feature.id}
                </div>
                <h3 className="text-2xl font-black text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-white/60 text-base sm:text-lg leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-32">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-4xl font-black text-center text-white mb-12"
            >
              The Silent <span className="text-red-600">Statistics</span>
            </motion.h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { value: "60%", text: "Fail to seek immediate help" },
                { value: "70%", text: "Lack psychological support" },
                { value: "55%", text: "Unaware of rights and laws" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-10 bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-3xl flex flex-col items-center justify-center text-center group hover:border-red-500/30 transition-all"
                >
                  <span className="text-5xl sm:text-6xl font-black text-red-600 mb-2 group-hover:scale-110 transition-transform">
                    {stat.value}
                  </span>
                  <p className="text-white/50 text-sm font-bold uppercase tracking-wider">
                    {stat.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
