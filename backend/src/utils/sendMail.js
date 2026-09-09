import nodemailer from "nodemailer";

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  return transporter;
}

/**
 * Sends a notification email when a new contact message arrives.
 * Silently no-ops if SMTP env vars aren't configured — the message
 * is still saved to the database either way, so email is a bonus,
 * not a requirement.
 */
export async function notifyNewContactMessage({ name, email, message }) {
  const to = process.env.CONTACT_TO_EMAIL;
  const client = getTransporter();
  if (!client || !to) return;

  try {
    await client.sendMail({
      from: `"Portfolio contact form" <${process.env.SMTP_USER}>`,
      to,
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `<p><strong>From:</strong> ${name} (${email})</p><p>${message.replace(/\n/g, "<br/>")}</p>`,
    });
  } catch (err) {
    console.error("[mail] Failed to send notification email:", err.message);
  }
}
