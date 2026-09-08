import { profile, spokenLanguages, softSkills, projects, skills } from "../data/portfolioData";

const totalTech = new Set(Object.values(skills).flat()).size;

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container about-grid">
        <div>
          <div className="about-side-card">
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
          </div>

          <div className="about-side-card">
            <h3>Languages</h3>
            {spokenLanguages.map((lang) => (
              <div className="lang-row" key={lang.name}>
                <span>{lang.name}</span>
                <span>{lang.level}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <span className="section-kicker">About Me</span>
          <h2 style={{ marginBottom: 20 }}>A closer look at how I build</h2>
          <p className="about-summary">{profile.summary}</p>

          <div className="soft-skill-pills" style={{ marginTop: 24 }}>
            {softSkills.map((skill) => (
              <span className="pill" key={skill}>
                {skill}
              </span>
            ))}
          </div>

          <div className="about-stats">
            <div className="stat-card">
              <div className="stat-num">{projects.length}+</div>
              <div className="stat-label">Projects shipped</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">{totalTech}+</div>
              <div className="stat-label">Technologies</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">3</div>
              <div className="stat-label">Languages spoken</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
