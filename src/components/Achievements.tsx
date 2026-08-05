import React from 'react';
import { motion } from 'framer-motion';
import { ACHIEVEMENTS } from '../data/portfolioData';
import { Trophy, Award, Medal, Star, Calendar } from 'lucide-react';

export const Achievements: React.FC = () => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'Award': return Award;
      case 'Hackathon': return Trophy;
      case 'Competition': return Medal;
      default: return Star;
    }
  };

  return (
    <section id="achievements" className="py-24 relative bg-obsidian-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-xs font-mono font-bold tracking-widest text-copper-400 uppercase bg-copper-500/10 px-3 py-1 rounded-full border border-copper-500/20">
            Honors & Milestones
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-4">
            Awards & <span className="text-gradient-hybrid">Hackathon Podia</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3">
            Chronological milestone timeline of national competitions, hackathon recognitions, and engineering honors.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Central Glowing Line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-ice-500 via-copper-500 to-ice-600 opacity-30 -translate-x-1/2" />

          <div className="space-y-12">
            {ACHIEVEMENTS.map((item, idx) => {
              const Icon = getIcon(item.type);
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  
                  {/* Timeline Center Node */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 z-10 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-obsidian-950 border-2 border-ice-400 text-ice-400 flex items-center justify-center shadow-lg shadow-ice-500/20">
                      <Icon className="w-5 h-5 text-copper-400" />
                    </div>
                  </div>

                  {/* Achievement Content Card */}
                  <div className={`w-full sm:w-[calc(50%-2rem)] pl-12 sm:pl-0 ${isEven ? 'sm:pr-0' : 'sm:pl-0'}`}>
                    <div className="glass-card glass-card-hover p-6 rounded-3xl border border-white/10 relative overflow-hidden group">
                      
                      {/* Image Preview if available */}
                      {item.image && (
                        <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden mb-4 bg-obsidian-950">
                          {/* // Upload award image here */}
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}

                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-copper-500/10 border border-copper-500/30 text-copper-400 text-[11px] font-mono">
                          {item.type}
                        </span>
                        <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {item.date}
                        </span>
                      </div>

                      {/* // Add achievement details */}
                      <h3 className="text-lg font-bold text-white group-hover:text-ice-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs font-mono text-ice-400 font-semibold mt-0.5">
                        {item.subtitle} — {item.organization}
                      </p>
                      
                      <p className="text-slate-300 text-xs sm:text-sm mt-3 leading-relaxed">
                        {item.description}
                      </p>

                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
