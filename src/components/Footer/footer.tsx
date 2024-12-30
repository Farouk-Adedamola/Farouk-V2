'use client';

import React, { useState } from 'react';

import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { FaReact } from 'react-icons/fa';
import { SiNotion, SiTypescript, SiRecoil } from 'react-icons/si';
// import { RiNextjsLine } from 'react-icons/ri';
// import { RiNextjsFill } from 'react-icons/ri';
import { TbBrandNextjs } from 'react-icons/tb';

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
    <footer className="mt-12 w-full">
      <section className="mx-auto w-full border-t border-light-primary py-6 pt-8 xl:pt-11">
        <div className="flex flex-col items-center space-y-6">
          <Socials />
          <div className=' relative mt-3 inline-block w-fit  rounded-md bg-[#090D26] px-1.5 py-0.5  before:pointer-events-none before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-full before:bg-[url("/noise.gif")] before:opacity-[0.09] before:content-[""]'>
            <Text
              font="figtree"
              size="xs"
              weight="bold"
              header
              className=" bg-gradient-to-t     from-[#a2b6fa] to-[#334cec] bg-clip-text text-transparent  "
            >
              Farouk Adedamola
            </Text>
          </div>
          <Text font="figtree" size="lg" weight="bold" className="" subheader>
            Frontend Developer
          </Text>

          <div className=" flex  w-full flex-col items-center space-y-1 border-t border-light-primary pt-4">
            <div className="flex items-center justify-center gap-2">
              <Text
                font="figtree"
                className="
              flex items-center justify-center gap-2
              "
                size="md"
                weight="medium"
              >
                Built with :{' '}
                <span className="flex items-center justify-center gap-2">
                  {/* <RiNextjsFill size={24} /> */}
                  <TbBrandNextjs size={24} />
                  <FaReact size={24} />
                  <SiTypescript size={24} />
                  <SiRecoil size={24} />
                  {/* <SiShadcnui size={24} /> */}
                  <SiNotion size={24} />
                </span>
              </Text>
            </div>
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
      </section>
    </footer>
  );
};

export default Footer;
