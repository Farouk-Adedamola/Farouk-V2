'use client';

import { useEffect } from 'react';

import { Analytics } from '@vercel/analytics/react';
import { useRecoilState } from 'recoil';

import Footer from '@/components/Footer/footer';
import { Farouk } from '@/components/faroukPixel/farouk';
import Header from '@/components/header/header';
import Provider from '@/components/provider';
import { showSplashState } from '@/states/splash';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

function LayoutContent({ children }: LayoutWrapperProps) {
  const [showSplash, setShowSplash] = useRecoilState(showSplashState);

  useEffect(() => {
    const seen = sessionStorage.getItem('hasSeenSplash');
    if (seen === 'true') {
      setShowSplash(false);
    }
  }, [setShowSplash]);

  const handleSplashComplete = () => {
    sessionStorage.setItem('hasSeenSplash', 'true');
    setShowSplash(false);
  };

  return (
    <>
      {showSplash && (
        <>
          <Farouk onComplete={handleSplashComplete} isSplashScreen={true} />
          <div className="fixed inset-0 -z-10 bg-black/60">
            <div className="absolute inset-0 bg-gradient-to-t from-darkTheme-primary to-darkTheme-secondary" />

            <div className="absolute inset-0 bg-[url(../../public/noise.png)] opacity-90 mix-blend-soft-light" />

            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:35px_34px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
          </div>
        </>
      )}

      {!showSplash && (
        <>
          <Farouk fadeOut />
          <div className="fixed inset-0 -z-10 bg-black/60">
            <div className="absolute inset-0 bg-gradient-to-t from-darkTheme-primary to-darkTheme-secondary" />

            <div className="absolute inset-0 bg-[url(../../public/noise.png)] opacity-90 mix-blend-soft-light" />

            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:35px_34px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
          </div>

          <Header />
          <main className="mt-20 w-full max-w-[1280px] flex-1 px-[4vw] sm:mt-24">
            <section className="z-[9999] w-full pt-8">{children}</section>
          </main>
          <Footer />
          <Analytics />
        </>
      )}
    </>
  );
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  return (
    <Provider>
      <LayoutContent>{children}</LayoutContent>
    </Provider>
  );
}
