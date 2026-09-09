import { useEffect, useState } from "react";
import { projects } from "../data/portfolioData";
import { GithubIcon, ExternalLinkIcon, ArrowRightIcon, CloseIcon } from "./Icons";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";

function truncate(text, max = 108) {
  if (text.length <= max) return text;
  return text.slice(0, max).replace(/\s+\S*$/, "") + "…";
}

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(null);
  const activeProject = activeIndex === null ? null : projects[activeIndex];

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") setActiveIndex(null);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeIndex]);

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

        <div className="project-grid">
          {projects.map((project, i) => (
            <Reveal
              key={project.title}
              delay={i * 80}
              className={`project-tile-wrap${i === 0 ? " project-tile-featured" : ""}`}
              as="article"
            >
              <TiltCard className="project-tile glass" strength={5}>
                <div className="project-tile-image">
                  <img src={project.image} alt={`${project.title} screenshot`} loading="lazy" />
                  <span className="project-index">{String(i + 1).padStart(2, "0")}</span>
                </div>

                <div className="project-tile-body">
                  <h3 className="project-tile-title">{project.title.split(" — ")[0]}</h3>
                  <p className="project-tile-desc">{truncate(project.description)}</p>

                  <div className="project-tile-tech">
                    {project.tech.slice(0, 3).map((t) => (
                      <span className="skill-tag" key={t}>
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="skill-tag">+{project.tech.length - 3}</span>
                    )}
                  </div>

                  <button
                    type="button"
                    className="btn btn-ghost see-more-btn"
                    onClick={() => setActiveIndex(i)}
                  >
                    See more <ArrowRightIcon />
                  </button>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>

      {activeProject && (
        <div className="project-modal-overlay" onClick={() => setActiveIndex(null)}>
          <div
            className="project-modal glass glass-strong"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="project-modal-close"
              onClick={() => setActiveIndex(null)}
              aria-label="Close project details"
            >
              <CloseIcon />
            </button>

            <div className="project-modal-image">
              <img
                src={activeProject.image}
                alt={`${activeProject.title} screenshot`}
              />
            </div>

            <div className="project-modal-body">
              <h3 id="project-modal-title">{activeProject.title}</h3>
              <p className="project-modal-desc">{activeProject.description}</p>

              <h4>Highlights</h4>
              <ul className="project-highlights">
                {activeProject.highlights.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>

              <div className="project-tech">
                {activeProject.tech.map((t) => (
                  <span className="skill-tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>

              <div className="project-links">
                <a
                  href={activeProject.github}
                  target="_blank"
                  rel="noreferrer"
                  className="project-link"
                >
                  <GithubIcon /> Source code
                </a>
                {activeProject.link && (
                  <a
                    href={activeProject.link}
                    target="_blank"
                    rel="noreferrer"
                    className="project-link"
                  >
                    <ExternalLinkIcon /> Live demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
