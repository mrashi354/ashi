import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, RotateCcw } from 'lucide-react';
import { useLocation } from 'wouter';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const NAV_REGEX = /\[Navigate to: (\/[^\]]*)\]/g;

function parseContent(text: string): { clean: string; navPath: string | null } {
  let navPath: string | null = null;
  const clean = text
    .replace(NAV_REGEX, (_match, path) => { navPath = path; return ''; })
    .trim();
  return { clean, navPath };
}

const PAGE_LABELS: Record<string, string> = {
  '/': 'Home', '/about': 'About', '/academics': 'Academics',
  '/gallery': 'Gallery', '/contact': 'Contact', '/admissions': 'Admissions',
};

/* ─────────────────────────────────────────────
   Animated 3D Robot
───────────────────────────────────────────── */
function AnimatedRobot({ size = 80, talking = false }: { size?: number; talking?: boolean }) {
  const s = size / 100; // scale factor (viewBox is 100×130)

  return (
    <svg
      width={size}
      height={size * 1.3}
      viewBox="0 0 100 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      overflow="visible"
    >
      <defs>
        {/* Head gradient */}
        <linearGradient id="rh" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e0e7ff" />
          <stop offset="100%" stopColor="#a5b4fc" />
        </linearGradient>
        {/* Body gradient */}
        <linearGradient id="rb" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c7d2fe" />
          <stop offset="100%" stopColor="#818cf8" />
        </linearGradient>
        {/* Arm/leg gradient */}
        <linearGradient id="rl" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a5b4fc" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
        {/* Glow filter */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        {/* Shadow */}
        <filter id="shadow">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#4f46e5" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* ── Antenna ── */}
      <motion.g
        animate={{ rotate: [-8, 8, -8] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ originX: '50px', originY: '12px' }}
      >
        <line x1="50" y1="5" x2="50" y2="16" stroke="#818cf8" strokeWidth="2.5" strokeLinecap="round" />
        <motion.circle
          cx="50" cy="4" r="3.5" fill="#6366f1"
          animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
          filter="url(#glow)"
        />
      </motion.g>

      {/* ── Body bob ── */}
      <motion.g
        animate={{ y: [-2, 2, -2] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >

        {/* Head */}
        <motion.rect
          x="22" y="15" width="56" height="40" rx="14"
          fill="url(#rh)" filter="url(#shadow)"
          animate={{ scaleX: talking ? [1, 1.01, 1] : 1 }}
          transition={{ duration: 0.3, repeat: talking ? Infinity : 0 }}
        />

        {/* Face plate (3D inset) */}
        <rect x="27" y="20" width="46" height="30" rx="10" fill="#dde4ff" opacity="0.6" />

        {/* Eyes */}
        <motion.g
          animate={{ scaleY: [1, 0.08, 1, 1, 1] }}
          transition={{ duration: 3.5, repeat: Infinity, times: [0, 0.04, 0.08, 0.5, 1] }}
          style={{ originY: '32px' }}
        >
          {/* Left eye */}
          <circle cx="38" cy="32" r="7" fill="#1e1b4b" />
          <circle cx="38" cy="32" r="5" fill="#4f46e5" />
          <motion.circle
            cx="38" cy="32" r="3.5" fill="#818cf8"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <circle cx="40" cy="29.5" r="1.5" fill="white" opacity="0.9" />

          {/* Right eye */}
          <circle cx="62" cy="32" r="7" fill="#1e1b4b" />
          <circle cx="62" cy="32" r="5" fill="#4f46e5" />
          <motion.circle
            cx="62" cy="32" r="3.5" fill="#818cf8"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
          />
          <circle cx="64" cy="29.5" r="1.5" fill="white" opacity="0.9" />
        </motion.g>

        {/* Mouth */}
        <motion.path
          d={talking ? 'M38 43 Q50 50 62 43' : 'M38 43 Q50 48 62 43'}
          stroke="#818cf8" strokeWidth="2.5" strokeLinecap="round" fill="none"
          animate={talking ? { d: ['M38 43 Q50 50 62 43', 'M38 45 Q50 40 62 45', 'M38 43 Q50 50 62 43'] } : {}}
          transition={{ duration: 0.4, repeat: talking ? Infinity : 0 }}
        />

        {/* Ear bolts */}
        <circle cx="22" cy="35" r="4" fill="url(#rl)" />
        <circle cx="22" cy="35" r="2" fill="#818cf8" />
        <circle cx="78" cy="35" r="4" fill="url(#rl)" />
        <circle cx="78" cy="35" r="2" fill="#818cf8" />

        {/* Body */}
        <rect x="26" y="57" width="48" height="38" rx="10" fill="url(#rb)" filter="url(#shadow)" />
        {/* Body highlight */}
        <rect x="30" y="61" width="40" height="10" rx="5" fill="white" opacity="0.15" />

        {/* Chest light */}
        <motion.g
          style={{ originX: '50px', originY: '74px' }}
          animate={{ scale: [0.85, 1.15, 0.85], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          <circle cx="50" cy="74" r="7" fill="#6ee7f7" filter="url(#glow)" />
          <circle cx="50" cy="74" r="4" fill="white" opacity="0.9" />
        </motion.g>

        {/* Chest buttons */}
        <circle cx="38" cy="85" r="3" fill="#a5b4fc" opacity="0.8" />
        <circle cx="50" cy="85" r="3" fill="#6366f1" opacity="0.8" />
        <circle cx="62" cy="85" r="3" fill="#a5b4fc" opacity="0.8" />

        {/* ── Left arm (gentle wave) ── */}
        <motion.g
          style={{ originX: '26px', originY: '62px' }}
          animate={{ rotate: [-8, 4, -8] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <rect x="10" y="58" width="16" height="26" rx="8" fill="url(#rl)" />
          <rect x="12" y="80" width="12" height="16" rx="6" fill="#818cf8" />
          <circle cx="18" cy="98" r="6" fill="url(#rl)" />
          <circle cx="18" cy="98" r="3" fill="#a5b4fc" />
        </motion.g>

        {/* ── Right arm (gentle alternate) ── */}
        <motion.g
          style={{ originX: '74px', originY: '62px' }}
          animate={{ rotate: [8, -4, 8] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: 1.3 }}
        >
          <rect x="74" y="58" width="16" height="26" rx="8" fill="url(#rl)" />
          <rect x="76" y="80" width="12" height="16" rx="6" fill="#818cf8" />
          <circle cx="82" cy="98" r="6" fill="url(#rl)" />
          <circle cx="82" cy="98" r="3" fill="#a5b4fc" />
        </motion.g>

        {/* ── Left leg (subtle sway) ── */}
        <motion.g
          style={{ originX: '37px', originY: '95px' }}
          animate={{ rotate: [-4, 4, -4] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <rect x="30" y="93" width="14" height="22" rx="7" fill="url(#rl)" />
          <rect x="32" y="112" width="10" height="14" rx="5" fill="#818cf8" />
          <rect x="28" y="123" width="18" height="7" rx="3.5" fill="url(#rl)" />
        </motion.g>

        {/* ── Right leg (opposite subtle sway) ── */}
        <motion.g
          style={{ originX: '63px', originY: '95px' }}
          animate={{ rotate: [4, -4, 4] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 1.1 }}
        >
          <rect x="56" y="93" width="14" height="22" rx="7" fill="url(#rl)" />
          <rect x="58" y="112" width="10" height="14" rx="5" fill="#818cf8" />
          <rect x="54" y="123" width="18" height="7" rx="3.5" fill="url(#rl)" />
        </motion.g>

      </motion.g>

      {/* Ground shadow */}
      <ellipse cx="50" cy="134" rx="28" ry="5" fill="#4f46e5" opacity="0.15" />
    </svg>
  );
}

/* Small robot icon for header + message bubbles */
function RobotMini({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect x="8" y="6" width="24" height="18" rx="7" fill="#c7d2fe" />
      <circle cx="15" cy="15" r="3.5" fill="#4f46e5" />
      <circle cx="25" cy="15" r="3.5" fill="#4f46e5" />
      <circle cx="16.2" cy="13.8" r="1.2" fill="white" opacity="0.9" />
      <circle cx="26.2" cy="13.8" r="1.2" fill="white" opacity="0.9" />
      <path d="M15 21 Q20 24 25 21" stroke="#818cf8" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <rect x="12" y="25" width="16" height="10" rx="4" fill="#a5b4fc" />
      <circle cx="20" cy="30" r="2.5" fill="#6ee7f7" opacity="0.8" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Main TourGuide component
───────────────────────────────────────────── */
export function TourGuide() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [, navigate] = useLocation();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (open && messages.length === 0) sendGreeting();
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function sendGreeting() {
    await streamResponse([{ role: 'user', content: 'Hello, I just arrived at the website.' }]);
  }

  async function streamResponse(msgs: Message[]) {
    setStreaming(true);
    const controller = new AbortController();
    abortRef.current = controller;
    setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);
    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: msgs }),
        signal: controller.signal,
      });
      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let fullContent = '';
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const payload = JSON.parse(line.slice(6)) as { content?: string; done?: boolean; error?: string };
          if (payload.content) {
            fullContent += payload.content;
            setMessages((prev) => {
              const updated = [...prev];
              updated[updated.length - 1] = { role: 'assistant', content: fullContent };
              return updated;
            });
          }
        }
      }
      const { navPath } = parseContent(fullContent);
      if (navPath) setTimeout(() => navigate(navPath), 1200);
    } catch (err: unknown) {
      if ((err as Error).name !== 'AbortError') {
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' };
          return updated;
        });
      }
    } finally {
      setStreaming(false);
    }
  }

  async function handleSend() {
    const text = input.trim();
    if (!text || streaming) return;
    const userMsg: Message = { role: 'user', content: text };
    const newMessages = [...messages.filter((m) => m.content), userMsg];
    setMessages(newMessages);
    setInput('');
    await streamResponse(newMessages);
  }

  function handleReset() {
    abortRef.current?.abort();
    setMessages([]);
    setStreaming(false);
    setInput('');
    setTimeout(() => sendGreeting(), 100);
  }

  const navSuggestions = messages
    .filter((m) => m.role === 'assistant' && m.content)
    .flatMap((m) => [...m.content.matchAll(NAV_REGEX)].map((match) => match[1]))
    .filter((v, i, arr) => arr.indexOf(v) === i)
    .slice(-1);

  return (
    <>
      {/* ── Floating button with animated robot ── */}
      <AnimatePresence>
        {!open && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ delay: 0.8, type: 'spring', stiffness: 260, damping: 20 }}
            className="fixed bottom-4 right-4 z-50 cursor-pointer select-none"
            onClick={() => setOpen(true)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            title="Chat with Diya"
          >
            {/* Glow backdrop */}
            <div
              className="absolute inset-2 rounded-full blur-xl opacity-50 animate-pulse"
              style={{ background: 'radial-gradient(circle, #818cf8, #4f46e5)' }}
            />

            {/* Robot */}
            <div className="relative">
              <AnimatedRobot size={80} />
            </div>

            {/* Chat bubble label */}
            <motion.div
              animate={{ y: [-2, 2, -2] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-10 right-0 bg-white text-indigo-600 text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg border border-indigo-100 whitespace-nowrap"
            >
              Hi! I'm Diya 👋
              <span className="absolute -bottom-1.5 right-4 w-3 h-3 bg-white border-r border-b border-indigo-100 rotate-45" />
            </motion.div>

            {/* Online badge */}
            <span className="absolute top-2 right-1 w-3.5 h-3.5 rounded-full bg-green-400 border-2 border-white shadow-sm" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Chat panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="fixed bottom-6 right-6 z-50 w-[min(390px,calc(100vw-1.5rem))] flex flex-col rounded-2xl shadow-2xl overflow-hidden border border-indigo-200/30"
            style={{ maxHeight: 'min(560px, calc(100dvh - 5rem))' }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-4 py-3 shrink-0"
              style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 60%, #2563eb 100%)' }}
            >
              {/* Mini robot in header */}
              <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                <RobotMini size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-white leading-tight">Diya</p>
                <div className="flex items-center gap-1.5">
                  <motion.span
                    className="w-1.5 h-1.5 rounded-full bg-green-400"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <p className="text-xs text-white/70">AI Tour Guide · BRDM School</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={handleReset} className="p-1.5 rounded-lg hover:bg-white/15 transition-colors text-white/80 hover:text-white" title="Restart">
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg hover:bg-white/15 transition-colors text-white/80 hover:text-white" title="Close">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Gradient strip */}
            <div className="h-0.5 shrink-0" style={{ background: 'linear-gradient(90deg, #6366f1, #a855f7, #3b82f6)' }} />

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0 bg-[#f5f3ff]">
              {messages.map((msg, i) => {
                const { clean } = parseContent(msg.content);
                const isLast = i === messages.length - 1;
                return (
                  <div key={i} className={cn('flex gap-2 items-end', msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                    {msg.role === 'assistant' && (
                      <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mb-0.5" style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}>
                        <RobotMini size={18} />
                      </div>
                    )}
                    <div
                      className={cn(
                        'max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm',
                        msg.role === 'user'
                          ? 'text-white rounded-br-sm'
                          : 'bg-white text-gray-700 rounded-bl-sm border border-indigo-100',
                      )}
                      style={msg.role === 'user' ? { background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' } : {}}
                    >
                      {clean || (isLast && streaming ? (
                        <span className="inline-flex gap-1 items-center h-4">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:0ms]" />
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:150ms]" />
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:300ms]" />
                        </span>
                      ) : null)}
                    </div>
                  </div>
                );
              })}

              {navSuggestions.length > 0 && !streaming && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start pl-9">
                  <button onClick={() => navigate(navSuggestions[0])} className="text-xs font-medium px-3 py-1.5 rounded-full border border-indigo-300 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors">
                    → Go to {PAGE_LABELS[navSuggestions[0]] ?? navSuggestions[0]}
                  </button>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick prompts */}
            {messages.filter((m) => m.role === 'user').length === 0 && !streaming && (
              <div className="px-4 pb-2 pt-2 shrink-0 bg-[#f5f3ff] border-t border-indigo-100">
                <p className="text-xs text-indigo-400 mb-2 font-medium">Quick questions:</p>
                <div className="flex flex-wrap gap-1.5">
                  {['How do I apply for admission?', 'Tell me about academics', 'Show me the gallery', 'How to contact the school?'].map((q) => (
                    <button
                      key={q}
                      onClick={() => {
                        setTimeout(() => {
                          const userMsg: Message = { role: 'user', content: q };
                          const newMessages = [...messages.filter((m) => m.content), userMsg];
                          setMessages(newMessages);
                          setInput('');
                          streamResponse(newMessages);
                        }, 0);
                      }}
                      className="text-xs px-2.5 py-1 rounded-full bg-white border border-indigo-200 text-indigo-600 hover:bg-indigo-50 transition-colors shadow-sm"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="px-3 py-3 bg-white border-t border-indigo-100 shrink-0 flex gap-2 items-center">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything about the school…"
                disabled={streaming}
                className="flex-1 min-w-0 text-sm px-3 py-2 rounded-xl border border-indigo-200 bg-indigo-50/50 placeholder:text-indigo-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 disabled:opacity-50 transition"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || streaming}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white hover:opacity-90 disabled:opacity-40 transition-opacity shrink-0 shadow-sm"
                style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
