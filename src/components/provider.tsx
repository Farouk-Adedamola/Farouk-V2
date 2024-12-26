'use client';

import { ThemeProvider } from 'next-themes';
import { RecoilRoot } from 'recoil';

import UseLenisSmoothScroll from '@/hooks/useLenisSmoothScroll';

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class">
      <UseLenisSmoothScroll>
        <RecoilRoot>{children}</RecoilRoot>
      </UseLenisSmoothScroll>
    </ThemeProvider>
  );
}
