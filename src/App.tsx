import React, { useState } from 'react';
import { CatCursor } from './components/CatCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { TechStack } from './components/TechStack';
import { Projects } from './components/Projects';
import { Certificates } from './components/Certificates';
import { Achievements } from './components/Achievements';
import { GitHubStats } from './components/GitHubStats';
import { LeetCodeStats } from './components/LeetCodeStats';
import { ResumeSection, ResumeModal } from './components/Resume';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#121212] text-slate-100 relative selection:bg-white/20 selection:text-white font-sans">
      
      {/* Cute Interactive Cat Cursor */}
      <CatCursor />

      {/* Minimal Top Header Navbar */}
      <Navbar onOpenResumeModal={() => setIsResumeModalOpen(true)} />

      {/* Main Outer Container Frame - Inspired by lakshyaworks.dev */}
      <div className="relative mx-auto max-w-4xl min-h-screen pt-14">
        
        {/* Left Side Hatched Border Column */}
        <div className="absolute left-0 top-0 w-[60px] h-full overflow-hidden sm:block hidden pointer-events-none z-10">
          <div
            className="absolute opacity-[0.05] inset-0 w-[60px] h-full border-r border-white"
            style={{
              backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 2px, currentColor 2px, currentColor 3px, transparent 3px, transparent 6px)'
            }}
          />
        </div>

        {/* Right Side Hatched Border Column */}
        <div className="absolute right-0 top-0 w-[60px] h-full overflow-hidden sm:block hidden pointer-events-none z-10">
          <div
            className="absolute opacity-[0.05] inset-0 w-[60px] h-full border-l border-white"
            style={{
              backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 2px, currentColor 2px, currentColor 3px, transparent 3px, transparent 6px)'
            }}
          />
        </div>

        {/* Inner Content Area */}
        <div className="mx-auto sm:w-[calc(100%-120px)] w-full max-w-4xl relative">
          <main>
            <Hero onOpenResumeModal={() => setIsResumeModalOpen(true)} />

            <div className="border-b border-dashed border-white/[0.08] my-4" />

            <About />

            <div className="border-b border-dashed border-white/[0.08] my-4" />

            <Projects />

            <div className="border-b border-dashed border-white/[0.08] my-4" />

            <GitHubStats />

            <div className="border-b border-dashed border-white/[0.08] my-4" />

            <LeetCodeStats />

            <div className="border-b border-dashed border-white/[0.08] my-4" />

            <TechStack />

            <div className="border-b border-dashed border-white/[0.08] my-4" />

            <Certificates />

            <div className="border-b border-dashed border-white/[0.08] my-4" />

            <Achievements />

            <div className="border-b border-dashed border-white/[0.08] my-4" />

            <ResumeSection onOpenModal={() => setIsResumeModalOpen(true)} />

            <div className="border-b border-dashed border-white/[0.08] my-4" />

            <Contact />
          </main>

          {/* Minimal Footer */}
          <Footer />
        </div>

      </div>

      {/* Interactive Resume Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />

    </div>
  );
};

export default App;
