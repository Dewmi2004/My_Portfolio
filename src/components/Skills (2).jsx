import { skills } from "../data/portfolioData";
import { ServerIcon, LayoutIcon, DatabaseIcon, BrainIcon, ToolIcon, CodeIcon } from "./Icons";
import Reveal from "./Reveal";

const CATEGORY_ICONS = {
  Backend: ServerIcon,
  Frontend: LayoutIcon,
  Databases: DatabaseIcon,
  "AI / ML": BrainIcon,
  Tools: ToolIcon,
  Languages: CodeIcon,
};

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <Reveal className="section-head">
          <span className="section-kicker">Skills</span>
          <h2>
            Technologies I <span className="gradient-text">work with</span>
          </h2>
          <p>
            A full-stack toolkit spanning frontend interfaces, backend services, databases and
            applied AI/ML — built through coursework, internships and hands-on projects.
          </p>
        </Reveal>

        <div className="skills-grid">
          {Object.entries(skills).map(([category, items], i) => {
            const Icon = CATEGORY_ICONS[category] ?? CodeIcon;
            return (
              <Reveal key={category} delay={i * 90} className="skill-card" as="article">
                <h3>
                  <span className="skill-card-icon">
                    <Icon />
                  </span>
                  {category}
                </h3>
                <div className="skill-tags">
                  {items.map((item) => (
                    <span className="skill-tag" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
