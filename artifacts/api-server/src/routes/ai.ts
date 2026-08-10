import { Router, type IRouter } from "express";
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { logger } from "../lib/logger";

const router: IRouter = Router();

let _ai: GoogleGenAI | null = null;
function getAi(): GoogleGenAI {
  if (!_ai) {
    _ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
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
    
    // Convert to Gemini format
    // Gemini chat expects history as { role: 'user' | 'model', parts: [{ text: '...' }] }
    // We can also just use generateContentStream with system instruction and history
    const history = messages.slice(0, -1).map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));
    
    const latestMessage = messages[messages.length - 1].content;
    
    const stream = await ai.models.generateContentStream({
      model: "gemini-3.6-flash",
      contents: [
        ...history,
        { role: 'user', parts: [{ text: latestMessage }] }
      ],
      config: {
        systemInstruction: SYSTEM_PROMPT,
      }
    });

    for await (const chunk of stream) {
      const c = chunk as GenerateContentResponse;
      if (c.text) {
        res.write(`data: ${JSON.stringify({ content: c.text })}\n\n`);
      }
    }

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (err) {
    logger.error(
      {
        err: err instanceof Error ? err.message : String(err),
        provider: "gemini",
        model: "gemini-3.6-flash",
      },
      "AI chat request failed",
    );
    res.write(`data: ${JSON.stringify({ error: "Failed to get response" })}\n\n`);
    res.end();
  }
});

export default router;
