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

router.post("/admissions", async (req, res) => {
  try {
    const parentName = readField(req.body?.parentName, "Parent's name");
    const childName = readField(req.body?.childName, "Child's name");
    const phone = readField(req.body?.phone, "Phone number");
    const grade = readField(req.body?.grade, "Grade");

    if (parentName.length > 120 || childName.length > 120 || phone.length > 40 || grade.length > 80) {
      res.status(400).json({ message: "Please enter valid form details." });
      return;
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      req.log.error("RESEND_API_KEY is not configured");
      res.status(503).json({ message: "Email service is not configured yet." });
      return;
    }

    const resend = new Resend(apiKey);

    const safeParentName = escapeHtml(parentName);
    const safeChildName = escapeHtml(childName);
    const safePhone = escapeHtml(phone);
    const safeGrade = escapeHtml(grade);

    const { error } = await resend.emails.send({
      from: "BRDM Public School <onboarding@resend.dev>",
      to: [RECIPIENT_EMAIL],
      subject: `New admission enquiry from ${parentName}`,
      html: `
        <h2>New BRDM Public School Admission Enquiry</h2>
        <p><strong>Parent's Name:</strong> ${safeParentName}</p>
        <p><strong>Child's Name:</strong> ${safeChildName}</p>
        <p><strong>Phone Number:</strong> ${safePhone}</p>
        <p><strong>Grade Applying For:</strong> ${safeGrade}</p>
      `,
      text: [
        "New BRDM Public School Admission Enquiry",
        `Parent's Name: ${parentName}`,
        `Child's Name: ${childName}`,
        `Phone Number: ${phone}`,
        `Grade Applying For: ${grade}`,
      ].join("\n"),
    });

    if (error) {
      req.log.error({ error }, "Resend email request failed");
      res.status(502).json({ message: "We could not send your request. Please try again." });
      return;
    }

    res.status(202).json({ message: "Your request was sent successfully." });
  } catch (error) {
    if (error instanceof Error && error.message.endsWith(" is required")) {
      res.status(400).json({ message: error.message });
      return;
    }

    req.log.error({ err: error }, "Admission form submission failed");
    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
});

export default router;
