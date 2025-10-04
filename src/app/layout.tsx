import { Figtree, Inter } from 'next/font/google';

import { Analytics } from '@vercel/analytics/react';
import 'katex/dist/katex.min.css';
import 'prismjs/themes/prism-tomorrow.css';
import 'react-notion-x/src/styles.css';

import Footer from '@/components/Footer/footer';
import CustomCursor from '@/components/custom-cursor';
import Header from '@/components/header/header';
import Provider from '@/components/provider';
import SplashScreen from '@/components/splash-screen';
import '@/styles/globals.css';
import '@/styles/paginate.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--inter',
});

const figtree = Figtree({
  subsets: ['latin'],
  display: 'swap',
  variable: '--figtree',
});

export const metadata = {
  title: {
    default: 'Farouk Adedamola',
    template: '%s | Farouk Adedamola',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${figtree.variable}`}>
      <body className="relative flex min-h-screen w-full flex-col items-center  ">
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-t from-darkTheme-primary to-darkTheme-secondary" />

          <div className="absolute inset-0 bg-[url(../../public/noise.png)] opacity-90 mix-blend-soft-light" />

          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:35px_34px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        </div>

        <Provider>
          {/* <SplashScreen /> */}
          <Header />
          <main className="mt-20 w-full max-w-[1280px] flex-1 sm:mt-24">
            <section className="w-full pt-8">{children}</section>
          </main>
          <Footer />
          {/* <CustomCursor /> */}
        </Provider>
        <Analytics />
      </body>
    </html>
  );
}
