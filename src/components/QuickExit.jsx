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
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 left-6 z-50 bg-neutral-800/80 hover:bg-neutral-700 backdrop-blur-md text-white/50 hover:text-white px-4 py-3 rounded-2xl flex items-center justify-center gap-2 text-sm font-medium border border-white/10 hover:border-white/30 transition-all shadow-lg"
      title="Quick Exit (Esc 3x)"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
      <span>Quick Exit</span>
    </motion.button>
  );
}
