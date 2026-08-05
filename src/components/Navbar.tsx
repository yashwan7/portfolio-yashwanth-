import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Menu, X, ChevronRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  onOpenResumeModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResumeModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'proof-of-work', href: '#projects' },
    { name: 'tech-stack', href: '#tech-stack' },
    { name: 'certificates', href: '#certificates' },
    { name: 'contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full">
      <div className={`mx-auto w-full max-w-4xl px-4 py-3 transition-all duration-300 ${
        scrolled ? 'bg-[#121212]/80 backdrop-blur-md border-b border-white/[0.06]' : 'bg-transparent'
      }`}>
        <div className="flex items-center justify-between">
          
          {/* Brand Logo - Serif */}
          <a
            href="#home"
            className="text-xl sm:text-2xl font-serif font-medium text-white hover:opacity-80 transition-opacity"
          >
            Yashwanth
          </a>

          {/* Desktop Navigation - Lakshya style */}
          <nav className="hidden sm:flex items-center gap-5 sm:gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-serif text-white/60 hover:text-white hover:underline transition-all"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={onOpenResumeModal}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono text-neutral-300 bg-neutral-800/60 hover:bg-neutral-800 rounded-md border border-white/10 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>
          </nav>

          {/* Mobile Button */}
          <div className="sm:hidden flex items-center gap-2">
            <button
              onClick={onOpenResumeModal}
              className="px-2.5 py-1 text-xs font-mono text-neutral-300 bg-neutral-800/80 rounded-md border border-white/10"
            >
              Resume
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-white hover:bg-neutral-800 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="sm:hidden bg-[#181818] border-b border-neutral-800 px-4 py-4"
          >
            <div className="flex flex-col gap-3 font-serif">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base text-neutral-300 hover:text-white"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
