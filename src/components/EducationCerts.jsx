import { education, certifications } from "../data/portfolioData";

export default function EducationCerts() {
  return (
    <section id="education" className="section">
      <div className="container">
        <div className="section-head">
          <span className="section-kicker">Background</span>
          <h2>Education &amp; certifications</h2>
        </div>

        <div className="edu-cert-grid">
          <div>
            <h3 style={{ marginBottom: 24, fontSize: "1.1rem" }}>Education</h3>
            {education.map((item) => (
              <div className="timeline-item" key={item.school}>
                <span className="timeline-period">{item.period}</span>
                <h4>{item.school}</h4>
                <p>{item.program}</p>
              </div>
            ))}
          </div>

          <div>
            <h3 style={{ marginBottom: 24, fontSize: "1.1rem" }}>Certifications</h3>
            {certifications.map((cert) => (
              <div className="cert-item" key={cert.name}>
                <h4>{cert.name}</h4>
                <p className="cert-meta">
                  {cert.issuer} · {cert.year}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
