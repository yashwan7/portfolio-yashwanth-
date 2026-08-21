"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";

const CHAR_SET = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_+=/.,:;?'\"";

const FLIP_COLORS = [
  "bg-blue-600 text-white",
  "bg-emerald-600 text-white",
  "bg-amber-500 text-white",
  "bg-indigo-600 text-white",
  "bg-rose-600 text-white",
  "bg-teal-600 text-white",
];

export interface SplitFlapCellProps {
  char: string;
  previousChar?: string;
  delay?: number;
  flipCount?: number;
  sound?: boolean;
  audioCtx?: AudioContext | null;
  className?: string;
  textClassName?: string;
}

const playFlapAudio = (ctx?: AudioContext | null) => {
  if (!ctx) return;
  try {
    if (ctx.state === "suspended") {
      ctx.resume();
    }
    const bufferSize = Math.floor(ctx.sampleRate * 0.012);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(800 + Math.random() * 250, ctx.currentTime);
    filter.Q.setValueAtTime(3.5, ctx.currentTime);

    const gain = ctx.createGain();
    // Gentle, soft mechanical sound volume
    gain.gain.setValueAtTime(0.025, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.015);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
  } catch {
    // Ignore audio permission errors
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
}) => {
  const targetChar = (char || " ").toUpperCase();
  const [currentChar, setCurrentChar] = useState(targetChar);
  const [prevChar, setPrevChar] = useState(targetChar);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipKey, setFlipKey] = useState(0);
  const [colorClass, setColorClass] = useState<string | null>(null);

  const prevTargetRef = useRef(targetChar);

  useEffect(() => {
    if (targetChar === prevTargetRef.current) return;

    const oldChar = prevTargetRef.current;
    prevTargetRef.current = targetChar;

    let timeoutId: NodeJS.Timeout;
    const intervals: NodeJS.Timeout[] = [];

    timeoutId = setTimeout(() => {
      const steps: { char: string; color: string | null }[] = [];
      const numSteps = Math.max(2, Math.min(5, flipCount + Math.floor(Math.random() * 2)));

      for (let i = 0; i < numSteps - 1; i++) {
        const randIndex = Math.floor(Math.random() * CHAR_SET.length);
        // Occasionally show a vibrant Vestaboard color flap
        const hasColor = Math.random() < 0.25;
        const color = hasColor ? FLIP_COLORS[Math.floor(Math.random() * FLIP_COLORS.length)] : null;
        steps.push({ char: CHAR_SET[randIndex], color });
      }
      steps.push({ char: targetChar, color: null });

      let stepIdx = 0;
      let lastStepChar = oldChar;

      const stepInterval = setInterval(() => {
        if (stepIdx < steps.length) {
          const next = steps[stepIdx];
          setPrevChar(lastStepChar);
          setCurrentChar(next.char);
          setColorClass(next.color);
          setIsFlipping(true);
          setFlipKey((k) => k + 1);

          if (sound && audioCtx) {
            playFlapAudio(audioCtx);
          }

          lastStepChar = next.char;
          stepIdx++;
        } else {
          clearInterval(stepInterval);
          setIsFlipping(false);
          setColorClass(null);
        }
      }, 80);

      intervals.push(stepInterval);
    }, delay * 1000);

    return () => {
      clearTimeout(timeoutId);
      intervals.forEach((id) => clearInterval(id));
    };
  }, [targetChar, delay, flipCount, sound, audioCtx]);

  const isColor = Boolean(colorClass);

  return (
    <div
      className={cn(
        "relative w-[13px] h-[22px] xs:w-[17px] xs:h-[28px] sm:w-[22px] sm:h-[36px] md:w-[28px] md:h-[46px] lg:w-[34px] lg:h-[54px] rounded-[3px] sm:rounded-[4px] select-none shadow-[0_1px_3px_rgba(0,0,0,0.12)] border border-[#d6d8dd] flex flex-col justify-between overflow-hidden transition-colors",
        isColor ? colorClass : "bg-[#fafafa]",
        className
      )}
      style={{ perspective: "600px" }}
    >
      {/* Top Half Fixed */}
      <div
        className={cn(
          "relative w-full h-1/2 overflow-hidden border-b border-[#c8cbd0] rounded-t-[2px]",
          isColor ? "bg-inherit" : "bg-[#ffffff]"
        )}
      >
        <div className="absolute inset-0 flex items-center justify-center translate-y-1/2">
          <span
            className={cn(
              "font-mono font-bold leading-none tracking-tight text-[11px] xs:text-[14px] sm:text-[18px] md:text-[23px] lg:text-[28px]",
              isColor ? "text-white" : "text-[#18181b]",
              textClassName
            )}
          >
            {currentChar}
          </span>
        </div>
        {/* Subtle Glare */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />
      </div>

      {/* Bottom Half Fixed with Etched Rib Lines */}
      <div
        className={cn(
          "relative w-full h-1/2 overflow-hidden rounded-b-[2px]",
          isColor ? "bg-inherit" : "bg-[#f4f4f5]"
        )}
      >
        <div className="absolute inset-0 flex items-center justify-center -translate-y-1/2">
          <span
            className={cn(
              "font-mono font-bold leading-none tracking-tight text-[11px] xs:text-[14px] sm:text-[18px] md:text-[23px] lg:text-[28px]",
              isColor ? "text-white" : "text-[#18181b]",
              textClassName
            )}
          >
            {currentChar}
          </span>
        </div>

        {/* Ribbed lines on bottom flap - exact to Vestaboard */}
        {!isColor && (
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 3px)",
            }}
          />
        )}
      </div>

      {/* Animated Top Flap 3D Flip */}
      <AnimatePresence mode="popLayout">
        {isFlipping && (
          <motion.div
            key={flipKey}
            initial={{ rotateX: 0 }}
            animate={{ rotateX: -180 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16, ease: "easeInOut" }}
            style={{
              transformOrigin: "bottom center",
              transformStyle: "preserve-3d",
            }}
            className={cn(
              "absolute top-0 left-0 w-full h-1/2 border-b border-[#c8cbd0] rounded-t-[2px] overflow-hidden z-20",
              isColor ? colorClass : "bg-[#ffffff]"
            )}
          >
            <div className="absolute inset-0 flex items-center justify-center translate-y-1/2">
              <span
                className={cn(
                  "font-mono font-bold leading-none tracking-tight text-[11px] xs:text-[14px] sm:text-[18px] md:text-[23px] lg:text-[28px]",
                  isColor ? "text-white" : "text-[#18181b]",
                  textClassName
                )}
              >
                {prevChar}
              </span>
            </div>
            {/* Darkening shadow on flip */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Split Line & Hinge notches */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#9ca3af]/40 -translate-y-1/2 z-30" />
      <div className="absolute top-1/2 left-0 w-[1.5px] h-[3px] bg-[#9ca3af]/80 -translate-y-1/2 z-40 rounded-r-[1px]" />
      <div className="absolute top-1/2 right-0 w-[1.5px] h-[3px] bg-[#9ca3af]/80 -translate-y-1/2 z-40 rounded-l-[1px]" />
    </div>
  );
};

export interface TextFlippingBoardProps {
  text?: string;
  rows?: string[];
  cols?: number;
  totalRows?: number;
  minRows?: number;
  sound?: boolean;
  className?: string;
  boardClassName?: string;
  tileClassName?: string;
  textClassName?: string;
  stagger?: number;
}

export const TextFlippingBoard: React.FC<TextFlippingBoardProps> = ({
  text = "",
  rows: customRows,
  cols = 24,
  totalRows = 6,
  minRows,
  sound = false,
  className,
  boardClassName,
  tileClassName,
  textClassName,
  stagger = 0.025,
}) => {
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);
  const effectiveRows = minRows || totalRows;

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

  // Format text into rows
  const parsedRows = useMemo(() => {
    if (customRows && customRows.length > 0) {
      return customRows;
    }
    return text.split("\n");
  }, [text, customRows]);

  // Center vertical placement if fewer rows provided
  const grid = useMemo(() => {
    const lines: string[] = [];
    const contentRows = parsedRows.length;
    const topPad = Math.max(0, Math.floor((effectiveRows - contentRows) / 2));

    for (let r = 0; r < effectiveRows; r++) {
      if (r < topPad || r >= topPad + contentRows) {
        lines.push(" ".repeat(cols));
      } else {
        const rawLine = parsedRows[r - topPad] || "";
        const trimmed = rawLine.slice(0, cols);
        // Center text horizontally in row
        const totalPad = Math.max(0, cols - trimmed.length);
        const padLeft = Math.floor(totalPad / 2);
        const padRight = totalPad - padLeft;
        const centered = " ".repeat(padLeft) + trimmed + " ".repeat(padRight);
        lines.push(centered);
      }
    }
    return lines;
  }, [parsedRows, effectiveRows, cols]);

  return (
    <div
      className={cn(
        "inline-flex flex-col p-3 xs:p-4 sm:p-6 md:p-8 rounded-2xl md:rounded-3xl bg-[#f0f1f4] border border-[#d2d5dc] shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden max-w-full",
        className
      )}
    >
      {/* Flap Grid Container */}
      <div
        className={cn(
          "flex flex-col gap-[3px] xs:gap-[4px] sm:gap-[5px] md:gap-[6px] items-center justify-center p-2 sm:p-3 md:p-4 rounded-xl md:rounded-2xl bg-[#e5e7eb]/80 border border-[#d1d5db]",
          boardClassName
        )}
      >
        {grid.map((rowText, rowIndex) => (
          <div
            key={rowIndex}
            className="flex gap-[2px] xs:gap-[3px] sm:gap-[4px] md:gap-[5px] justify-center"
          >
            {rowText.split("").map((char, colIndex) => {
              const delay = rowIndex * 0.08 + colIndex * stagger;
              return (
                <SplitFlapCell
                  key={`${rowIndex}-${colIndex}`}
                  char={char}
                  delay={delay}
                  sound={sound}
                  audioCtx={audioCtx}
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
