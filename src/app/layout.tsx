import { Figtree, Inter } from 'next/font/google';

import 'katex/dist/katex.min.css';
import 'prismjs/themes/prism-tomorrow.css';
import 'react-notion-x/src/styles.css';

import LayoutWrapper from '@/components/LayoutWrapper';
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
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
