import { profile } from "../data/portfolioData";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span>© {new Date().getFullYear()} {profile.name}. All rights reserved.</span>
        <span>Built with the MERN Stack</span>
      </div>
    </footer>
  );
}
