import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Play, Globe, Image as ImageIcon, CheckCircle2, Video, Box } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { Project } from '../data/portfolioData';
import APIGatewayDemo from './APIGatewayDemo';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  const [activeTab, setActiveTab] = useState<'video' | 'website' | 'screenshots'>('video');

  // Convert youtube link to embed format if needed
  const getEmbedVideoUrl = (url?: string) => {
    if (!url) return '';
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-obsidian-950/80 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-4xl glass-card rounded-3xl border border-white/15 overflow-hidden z-10 my-8 shadow-2xl flex flex-col max-h-[90vh]"
        >
          
          {/* Header Bar */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-obsidian-900/80">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-ice-500/10 border border-ice-500/30 text-ice-400 text-xs font-mono">
                  {project.category}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-copper-500/10 border border-copper-500/30 text-copper-400 text-xs font-mono">
                  {project.status}
                </span>
              </div>

              <h3 className="text-2xl font-extrabold text-white tracking-tight">
                {project.title}
              </h3>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-obsidian-950 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content Scroll Area */}
          <div className="p-6 overflow-y-auto space-y-6">
            
            {/* View Mode Tabs (Demo Video, Website Preview, Screenshots) */}
            <div className="flex items-center gap-2 border-b border-white/10 pb-3 flex-wrap">
              <button
                onClick={() => setActiveTab('video')}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-medium flex items-center gap-2 transition-all ${
                  activeTab === 'video'
                    ? 'bg-ice-500/20 text-ice-400 border border-ice-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {project.id === 'cloud-native-gateway' ? <Box className="w-3.5 h-3.5 text-cyan-400" /> : <Video className="w-3.5 h-3.5" />}
                <span>{project.id === 'cloud-native-gateway' ? 'Interactive 3D Demo' : 'Demo Video'}</span>
              </button>

              <button
                onClick={() => setActiveTab('website')}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-medium flex items-center gap-2 transition-all ${
                  activeTab === 'website'
                    ? 'bg-copper-500/20 text-copper-400 border border-copper-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Live Website Preview</span>
              </button>

              <button
                onClick={() => setActiveTab('screenshots')}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-medium flex items-center gap-2 transition-all ${
                  activeTab === 'screenshots'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Screenshots</span>
              </button>
            </div>

            {/* Media Preview Box */}
            <div className="relative w-full min-h-[300px] sm:min-h-[400px] aspect-video rounded-2xl overflow-hidden bg-black/95 border border-white/10 flex items-center justify-center">
              {activeTab === 'video' && (
                project.id === 'cloud-native-gateway' ? (
                  <div className="w-full h-full">
                    <APIGatewayDemo />
                  </div>
                ) : project.demoVideoUrl ? (
                  // Support YouTube Embed or Direct MP4 Video
                  project.demoVideoUrl.includes('youtube') || project.demoVideoUrl.includes('youtu.be') ? (
                    <iframe
                      src={getEmbedVideoUrl(project.demoVideoUrl)}
                      title={`${project.title} Video Preview`}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      controls
                      autoPlay
                      muted
                      className="w-full h-full object-contain bg-black"
                      src={project.demoVideoUrl}
                    />
                  )
                ) : (
                  <div className="text-center p-6 text-slate-400 font-mono text-xs">
                    <Play className="w-8 h-8 text-copper-400 mb-2 mx-auto animate-pulse" />
                    <span>// Add project walkthrough video here</span>
                  </div>
                )
              )}

              {activeTab === 'website' && (
                <iframe
                  src={project.liveDemoUrl}
                  title={`${project.title} Website Preview`}
                  className="w-full h-full border-0 bg-white"
                  sandbox="allow-scripts allow-same-origin"
                />
              )}

              {activeTab === 'screenshots' && (
                <div className="w-full h-full overflow-x-auto flex gap-4 p-4 items-center bg-black/90">
                  {project.screenshots.map((shot, idx) => (
                    <img
                      key={idx}
                      src={shot}
                      alt={`Screenshot ${idx + 1}`}
                      className="h-full object-contain rounded-xl border border-white/10"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Full Description */}
            <div>
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                Project Overview
              </h4>
              {/* // Replace project description */}
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {project.fullDescription}
              </p>
            </div>

            {/* Key Architectural Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <div>
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                  Key Accomplishments
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {project.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-3 rounded-xl bg-obsidian-950/80 border border-white/5 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack Pills */}
            <div>
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-xl bg-obsidian-950 border border-white/10 text-slate-300 text-xs font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Modal Footer Links */}
          <div className="p-6 border-t border-white/10 bg-obsidian-900/90 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* // Add GitHub link */}
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-obsidian-950 border border-white/10 hover:border-slate-300 text-slate-200 text-xs font-mono font-medium flex items-center gap-2 transition-all hover:bg-white/5"
              >
                <FaGithub className="w-4 h-4" />
                <span>Source Code</span>
              </a>

              {/* // Add Live Demo */}
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-ice-500 to-copper-500 text-obsidian-950 text-xs font-bold flex items-center gap-2 shadow-lg hover:opacity-95 transition-opacity"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Try Live Demo</span>
              </a>
            </div>

            <button
              onClick={onClose}
              className="text-xs font-mono text-slate-400 hover:text-white transition-colors"
            >
              Close Window [ESC]
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
