import { projects } from "../data/portfolioData";
import { GithubIcon, ExternalLinkIcon } from "./Icons";

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="section-head">
          <span className="section-kicker">Portfolio</span>
          <h2>Selected projects</h2>
          <p>A mix of full-stack platforms, mobile apps and applied AI/ML work.</p>
        </div>

        <div className="project-list">
          {projects.map((project) => (
            <article className="project-card" key={project.title}>
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
