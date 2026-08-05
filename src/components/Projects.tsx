import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PROJECTS, Project } from '../data/portfolioData';
import { ExternalLink, Eye, ArrowUpRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { ProjectModal } from './ProjectModal';

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const categories = ['All', 'Backend', 'Cloud', 'AI / ML'];

  const filteredProjects = filterCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === filterCategory);

  return (
    <section id="projects" className="py-8 relative">
      <div className="w-full sm:px-8 px-4">
        
        {/* Section Header - Inspired by lakshyaworks.dev */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg sm:text-xl opacity-40 font-serif font-medium text-white">
            Proof of Work
          </h2>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-2.5 py-1 rounded-md text-xs font-mono transition-all ${
                  filterCategory === cat
                    ? 'bg-neutral-800 text-white border border-white/20'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Proof of Work Grid - Lakshya style hover effects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 group">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              <div
                onClick={() => setSelectedProject(project)}
                className="group/item cursor-pointer block w-full p-1.5 bg-neutral-900/60 border border-white/10 rounded-[12px] transition-all duration-300 ease-out group-has-hover:opacity-40 group-has-hover:group-hover/item:opacity-100 group-has-hover:group-hover/item:border-white/20 group-has-hover:group-hover/item:scale-[1.015] shadow-lg"
              >
                {/* Project Image Preview */}
                <div className="relative overflow-hidden rounded-lg w-full aspect-[4/3] bg-neutral-950 border border-white/5">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="rounded-lg w-full h-full object-cover transition-transform duration-500 group-has-hover:group-hover/item:scale-105"
                  />
                  <div className="absolute top-2.5 right-2.5">
                    <span className="px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-white/15 text-[10px] font-mono text-slate-300">
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Card Title & Info */}
                <div className="w-full px-2 pt-3 pb-2 flex items-center justify-between">
                  <div>
                    <h3 className="text-[15px] font-medium text-white/90 group-has-hover:group-hover/item:text-white flex items-center gap-1.5">
                      <span>{project.title}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-has-hover:group-hover/item:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                      {project.shortDescription}
                    </p>
                  </div>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 rounded-lg bg-neutral-800/80 hover:bg-neutral-700 text-slate-300 hover:text-white transition-colors"
                    title="View Source on GitHub"
                  >
                    <FaGithub className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal Window for Active Project */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />

      </div>
    </section>
  );
};

export default Projects;
