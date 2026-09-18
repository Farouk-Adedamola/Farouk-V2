import { profile } from '@/data/resume';

const links = [
  { k: 'Email', v: profile.email, href: `mailto:${profile.email}` },
  { k: 'Phone', v: profile.phone, href: `tel:${profile.phoneHref}`, mono: true },
  { k: 'GitHub', v: profile.githubHandle, href: profile.github, external: true },
  {
    k: 'LinkedIn',
    v: profile.linkedinHandle,
    href: profile.linkedin,
    external: true,
  },
];

export default function Contact() {
  return (
    <section className="wrap section contact" id="contact">
      <h2>
        Let&apos;s build
        <br />
        something
      </h2>
      <div className="links">
        {links.map((l) => (
          <a
            className="lk"
            key={l.k}
            href={l.href}
            {...(l.external
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {})}
          >
            <span className="k">{l.k}</span>
            <span className={l.mono ? 'v num' : 'v'}>{l.v}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
