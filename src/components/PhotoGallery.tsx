import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GALLERY_ITEMS, PhotoGalleryItem } from '../data/portfolioData';
import { Camera, Maximize2, X, Calendar } from 'lucide-react';

export const PhotoGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePhoto, setActivePhoto] = useState<PhotoGalleryItem | null>(null);

  const categories = ['All', 'Winning Moments', 'Hackathons', 'Speaking'];

  const filteredItems = selectedCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <section id="gallery" className="py-24 relative bg-obsidian-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="text-xs font-mono font-bold tracking-widest text-ice-400 uppercase bg-ice-500/10 px-3 py-1 rounded-full border border-ice-500/20">
            Photo Archives
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-4">
            Highlights & <span className="text-gradient-hybrid">Speaking Moments</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3">
            Moments from hackathon wins, stage talks, award ceremonies, and engineering summits.
          </p>
        </motion.div>

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-ice-500/20 to-copper-500/20 text-white border border-ice-500/40 shadow-lg'
                  : 'bg-obsidian-950 border border-white/10 text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              onClick={() => setActivePhoto(item)}
              className="break-inside-avoid glass-card glass-card-hover rounded-3xl border border-white/10 overflow-hidden cursor-pointer group relative"
            >
              <div className="relative overflow-hidden bg-obsidian-950">
                {/* // Upload image here */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/90 via-obsidian-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end">
                  <span className="text-[10px] font-mono text-copper-400 uppercase tracking-wider mb-1">
                    {item.category} • {item.date}
                  </span>
                  <h4 className="text-base font-bold text-white mb-1 flex items-center justify-between">
                    <span>{item.title}</span>
                    <Maximize2 className="w-4 h-4 text-ice-400" />
                  </h4>
                  <p className="text-xs text-slate-300 line-clamp-2">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {activePhoto && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActivePhoto(null)}
                className="fixed inset-0 bg-obsidian-950/90 backdrop-blur-2xl"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative max-w-4xl w-full glass-card rounded-3xl border border-white/15 overflow-hidden z-10 p-4 sm:p-6 shadow-2xl"
              >
                <button
                  onClick={() => setActivePhoto(null)}
                  className="absolute top-4 right-4 p-2 rounded-xl bg-obsidian-950 border border-white/10 text-slate-400 hover:text-white z-20"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="max-h-[70vh] w-full rounded-2xl overflow-hidden bg-obsidian-950 mb-4 flex items-center justify-center">
                  {/* // Upload image here */}
                  <img src={activePhoto.image} alt={activePhoto.title} className="max-h-[70vh] w-auto object-contain" />
                </div>

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs font-mono text-copper-400 uppercase tracking-wider">{activePhoto.category}</span>
                    <h3 className="text-xl font-bold text-white mt-0.5">{activePhoto.title}</h3>
                    <p className="text-xs text-slate-300 mt-1">{activePhoto.description}</p>
                  </div>
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1 flex-shrink-0">
                    <Calendar className="w-3.5 h-3.5" />
                    {activePhoto.date}
                  </span>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
