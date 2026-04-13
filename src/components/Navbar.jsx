import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'unset';
    }
  }, [location]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = !isOpen ? 'hidden' : 'unset';
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Law Bot", path: "/lawbot" },
    { name: "Therapist", path: "/therapist" },
    { name: "Complaints", path: "/track" },
    { name: "Helplines", path: "/helplines" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
          scrolled || isOpen
            ? "bg-black/90 backdrop-blur-lg border-b border-white/10 py-3 shadow-2xl"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-white">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 group relative z-[110]"
          >
            <span className="text-xl sm:text-2xl font-black tracking-tighter group-hover:text-red-500 transition-colors">
              AURORA
            </span>
            <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:text-red-500 relative py-1 ${
                  location.pathname === link.path ? "text-red-500" : "text-white/70"
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="navUnderline"
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600"
                  />
                )}
              </Link>
            ))}
            <Link
              to="/dashboard"
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white text-xs font-black tracking-widest transition-all shadow-lg hover:shadow-red-500/40 active:scale-95 transition-all"
            >
              GET STARTED
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={toggleMenu}
            className="lg:hidden relative z-[110] w-10 h-10 flex items-center justify-center text-white focus:outline-none bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
            aria-label="Toggle Menu"
          >
            <div className="flex flex-col gap-1.5 w-6">
              <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[90] lg:hidden bg-black flex flex-col pt-24 px-8 pb-10"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={link.path}
                    className={`block text-3xl font-black py-4 transition-all active:scale-95 ${
                      location.pathname === link.path ? "text-red-600" : "text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-auto"
            >
              <Link
                to="/dashboard"
                className="block w-full py-5 rounded-2xl bg-gradient-to-r from-red-600 to-red-800 text-center text-white font-black text-xl shadow-2xl shadow-red-600/20 active:scale-[0.98] transition-all"
              >
                GET STARTED
              </Link>
              <p className="mt-6 text-center text-white/40 text-sm font-medium">
                © 2024 Aurora Support System
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
