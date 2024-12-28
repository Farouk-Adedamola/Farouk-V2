'use client';

import React, { useState } from 'react';

import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

import Text from '../Text/text';

interface TooltipPosition {
  x: number;
  y: number;
}

interface SocialLink {
  href: string;
  tooltip: string;
  icon: React.ReactNode;
}

const Footer: React.FC = () => {
  const [tooltipVisible, setTooltipVisible] = useState<boolean>(false);
  const [tooltipContent, setTooltipContent] = useState<string>('');
  const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition>({
    x: 0,
    y: 0,
  });

  const currentYear: number = new Date().getFullYear();

  const socialLinks: SocialLink[] = [
    {
      href: 'https://github.com',
      tooltip: 'GitHub Profile',
      icon: <Github size={24} />,
    },
    {
      href: 'https://linkedin.com',
      tooltip: 'LinkedIn Profile',
      icon: <Linkedin size={24} />,
    },
    {
      href: 'mailto:contact@example.com',
      tooltip: 'Email Me',
      icon: <Mail size={24} />,
    },
    {
      href: 'https://twitter.com',
      tooltip: 'Twitter Profile',
      icon: <Twitter size={24} />,
    },
  ];

  const handleMouseEnter = (
    content: string,
    event: React.MouseEvent<HTMLAnchorElement>
  ): void => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipContent(content);
    setTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.top,
    });
    setTooltipVisible(true);
  };

  const handleMouseLeave = (): void => {
    setTooltipVisible(false);
  };

  return (
    <footer className="border- mx-auto w-full border-t py-6">
      <div className="flex flex-col items-center space-y-6">
        <div className="flex items-center space-x-6">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="transition-colors duration-300 hover:text-blue-400"
              onMouseEnter={(e) => handleMouseEnter(link.tooltip, e)}
              onMouseLeave={handleMouseLeave}
            >
              {link.icon}
            </a>
          ))}
        </div>

        <Text font="figtree" size="xs" weight="bold" className="mb-2" header>
          Farouk Adedamola
        </Text>
        <Text font="figtree" size="lg" weight="bold" className="" subheader>
          Frontend Developer
        </Text>

        <Text weight="medium" size="md" className=" text-gray-400">
          © {currentYear} Farouk Adedamola. All rights reserved.
        </Text>
      </div>

      {/* Custom Tooltip */}
      {/* <div
        className={`absolute -translate-x-1/2 transform rounded-lg bg-gray-800 px-4 py-2 text-sm text-white transition-all duration-300 ease-in-out ${
          tooltipVisible
            ? '-translate-y-full opacity-100'
            : 'pointer-events-none -translate-y-3/4 opacity-0'
        }`}
        style={{
          left: `${tooltipPosition.x}px`,
          top: `${tooltipPosition.y - 10}px`,
          zIndex: 50,
        }}
      >
        <div className="relative">
          {tooltipContent}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 translate-y-full transform">
            <div className="border-8 border-transparent border-t-gray-800" />
          </div>
        </div>
      </div> */}
    </footer>
  );
};

export default Footer;
