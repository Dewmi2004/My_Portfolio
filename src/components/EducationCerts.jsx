import { education, certifications } from "../data/portfolioData";
import Reveal from "./Reveal";

export default function EducationCerts() {
  return (
    <section id="education" className="section">
      <div className="container">
        <Reveal className="section-head">
          <span className="section-kicker">Background</span>
          <h2>
            Education &amp; <span className="gradient-text">certifications</span>
          </h2>
        </Reveal>

        <div className="edu-cert-grid">
          <Reveal className="edu-panel glass">
            <h3 style={{ marginBottom: 24, fontSize: "1.1rem" }}>Education</h3>
            {education.map((item) => (
              <div className="timeline-item" key={item.school}>
                <span className="timeline-period">{item.period}</span>
                <h4>{item.school}</h4>
                <p>{item.program}</p>
              </div>
            ))}
          </Reveal>

          <Reveal delay={120} className="edu-panel glass">
            <h3 style={{ marginBottom: 24, fontSize: "1.1rem" }}>Certifications</h3>
            {certifications.map((cert) => (
              <div className="cert-item" key={cert.name}>
                <h4>{cert.name}</h4>
                <p className="cert-meta">
                  {cert.issuer} · {cert.year}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
