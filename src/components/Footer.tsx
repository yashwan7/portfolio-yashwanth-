import React from 'react';
import { ArrowUp, Terminal } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 bg-obsidian-950 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Info */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-obsidian-900 border border-white/10 flex items-center justify-center text-ice-400">
            <Terminal className="w-4 h-4" />
          </div>
          <div className="text-xs text-slate-400 font-mono">
            <p className="text-[10px] text-slate-500">© {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.</p>
          </div>
        </div>

        {/* Center Quick Links */}
        <div className="flex items-center gap-6 text-xs font-mono text-slate-400">
          <a href="#about" className="hover:text-ice-400 transition-colors">About</a>
          <a href="#projects" className="hover:text-ice-400 transition-colors">Projects</a>
          <a href="#tech-stack" className="hover:text-ice-400 transition-colors">Tech Stack</a>
          <a href="#certificates" className="hover:text-ice-400 transition-colors">Certificates</a>
          <a href="#contact" className="hover:text-ice-400 transition-colors">Contact</a>
        </div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="p-3 rounded-2xl bg-obsidian-900 border border-white/10 hover:border-ice-400 text-slate-300 hover:text-ice-400 transition-all flex items-center gap-2 text-xs font-mono group"
          title="Back to Top"
        >
          <span>Back to Top</span>
          <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
        </button>

      </div>
    </footer>
  );
};
