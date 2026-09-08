import { useState } from "react";
import { profile } from "../data/portfolioData";
import { MailIcon, PhoneIcon, PinIcon } from "./Icons";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus("");

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("Thanks — your message has been sent. I'll reply soon!");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      window.location.href = `mailto:${profile.email}?subject=Portfolio inquiry from ${encodeURIComponent(
        form.name || "a visitor"
      )}&body=${encodeURIComponent(form.message)}`;
      setStatus("Opening your email client instead — the backend isn't reachable right now.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="section-head">
          <span className="section-kicker">Contact</span>
          <h2>Let's build something together</h2>
          <p>Open to full-stack, frontend and AI/ML internship or entry-level opportunities.</p>
        </div>

        <div className="contact-grid">
          <div>
            <div className="contact-info-item">
              <div className="contact-icon">
                <MailIcon />
              </div>
              <div>
                <h4>Email</h4>
                <p>{profile.email}</p>
              </div>
            </div>
            <div className="contact-info-item">
              <div className="contact-icon">
                <PhoneIcon />
              </div>
              <div>
                <h4>Phone</h4>
                <p>{profile.phone}</p>
              </div>
            </div>
            <div className="contact-info-item">
              <div className="contact-icon">
                <PinIcon />
              </div>
              <div>
                <h4>Location</h4>
                <p>{profile.location}</p>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="name">Name</label>
                <input id="name" name="name" required value={form.name} onChange={handleChange} placeholder="Your name" />
              </div>
              <div className="form-field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div className="form-field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                required
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about the opportunity or project..."
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={sending}>
              {sending ? "Sending..." : "Send message"}
            </button>
            {status && <p className="form-status">{status}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}
