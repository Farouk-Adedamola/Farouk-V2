'use client';

import { useState } from 'react';

import { Download, ExternalLink } from 'lucide-react';

import Text from '@/components/Text/text';
import { Button } from '@/components/ui/button';

export default function ResumeClient() {
  const [isLoading, setIsLoading] = useState(true);
  const resumePath = '/docs/FAROUK ADEDAMOLA RESUME V2.pdf';

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resumePath;
    link.download = 'Farouk_Adedamola_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenNewTab = () => {
    window.open(resumePath, '_blank');
  };

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Text font="inter" size="xl" className="mb-2">
            Resume
          </Text>
          <Text font="figtree" size="sm" className="text-gray-400">
            View and download my professional resume
          </Text>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleOpenNewTab}
            className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-2 font-figtree text-sm font-medium text-white transition-all hover:bg-white/10"
          >
            <ExternalLink className="h-4 w-4" />
            Open in New Tab
          </Button>
          <Button
            onClick={handleDownload}
            className="flex items-center gap-2 rounded-lg bg-emerald-light px-4 py-2 font-figtree text-sm font-medium text-black transition-all hover:bg-emerald-light/90"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>

      <div className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-2xl">
        {isLoading && (
          <div className="flex h-[600px] items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-emerald-light"></div>
              <Text font="figtree" size="sm" className="text-gray-400">
                Loading resume...
              </Text>
            </div>
          </div>
        )}

        <iframe
          src={resumePath}
          className={`h-[600px] w-full transition-opacity duration-300 sm:h-[800px] ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={() => setIsLoading(false)}
          title="Farouk Adedamola Resume"
        />
      </div>

      <div className="mt-4 rounded-lg border border-white/10 bg-white/5 p-4">
        <Text font="figtree" size="sm" className="text-gray-400">
          <span className="font-semibold text-white">Note:</span> If the PDF
          doesn&apos;t display properly, you can{' '}
          <button
            onClick={handleOpenNewTab}
            className="font-semibold text-emerald-light hover:underline"
          >
            open it in a new tab
          </button>{' '}
          or{' '}
          <button
            onClick={handleDownload}
            className="font-semibold text-emerald-light hover:underline"
          >
            download it directly
          </button>
          .
        </Text>
      </div>
    </div>
  );
}
