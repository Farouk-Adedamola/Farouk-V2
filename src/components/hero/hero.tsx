'use client';

import { useRouter } from 'next/navigation';
import React, { use, useEffect, useState } from 'react';

import axios from 'axios';

// import { Button } from '@/components/Button/button';
import Socials from '@/components/SocialLinks/socials';
import Stack from '@/components/Stack/stack';
import ShimmerLoadingState from '@/components/Stack/stackshimmer';
import Text from '@/components/Text/text';

// import Button from '@/components/button/button';

export type WakatimeData = {
  name?: string;
  percent?: number;
  color?: string;
  grand_total?: {
    human_readable_total: string;
  };
};

const WAKATIME_API_URL = process.env.NEXT_PUBLIC_WAKATIME_API_URL;
console.log(WAKATIME_API_URL);
const WAKATIME_HOURS_API_URL = process.env.NEXT_PUBLIC_WAKATIME_HOURS_API_URL;
console.log(WAKATIME_HOURS_API_URL);

const Hero: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [wakatimeData, setWakatimeData] = useState<WakatimeData[] | null>(null);
  const [wakatimeHoursData, setWakatimeHoursData] = useState<
    WakatimeData[] | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const fetchWakatimeData = async () => {
    try {
      if (!WAKATIME_API_URL) {
        throw new Error('Wakatime API URL is not configured');
      }

      const response = await axios.get(WAKATIME_API_URL);
      const data = response.data.data || response.data;
      setWakatimeData(data);
    } catch (err) {
      console.error('Error fetching Wakatime data:', err);
      setError('Failed to load Wakatime data');
    }
  };

  const fetchWakatimeHoursData = async () => {
    try {
      if (!WAKATIME_HOURS_API_URL) {
        throw new Error('Wakatime Hours API URL is not configured');
      }

      const response = await axios.get(WAKATIME_HOURS_API_URL);
      const data = response.data.data || response.data;

      console.log('data:', data);
      setWakatimeHoursData(data);
    } catch (err) {
      console.error('Error fetching Wakatime hours data:', err);
      setError('Failed to load Wakatime hours data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchWakatimeData(), fetchWakatimeHoursData()]);
    };

    fetchData();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { left, top } = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: (clientX - left) / e.currentTarget.offsetWidth,
      y: (clientY - top) / e.currentTarget.offsetHeight,
    });
  };

  return (
    <section
      className=" flex w-full flex-col gap-2 sm:pb-10 max-md:gap-6 lg:flex-row xl:items-center xl:justify-between"
      onMouseMove={handleMouseMove}
    >
      <div className="flex w-full flex-col justify-between gap-2 lg:max-w-[50%] xl:items-start">
        <div className="flex flex-col items-center justify-start lg:items-start">
          <Text
            font="figtree"
            className=" m-0 font-figtree !text-[36px] font-bold lg:!text-[48px]"
          >
            Farouk Adedamola
          </Text>
          <div className=' relative  inline-block w-fit  rounded-md bg-[#090D26] px-1.5 py-0.5  before:pointer-events-none before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-full before:bg-[url("/noise.gif")] before:opacity-[0.09] before:content-[""]'>
            <Text
              size="xl"
              font="figtree"
              className=" bg-gradient-to-t     from-[#a2b6fa] to-[#334cec] bg-clip-text font-bold  text-transparent"
            >
              Frontend Engineer
            </Text>
          </div>
        </div>
        <div>
          <Text
            font="inter"
            size="md"
            className="text-center font-bold lg:!text-left"
          >
            Hi i&apos;m a creative coder and Frontend Engineer with over 4 years
            of experience crafting digital experiences where I bring designs to
            life with clean and efficient code for the web.
          </Text>
        </div>
        <div className="max-md:flex max-md:justify-center">
          {/* <Button onClick={() => router.push('/about')}>More about me</Button> */}
        </div>
        <div className="mt-4 flex items-center justify-center lg:justify-start">
          <Socials socialStyles="gap-6" />
        </div>
      </div>
      <div className="w-full lg:max-w-[50%]">
        {error ? (
          <Text className="text-error">{error}</Text>
        ) : isLoading ? (
          <ShimmerLoadingState />
        ) : (
          wakatimeData &&
          wakatimeData.length > 0 && (
            <Stack
              code_hours={wakatimeHoursData}
              data={wakatimeData.slice(0, 6)}
            />
          )
        )}
      </div>
    </section>
  );
};

export default Hero;
