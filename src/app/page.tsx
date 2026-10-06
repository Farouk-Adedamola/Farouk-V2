import Capabilities from '@/components/site/Capabilities';
import Contact from '@/components/site/Contact';
import Deck from '@/components/site/Deck';
import Emblems from '@/components/site/Emblems';
import Hero from '@/components/site/Hero';
import HeroPlane from '@/components/site/HeroPlane';
import Nav from '@/components/site/Nav';
// import Retro from '@/components/site/Retro';
import Work from '@/components/site/Work';
import { getWakatime } from '@/lib/wakatime';

/* WakaTime is fetched on the server and cached for an hour, so the emblems and
   hero plane are filled on first paint instead of flashing a loading state. */
export const revalidate = 3600;

export default async function Page() {
  const wakatime = await getWakatime();

  return (
    <div className="shell">
      <Emblems data={wakatime} />
      {/* <Nav /> */}
      <main id="top">
        <Hero plane={<HeroPlane data={wakatime} />} />
        <Work />
        <Deck />
        {/* <Retro /> */}
        <Capabilities />
        <Contact />
      </main>
    </div>
  );
}
