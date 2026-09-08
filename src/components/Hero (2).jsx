import { useEffect, useState } from "react";
import { profile, socials } from "../data/portfolioData";
import { GithubIcon, LinkedinIcon, MailIcon } from "./Icons";
import portrait from "../assets/portrait.png";
import Reveal from "./Reveal";

const ICONS = { github: GithubIcon, linkedin: LinkedinIcon, mail: MailIcon };

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentRole = profile.roles[roleIndex];
    const speed = deleting ? 40 : 90;

    const timeout = setTimeout(() => {
      if (!deleting) {
        if (subIndex < currentRole.length) {
          setSubIndex((s) => s + 1);
        } else {
          setTimeout(() => setDeleting(true), 1400);
        }
      } else {
        if (subIndex > 0) {
          setSubIndex((s) => s - 1);
        } else {
          setDeleting(false);
          setRoleIndex((r) => (r + 1) % profile.roles.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [subIndex, deleting, roleIndex]);

  return (
    <section id="home" className="hero">
      <div className="container hero-inner">
        <Reveal>
          <p className="hero-eyebrow">Hello, it's me</p>
          <h1 className="hero-name">{profile.name}</h1>
          <p className="hero-role">
            And I'm a <span className="accent">{profile.roles[roleIndex].slice(0, subIndex)}</span>
            <span className="cursor">&nbsp;</span>
          </p>
          <p className="hero-summary">{profile.tagline}</p>

          <div className="hero-actions">
            <a href={profile.cvFile} download className="btn btn-primary">
              Download CV
            </a>
            <a href="#contact" className="btn btn-ghost">
              Get in touch
            </a>
          </div>

          <div className="hero-socials">
            {socials.map((s) => {
              const Icon = ICONS[s.icon];
              return (
                <a
                  key={s.name}
                  href={s.url}
                  target={s.icon === "mail" ? undefined : "_blank"}
                  rel="noreferrer"
                  className="social-icon"
                  aria-label={s.name}
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={150} className="hero-portrait-wrap">
          <div className="hero-blob" aria-hidden="true" />
          <div className="hero-hex">
            <img src={portrait} alt={`Portrait of ${profile.name}`} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
