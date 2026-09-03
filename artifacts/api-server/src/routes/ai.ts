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
- GREETINGS & SMALL TALK: Always warmly greet the user back when they say hello/hi/hey/namaste/namaskar/pranam/salaam/sup/kaise ho/kya haal etc. Example responses: "Namaste! Main Diya hoon, BRDM Public School ki AI assistant. Aap school ke baare mein kya jaanna chahte hain?" or "Hello! Welcome to BRDM Public School. How can I help you today?". Always stay friendly and invite them to ask a school-related question.
- If someone asks about anything unrelated to BRDM School (e.g. other schools, general knowledge, news, coding, recipes, etc.), say: "Main sirf BRDM Public School ke baare mein sawaalon ka jawab de sakti hoon. Kya aap school ke baare mein kuch poochna chahte hain?" (or the English equivalent)
- Keep responses warm, concise — 2–4 sentences max unless more detail is needed
- For navigation, use exactly: [Navigate to: /page-path]
- Example: "Admission form ke liye yahan jayein. [Navigate to: /admissions]"
- CRITICAL: ALWAYS respond in the EXACT SAME LANGUAGE that the user writes in. Match BOTH the script AND the language. If the user writes in Hindi/Devanagari (e.g. "नामांकन कैसे करें"), reply in Hindi/Devanagari. If they write in Punjabi, reply in Punjabi. If they write in Hinglish (Hindi spoken in English/Latin script, e.g. "admission kaise kare"), reply in Hinglish. If they write in English, reply in English. If they write in Urdu, reply in Urdu. Never switch to a different language than the user used — the FIRST user message of the conversation sets the language for the whole reply. Even the navigation helper "[Navigate to: /page]" fits naturally in that same language. This rule overrides all other instructions including the refusal message above. Greetings too must be answered in the SAME language the user greeted in.
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
