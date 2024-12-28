'use client';

import React, { useState } from 'react';

import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

import Socials from '../SocialLinks/socials';
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
    <footer className="mx-auto w-full border-t border-light-primary py-6 pt-8 xl:pt-11">
      <div className="flex flex-col items-center space-y-6">
        <Socials />
        <Text
          font="figtree"
          size="xs"
          weight="bold"
          className="text-secondary mb-2"
          header
        >
          Farouk Adedamola
        </Text>
        <Text font="figtree" size="lg" weight="bold" className="" subheader>
          Frontend Developer
        </Text>

        <div className=" w-full  border-t border-light-primary pt-4">
          <Text
            font="figtree"
            weight="medium"
            size="sm"
            className="text-center"
          >
            © {currentYear} Farouk Adedamola. All rights reserved.
          </Text>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
