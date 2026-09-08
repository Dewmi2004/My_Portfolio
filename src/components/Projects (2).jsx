import { projects } from "../data/portfolioData";
import { GithubIcon, ExternalLinkIcon } from "./Icons";
import Reveal from "./Reveal";

export default function Projects() {
  return (
    <section id="projects" className="section section-tint">
      <div className="container">
        <Reveal className="section-head">
          <span className="section-kicker">Portfolio</span>
          <h2>
            Selected <span className="gradient-text">projects</span>
          </h2>
          <p>A mix of full-stack platforms, mobile apps and applied AI/ML work.</p>
        </Reveal>

        <div className="project-list">
          {projects.map((project, i) => (
            <Reveal key={project.title} delay={i * 80} className="project-card" as="article">
              <span className="project-index">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
                <ul className="project-highlights">
                  {project.highlights.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>

              <div className="project-side">
                <div className="project-tech">
                  {project.tech.map((t) => (
                    <span className="skill-tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
                <div className="project-links">
                  <a href={project.github} target="_blank" rel="noreferrer" className="project-link">
                    <GithubIcon /> Source code
                  </a>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noreferrer" className="project-link">
                      <ExternalLinkIcon /> Live demo
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
