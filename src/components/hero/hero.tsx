'use client';

import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { motion } from 'framer-motion';

import Button from '../Button/Button';
import Socials from '../SocialLinks/socials';
import Stack from '../Stack/stack';
import Text from '../Text/text';

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
      className="flex w-full flex-col desktop-screen:flex-row desktop-screen:items-center desktop-screen:justify-center "
      onMouseMove={handleMouseMove}
    >
      <div className="flex flex-col justify-start gap-4 desktop-screen:items-start">
        <div className="flex flex-col items-center justify-start gap-4 desktop-screen:items-start">
          <Text
            weight="bold"
            size="xs"
            font="figtree"
            className="sm:text-5xl md:text-6xl font-figtree text-4xl font-bold text-gray-100"
          >
            Farouk Adedamola
          </Text>
          <Text
            weight="bold"
            size="lg"
            font="figtree"
            className=" bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-2xl font-semibold text-transparent"
          >
            Frontend Engineer
          </Text>
        </div>
        <div>
          <Text
            weight="bold"
            font="inter"
            size="md"
            className="max-w-[600px] desktop-screen:text-left"
          >
            I specialize in building elegant, accessible interfaces where
            thoughtful design meets clean code for the web.
          </Text>
        </div>
        <Button buttonStyles="font-inter text-lg font-normal rounded-[8px] px-4 py-2">
          More about me
        </Button>
        <Socials />
      </div>
      <div>
        {error ? (
          <Text className="text-red-500">{error}</Text>
        ) : isLoading ? (
          <div className="flex items-center justify-center">
            <Text>Loading...</Text>
          </div>
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
