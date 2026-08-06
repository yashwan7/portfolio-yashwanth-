import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TECH_STACK, TechItem } from '../data/portfolioData';
import { Terminal, Info, Sparkles } from 'lucide-react';
import { FaJava } from 'react-icons/fa';
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiPostgresql,
  SiSpringboot,
  SiSpring,
  SiFastapi,
  SiNodedotjs,
  SiLangchain,
  SiPytorch,
  SiDocker,
  SiKubernetes,
  SiGit,
  SiLinux,
  SiRedis,
  SiMongodb,
  SiReact,
  SiTailwindcss
} from 'react-icons/si';

export const TechStack: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [hoveredTech, setHoveredTech] = useState<TechItem | null>(null);

  const techLogos: Record<string, { icon: React.ElementType; color: string }> = {
    'Java': { icon: FaJava, color: 'text-amber-500' },
    'Python': { icon: SiPython, color: 'text-sky-400' },
    'JavaScript': { icon: SiJavascript, color: 'text-yellow-400' },
    'TypeScript': { icon: SiTypescript, color: 'text-blue-400' },
    'SQL': { icon: SiPostgresql, color: 'text-blue-300' },
    'Spring Boot': { icon: SiSpringboot, color: 'text-emerald-500' },
    'Spring Cloud Gateway': { icon: SiSpring, color: 'text-emerald-400' },
    'FastAPI / Node.js': { icon: SiFastapi, color: 'text-teal-400' },
    'FastAPI': { icon: SiFastapi, color: 'text-teal-400' },
    'Node.js': { icon: SiNodedotjs, color: 'text-green-500' },
    'LangChain': { icon: SiLangchain, color: 'text-emerald-400' },
    'RAG & Vector DBs': { icon: Sparkles, color: 'text-teal-300' },
    'PyTorch / ML': { icon: SiPytorch, color: 'text-orange-500' },
    'Docker': { icon: SiDocker, color: 'text-sky-400' },
    'Kubernetes': { icon: SiKubernetes, color: 'text-blue-500' },
    'Git': { icon: SiGit, color: 'text-orange-600' },
    'Linux / Unix': { icon: SiLinux, color: 'text-yellow-300' },
    'Linux': { icon: SiLinux, color: 'text-yellow-300' },
    'Redis': { icon: SiRedis, color: 'text-red-500' },
    'MongoDB': { icon: SiMongodb, color: 'text-emerald-500' },
    'MySQL / PostgreSQL': { icon: SiPostgresql, color: 'text-indigo-400' },
    'PostgreSQL': { icon: SiPostgresql, color: 'text-indigo-400' },
    'React.js': { icon: SiReact, color: 'text-cyan-400' },
    'Tailwind CSS': { icon: SiTailwindcss, color: 'text-sky-400' },
  };

  const categories = [
    'All',
    'Backend',
    'AI',
    'Cloud',
    'DevOps',
    'Database',
    'Programming Languages',
    'Frontend',
  ];

  const marqueeItems = [
    'Java',
    'Python',
    'JavaScript',
    'TypeScript',
    'Spring Boot',
    'FastAPI',
    'Node.js',
    'React.js',
    'LangChain',
    'Docker',
    'Kubernetes',
    'Redis',
    'PostgreSQL',
    'MongoDB',
    'Git',
  ];

  const filteredTech = selectedCategory === 'All'
    ? TECH_STACK
    : TECH_STACK.filter(t => t.category === selectedCategory);

  const getTechIcon = (name: string) => {
    return techLogos[name] || { icon: Terminal, color: 'text-slate-300' };
  };

  return (
    <section id="tech-stack" className="py-8 relative">
      <div className="w-full sm:px-8 px-4">
        
        {/* Section Header - Inspired by lakshyaworks.dev */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-4"
        >
          <h2 className="text-lg sm:text-xl opacity-40 font-serif font-medium text-white mb-1">
            Stack I use
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 opacity-70">
            Technologies I work with to build products that solve real problems
          </p>
        </motion.div>

        {/* Marquee Row with Real Brand Logos */}
        <div className="mb-8 py-3 px-2 rounded-xl bg-neutral-900/40 border border-white/5 overflow-hidden relative">
          <div className="flex gap-3 animate-marquee whitespace-nowrap">
            {[...marqueeItems, ...marqueeItems].map((item, idx) => {
              const { icon: Icon, color } = getTechIcon(item);
              return (
                <div
                  key={idx}
                  className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg bg-neutral-950/80 border border-white/10 text-xs font-mono text-slate-300 hover:text-white shrink-0 transition-all hover:border-white/30 group"
                >
                  <Icon className={`w-4 h-4 ${color} transition-transform group-hover:scale-110`} />
                  <span>{item}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 flex-wrap mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-md text-xs font-mono transition-all ${
                selectedCategory === cat
                  ? 'bg-neutral-800 text-white border border-white/20'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid & Node Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Tech Cards Grid with Authentic Brand Logos */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
            <AnimatePresence mode="popLayout">
              {filteredTech.map((tech) => {
                const { icon: Icon, color } = getTechIcon(tech.name);
                return (
                  <motion.div
                    key={tech.name}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    onMouseEnter={() => setHoveredTech(tech)}
                    className="group cursor-pointer"
                  >
                    <div className="p-3 rounded-xl bg-neutral-900/60 border border-white/10 apple-dock-icon hover:border-white/30 hover:bg-neutral-900/90 shadow-md flex items-center justify-between">
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        <div className="w-8 h-8 rounded-lg bg-neutral-950 border border-white/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:border-white/40 group-hover:scale-110">
                          <Icon className={`w-4 h-4 ${color} transition-transform duration-300 group-hover:scale-110`} />
                        </div>
                        <div className="overflow-hidden">
                          <h4 className="text-xs font-medium text-white/90 group-hover:text-white truncate">
                            {tech.name}
                          </h4>
                          <p className="text-[10px] font-mono text-slate-500 truncate">
                            {tech.category}
                          </p>
                        </div>
                      </div>
                      <Info className="w-3 h-3 text-slate-600 group-hover:text-cyan-400 transition-colors flex-shrink-0 ml-1" />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Node Inspector */}
          <div className="lg:col-span-4">
            <div className="p-4 rounded-xl bg-neutral-900/40 border border-white/5">
              <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
                Architecture Detail
              </h3>

              {hoveredTech ? (
                (() => {
                  const { icon: InspectorIcon, color: inspectorColor } = getTechIcon(hoveredTech.name);
                  return (
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-neutral-950 border border-white/10 flex items-center justify-center">
                          <InspectorIcon className={`w-4 h-4 ${inspectorColor}`} />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white">{hoveredTech.name}</h4>
                          <span className="text-[10px] font-mono text-slate-400">{hoveredTech.category} — {hoveredTech.level}</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed mt-2 bg-black/40 p-2.5 rounded-lg border border-white/5">
                        {hoveredTech.experience}
                      </p>
                    </div>
                  );
                })()
              ) : (
                <p className="text-xs font-mono text-slate-500 py-4 text-center">
                  Hover over any tech item to view details.
                </p>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default TechStack;
