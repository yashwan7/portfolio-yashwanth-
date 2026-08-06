import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle, Sparkles, Copy, Check, ExternalLink } from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleDirectEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    handleCopyEmail();
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(PERSONAL_INFO.email)}`;
    window.open(gmailUrl, '_blank');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('submitting');

    try {
      // Send directly via FormSubmit AJAX (No redirects!)
      const res = await fetch(`https://formsubmit.co/ajax/${PERSONAL_INFO.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _subject: formData.subject || `Portfolio Inquiry from ${formData.name}`,
          message: formData.message,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      const data = await res.json();

      if (res.ok && (data.success === 'true' || data.success === true || res.status === 200)) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(data.message || 'Submission error');
      }
    } catch (err) {
      console.error('Direct email dispatch error:', err);
      // Secondary fallback to opening Gmail compose if network/CORS blocks fetch
      const subjectText = formData.subject || `New Portfolio Message from ${formData.name}`;
      const bodyText = `Hi Yashwanth,\n\n${formData.message}\n\n---\nFrom: ${formData.name}\nEmail: ${formData.email}`;
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${encodeURIComponent(PERSONAL_INFO.email)}&su=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(bodyText)}`;
      window.open(gmailUrl, '_blank');
      setStatus('success');
    }
  };

  const contactCards = [
    {
      title: 'Email Direct',
      value: PERSONAL_INFO.email,
      icon: Mail,
      onClick: handleDirectEmailClick,
      badge: copiedEmail ? 'Copied & Opened!' : 'Click to Email',
    },
    {
      title: 'Location',
      value: PERSONAL_INFO.location,
      icon: MapPin,
      link: '#',
      badge: 'Location',
    },
    {
      title: 'GitHub Profile',
      value: 'github.com/yashwan7',
      icon: FaGithub,
      link: PERSONAL_INFO.github,
      badge: 'Code',
    },
    {
      title: 'LeetCode',
      value: 'leetcode.com/u/yashwanth_sn/',
      icon: SiLeetcode,
      link: PERSONAL_INFO.leetcode,
      badge: 'DSA',
    },
  ];

  return (
    <section id="contact" className="py-12 relative">
      <div className="w-full sm:px-8 px-4">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-lg sm:text-2xl font-serif font-medium text-white mb-1">
            Get in Touch
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 opacity-70">
            Open for Backend Engineering roles, Cloud Native architecture, AI projects, or technical conversations.
          </p>
        </motion.div>

        {/* Black Glassmorphism Outer Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Direct Contact Info Cards (Black Glass Card) */}
          <div className="lg:col-span-5 space-y-3">
            {contactCards.map((card, idx) => {
              const Icon = card.icon;
              return card.onClick ? (
                <motion.button
                  key={card.title}
                  type="button"
                  onClick={card.onClick}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.08 }}
                  className="w-full text-left p-4 rounded-2xl bg-[#090a0d]/80 backdrop-blur-xl border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.04] transition-all flex items-center justify-between gap-3.5 shadow-xl block group cursor-pointer"
                >
                  <div className="flex items-center gap-3.5 overflow-hidden">
                    <div className="w-10 h-10 rounded-xl bg-black/60 border border-white/10 flex items-center justify-center text-slate-300 group-hover:text-white flex-shrink-0 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">{card.title}</p>
                      <p className="text-xs font-medium text-white tracking-tight mt-0.5 truncate">{card.value}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300 flex-shrink-0 flex items-center gap-1 group-hover:border-white/30">
                    {copiedEmail ? <Check className="w-3 h-3 text-emerald-400" /> : <ExternalLink className="w-3 h-3 text-slate-400" />}
                    {card.badge}
                  </span>
                </motion.button>
              ) : (
                <motion.a
                  key={card.title}
                  href={card.link}
                  target={card.link?.startsWith('http') ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.08 }}
                  className="p-4 rounded-2xl bg-[#090a0d]/80 backdrop-blur-xl border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.04] transition-all flex items-center justify-between gap-3.5 shadow-xl block group"
                >
                  <div className="flex items-center gap-3.5 overflow-hidden">
                    <div className="w-10 h-10 rounded-xl bg-black/60 border border-white/10 flex items-center justify-center text-slate-300 group-hover:text-white flex-shrink-0 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">{card.title}</p>
                      <p className="text-xs font-medium text-white tracking-tight mt-0.5 truncate">{card.value}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300 flex-shrink-0">
                    {card.badge}
                  </span>
                </motion.a>
              );
            })}

            {/* Black Glass Social Networks Card */}
            <div className="p-4 rounded-2xl bg-[#090a0d]/80 backdrop-blur-xl border border-white/[0.08] mt-4 text-center">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-3">
                Social Networks
              </span>
              <div className="flex justify-center gap-2.5">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-black/60 border border-white/10 text-slate-400 hover:text-white hover:border-white/30 transition-all"
                  title="GitHub"
                >
                  <FaGithub className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-black/60 border border-white/10 text-slate-400 hover:text-sky-400 hover:border-sky-400/40 transition-all"
                  title="LinkedIn"
                >
                  <FaLinkedin className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-black/60 border border-white/10 text-slate-400 hover:text-blue-400 hover:border-blue-400/40 transition-all"
                  title="Twitter/X"
                >
                  <FaTwitter className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.leetcode}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-black/60 border border-white/10 text-slate-400 hover:text-amber-400 hover:border-amber-400/40 transition-all"
                  title="LeetCode"
                >
                  <SiLeetcode className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-black/60 border border-white/10 text-slate-400 hover:text-pink-400 hover:border-pink-400/40 transition-all"
                  title="Instagram"
                >
                  <FaInstagram className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Background Dispatch Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-7 p-6 sm:p-7 rounded-2xl bg-[#090a0d]/80 backdrop-blur-2xl border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.6)] relative overflow-hidden"
          >
            <div className="mb-5 pb-3 border-b border-white/[0.06] flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                  <span>Send a Direct Message</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                </h3>
                <p className="text-xs text-slate-400 mt-0.5 font-mono">
                  Delivers directly to <span className="text-slate-200 font-semibold">{PERSONAL_INFO.email}</span>
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleCopyEmail()}
                className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:border-white/30 flex items-center gap-1.5 transition-all"
                title="Copy Email Address"
              >
                {copiedEmail ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-slate-400" />}
                <span>{copiedEmail ? 'Copied!' : 'Copy Email'}</span>
              </button>
            </div>

            {status === 'success' ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-6 h-6 animate-bounce" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Message Sent Directly!</h4>
                  <p className="text-xs font-mono text-slate-300 max-w-md mx-auto mt-1 leading-relaxed">
                    Thank you for reaching out! Your message has been dispatched straight to Yashwanth's inbox (<span className="text-white">{PERSONAL_INFO.email}</span>).
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setStatus('idle');
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="px-4 py-2 rounded-xl bg-neutral-900 border border-white/20 text-xs font-mono text-slate-300 hover:text-white hover:border-white/40 transition-all cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Mercer"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#040507]/90 backdrop-blur-md border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-white/30 transition-all font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Your Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#040507]/90 backdrop-blur-md border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-white/30 transition-all font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Subject</label>
                  <input
                    type="text"
                    placeholder="e.g. Backend Role Opportunity"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-[#040507]/90 backdrop-blur-md border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-white/30 transition-all font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Message *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Write your message details..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#040507]/90 backdrop-blur-md border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-white/30 transition-all resize-none font-mono"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-3 rounded-xl bg-neutral-900 border border-white/20 hover:border-white/40 text-white font-medium text-xs flex items-center justify-center gap-2 shadow-xl hover:bg-neutral-800 transition-all disabled:opacity-50 active:scale-95 cursor-pointer"
                >
                  {status === 'submitting' ? (
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending Direct Email...
                    </span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Message to Yashwanth</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default Contact;


