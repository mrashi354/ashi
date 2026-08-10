import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Send, RotateCcw, User, Volume2, VolumeX, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface SpeechRecognitionResultLike {
  isFinal: boolean;
  0?: { transcript: string };
}

interface SpeechRecognitionEventLike extends Event {
  resultIndex: number;
  results: {
    length: number;
    [index: number]: SpeechRecognitionResultLike;
  };
}

interface SpeechRecognitionErrorEventLike extends Event {
  error: string;
}

interface BrowserSpeechRecognition {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onstart: (() => void) | null;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEventLike) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

type SpeechRecognitionConstructor = new () => BrowserSpeechRecognition;

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

const QUICK_QUESTIONS = [
  'Admission kaise hoti hai?',
  'Fee structure kya hai?',
  'School ki timings kya hain?',
  'Kaun kaun si classes hain?',
];

function TypingDots() {
  return (
    <span className="inline-flex gap-1 items-center h-4 px-1">
      {[0, 150, 300].map((delay) => (
        <span
          key={delay}
          className="w-2 h-2 rounded-full bg-primary animate-bounce"
          style={{ animationDelay: `${delay}ms` }}
        />
      ))}
    </span>
  );
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [listening, setListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const [voiceError, setVoiceError] = useState('');
  const [speakingMessage, setSpeakingMessage] = useState<number | 'auto' | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const recognitionRef = useRef<BrowserSpeechRecognition | null>(null);
  const voiceTranscriptRef = useRef('');
  const speakNextResponseRef = useRef(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function getSpeechRecognition() {
    if (typeof window === 'undefined') return null;
    return window.SpeechRecognition ?? window.webkitSpeechRecognition ?? null;
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    setVoiceSupported(Boolean(getSpeechRecognition()));

    return () => {
      recognitionRef.current?.abort();
      window.speechSynthesis?.cancel();
    };
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  function speakText(text: string, messageIndex?: number) {
    if (!('speechSynthesis' in window) || !text.trim()) return;

    window.speechSynthesis.cancel();
    const cleanText = text.replace(/\[Navigate to:.*?\]/g, '').trim();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = /[\u0900-\u097F]/.test(cleanText) ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.95;
    utterance.onend = () => setSpeakingMessage(null);
    utterance.onerror = () => setSpeakingMessage(null);
    setSpeakingMessage(messageIndex ?? 'auto');
    window.speechSynthesis.speak(utterance);
  }

  function stopSpeaking() {
    window.speechSynthesis?.cancel();
    setSpeakingMessage(null);
  }

  function toggleListening() {
    if (streaming) return;

    if (listening) {
      recognitionRef.current?.stop();
      return;
    }

    const Recognition = getSpeechRecognition();
    if (!Recognition) {
      setVoiceError('Aapke browser mein voice input support nahi hai.');
      return;
    }

    const recognition = new Recognition();
    recognition.lang = 'hi-IN';
    recognition.interimResults = true;
    recognition.continuous = false;
    voiceTranscriptRef.current = '';
    setInput('');
    setVoiceError('');
    recognitionRef.current = recognition;

    recognition.onstart = () => setListening(true);
    recognition.onresult = (event) => {
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        const transcript = event.results[i]?.[0]?.transcript ?? '';
        if (event.results[i]?.isFinal) {
          voiceTranscriptRef.current += `${transcript} `;
        } else {
          interim += transcript;
        }
      }
      setInput(`${voiceTranscriptRef.current}${interim}`.trimStart());
    };
    recognition.onerror = (event) => {
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        setVoiceError('Mic use karne ke liye browser permission allow karein.');
      } else if (event.error !== 'aborted' && event.error !== 'no-speech') {
        setVoiceError('Voice input nahi mil paaya. Dobara try karein.');
      }
      setListening(false);
    };
    recognition.onend = () => {
      setListening(false);
      const transcript = voiceTranscriptRef.current.trim();
      recognitionRef.current = null;
      if (transcript) {
        void handleSend(transcript, true);
      }
    };

    try {
      recognition.start();
    } catch {
      setListening(false);
      setVoiceError('Mic start nahi ho paaya. Dobara try karein.');
    }
  }

  async function streamResponse(msgs: Message[]) {
    setStreaming(true);
    const controller = new AbortController();
    abortRef.current = controller;
    setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

    try {
      const base = import.meta.env.BASE_URL?.replace(/\/$/, '') ?? '';
      const res = await fetch(`${base}/api/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: msgs }),
        signal: controller.signal,
      });

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let full = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const payload = JSON.parse(line.slice(6)) as {
            content?: string;
            done?: boolean;
            error?: string;
          };
          if (payload.error) {
            throw new Error(payload.error);
          }
          if (payload.content) {
            full += payload.content;
            setMessages((prev) => {
              const updated = [...prev];
              updated[updated.length - 1] = { role: 'assistant', content: full };
              return updated;
            });
          }
        }
      }
      if (full.trim() && speakNextResponseRef.current) {
        speakText(full);
      }
    } catch (err: unknown) {
      if ((err as Error).name !== 'AbortError') {
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: 'assistant',
            content: 'Maafi chahti hoon, AI service se response nahi aa paaya. Thodi der baad dobara koshish karein.',
          };
          return updated;
        });
      }
    } finally {
      speakNextResponseRef.current = false;
      setStreaming(false);
    }
  }

  async function handleSend(text?: string, speakResponse = true) {
    const q = (text ?? input).trim();
    if (!q || streaming) return;
    const userMsg: Message = { role: 'user', content: q };
    const newMsgs = [...messages.filter((m) => m.content), userMsg];
    speakNextResponseRef.current = speakResponse;
    setMessages(newMsgs);
    setInput('');
    setVoiceError('');
    await streamResponse(newMsgs);
  }

  function handleReset() {
    abortRef.current?.abort();
    recognitionRef.current?.abort();
    stopSpeaking();
    setMessages([]);
    setListening(false);
    setStreaming(false);
    setInput('');
  }

  function handleClose() {
    abortRef.current?.abort();
    recognitionRef.current?.abort();
    setListening(false);
    setOpen(false);
  }

  const hasMessages = messages.length > 0;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="w-[340px] sm:w-[380px] rounded-2xl border border-border bg-card shadow-2xl flex flex-col overflow-hidden"
            style={{ maxHeight: '520px', height: '520px' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-primary text-primary-foreground shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-white flex items-center justify-center p-0.5">
                  <img src="/logo.png" alt="BRDM Logo" className="w-full h-full object-contain" />
                </div>
                <div>
                  <p className="text-sm font-semibold leading-tight">BRDM Assistant</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-300" />
                    <p className="text-xs text-white/80">Online</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {hasMessages && (
                  <button
                    onClick={handleReset}
                    className="p-1.5 rounded-lg hover:bg-white/20 transition-colors text-white/80 hover:text-white"
                    title="Clear chat"
                  >
                    <RotateCcw size={14} />
                  </button>
                )}
                <button
                  onClick={handleClose}
                  className="p-1.5 rounded-lg hover:bg-white/20 transition-colors text-white/80 hover:text-white"
                  title="Close"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-background">
              <AnimatePresence>
                {!hasMessages && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-full pt-4 pb-2 text-center"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center p-1 mb-3 shadow">
                      <img src="/logo.png" alt="BRDM Logo" className="w-full h-full object-contain" />
                    </div>
                    <p className="font-semibold text-foreground mb-1 text-sm">Namaste! 👋</p>
                    <p className="text-xs text-muted-foreground mb-4 max-w-[220px]">
                      BRDM Public School ke baare mein koi bhi sawaal poochein
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {QUICK_QUESTIONS.map((q) => (
                        <button
                          key={q}
                          onClick={() => handleSend(q)}
                          className="text-xs px-3 py-1.5 rounded-full border border-border bg-background hover:bg-primary/5 hover:border-primary/40 text-muted-foreground hover:text-primary transition-colors"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {messages.map((msg, i) => {
                const isLast = i === messages.length - 1;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      'flex gap-2 items-end',
                      msg.role === 'user' ? 'justify-end' : 'justify-start',
                    )}
                  >
                    {msg.role === 'assistant' && (
                      <div className="w-6 h-6 rounded-full overflow-hidden shrink-0 mb-0.5">
                        <img src="/ai-bot.jpg" alt="AI Bot" className="w-full h-full object-cover" />
                      </div>
                    )}
                     <div
                      className={cn(
                        'max-w-[78%] rounded-2xl px-3 py-2 text-xs leading-relaxed',
                        msg.role === 'user'
                          ? 'bg-primary text-primary-foreground rounded-br-sm'
                          : 'bg-muted text-foreground rounded-bl-sm border border-border',
                      )}
                    >
                       <div>{msg.content || (isLast && streaming ? <TypingDots /> : null)}</div>
                       {msg.role === 'assistant' && msg.content && !streaming && (
                         <button
                           onClick={() =>
                             speakingMessage === i ? stopSpeaking() : speakText(msg.content, i)
                           }
                           className="mt-1 inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-primary transition-colors"
                           aria-label={speakingMessage === i ? 'Stop voice reply' : 'Play voice reply'}
                         >
                           {speakingMessage === i ? <VolumeX size={12} /> : <Volume2 size={12} />}
                           {speakingMessage === i ? 'Stop' : 'Sunein'}
                         </button>
                       )}
                    </div>
                    {msg.role === 'user' && (
                      <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center shrink-0 mb-0.5">
                        <User size={12} className="text-muted-foreground" />
                      </div>
                    )}
                  </motion.div>
                );
              })}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="px-3 py-3 border-t border-border bg-card shrink-0">
              <div className="flex gap-2 items-center">
                <button
                  onClick={toggleListening}
                  disabled={!voiceSupported || streaming}
                  className={cn(
                    'w-9 h-9 rounded-xl flex items-center justify-center transition-colors shrink-0',
                    listening
                      ? 'bg-red-500 text-white animate-pulse'
                      : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary',
                    (!voiceSupported || streaming) && 'opacity-40 cursor-not-allowed',
                  )}
                  title={
                    voiceSupported
                      ? listening
                        ? 'Listening rokhein'
                        : 'Voice mein sawaal poochein'
                      : 'Voice input browser mein supported nahi hai'
                  }
                  aria-label={listening ? 'Stop listening' : 'Ask by voice'}
                >
                  <Mic size={14} />
                </button>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={listening ? 'Suniye... sawaal boliye' : 'Sawaal likhein...'}
                  disabled={streaming}
                  className="flex-1 min-w-0 text-xs px-3 py-2.5 rounded-xl border border-border bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary disabled:opacity-50 transition"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || streaming}
                  className="w-9 h-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 disabled:opacity-40 transition-opacity shrink-0"
                  aria-label="Send message"
                >
                  <Send size={14} />
                </button>
              </div>
              {voiceError && (
                <p className="mt-1.5 px-1 text-[11px] text-red-600" role="alert">
                  {voiceError}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-2xl flex items-center justify-center relative"
        aria-label="Open chat"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X size={22} />
            </motion.span>
          ) : (
            <motion.span
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="w-full h-full rounded-full overflow-hidden"
            >
              <img src="/ai-bot.jpg" alt="AI Bot" className="w-full h-full object-cover rounded-full" />
            </motion.span>
          )}
        </AnimatePresence>
        {/* Unread dot when closed */}
        {!open && (
          <span className="absolute top-1 right-1 w-3 h-3 rounded-full bg-green-400 border-2 border-white" />
        )}
      </motion.button>
    </div>
  );
}
