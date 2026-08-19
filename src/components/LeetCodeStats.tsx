import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SiLeetcode } from 'react-icons/si';
import { ExternalLink, Flame } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const LeetCodeStats: React.FC = () => {
  const username = 'yashwanth_sn';

  const [stats, setStats] = useState({
    totalSolved: 137,
    easySolved: 79,
    mediumSolved: 45,
    hardSolved: 13,
    globalRanking: '#1,264,576',
  });

  useEffect(() => {
    fetch(`https://leetcode-stats-api.vercel.app/${username}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.totalSolved === 'number' && data.totalSolved > 0) {
          setStats({
            totalSolved: data.totalSolved,
            easySolved: data.easySolved || 0,
            mediumSolved: data.mediumSolved || 0,
            hardSolved: data.hardSolved || 0,
            globalRanking: data.ranking ? `#${Number(data.ranking).toLocaleString()}` : '#1,264,576',
          });
        }
      })
      .catch(() => {
        // Fallback initialized above
      });
  }, [username]);

  return (
    <section className="py-16 relative bg-[#0d0f12]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header - Inspired by lakshyaworks.dev */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between mb-6"
        >
          <h2 className="text-lg sm:text-xl font-normal text-slate-300 font-sans flex items-center gap-2">
            <span>LeetCode Solved</span>
            <span className="text-amber-400">●</span>
            <a
              href={PERSONAL_INFO.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white font-mono text-sm sm:text-base transition-colors inline-flex items-center gap-1"
            >
              @{username}
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </a>
          </h2>
        </motion.div>

        {/* Clean LeetCode Solved Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] shadow-sm max-w-4xl"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-white/[0.06]">
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <SiLeetcode className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono text-slate-400 uppercase">Total Problems Solved</span>
                <h3 className="text-3xl font-extrabold text-white mt-0.5">
                  {stats.totalSolved}+
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-6 font-mono text-xs">
              <div>
                <span className="text-slate-400 block">Ranking</span>
                <span className="text-ice-400 font-bold text-sm">{stats.globalRanking}</span>
              </div>
              <a
                href={PERSONAL_INFO.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs hover:bg-amber-500/20 transition-all flex items-center gap-1.5"
              >
                <span>View LeetCode Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

          {/* Progress Bars Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
            
            <div>
              <div className="flex justify-between text-xs font-mono mb-1.5">
                <span className="text-emerald-400 font-semibold">Easy</span>
                <span className="text-slate-300">{stats.easySolved} Solved</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/[0.06] overflow-hidden">
                <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${Math.min(100, (stats.easySolved / stats.totalSolved) * 100)}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1.5">
                <span className="text-amber-400 font-semibold">Medium</span>
                <span className="text-slate-300">{stats.mediumSolved} Solved</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/[0.06] overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full" style={{ width: `${Math.min(100, (stats.mediumSolved / stats.totalSolved) * 100)}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1.5">
                <span className="text-rose-400 font-semibold">Hard</span>
                <span className="text-slate-300">{stats.hardSolved} Solved</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/[0.06] overflow-hidden">
                <div className="h-full bg-rose-400 rounded-full" style={{ width: `${Math.min(100, (stats.hardSolved / stats.totalSolved) * 100)}%` }} />
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default LeetCodeStats;
