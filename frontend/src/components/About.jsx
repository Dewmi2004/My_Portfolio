import { profile, spokenLanguages, softSkills, projects, skills } from "../data/portfolioData";
import { useCountUp } from "../hooks/useCountUp";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";

const totalTech = new Set(Object.values(skills).flat()).size;

function StatCard({ label, value, suffix = "+" }) {
  const [ref, count] = useCountUp(value);
  return (
    <TiltCard nodeRef={ref} className="stat-card glass about-cell-stat" strength={6}>
      <div className="stat-num">
        {count}
        {suffix}
      </div>
      <div className="stat-label">{label}</div>
    </TiltCard>
  );
}

export default function About() {
  return (
    <section id="about" className="section section-tint">
      <div className="container">
        <Reveal className="section-head">
          <span className="section-kicker">About Me</span>
          <h2>
            Turning <span className="gradient-text">ideas</span> into working software
          </h2>
        </Reveal>

        <div className="about-bento">
          <Reveal className="about-cell-bio-wrap" delay={0}>
            <TiltCard className="about-cell-bio glass" strength={4}>
              <p className="about-summary">
                I'm a <span className="highlight">full-stack developer</span> and{" "}
                <span className="highlight">AI/ML engineer</span> who enjoys the whole journey —
                from designing a database schema to shipping a polished interface a real person
                will use. My work spans <span className="highlight">React and React Native</span>{" "}
                on the frontend, <span className="highlight">Node.js, Express and Spring Boot</span>{" "}
                on the backend, and applied machine learning with{" "}
                <span className="highlight">Python and PyTorch</span>. I'm detail-oriented,
                curious about how systems fit together, and genuinely enjoy the process of
                learning new tools well enough to build with them.
              </p>

              <div className="about-quote">
                "I don't just dream about success — I work for it, I believe in it, and I achieve
                it."
              </div>

              <div className="about-focus">
                <span className="pulse-dot" aria-hidden="true" />
                Currently exploring RAG systems &amp; LLM tooling
              </div>

              <div className="soft-skill-pills" style={{ marginTop: 24 }}>
                {softSkills.map((skill) => (
                  <span className="pill" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </TiltCard>
          </Reveal>

          <Reveal delay={90} className="about-cell-info-wrap">
            <TiltCard className="about-cell-info glass" strength={6}>
              <h3>Basic Info</h3>
              <div className="info-row">
                <span>Location</span>
                <span>{profile.location}</span>
              </div>
              <div className="info-row">
                <span>Email</span>
                <span>{profile.email}</span>
              </div>
              <div className="info-row">
                <span>Phone</span>
                <span>{profile.phone}</span>
              </div>
            </TiltCard>
          </Reveal>

          <Reveal delay={150} className="about-cell-lang-wrap">
            <TiltCard className="about-cell-lang glass" strength={6}>
              <h3>Languages</h3>
              {spokenLanguages.map((lang) => (
                <div className="lang-row" key={lang.name}>
                  <span>{lang.name}</span>
                  <span>{lang.level}</span>
                </div>
              ))}
            </TiltCard>
          </Reveal>

          <StatCard label="Projects shipped" value={projects.length} />
          <StatCard label="Technologies" value={totalTech} />
          <StatCard label="Languages spoken" value={3} suffix="" />
        </div>
      </div>
    </section>
  );
}
