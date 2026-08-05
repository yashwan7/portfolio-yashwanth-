import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface ItachiPokeProps {
  className?: string;
  buttonLabel?: string;
}

export const ItachiPoke: React.FC<ItachiPokeProps> = ({
  className = "",
  buttonLabel = "Itachi Forehead Poke 🔴"
}) => {
  const [isPoking, setIsPoking] = useState(false);
  const [showQuote, setShowQuote] = useState(false);

  const triggerPoke = () => {
    if (isPoking) return;
    setIsPoking(true);
    setShowQuote(true);

    // Trigger crimson & black confetti burst
    confetti({
      particleCount: 50,
      spread: 60,
      colors: ['#ef4444', '#dc2626', '#991b1b', '#000000', '#38bdf8'],
      origin: { y: 0.6 }
    });

    setTimeout(() => {
      setIsPoking(false);
    }, 1800);

    setTimeout(() => {
      setShowQuote(false);
    }, 4500);
  };

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Interactive Trigger Button with Corner Accents (LakshyaWorks & MannDamani aesthetic) */}
      <button
        onClick={triggerPoke}
        disabled={isPoking}
        className="group relative px-4 py-2.5 rounded-xl bg-obsidian-900/90 border border-white/10 hover:border-red-500/50 text-xs font-mono text-slate-300 hover:text-white transition-all duration-300 shadow-lg hover:shadow-red-500/20 active:scale-95 flex items-center gap-2 overflow-hidden"
      >
        {/* Subtle Corner Markers (LakshyaWorks style) */}
        <span className="absolute left-0 top-0 w-2 h-2 border-l border-t border-red-500/60 opacity-60 group-hover:opacity-100" />
        <span className="absolute right-0 bottom-0 w-2 h-2 border-r border-b border-red-500/60 opacity-60 group-hover:opacity-100" />

        {/* Pulsing Red Chakra Gem */}
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
        </span>

        <span className="font-medium tracking-wide">{buttonLabel}</span>

        <span className="text-red-400 group-hover:translate-x-1 transition-transform font-bold">
          ✌️
        </span>
      </button>

      {/* Itachi 2-Finger Forehead Poke Overlay & Animation */}
      <AnimatePresence>
        {isPoking && (
          <div className="fixed inset-0 pointer-events-none z-[10000] flex items-center justify-center">
            {/* Screen Flash / Crimson Ambient Pulse */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.25, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0 bg-gradient-to-r from-red-950/40 via-red-900/20 to-obsidian-950/40 backdrop-blur-[2px]"
            />

            {/* Sharingan / Ripple Ring Expansion at Tap Location */}
            <motion.div
              initial={{ scale: 0.2, opacity: 1 }}
              animate={{ scale: 3.5, opacity: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="absolute w-32 h-32 rounded-full border-2 border-red-500 bg-red-500/10 shadow-[0_0_50px_rgba(239,68,68,0.8)]"
            />

            {/* The 2-Finger Hand Silhouette Tapping Forehead */}
            <motion.div
              initial={{ y: 120, x: 80, opacity: 0, scale: 0.8, rotate: -20 }}
              animate={{
                y: [120, -10, 0],
                x: [80, -5, 0],
                opacity: [0, 1, 1, 0],
                scale: [0.8, 1.1, 1],
                rotate: [-20, -5, 0]
              }}
              transition={{ duration: 1.4, times: [0, 0.4, 0.7, 1], ease: "easeInOut" }}
              className="relative flex flex-col items-center justify-center filter drop-shadow-[0_0_25px_rgba(239,68,68,0.9)]"
            >
              {/* Animated 2-Finger SVG Hand (Itachi's iconic forehead poke gesture) */}
              <svg viewBox="0 0 100 120" className="w-36 h-44 text-white">
                {/* Arm / Sleeve */}
                <path d="M35 120 L35 75 C35 75 40 70 50 70 C60 70 65 75 65 120 Z" fill="#0f172a" stroke="#ef4444" strokeWidth="2.5" />
                
                {/* Hand Palm */}
                <path d="M35 75 Q 32 55 42 50 Q 58 50 65 70 Z" fill="#f8fafc" stroke="#dc2626" strokeWidth="2" />
                
                {/* 2 Extended Fingers (Index & Middle Finger pointing out for Forehead Poke) */}
                <rect x="42" y="8" width="7" height="45" rx="3.5" fill="#f8fafc" stroke="#ef4444" strokeWidth="2" />
                <rect x="51" y="10" width="7" height="43" rx="3.5" fill="#f8fafc" stroke="#ef4444" strokeWidth="2" />
                
                {/* Tucked Ring & Pinky Finger */}
                <path d="M60 48 Q 66 55 60 62" fill="none" stroke="#ef4444" strokeWidth="2" />
                {/* Tucked Thumb */}
                <path d="M35 55 Q 40 60 42 52" fill="none" stroke="#ef4444" strokeWidth="2" />

                {/* Chakra Tap Sparkle at Tip of Fingers */}
                <circle cx="49.5" cy="8" r="6" fill="#ef4444" className="animate-ping" />
                <circle cx="49.5" cy="8" r="3" fill="#ffffff" />
              </svg>
            </motion.div>

            {/* Tap Sound Wave Text */}
            <motion.span
              initial={{ scale: 0.5, opacity: 0, y: -20 }}
              animate={{ scale: 1.4, opacity: [0, 1, 0], y: -50 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="absolute text-xl font-mono font-extrabold text-red-400 tracking-widest uppercase drop-shadow-[0_0_12px_rgba(239,68,68,1)]"
            >
              *TAP* 💥
            </motion.span>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Quote Toast after Poke */}
      <AnimatePresence>
        {showQuote && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="absolute top-12 left-1/2 -translate-x-1/2 z-[9000] w-64 p-3 rounded-2xl bg-obsidian-900/95 border border-red-500/40 text-center shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-center justify-center gap-1.5 text-xs font-serif italic text-red-400 font-semibold mb-1">
              <span>"Forgive me, Yashwanth... Next time."</span>
            </div>
            <p className="text-[10px] font-mono text-slate-400">
              Itachi Forehead Poke Unlocked 🩸⚡
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
