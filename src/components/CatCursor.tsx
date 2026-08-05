import React, { useEffect, useState, useRef } from 'react';

export const CatCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [facingLeft, setFacingLeft] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mousePos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const updatePhysics = () => {
      // Slow, smooth trailing lerp factor (0.045 = graceful slow chasing)
      const lerpFactor = 0.045;
      const dx = mousePos.current.x - currentPos.current.x;
      const dy = mousePos.current.y - currentPos.current.y;
      const distance = Math.hypot(dx, dy);

      // If cat is more than 16px away from mouse, run slowly towards cursor
      if (distance > 16) {
        currentPos.current.x += dx * lerpFactor;
        currentPos.current.y += dy * lerpFactor;
        setIsMoving(true);

        if (Math.abs(dx) > 0.4) {
          setFacingLeft(dx < 0);
        }
      } else {
        // Cat has arrived near cursor - sit down and rest
        setIsMoving(false);
      }

      setPos({ x: currentPos.current.x, y: currentPos.current.y });
      animFrameId.current = requestAnimationFrame(updatePhysics);
    };

    animFrameId.current = requestAnimationFrame(updatePhysics);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-300"
      style={{
        transform: `translate3d(${pos.x + 14}px, ${pos.y + 14}px, 0) scaleX(${facingLeft ? -1 : 1})`,
        willChange: 'transform',
      }}
    >
      {/* 4-Legged White Cat SVG */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 48 48"
        className="filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]"
      >
        {isMoving ? (
          /* ================= RUNNING WHITE CAT (4 LEGS RUNNING) ================= */
          <g>
            {/* Tail */}
            <path
              d="M 36 22 Q 44 18 42 10"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="animate-cat-tail"
            />

            {/* Back Legs (Leg 1 & Leg 2) */}
            <g className="animate-cat-leg-back">
              <rect x="28" y="26" width="3.5" height="10" rx="1.7" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="0.8" />
              <rect x="18" y="26" width="3.5" height="10" rx="1.7" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="0.8" />
            </g>

            {/* Main White Body */}
            <ellipse cx="24" cy="24" rx="12" ry="7.5" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.2" />

            {/* Front Legs (Leg 3 & Leg 4) */}
            <g className="animate-cat-leg-front">
              <rect x="24" y="26" width="3.5" height="11" rx="1.7" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.8" />
              <rect x="12" y="26" width="3.5" height="11" rx="1.7" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.8" />
            </g>

            {/* Head */}
            <circle cx="13" cy="18" r="7.5" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.2" />

            {/* Ears */}
            <polygon points="7,13 10,4 13,12" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
            <polygon points="8.5,12 10,6 12,12" fill="#F472B6" />

            <polygon points="13,12 16,4 19,13" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
            <polygon points="14.5,12 16,6 17.5,12" fill="#F472B6" />

            {/* Eyes */}
            <circle cx="10.5" cy="17.5" r="1.5" fill="#0F172A" />
            <circle cx="15.5" cy="17.5" r="1.5" fill="#0F172A" />
            <circle cx="11" cy="17" r="0.5" fill="#FFFFFF" />
            <circle cx="16" cy="17" r="0.5" fill="#FFFFFF" />

            {/* Pink Nose */}
            <polygon points="12.5,19.5 13.5,19.5 13,20.5" fill="#F472B6" />
          </g>
        ) : (
          /* ================= SITTING WHITE CAT (RESTING POSTURE) ================= */
          <g>
            {/* Tail Wrapped Around */}
            <path
              d="M 28 32 C 38 34 38 22 34 18"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Folded Back Legs (Leg 1 & 2) */}
            <ellipse cx="28" cy="32" rx="6" ry="4" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1" />

            {/* Sitting Upright White Body */}
            <path
              d="M 16 20 C 14 26 14 34 20 36 C 26 36 28 34 26 20 Z"
              fill="#FFFFFF"
              stroke="#CBD5E1"
              strokeWidth="1.2"
            />

            {/* Upright Front Legs (Leg 3 & 4 sitting neatly) */}
            <rect x="17" y="24" width="3.2" height="12" rx="1.6" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.8" />
            <rect x="22" y="24" width="3.2" height="12" rx="1.6" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.8" />

            {/* Head */}
            <circle cx="21" cy="15" r="7.5" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.2" />

            {/* Ears */}
            <polygon points="15,10 18,2 21,9" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
            <polygon points="16.5,9 18,4 19.5,9" fill="#F472B6" />

            <polygon points="21,9 24,2 27,10" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
            <polygon points="22.5,9 24,4 25.5,9" fill="#F472B6" />

            {/* Cute Sitting Eyes ^ ^ */}
            <path d="M 18.5 15 Q 20 13 21.5 15" fill="none" stroke="#1E293B" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M 22.5 15 Q 24 13 25.5 15" fill="none" stroke="#1E293B" strokeWidth="1.2" strokeLinecap="round" />

            {/* Pink Nose */}
            <polygon points="21.5,16.5 22.5,16.5 22,17.5" fill="#F472B6" />

            {/* Whiskers */}
            <line x1="14" y1="15.5" x2="18" y2="16" stroke="#94A3B8" strokeWidth="0.8" />
            <line x1="24" y1="16" x2="28" y2="15.5" stroke="#94A3B8" strokeWidth="0.8" />
          </g>
        )}
      </svg>
    </div>
  );
};

export default CatCursor;
