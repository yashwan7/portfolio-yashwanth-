import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { STATS } from '../data/portfolioData';
import { Award, Trophy, Code2, Star, Sparkles, BookOpen } from 'lucide-react';

// Count up helper sub-component
const CounterItem: React.FC<{
  value: number;
  suffix: string;
  label: string;
  highlight: string;
  isDecimal?: boolean;
  icon: React.ElementType;
  delay: number;
}> = ({ value, suffix, label, highlight, isDecimal, icon: Icon, delay }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000; // ms
    const frameTime = 1000 / 60;
    const totalFrames = Math.round(duration / frameTime);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // Easing cubic out
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentVal = start + (value - start) * easeOut;

      setCount(currentVal);

      if (frame >= totalFrames) {
        setCount(value);
        clearInterval(timer);
      }
    }, frameTime);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="glass-card glass-card-hover p-6 rounded-3xl border border-white/10 relative overflow-hidden flex flex-col justify-between group"
    >
      {/* Top Accent Icon */}
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-obsidian-900 border border-white/10 flex items-center justify-center text-ice-400 group-hover:text-copper-400 group-hover:border-copper-500/30 transition-all duration-300">
          <Icon className="w-5 h-5" />
        </div>
        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
          {highlight}
        </span>
      </div>

      {/* Animated Counter Number */}
      <div>
        <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight flex items-baseline gap-1">
          <span className="text-gradient-hybrid">
            {isDecimal ? count.toFixed(1) : Math.floor(count)}
          </span>
          <span className="text-xl sm:text-2xl text-ice-400 font-bold">{suffix}</span>
        </div>

        <p className="text-sm font-semibold text-slate-300 mt-2">{label}</p>
      </div>

      {/* Subtle Glow aura */}
      <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-ice-500/10 rounded-full blur-xl group-hover:bg-copper-500/20 transition-all duration-500 pointer-events-none" />
    </motion.div>
  );
};

export const Stats: React.FC = () => {
  const icons = [Code2, Trophy, Award, Sparkles, Star, BookOpen];

  return (
    <section className="py-20 relative bg-obsidian-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-mono font-bold tracking-widest text-copper-400 uppercase bg-copper-500/10 px-3 py-1 rounded-full border border-copper-500/20">
            Metrics & Impact
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3">
            Track Record at a Glance
          </h2>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {STATS.map((stat, idx) => (
            <CounterItem
              key={stat.id}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              highlight={stat.highlight}
              isDecimal={stat.isDecimal}
              icon={icons[idx % icons.length]}
              delay={idx * 0.1}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
