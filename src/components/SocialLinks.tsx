import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const SocialLinks: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const socialItems = [
    {
      name: 'GitHub',
      icon: FaGithub,
      url: PERSONAL_INFO.github,
      color: 'hover:text-white hover:border-slate-400 hover:shadow-white/20',
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedin,
      url: PERSONAL_INFO.linkedin,
      color: 'hover:text-sky-400 hover:border-sky-400 hover:shadow-sky-400/20',
    },
    {
      name: 'LeetCode',
      icon: SiLeetcode,
      url: PERSONAL_INFO.leetcode,
      color: 'hover:text-amber-400 hover:border-amber-400 hover:shadow-amber-400/20',
    },
    {
      name: 'Email',
      icon: Mail,
      url: `mailto:${PERSONAL_INFO.email}`,
      color: 'hover:text-copper-400 hover:border-copper-400 hover:shadow-copper-400/20',
    },
    {
      name: 'Instagram',
      icon: FaInstagram,
      url: PERSONAL_INFO.instagram,
      color: 'hover:text-pink-400 hover:border-pink-400 hover:shadow-pink-400/20',
    },
    {
      name: 'Twitter/X',
      icon: FaTwitter,
      url: PERSONAL_INFO.twitter,
      color: 'hover:text-blue-400 hover:border-blue-400 hover:shadow-blue-400/20',
    },
  ];

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-xl',
  };

  return (
    <div className="flex items-center gap-3 flex-wrap">
      {socialItems.map((item, idx) => {
        const Icon = item.icon;
        return (
          <motion.a
            key={item.name}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            title={item.name}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.08 }}
            whileHover={{ scale: 1.15, rotate: 3 }}
            whileTap={{ scale: 0.95 }}
            className={`${sizeClasses[size]} flex items-center justify-center rounded-xl bg-obsidian-900/80 border border-white/10 text-slate-400 transition-all duration-300 shadow-md ${item.color}`}
          >
            <Icon />
          </motion.a>
        );
      })}
    </div>
  );
};
