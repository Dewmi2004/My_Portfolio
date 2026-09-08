import { skills } from "../data/portfolioData";

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <div className="section-head">
          <span className="section-kicker">Skills</span>
          <h2>Technologies I work with</h2>
          <p>
            A full-stack toolkit spanning frontend interfaces, backend services, databases and
            applied AI/ML — built through coursework, internships and hands-on projects.
          </p>
        </div>

        <div className="skills-grid">
          {Object.entries(skills).map(([category, items]) => (
            <div className="skill-card" key={category}>
              <h3>{category}</h3>
              <div className="skill-tags">
                {items.map((item) => (
                  <span className="skill-tag" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
