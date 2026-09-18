import { profile } from '@/data/resume';

export default function SiteFooter() {
  return (
    <footer className="wrap site-footer">
      <div className="colophon">
        <p>
          {profile.name} — {profile.location}
        </p>
        <p className="spec-note">
          Springs: damping 1.0 / response 0.4. Flick release 0.8. Sheet 0.8 /
          0.3. Momentum projected at d = 0.998.
        </p>
        <p>Bricolage Grotesque · JetBrains Mono</p>
      </div>
    </footer>
  );
}
