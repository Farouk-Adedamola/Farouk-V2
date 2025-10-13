'use client';

import { motion } from 'framer-motion';

import Text from '../Text/text';
import { ExperienceTypeProps, ExperienceProps } from '@/utils/data';

type ExperienceSectionProps = {
  data: ExperienceTypeProps;
};

export const ExperienceSection = ({ data }: ExperienceSectionProps) => {
  return (
    <section className="section_layout">
      <Text
        font="figtree"
        className="mb-8 !text-[30px] !font-medium lg:!text-[48px] "
      >
        Experiences{' '}
        <span className="inline-block h-4 w-4 rounded-full bg-emerald-light"></span>
      </Text>
      <div className="grid grid-cols-1 pt-4 xl:grid-cols-2 xl:gap-12 xl:pt-5">
        <div>
          {data.jobs.map((job, index) => (
            <ExperienceCard key={`job-${index}`} experience={job} />
          ))}
        </div>

        <div>
          {data.internships.map((internship, index) => (
            <ExperienceCard
              key={`internship-${index}`}
              experience={internship}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

type ExperienceCardProps = {
  experience: ExperienceProps;
};

const ExperienceCard = ({ experience }: ExperienceCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="mb-12 backdrop-blur-sm"
  >
    <div className="flex items-start gap-6">
      <div className="flex-1">
        <div className="mb-2 flex items-baseline justify-between">
          <Text
            font="figtree"
            className=" text-[16px] font-medium text-gray-200 lg:text-[30px]"
          >
            {experience.duration}
          </Text>
          <span className="text-xs text-gray-400 lg:text-sm">
            {experience.location}
          </span>
        </div>

        <div className="group rounded-lg bg-darkTheme-primary-dark p-6 transition-all duration-500">
          <div className="mb-4 flex items-baseline justify-between">
            <Text
              font="figtree"
              size="md"
              className="flex items-center gap-2 font-semibold text-white"
            >
              {experience.title} · {experience.company}
              <svg
                className="h-4 w-4 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M7 17L17 7M17 7H7M17 7V17"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Text>
          </div>

          <ul className="leading-6">
            {experience.description.map((desc, index) => (
              <li key={`desc-${index}`}>
                <Text
                  size="sm"
                  font="figtree"
                  className="mb-4 font-normal text-gray-400"
                >
                  {desc}
                </Text>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2">
            {experience.tools.map((tool) => (
              <span
                key={tool}
                className="rounded-full bg-[#1a2337] px-3 py-1 text-sm text-[#4fd1c5]"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);
