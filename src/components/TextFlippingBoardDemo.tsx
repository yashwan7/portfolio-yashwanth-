"use client";
import React, { useState, useEffect, useCallback } from "react";
import { TextFlippingBoard } from "./ui/text-flipping-board";
import { Volume2, VolumeX, SkipForward } from "lucide-react";

const MESSAGES: string[] = [
  "STAY HUNGRY \nSTAY IN BED \n- STEVE JOBS",
  "What did you get done this week?",
  "I burned $20 \nfor this shit.",
  "DONT WORRY \nBE HAPPY FFS.",
  "LADIES AND GENTLEMEN \nWELCOME TO F#!@# C!@$",
];

export function TextFlippingBoardDemo() {
  const [msgIdx, setMsgIdx] = useState(0);
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);

  const next = useCallback(
    () => setMsgIdx((i) => (i + 1) % MESSAGES.length),
    []
  );

  useEffect(() => {
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [next]);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-6 py-12 px-4">
      {/* Board Display */}
      <TextFlippingBoard
        text={MESSAGES[msgIdx]}
        sound={isSoundEnabled}
        minRows={3}
      />

      {/* Interactive Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={next}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-mono border border-neutral-700 transition"
        >
          <SkipForward className="w-3.5 h-3.5" />
          Next Message ({msgIdx + 1}/{MESSAGES.length})
        </button>

        <button
          onClick={() => setIsSoundEnabled((prev) => !prev)}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono border transition ${
            isSoundEnabled
              ? "bg-emerald-950/60 border-emerald-700/60 text-emerald-300"
              : "bg-neutral-800 hover:bg-neutral-700 border-neutral-700 text-neutral-400"
          }`}
        >
          {isSoundEnabled ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
              Sound: ON
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5" />
              Sound: OFF
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default TextFlippingBoardDemo;
