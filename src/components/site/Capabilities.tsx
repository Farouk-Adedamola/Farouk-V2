import { capabilities, profile } from '@/data/resume';

export default function Capabilities() {
  return (
    <section className="wrap section" id="stack">
      <div className="head">
        <h2>Stack</h2>
        <span className="idx">{profile.education}</span>
      </div>

      <div className="caps">
        {capabilities.map((cap) => (
          <div className="cap" key={cap.label}>
            <h3>{cap.label}</h3>
            <div className="tools">
              {cap.items.map((item) => (
                <span className="chip" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
