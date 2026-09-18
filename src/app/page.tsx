import Capabilities from '@/components/site/Capabilities';
import Contact from '@/components/site/Contact';
import Deck from '@/components/site/Deck';
import Hero from '@/components/site/Hero';
import HeroPlane from '@/components/site/HeroPlane';
import Nav from '@/components/site/Nav';
import Readout from '@/components/site/Readout';
import Retro from '@/components/site/Retro';
import SiteFooter from '@/components/site/SiteFooter';
import Work from '@/components/site/Work';
import { getWakatime } from '@/lib/wakatime';

/* WakaTime is fetched on the server and cached for an hour, so the readout is
   filled on first paint instead of flashing a loading state. */
export const revalidate = 3600;

export default async function Page() {
  const wakatime = await getWakatime();

  return (
    <div className="shell">
      {/* <Nav /> */}
      <main id="top">
        <Hero plane={<HeroPlane data={wakatime} />} />
        <Readout data={wakatime} />
        <Work />
        <Deck />
        <Retro />
        <Capabilities />
        <Contact />
        <SiteFooter />
      </main>
    </div>
  );
}
