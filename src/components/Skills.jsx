import { skills } from "../data/portfolioData";
import { ServerIcon, LayoutIcon, DatabaseIcon, BrainIcon, ToolIcon, CodeIcon } from "./Icons";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";

const CATEGORY_ICONS = {
  Backend: ServerIcon,
  Frontend: LayoutIcon,
  Databases: DatabaseIcon,
  "AI / ML": BrainIcon,
  Tools: ToolIcon,
  Languages: CodeIcon,
};

const WIDE_CATEGORIES = new Set(["AI / ML"]);

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
            const wide = WIDE_CATEGORIES.has(category) ? " skill-card-wide" : "";
            return (
              <Reveal key={category} delay={i * 90} className={`skill-card-wrap${wide}`} as="article">
                <TiltCard className="skill-card glass" strength={6}>
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
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
