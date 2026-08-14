import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onOpenResumeModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResumeModal }) => {
  return (
    <section id="home" className="pt-20 sm:pt-24 pb-8">
      <div className="w-full">
        
        {/* Banner Image Card with Soft Fades - Inspired by lakshyaworks.dev */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full mb-2 relative"
        >
          <div className="relative h-48 sm:h-[270px] w-full rounded-lg overflow-hidden bg-neutral-900 border border-white/5">
            <img
              src="/images/banner-beach.jpg"
              alt="Aerial Beach Coastline Banner"
              className="w-full h-full object-cover opacity-80"
            />
            {/* Soft Gradient Borders */}
            <div className="absolute top-0 left-0 right-0 h-[60px] bg-gradient-to-b from-[#121212] to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-[60px] bg-gradient-to-t from-[#121212] to-transparent" />
            <div className="absolute top-0 left-0 w-[40px] sm:w-[60px] h-full bg-gradient-to-r from-[#121212] to-transparent" />
            <div className="absolute top-0 right-0 w-[40px] sm:w-[60px] h-full bg-gradient-to-l from-[#121212] to-transparent" />

            {/* Banner Quote */}
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <p className="text-black text-base sm:text-xl italic font-serif text-center font-bold drop-shadow-sm">
                "Driven. Engineering solutions that scale."
              </p>
            </div>
          </div>
        </motion.div>

        {/* Profile Avatar & Details Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex-col -mt-10"
        >
          {/* Avatar Profile Image */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 mb-4 sm:ml-8 ml-4 relative z-10 rounded-full overflow-hidden border-2 border-[#121212] shadow-xl bg-neutral-800">
            <img
              src="/images/pfp.jpg"
              alt={PERSONAL_INFO.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80";
              }}
            />
          </div>

          {/* Name & Subtitle & Social Icons Row */}
          <div className="text-left sm:flex sm:justify-between sm:items-center w-full sm:px-8 px-4 flex-col sm:flex-row gap-3">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl tracking-[0.01em] font-medium text-white mb-0">
                {PERSONAL_INFO.name}
              </h1>
              <p className="opacity-40 text-xs sm:text-sm font-mono mt-0.5">
                dev • cloud • ai • backend
              </p>
            </div>

            {/* Social Links */}
            <div className="flex justify-start items-center space-x-4 mt-2 sm:mt-0 text-slate-400">
              <a
                href={PERSONAL_INFO.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                title="Twitter/X"
              >
                <FaTwitter className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                title="LinkedIn"
              >
                <FaLinkedin className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                title="GitHub"
              >
                <FaGithub className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Bio Text Content - Lakshya style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="sm:px-8 px-4 pb-4 pt-6"
        >
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-4" style={{ letterSpacing: '-0.01em' }}>
            I’m a Computer & Communication Engineering student and a <span className="font-medium text-white">backend-focused</span> engineer from Bangalore, India. I have built scalable microservices, cloud-native applications, and <span className="font-medium text-white">agentic AI systems</span> engineered for resilience and performance.
          </p>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-4" style={{ letterSpacing: '-0.01em' }}>
            When not coding, I explore distributed architecture, solve competitive programming problems, and stay active on <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="font-medium text-white underline hover:opacity-80">GitHub</a>.
          </p>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-5" style={{ letterSpacing: '-0.01em' }}>
            <span className="font-medium text-white">Actively seeking Software Engineering Internship opportunities.</span>{' '}
            <a href="#contact" className="font-medium text-white underline hover:opacity-80 cursor-pointer">
              Contact Me.
            </a>
          </p>

          {/* Resume Pill Button */}
          <div className="flex items-center mt-2">
            <button
              onClick={onOpenResumeModal}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm font-medium text-neutral-400 bg-neutral-800/60 hover:bg-neutral-800 hover:text-white rounded-md border border-white/10 transition-all"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
