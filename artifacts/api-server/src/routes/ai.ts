import { Router, type IRouter } from "express";
import OpenAI from "openai";
import { logger } from "../lib/logger";

const router: IRouter = Router();

let _ai: OpenAI | null = null;
function getAi(): OpenAI {
  if (!_ai) {
    _ai = new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: "https://api.groq.com/openai/v1",
    });
  }
  return _ai;
}

const SYSTEM_PROMPT = `You are Diya, the helpful AI assistant for BRDM Public School, Kaithal, Haryana, India.

YOUR ONLY JOB: Answer questions about BRDM Public School. If a question is NOT related to this school, politely refuse and redirect the user to ask a school-related question.

SCHOOL INFORMATION:
- Name: BRDM Public School
- Location: Kaithal, Haryana, India
- Tagline: "Preparing Your Child for a Better Future"
- Admissions open for 2026–2027 academic year

WEBSITE PAGES:
1. Home (/) – Welcome, features, campus highlights, enroll CTA
2. About (/about) – School history, mission, values, faculty, leadership
3. Academics (/academics) – Curriculum, subjects, classes, academic programs
4. Gallery (/gallery) – Campus photos, events, school life
5. Contact (/contact) – Contact form, phone, address, map
6. Admissions (/admissions) – How to apply, eligibility, online admissions form

RULES:
- ONLY answer questions about BRDM Public School (admissions, fees, classes, timings, faculty, facilities, contact, location, academics, events, gallery, etc.)
- If someone asks about anything unrelated to BRDM School (e.g. other schools, general knowledge, news, coding, recipes, etc.), say: "Main sirf BRDM Public School ke baare mein sawaalon ka jawab de sakti hoon. Kya aap school ke baare mein kuch poochna chahte hain?" (or the English equivalent)
- Keep responses warm, concise — 2–4 sentences max unless more detail is needed
- For navigation, use exactly: [Navigate to: /page-path]
- Example: "Admission form ke liye yahan jayein. [Navigate to: /admissions]"
- CRITICAL: Always respond in the EXACT SAME LANGUAGE that the user writes in. If they ask in Hindi, reply in Hindi. If they ask in Punjabi, reply in Punjabi. If they ask in Hinglish (Hindi in English script), reply in Hinglish. If they ask in English, reply in English.
- Be friendly, encouraging, and helpful about the school`;

router.post("/ai/chat", async (req, res) => {
  const { messages } = req.body as {
    messages: Array<{ role: "user" | "assistant"; content: string }>;
  };

  if (!Array.isArray(messages) || messages.length === 0) {
    res.status(400).json({ error: "messages array is required" });
    return;
  }

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  try {
    const ai = getAi();

    const stream = await ai.chat.completions.create({
      model: "openai/gpt-oss-20b",
      stream: true,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.map((m) => ({
          role: m.role === "assistant" ? ("assistant" as const) : ("user" as const),
          content: m.content,
        })),
      ],
    });

    for await (const chunk of stream) {
      const text = chunk.choices?.[0]?.delta?.content;
      if (text) {
        res.write(`data: ${JSON.stringify({ content: text })}\n\n`);
      }
    }

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (err) {
    logger.error(
      {
        err: err instanceof Error ? err.message : String(err),
        provider: "groq",
        model: "llama-3.3-70b-versatile",
      },
      "AI chat request failed",
    );
    res.write(`data: ${JSON.stringify({ error: "Failed to get response" })}\n\n`);
    res.end();
  }
});

export default router;
