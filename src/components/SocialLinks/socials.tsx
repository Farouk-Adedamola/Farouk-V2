import React from 'react';

import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Instagram } from 'lucide-react';

type SocialProps = {
  icon?: any;
  href?: string;
  label?: string;
};

const socialLinks: SocialProps[] = [
  {
    icon: Github,
    href: 'https://github.com/Farouk-Adedamola',
    label: 'GitHub',
  },
  {
    icon: Twitter,
    href: 'https://x.com/Farouk_fish',
    label: 'Twitter',
  },
  {
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/farouk-adedamola/',
    label: 'LinkedIn',
  },
  {
    icon: Instagram,
    href: 'https://peerlist.io/ejatech/articles',
    label: 'Peerlist',
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
          className=""
        >
          <Icon className=" h-6 w-6 text-gray-400 transition-colors" />
        </a>
      ))}
    </motion.div>
  );
};

export default Socials;
