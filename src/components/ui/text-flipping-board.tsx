"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";

const CHAR_SET = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_+=/.,:;?'\"";

export interface SplitFlapCellProps {
  char: string;
  previousChar?: string;
  delay?: number;
  flipCount?: number;
  sound?: boolean;
  audioCtx?: AudioContext | null;
  className?: string;
  textClassName?: string;
  size?: "xs" | "sm" | "md" | "lg" | "auto";
}

const playFlapAudio = (ctx?: AudioContext | null) => {
  if (!ctx) return;
  try {
    if (ctx.state === "suspended") {
      ctx.resume();
    }
    const bufferSize = Math.floor(ctx.sampleRate * 0.015);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(950 + Math.random() * 300, ctx.currentTime);
    filter.Q.setValueAtTime(3, ctx.currentTime);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.018);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
  } catch {
    // Audio context may be blocked before interaction
  }
};

export const SplitFlapCell: React.FC<SplitFlapCellProps> = ({
  char,
  delay = 0,
  flipCount = 3,
  sound = false,
  audioCtx,
  className,
  textClassName,
  size = "auto",
}) => {
  const targetChar = (char || " ").toUpperCase();
  const [currentChar, setCurrentChar] = useState(targetChar);
  const [prevChar, setPrevChar] = useState(targetChar);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipKey, setFlipKey] = useState(0);

  const prevTargetRef = useRef(targetChar);

  useEffect(() => {
    if (targetChar === prevTargetRef.current) return;

    const oldChar = prevTargetRef.current;
    prevTargetRef.current = targetChar;

    let timeoutId: NodeJS.Timeout;
    const intervals: NodeJS.Timeout[] = [];

    timeoutId = setTimeout(() => {
      const steps: string[] = [];
      const numSteps = Math.max(2, Math.min(6, flipCount + Math.floor(Math.random() * 2)));

      for (let i = 0; i < numSteps - 1; i++) {
        const randIndex = Math.floor(Math.random() * CHAR_SET.length);
        steps.push(CHAR_SET[randIndex]);
      }
      steps.push(targetChar);

      let stepIdx = 0;
      let lastStepChar = oldChar;

      const stepInterval = setInterval(() => {
        if (stepIdx < steps.length) {
          const nextChar = steps[stepIdx];
          setPrevChar(lastStepChar);
          setCurrentChar(nextChar);
          setIsFlipping(true);
          setFlipKey((k) => k + 1);

          if (sound && audioCtx) {
            playFlapAudio(audioCtx);
          }

          lastStepChar = nextChar;
          stepIdx++;
        } else {
          clearInterval(stepInterval);
          setIsFlipping(false);
        }
      }, 65);

      intervals.push(stepInterval);
    }, delay * 1000);

    return () => {
      clearTimeout(timeoutId);
      intervals.forEach((id) => clearInterval(id));
    };
  }, [targetChar, delay, flipCount, sound, audioCtx]);

  const sizeClasses = {
    xs: "w-3.5 h-5 rounded-[2px]",
    sm: "w-5 h-7 rounded-[3px]",
    md: "w-7 h-10 rounded-[4px]",
    lg: "w-10 h-14 md:w-12 md:h-17 rounded-[5px]",
    auto: "w-4 h-6 xs:w-5 xs:h-7 sm:w-7 sm:h-10 md:w-8 md:h-12 lg:w-9 lg:h-14 rounded-[3px] sm:rounded-[4px]",
  }[size];

  const fontSizeClasses = {
    xs: "text-[9px]",
    sm: "text-[12px]",
    md: "text-base sm:text-lg",
    lg: "text-xl md:text-2xl",
    auto: "text-[10px] xs:text-xs sm:text-base md:text-lg lg:text-xl",
  }[size];

  return (
    <div
      className={cn(
        "relative bg-[#18181b] select-none shadow-[0_2px_8px_rgba(0,0,0,0.6)] border border-neutral-800/90 flex flex-col justify-between overflow-hidden",
        sizeClasses,
        className
      )}
      style={{ perspective: "600px" }}
    >
      {/* Top Half Fixed */}
      <div className="relative w-full h-1/2 bg-[#1d1d22] overflow-hidden border-b border-black/90 rounded-t-[2px]">
        <div className="absolute inset-0 flex items-center justify-center translate-y-1/2">
          <span
            className={cn(
              "font-mono font-bold text-neutral-100 leading-none tracking-widest",
              fontSizeClasses,
              textClassName
            )}
          >
            {currentChar}
          </span>
        </div>
        {/* Top Glare */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
      </div>

      {/* Bottom Half Fixed */}
      <div className="relative w-full h-1/2 bg-[#141416] overflow-hidden rounded-b-[2px]">
        <div className="absolute inset-0 flex items-center justify-center -translate-y-1/2">
          <span
            className={cn(
              "font-mono font-bold text-neutral-100 leading-none tracking-widest",
              fontSizeClasses,
              textClassName
            )}
          >
            {currentChar}
          </span>
        </div>
        {/* Bottom Shadow */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
      </div>

      {/* Animated Flipping Flap */}
      <AnimatePresence mode="popLayout">
        {isFlipping && (
          <motion.div
            key={flipKey}
            initial={{ rotateX: 0 }}
            animate={{ rotateX: -180 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.13, ease: "easeInOut" }}
            style={{
              transformOrigin: "bottom center",
              transformStyle: "preserve-3d",
            }}
            className="absolute top-0 left-0 w-full h-1/2 bg-[#1d1d22] border-b border-black/90 rounded-t-[2px] overflow-hidden z-20"
          >
            <div className="absolute inset-0 flex items-center justify-center translate-y-1/2">
              <span
                className={cn(
                  "font-mono font-bold text-neutral-100 leading-none tracking-widest",
                  fontSizeClasses,
                  textClassName
                )}
              >
                {prevChar}
              </span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Center Hinge & Notch Marks */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-black/95 -translate-y-1/2 z-30" />
      <div className="absolute top-1/2 left-0 w-[1.5px] h-[3px] bg-neutral-900 -translate-y-1/2 z-40" />
      <div className="absolute top-1/2 right-0 w-[1.5px] h-[3px] bg-neutral-900 -translate-y-1/2 z-40" />
    </div>
  );
};

export interface TextFlippingBoardProps {
  text?: string;
  rows?: string[];
  cols?: number;
  minRows?: number;
  sound?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "auto";
  className?: string;
  boardClassName?: string;
  tileClassName?: string;
  textClassName?: string;
  stagger?: number;
  headerTitle?: string;
}

export const TextFlippingBoard: React.FC<TextFlippingBoardProps> = ({
  text = "",
  rows: customRows,
  cols: customCols,
  minRows = 3,
  sound = false,
  size = "auto",
  className,
  boardClassName,
  tileClassName,
  textClassName,
  stagger = 0.03,
  headerTitle = "TERMINAL // VESTABOARD",
}) => {
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);

  useEffect(() => {
    if (sound && typeof window !== "undefined") {
      const AudioContextClass =
        window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        const ctx = new AudioContextClass();
        setAudioCtx(ctx);
        return () => {
          ctx.close();
        };
      }
    }
  }, [sound]);

  // Compute rows and columns
  const parsedRows = useMemo(() => {
    if (customRows && customRows.length > 0) {
      return customRows;
    }
    return text.split("\n");
  }, [text, customRows]);

  const maxCols = useMemo(() => {
    if (customCols) return customCols;
    const longestLine = Math.max(...parsedRows.map((r) => r.length), 10);
    return Math.max(longestLine, 18);
  }, [parsedRows, customCols]);

  const totalRowsCount = useMemo(() => {
    return Math.max(parsedRows.length, minRows);
  }, [parsedRows, minRows]);

  // Format grid cells
  const grid = useMemo(() => {
    const lines: string[] = [];
    for (let r = 0; r < totalRowsCount; r++) {
      const line = parsedRows[r] || "";
      const padded = line.padEnd(maxCols, " ").slice(0, maxCols);
      lines.push(padded);
    }
    return lines;
  }, [parsedRows, totalRowsCount, maxCols]);

  return (
    <div
      className={cn(
        "inline-flex flex-col p-3 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-[#09090b] border border-neutral-800 shadow-2xl overflow-x-auto max-w-full",
        className
      )}
    >
      {/* Vestaboard Outer Frame Header */}
      <div className="flex items-center justify-between pb-2.5 sm:pb-3 mb-2.5 sm:mb-3 border-b border-neutral-800/80 px-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] sm:text-xs font-mono tracking-widest text-neutral-400 uppercase">
            {headerTitle}
          </span>
        </div>
        <div className="flex items-center gap-2 text-[9px] sm:text-[11px] font-mono text-neutral-500">
          <span>STATUS: LIVE</span>
          <span>•</span>
          <span>{totalRowsCount}x{maxCols}</span>
        </div>
      </div>

      {/* The Flap Grid */}
      <div
        className={cn(
          "flex flex-col gap-1 sm:gap-1.5 items-center justify-center p-2 sm:p-3 rounded-lg bg-black/70 border border-neutral-900",
          boardClassName
        )}
      >
        {grid.map((rowText, rowIndex) => (
          <div key={rowIndex} className="flex gap-0.5 sm:gap-1 md:gap-1.5 justify-center">
            {rowText.split("").map((char, colIndex) => {
              const delay = (rowIndex * 0.1) + (colIndex * stagger);
              return (
                <SplitFlapCell
                  key={`${rowIndex}-${colIndex}`}
                  char={char}
                  delay={delay}
                  sound={sound}
                  audioCtx={audioCtx}
                  size={size}
                  className={tileClassName}
                  textClassName={textClassName}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TextFlippingBoard;
