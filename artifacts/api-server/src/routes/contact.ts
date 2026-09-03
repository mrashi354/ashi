import { Router, type IRouter } from "express";
import { Resend } from "resend";

const router: IRouter = Router();

const RECIPIENT_EMAIL = "akstudioa97@gmail.com";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function readField(value: unknown, fieldName: string) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${fieldName} is required`);
  }
  return value.trim();
}

router.post("/contact", async (req, res) => {
  try {
    const name    = readField(req.body?.name,    "Name");
    const contact = readField(req.body?.contact, "Phone / Email");
    const subject = readField(req.body?.subject, "Subject");
    const message = readField(req.body?.message, "Message");

    if (name.length > 120 || contact.length > 120 || subject.length > 120 || message.length > 2000) {
      res.status(400).json({ message: "Please enter valid details." });
      return;
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      req.log.error("RESEND_API_KEY is not configured");
      res.status(503).json({ message: "Email service is not configured yet." });
      return;
    }

    const resend = new Resend(apiKey);

    const safeName    = escapeHtml(name);
    const safeContact = escapeHtml(contact);
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message).replaceAll("\n", "<br>");

    const { error } = await resend.emails.send({
      from: "BRDM Public School <onboarding@resend.dev>",
      to: [RECIPIENT_EMAIL],
      subject: `[Contact] ${subject} — from ${name}`,
      html: `
        <h2>New Contact Message — BRDM Public School</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Phone / Email:</strong> ${safeContact}</p>
        <p><strong>Subject:</strong> ${safeSubject}</p>
        <p><strong>Message:</strong><br>${safeMessage}</p>
      `,
      text: [
        "New Contact Message — BRDM Public School",
        `Name: ${name}`,
        `Phone / Email: ${contact}`,
        `Subject: ${subject}`,
        `Message:\n${message}`,
      ].join("\n"),
    });

    if (error) {
      req.log.error({ error }, "Resend contact email failed");
      res.status(502).json({ message: "Could not send your message. Please try again." });
      return;
    }

    res.status(202).json({ message: "Message sent successfully!" });
  } catch (error) {
    if (error instanceof Error && error.message.endsWith(" is required")) {
      res.status(400).json({ message: error.message });
      return;
    }
    req.log.error({ err: error }, "Contact form submission failed");
    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
});

export default router;
