import React from 'react';

import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Instagram } from 'lucide-react';

type SocialProps = {
  icon?: any;
  href?: string;
  label?: string;
};

const socialLinks: SocialProps[] = [
  { icon: Github, href: 'https://github.com/yourusername', label: 'GitHub' },
  {
    icon: Twitter,
    href: 'https://twitter.com/yourusername',
    label: 'Twitter',
  },
  {
    icon: Linkedin,
    href: 'https://linkedin.com/in/yourusername',
    label: 'LinkedIn',
  },
  {
    icon: Instagram,
    href: 'https://linkedin.com/in/yourusername',
    label: 'Instagram',
  },
];

const Socials = ({ socialStyles }: { socialStyles?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
      className={`flex items-center justify-center gap-3 ${socialStyles}`}
    >
      {socialLinks.map(({ icon: Icon, href, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative rounded-full transition-colors hover:bg-gray-800"
        >
          <Icon className=" h-6 w-6 text-gray-400 transition-colors group-hover:text-emerald-light" />
        </a>
      ))}
    </motion.div>
  );
};

export default Socials;
