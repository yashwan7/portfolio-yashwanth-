import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, Eye, ExternalLink, X, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-xl"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative max-w-5xl w-full h-[88vh] bg-[#12151b] rounded-2xl border border-white/15 overflow-hidden z-10 flex flex-col shadow-2xl"
        >
          {/* Header Bar */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/60">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-ice-400">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">{PERSONAL_INFO.name} — Resume</h3>
                <p className="text-xs font-mono text-slate-400">Backend & Cloud Native Engineer</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={PERSONAL_INFO.resumeUrl}
                download="Yashwanth_SN_Resume.pdf"
                className="px-3.5 py-1.5 rounded-lg bg-neutral-800 border border-white/20 text-white font-mono text-xs flex items-center gap-1.5 hover:bg-neutral-700 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </a>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-black/60 border border-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* PDF Viewer */}
          <div className="flex-1 bg-black overflow-hidden relative">
            <iframe
              src={PERSONAL_INFO.resumeUrl}
              title="Yashwanth S N Resume PDF"
              className="w-full h-full border-0"
            />
          </div>

          {/* Footer Bar */}
          <div className="p-3 border-t border-white/10 bg-black/60 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Yashwanth S N — Resume</span>
            <a
              href={PERSONAL_INFO.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white flex items-center gap-1 transition-colors"
            >
              <span>Open PDF in New Tab</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export const ResumeSection: React.FC<{ onOpenModal: () => void }> = ({ onOpenModal }) => {
  const highlights = [
    'Computer & Communication Engineering Student (KSIT)',
    'Backend Architecture: Java, Spring Boot, Spring Cloud Gateway',
    'Cloud & Infrastructure: Docker, Kubernetes, Redis, Linux',
    'AI & Automation: Python, LangChain, Vector RAG',
    'National Awards: Suzlon Award 2026 & EcoSpark 2026 Winner',
    '135+ Algorithmic Problems Solved on LeetCode',
  ];

  return (
    <section id="resume" className="py-8 relative">
      <div className="w-full sm:px-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="p-6 sm:p-8 rounded-2xl bg-[#090a0d]/80 backdrop-blur-2xl border border-white/[0.08] shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
        >
          <div className="space-y-3 max-w-2xl">
            <h2 className="text-lg sm:text-2xl font-serif font-medium text-white tracking-tight">
              Resume & Career Overview
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Detailed technical background, system architecture experience, academic milestones, and project achievements formatted in a standard PDF.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
              {highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-2 text-xs font-mono text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 w-full sm:w-auto flex-shrink-0">
            <button
              onClick={onOpenModal}
              className="px-5 py-2.5 rounded-xl bg-neutral-900 border border-white/20 hover:border-white/40 text-white font-medium text-xs flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview Interactive Resume</span>
            </button>

            <a
              href={PERSONAL_INFO.resumeUrl}
              download="Yashwanth_SN_Resume.pdf"
              className="px-5 py-2.5 rounded-xl bg-black/60 border border-white/10 hover:border-white/30 text-slate-300 hover:text-white font-mono text-xs flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Resume PDF</span>
            </a>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default ResumeSection;
