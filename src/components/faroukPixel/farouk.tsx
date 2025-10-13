'use client';

import { useEffect, useState } from 'react';

import { motion } from 'framer-motion';

import { isTouchDevice } from '@/utils/is-touch-device';

const PIXEL_SIZE = 8;
const LETTER_SPACING = 1;
const BORDER_THICKNESS = 4;

const PIXEL_MAP = {
  P: [
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
  ],
  R: [
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
    [1, 0, 1, 0],
    [1, 0, 0, 1],
  ],
  O: [
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
  ],
  M: [
    [1, 0, 0, 0, 1],
    [1, 1, 0, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],
  T: [
    [1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
  ],
  I: [
    [1, 1, 1],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 1],
  ],
  N: [
    [1, 0, 0, 0, 1],
    [1, 1, 0, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 1, 1],
    [1, 0, 0, 0, 1],
  ],
  G: [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
  ],
  S: [
    [1, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 1],
    [1, 1, 1, 1],
  ],
  A: [
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
  ],
  L: [
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 1, 1, 1],
  ],
  Y: [
    [1, 0, 0, 0, 1],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
  ],
  F: [
    [1, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
  ],
  U: [
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
  ],
  K: [
    [1, 0, 0, 1],
    [1, 0, 1, 0],
    [1, 1, 0, 0],
    [1, 0, 1, 0],
    [1, 0, 0, 1],
  ],
  D: [
    [1, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 0],
  ],
  E: [
    [1, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 1, 1, 1],
  ],
  B: [
    [1, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 1, 1, 0],
  ],
  Q: [
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 1, 1],
    [0, 1, 1, 1],
  ],
  V: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0],
  ],
  '.': [[0], [0], [0], [0], [1]],
};

interface FaroukProps {
  onComplete?: () => void;
  isSplashScreen?: boolean;
  fadeOut?: boolean;
}

interface LetterData {
  char: string;
  pixels: { row: number; col: number }[];
  offsetX: number;
}

export function Farouk({
  onComplete,
  isSplashScreen = false,
  fadeOut = false,
}: FaroukProps) {
  const text = 'FAROUK.DEV';

  const [deviceWidth, setDeviceWidth] = useState(0);

  if (typeof window !== 'undefined') {
    const deviceWidth = window.innerWidth;
    setDeviceWidth(deviceWidth);
  }

  const letters: LetterData[] = [];
  let currentOffsetX = 0;

  text.split('').forEach((char) => {
    const pixelMap = PIXEL_MAP[char as keyof typeof PIXEL_MAP];
    if (!pixelMap) return;

    const pixels: { row: number; col: number }[] = [];
    for (let row = 0; row < pixelMap.length; row++) {
      for (let col = 0; col < pixelMap[row].length; col++) {
        if (pixelMap[row][col]) {
          pixels.push({ row, col });
        }
      }
    }

    letters.push({
      char,
      pixels,
      offsetX: currentOffsetX,
    });

    currentOffsetX += pixelMap[0].length + LETTER_SPACING;
  });

  const totalWidth = currentOffsetX - LETTER_SPACING;
  const letterHeight = 5;

  useEffect(() => {
    if (isSplashScreen && onComplete) {
      const totalAnimationTime = text.length * 150 + 3000;
      const timer = setTimeout(() => {
        onComplete();
      }, totalAnimationTime);

      return () => clearTimeout(timer);
    }
  }, [isSplashScreen, onComplete, text.length]);

  const isDesktop = deviceWidth > 768;

  const scale = fadeOut && isDesktop ? 2.5 : 1;
  const pixelOpacity = fadeOut ? 0.1 : 1;

  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center">
      <div
        className="relative"
        style={{
          width: `${totalWidth * PIXEL_SIZE * scale}px`,
          height: `${letterHeight * PIXEL_SIZE * scale}px`,
        }}
      >
        {letters.map((letter, letterIndex) => (
          <div key={letterIndex}>
            {letter.pixels.map((pixel, pixelIndex) => (
              <motion.div
                key={`${letterIndex}-${pixelIndex}`}
                className={`absolute bg-white ${
                  fadeOut
                    ? 'left-0 rotate-90 opacity-100 '
                    : 'rotate-180 opacity-100'
                }`}
                style={{
                  width: `${PIXEL_SIZE * scale}px`,
                  height: `${PIXEL_SIZE * scale}px`,
                  left: `${
                    (letter.offsetX + pixel.col) * PIXEL_SIZE * scale
                  }px`,
                  top: `${pixel.row * PIXEL_SIZE * scale}px`,
                  opacity: pixelOpacity,
                }}
                initial={fadeOut ? false : { opacity: 0, scale: 0 }}
                animate={fadeOut ? false : { opacity: 1, scale: 1 }}
                transition={
                  fadeOut
                    ? undefined
                    : {
                        delay: letterIndex * 0.15,
                        duration: 0.8,
                        ease: 'easeOut',
                      }
                }
              />
            ))}
          </div>
        ))}
      </div>

      <motion.div
        className="fixed left-0 top-0 z-[9999] bg-white"
        style={{
          height: `${BORDER_THICKNESS}px`,
        }}
        initial={{ width: 0 }}
        animate={{ width: '100vw' }}
        transition={{
          delay: text.length * 0.15 + 0.3,
          duration: 0.8,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="fixed right-0 top-0 z-[9999] bg-white"
        style={{
          width: `${BORDER_THICKNESS}px`,
        }}
        initial={{ height: 0 }}
        animate={{ height: '100vh' }}
        transition={{
          delay: text.length * 0.15 + 0.9,
          duration: 0.8,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="fixed bottom-0 right-0 z-[9999] bg-white"
        style={{
          height: `${BORDER_THICKNESS}px`,
        }}
        initial={{ width: 0 }}
        animate={{ width: '100vw' }}
        transition={{
          delay: text.length * 0.15 + 1.5,
          duration: 0.8,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="fixed bottom-0 left-0 z-[9999] bg-white"
        style={{
          width: `${BORDER_THICKNESS}px`,
        }}
        initial={{ height: 0 }}
        animate={{ height: '100vh' }}
        transition={{
          delay: text.length * 0.15 + 2.1,
          duration: 0.8,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}

export default Farouk;
