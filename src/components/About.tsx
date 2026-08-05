import React from 'react';
import { motion } from 'framer-motion';
import { Server, Cloud, Cpu, GraduationCap, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const About: React.FC = () => {
  const focusAreas = [
    {
      title: 'Backend Engineering',
      icon: Server,
      color: 'text-ice-400 border-ice-500/20 bg-ice-500/5',
      description: 'Designing resilient microservices, high-throughput REST APIs, Redis rate limiters, and distributed databases.',
    },
    {
      title: 'Cloud Computing & Native Infra',
      icon: Cloud,
      color: 'text-copper-400 border-copper-500/20 bg-copper-500/5',
      description: 'Containerized orchestration with Docker & Kubernetes, CI/CD automated deployments, API Gateways, and cloud infra.',
    },
    {
      title: 'Artificial Intelligence & RAG',
      icon: Cpu,
      color: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5',
      description: 'Integrating LLMs, Agentic workflows using LangChain, Vector DBs (ChromaDB), and contextual memory architectures.',
    },
  ];

  return (
    <section id="about" className="py-20 relative bg-[#0d0f12]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading - Lakshya style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-left max-w-3xl mb-10"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-ice-400 animate-pulse" />
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
              About Me
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif italic text-white tracking-tight font-normal">
            Engineered for Performance & Scale
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
            {PERSONAL_INFO.bio}
          </p>
        </motion.div>

        {/* Education & Focus Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {focusAreas.map((area, idx) => {
            const Icon = area.icon;
            return (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 border ${area.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{area.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{area.description}</p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/[0.06] flex items-center gap-2 text-[11px] font-mono text-slate-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Production Ready</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Academic Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-5"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-ice-500/10 border border-ice-500/30 flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-6 h-6 text-ice-400" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">Computer & Communication Engineering Student</h4>
              <p className="text-xs text-slate-400">Specializing in Scalable Distributed Systems, Cloud Infrastructure & AI</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <a
              href="#contact"
              className="w-full md:w-auto px-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 hover:border-ice-400/40 text-xs font-mono text-slate-200 text-center transition-all hover:bg-white/10"
            >
              Contact Yashwanth →
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;
