'use client';

import React, { useState } from 'react';

import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { FaReact } from 'react-icons/fa';
import { SiNotion, SiTypescript, SiRecoil } from 'react-icons/si';
import { TbBrandNextjs } from 'react-icons/tb';

import Socials from '../SocialLinks/socials';
import Text from '../Text/text';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

const Footer: React.FC = () => {
  const currentYear: number = new Date().getFullYear();

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

          <div className=" flex  w-full flex-col items-center gap-2 space-y-1 border-t border-light-primary pt-4">
            <div className="">
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
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <TbBrandNextjs size={24} />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Next Js</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <FaReact size={24} />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>React</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <SiTypescript size={24} />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Typescript</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <SiRecoil size={24} />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Recoil</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <SiNotion size={24} />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Notion</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </span>
              </Text>
            </div>
            <Text
              font="figtree"
              weight="medium"
              size="sm"
              className="m-0 text-center"
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
