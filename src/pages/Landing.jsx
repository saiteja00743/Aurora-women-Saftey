import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import im1 from "../assets/im1.jpg";
import im2 from "../assets/im2.jpg";

export default function Landing({ onGetStarted }) {   // ✅ FIXED — accepts prop
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
    <>
      {/* FIXED LOGO (top-left) */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="fixed top-6 left-6 z-50 flex items-center"
      >
        <span className="text-white font-bold text-xl md:text-xl tracking-wide">
          Aurora
        </span>
      </motion.div>

      <div className="aurora-bg text-white">
        {/* HERO SECTION */}
        <section
          ref={heroRef}
          className="min-h-screen flex flex-col justify-center items-center text-center px-6"
        >
          <motion.h1
            initial="hidden"
            animate={heroControls}
            variants={{
              hidden: { opacity: 0, y: 40 },
              show: { opacity: 1, y: 0, transition: { duration: 1 } },
            }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-2"
          >
            Aurora:
          </motion.h1>

          <motion.h2
            initial="hidden"
            animate={heroControls}
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { delay: 0.3, duration: 1 } },
            }}
            className="text-2xl md:text-3xl font-medium text-red-400 mb-8"
          >
            A Strong Voice..
          </motion.h2>

          <motion.p
            initial="hidden"
            animate={heroControls}
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { delay: 0.6, duration: 1 } },
            }}
            className="max-w-md md:max-w-2xl text-base md:text-lg text-white/80 leading-relaxed mb-4"
          >
            Imagine a woman trapped in silence, enduring daily fear and abuse,
            unable to seek help because her every move is monitored. For
            millions of women worldwide, this is a daily reality which is unbearable to think about.
          </motion.p>

          <motion.p
            initial="hidden"
            animate={heroControls}
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { delay: 0.9, duration: 1 } },
            }}
            className="max-w-md md:max-w-2xl text-base md:text-lg text-white/80 leading-relaxed mb-8"
          >
            So introducing <b>Aurora</b> — an AI-powered lifeline, offering
            discreet support, mental health care, and legal guidance to women in
            abusive situations — all without risking exposure to any outside world or member.
          </motion.p>

          <motion.button
            onClick={onGetStarted}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="px-10 py-3 rounded-2xl text-white font-semibold 
            bg-gradient-to-r from-red-700 to-red-900 shadow-md hover:shadow-red-500/30 hover:shadow-lg transition-all"
          >
            Get Started →
          </motion.button>
        </section>

        {/* SECTION 2 - Break the Silence */}
        <section
          id="next"
          ref={breakRef}
          className="min-h-screen flex flex-col md:flex-row items-center justify-center text-center md:text-left px-6 gap-10"
        >
          <motion.div
            initial="hidden"
            animate={breakControls}
            variants={{
              hidden: { opacity: 0, y: 100 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 1.2, ease: "easeOut" },
              },
            }}
            className="flex flex-col md:flex-row items-center justify-center gap-10 max-w-6xl mx-auto"
          >
            {/* TEXT LEFT */}
            <div className="md:w-1/2 space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold text-white">
                Break the Silence
              </h2>
              <p className="text-base md:text-lg text-white/80 leading-relaxed">
                With Aurora, we’re empowering women to reclaim their voice and
                safety, regardless of their circumstances. Whether you are a
                survivor, ally, or advocate, join us in reshaping the future for
                women facing abuse — help us build a world where they can
                finally break the silence.
              </p>
              <p className="text-lg text-white/80 leading-relaxed">
                Together, we rise above fear and bring light to every hidden
                story. Every voice shared becomes a spark of change. Let’s
                create a world where courage speaks louder than violence.
              </p>
            </div>

            {/* IMAGE RIGHT */}
            <motion.div
              initial="hidden"
              animate={breakControls}
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                show: {
                  opacity: 1,
                  scale: 1,
                  transition: { delay: 0.4, duration: 1.2 },
                },
              }}
              className="md:w-1/2 flex justify-center"
            >
              <img
                src={im1}
                alt="Break the silence"
                className="w-72 md:w-96 rounded-3xl shadow-lg border border-red-500/30"
              />
            </motion.div>
          </motion.div>
        </section>

        {/* SECTION 3 - Why Choose Aurora */}
        <section
          ref={whyRef}
          className="min-h-screen flex flex-col md:flex-row items-center justify-center text-center md:text-left px-6 gap-10"
        >
          <motion.div
            initial="hidden"
            animate={whyControls}
            variants={{
              hidden: { opacity: 0, y: 100 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 1.2, ease: "easeOut" },
              },
            }}
            className="flex flex-col md:flex-row items-center justify-center gap-10 max-w-6xl mx-auto"
          >
            {/* IMAGE LEFT */}
            <motion.div
              initial="hidden"
              animate={whyControls}
              variants={{
                hidden: { opacity: 0, x: -50 },
                show: {
                  opacity: 1,
                  x: 0,
                  transition: { delay: 0.3, duration: 1.2 },
                },
              }}
              className="md:w-1/2 flex justify-center"
            >
              <img
                src={im2}
                alt="It's okay to ask for help"
                className="w-80 md:w-[28rem] rounded-3xl shadow-lg border border-red-500/30"
              />
            </motion.div>

            {/* TEXT RIGHT */}
            <motion.div
              initial="hidden"
              animate={whyControls}
              variants={{
                hidden: { opacity: 0, x: 50 },
                show: {
                  opacity: 1,
                  x: 0,
                  transition: { delay: 0.5, duration: 1.2 },
                },
              }}
              className="md:w-1/2 space-y-6"
            >
              <h2 className="text-4xl md:text-6xl font-extrabold text-red-500 mb-6 leading-tight">
                Why Choose Aurora:
              </h2>

              <div className="space-y-6 text-white/85 text-lg md:text-xl leading-relaxed">
                <p>
                  <b className="text-red-400">Discreet and Secure:</b> Built
                  with steganography and privacy at its core, Aurora allows
                  women to seek help safely without fear of being tracked.
                </p>
                <p>
                  <b className="text-red-400">
                    24/7 Mental Health Support:
                  </b>{" "}
                  Accessible, compassionate AI-based emotional and psychological
                  support — available anytime, anywhere.
                </p>
                <p>
                  <b className="text-red-400">Legal Empowerment:</b> Instant,
                  clear, and private legal guidance to help navigate complex
                  situations confidently and safely.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* SECTION 4 - Lifeline Features */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-20">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 1 }}
            className="text-3xl sm:text-4xl md:text-6xl font-bold text-red-500 mb-12"
          >
            Aurora is more than an app, It’s a Lifeline!
          </motion.h2>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl w-full">
            {[
              {
                id: 1,
                title: "Discreet SOS Messaging",
                desc: "Covert messaging tool that hides SOS signals within everyday images, enabling women to seek support safely on social media.",
              },
              {
                id: 2,
                title: "AI Mental Health Support",
                desc: "A compassionate AI companion that provides personalized support, addressing anxiety, PTSD, and trauma in the safest and most private way.",
              },
              {
                id: 3,
                title: "Legal Rights Bot",
                desc: "A powerful AI guide that explains abuse, custody, and property rights in simple terms, equipping women to stand up for their rights.",
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ delay: i * 0.2, duration: 1 }}
                className="p-8 bg-black/40 backdrop-blur-md border border-red-500/20 
                rounded-3xl shadow-lg text-left hover:shadow-red-500/20 hover:shadow-2xl hover:-translate-y-2 
                transition-all duration-500"
              >
                <div className="text-3xl font-extrabold text-red-500 mb-2">
                  {feature.id}.
                </div>
                <h3 className="text-2xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-white/70 text-lg leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Divider Title */}
          <motion.h3
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="mt-24 text-4xl font-semibold text-red-400"
          >
            What people mostly are unaware of, but we are not.
          </motion.h3>

          {/* Statistic Cards */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-12 max-w-4xl w-full">
            {[
              { value: "60%", text: "Women fail seeking immediate help" },
              { value: "70%", text: "Survivors lack psychological support" },
              { value: "55%", text: "Unaware of women rights and laws" },
            ].map((stat, i) => (
              <motion.div
                key={stat.text}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ delay: 0.2 * i, duration: 1 }}
                className="p-8 bg-black/40 backdrop-blur-md border border-red-500/20 
                rounded-2xl flex flex-col items-center justify-center w-72 
                shadow-md hover:shadow-red-500/20 hover:shadow-xl transition-all duration-500"
              >
                <span className="text-4xl font-bold text-red-500 mb-2">
                  {stat.value}
                </span>
                <p className="text-white/80 text-lg font-medium">
                  {stat.text}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
