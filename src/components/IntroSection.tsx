"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { TextFlippingBoard } from "./ui/text-flipping-board";
import { ChevronDown, Volume2, VolumeX } from "lucide-react";

// Exactly the two requested messages
const MESSAGES: string[] = [
  "LADIES AND GENTLEMEN\nWELCOME TO MY PORTFOLIO",
  "HI I'M\nYASHWANTH GOWDA SN",
];

export const IntroSection: React.FC = () => {
  const [msgIdx, setMsgIdx] = useState(0);
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);

  const nextMessage = useCallback(() => {
    setMsgIdx((prev) => (prev + 1) % MESSAGES.length);
  }, []);

  // Slower, elegant interval between message changes (7 seconds)
  useEffect(() => {
    const timer = setInterval(nextMessage, 7000);
    return () => clearInterval(timer);
  }, [nextMessage]);

  const scrollToWebsite = () => {
    const target = document.getElementById("main-portfolio");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: window.innerHeight * 0.95, behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen w-full flex flex-col items-center justify-center py-12 px-2 sm:px-4 md:px-8 overflow-hidden">
      {/* Background Subtle Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

      {/* The Vestaboard Display - Using Full Container Width with Zero Clipping */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full flex justify-center items-center max-w-5xl xl:max-w-6xl mx-auto"
      >
        <TextFlippingBoard
          text={MESSAGES[msgIdx]}
          sound={isSoundEnabled}
          cols={24}
          totalRows={6}
          stagger={0.03}
        />
      </motion.div>

      {/* Minimal Control Pill: Flip Message & Sound */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-6 sm:mt-8 flex items-center gap-3"
      >
        <button
          onClick={nextMessage}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900/90 hover:bg-neutral-800 text-neutral-300 text-xs font-mono border border-neutral-800 hover:border-neutral-700 transition shadow-sm"
        >
          <span>Flip Message</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-400 font-mono">
            {msgIdx + 1}/{MESSAGES.length}
          </span>
        </button>

        <button
          onClick={() => setIsSoundEnabled((prev) => !prev)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono border transition shadow-sm ${
            isSoundEnabled
              ? "bg-neutral-800 border-neutral-600 text-neutral-200"
              : "bg-neutral-900/90 hover:bg-neutral-800 border-neutral-800 text-neutral-400 hover:text-neutral-200"
          }`}
        >
          {isSoundEnabled ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-neutral-200" />
              <span>Sound: ON</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5" />
              <span>Sound: OFF</span>
            </>
          )}
        </button>
      </motion.div>

      {/* Clean Scroll Down CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-8 sm:mt-12 flex flex-col items-center gap-2 cursor-pointer group"
        onClick={scrollToWebsite}
      >
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 group-hover:border-white/20 transition-all shadow-md">
          <span className="text-xs font-mono text-neutral-300 group-hover:text-white transition">
            Scroll down to explore
          </span>
        </div>

        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="text-neutral-500 group-hover:text-neutral-300 transition"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default IntroSection;
