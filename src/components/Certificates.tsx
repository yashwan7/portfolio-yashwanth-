import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CERTIFICATES, Certificate } from '../data/portfolioData';
import { Search, ExternalLink, Eye, X } from 'lucide-react';

export const Certificates: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeCert, setActiveCert] = useState<Certificate | null>(null);

  const categories = ['All', 'Hackathons', 'Cloud', 'AI', 'Competitive Coding'];

  const filteredCertificates = CERTIFICATES.filter((cert) => {
    const matchesCategory = selectedCategory === 'All' || cert.category === selectedCategory;
    const matchesSearch =
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="certificates" className="py-8 relative">
      <div className="w-full sm:px-8 px-4">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-4 flex items-center justify-between"
        >
          <h2 className="text-lg sm:text-xl opacity-40 font-serif font-medium text-white">
            Certifications & Podiums
          </h2>

          <div className="flex items-center gap-1.5 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-md text-xs font-mono transition-all ${
                  selectedCategory === cat
                    ? 'bg-neutral-800 text-white border border-white/20'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredCertificates.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.04 }}
              className="p-3 rounded-xl bg-neutral-900/60 border border-white/10 apple-glass-hover netflix-card-hover group flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-black/60 border border-white/5 mb-2.5">
                  <img
                    src={cert.thumbnail}
                    alt={cert.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-1">
                  {cert.issuer} • {cert.date}
                </span>
                <h3 className="text-xs font-medium text-white/90 line-clamp-2">
                  {cert.title}
                </h3>
              </div>

              <div className="pt-2.5 mt-3 border-t border-white/5 flex items-center justify-between gap-2">
                <button
                  onClick={() => setActiveCert(cert)}
                  className="px-2.5 py-1 rounded-md bg-neutral-800/60 text-[10px] font-mono text-slate-300 flex items-center gap-1 hover:text-white"
                >
                  <Eye className="w-3 h-3 text-slate-400" />
                  <span>Preview</span>
                </button>

                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-md bg-neutral-800/60 text-[10px] font-mono text-slate-300 flex items-center gap-1 hover:text-white"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Verify</span>
                </a>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {activeCert && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <div
                onClick={() => setActiveCert(null)}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm"
              />

              <div className="relative bg-[#181818] max-w-xl w-full rounded-xl border border-white/15 overflow-hidden z-10 p-4 shadow-2xl">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
                  <div>
                    <h3 className="text-sm font-bold text-white">{activeCert.title}</h3>
                    <p className="text-xs font-mono text-slate-400">{activeCert.issuer} — {activeCert.date}</p>
                  </div>
                  <button
                    onClick={() => setActiveCert(null)}
                    className="p-1 rounded-lg text-slate-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="aspect-[16/10] w-full rounded-lg overflow-hidden bg-black border border-white/10 mb-3">
                  <img src={activeCert.thumbnail} alt={activeCert.title} className="w-full h-full object-contain" />
                </div>

                <div className="flex items-center justify-end">
                  <a
                    href={activeCert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-neutral-800 text-white font-mono text-xs flex items-center gap-1.5"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Verify Credential</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default Certificates;
