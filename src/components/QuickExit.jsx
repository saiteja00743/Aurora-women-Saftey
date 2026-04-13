import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function QuickExit() {
  const handleQuickExit = () => {
    // Replace the current history state so the user cannot use the back button
    window.location.replace("https://www.google.com");
  };

  useEffect(() => {
    let escapeCount = 0;
    let escapeTimer;

    const handleKeyDown = (e) => {
      // If the user presses the 'Escape' key
      if (e.key === 'Escape') {
        escapeCount++;

        // Clear the previous timer and start a new one
        clearTimeout(escapeTimer);
        
        // If pressed 3 times within 1.5 seconds, trigger Quick Exit
        if (escapeCount >= 3) {
          handleQuickExit();
        } else {
          // Reset the count after 1.5 seconds if not pressed 3 times
          escapeTimer = setTimeout(() => {
            escapeCount = 0;
          }, 1500);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(escapeTimer);
    };
  }, []);

  return (
    <motion.button
      onClick={handleQuickExit}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 left-6 z-[200] bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white/70 hover:text-white px-5 py-3 rounded-2xl flex items-center justify-center gap-3 text-xs sm:text-sm font-black uppercase tracking-widest border border-white/10 shadow-2xl active:scale-95 transition-all"
      title="Quick Exit (Esc 3x)"
    >
      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
      <span>Quick Exit</span>
    </motion.button>
  );
}
