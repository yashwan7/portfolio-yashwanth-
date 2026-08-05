import React from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '../data/portfolioData';

export const GitHubStats: React.FC = () => {
  const username = 'yashwan7';

  return (
    <section className="py-8 relative">
      <div className="w-full sm:px-8 px-4">
        
        {/* Header - Inspired by lakshyaworks.dev */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-4"
        >
          <h2 className="text-lg sm:text-xl opacity-40 font-serif font-medium text-white flex items-center gap-2">
            <span>GitHub Contributions</span>
            <span className="text-emerald-500 opacity-80">●</span>
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-100 font-mono text-sm transition-opacity inline-flex items-center gap-1"
            >
              @{username}
            </a>
          </h2>
        </motion.div>

        {/* GitHub Black Background & Green Dots Contribution Graph Box */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="p-4 rounded-xl bg-[#0d1117] border border-emerald-900/30 overflow-hidden flex flex-col items-center justify-center shadow-lg"
        >
          <div className="w-full overflow-x-auto py-2 flex justify-center scrollbar-thin">
            {/* Live Green Dots Contribution Chart on Black Background */}
            <img
              src={`https://ghchart.rshah.org/3fb950/${username}`}
              alt={`${username}'s GitHub Contributions`}
              className="w-full max-w-4xl min-w-[650px] h-auto rounded filter drop-shadow-md"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=github-dark`;
              }}
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default GitHubStats;
