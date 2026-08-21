"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { TextFlippingBoard } from "./ui/text-flipping-board";
import { ChevronDown, Volume2, VolumeX, Sparkles, ArrowDown } from "lucide-react";

const INTRO_MESSAGES: string[] = [
  "HI IM \nYASHWANTH GOWDA SN \nBACKEND & AI DEV",
  "WELCOME TO \nMY DIGITAL SPACE \nSCROLL TO EXPLORE",
  "BUILDING SCALABLE \nBACKEND ARCHITECTURE \n& CLOUD SYSTEMS",
  "ECOSPARK WINNER \nGDG TOP 10 RANK \nLET'S CONNECT!",
];

export const IntroSection: React.FC = () => {
  const [msgIdx, setMsgIdx] = useState(0);
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);

  const nextMessage = useCallback(() => {
    setMsgIdx((prev) => (prev + 1) % INTRO_MESSAGES.length);
  }, []);

  // Cycle message every 5.5 seconds
  useEffect(() => {
    const timer = setInterval(nextMessage, 5500);
    return () => clearInterval(timer);
  }, [nextMessage]);

  const scrollToWebsite = () => {
    const target = document.getElementById("home");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: window.innerHeight * 0.9, behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[90vh] sm:min-h-screen flex flex-col items-center justify-center pt-16 pb-12 px-4 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Small Tag */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] shadow-inner"
      >
        <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
        <span className="text-xs font-mono tracking-wider text-neutral-300">
          MECHANICAL DISPLAY // VESTABOARD
        </span>
      </motion.div>

      {/* The Text Flipping Board Display */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="w-full flex justify-center max-w-full"
      >
        <TextFlippingBoard
          text={INTRO_MESSAGES[msgIdx]}
          sound={isSoundEnabled}
          minRows={3}
          cols={21}
          headerTitle="YASHWANTH // SPLIT-FLAP INTRO"
          size="auto"
          className="shadow-[0_20px_50px_rgba(0,0,0,0.8)] border-neutral-800/90"
        />
      </motion.div>

      {/* Interactive Controls Bar */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-6 flex flex-wrap items-center justify-center gap-3"
      >
        {/* Next Flip Trigger */}
        <button
          onClick={nextMessage}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 text-xs font-mono border border-neutral-800 hover:border-neutral-700 transition"
        >
          <span>Flip Message</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-400 font-mono">
            {msgIdx + 1}/{INTRO_MESSAGES.length}
          </span>
        </button>

        {/* Mechanical Sound Toggle */}
        <button
          onClick={() => setIsSoundEnabled((prev) => !prev)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono border transition ${
            isSoundEnabled
              ? "bg-emerald-950/50 border-emerald-700/60 text-emerald-300"
              : "bg-neutral-900/80 hover:bg-neutral-800 border-neutral-800 text-neutral-400 hover:text-neutral-200"
          }`}
        >
          {isSoundEnabled ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Flap Sound: ON</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5" />
              <span>Flap Sound: OFF</span>
            </>
          )}
        </button>
      </motion.div>

      {/* Scroll Down CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-10 sm:mt-14 flex flex-col items-center gap-2 cursor-pointer group"
        onClick={scrollToWebsite}
      >
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 group-hover:border-white/20 transition-all shadow-md">
          <span className="text-xs font-mono text-neutral-300 group-hover:text-white transition">
            Scroll down to explore portfolio
          </span>
          <ArrowDown className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-y-0.5 transition-transform" />
        </div>

        {/* Animated Chevron Indicator */}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="text-neutral-500 group-hover:text-neutral-300 transition"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default IntroSection;
