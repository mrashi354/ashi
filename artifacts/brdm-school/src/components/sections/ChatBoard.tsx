import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, RotateCcw, Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const QUICK_QUESTIONS = [
  'Admission kaise hoti hai?',
  'Fee structure kya hai?',
  'School ki timings kya hain?',
  'Kaun kaun si classes hain?',
  'Teachers ke baare mein batayein',
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

export function ChatBoard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
      let full = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const payload = JSON.parse(line.slice(6)) as { content?: string; error?: string };
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
    } catch (err: unknown) {
      if ((err as Error).name !== 'AbortError') {
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: 'assistant',
            content: 'Maafi chahta hoon, kuch masla aa gaya. Dobara koshish karein.',
          };
          return updated;
        });
      }
    } finally {
      setStreaming(false);
    }
  }

  async function handleSend(text?: string) {
    const q = (text ?? input).trim();
    if (!q || streaming) return;
    const userMsg: Message = { role: 'user', content: q };
    const newMsgs = [...messages.filter((m) => m.content), userMsg];
    setMessages(newMsgs);
    setInput('');
    await streamResponse(newMsgs);
  }

  function handleReset() {
    abortRef.current?.abort();
    setMessages([]);
    setStreaming(false);
    setInput('');
  }

  const hasMessages = messages.length > 0;

  return (
    <section className="py-14 sm:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
            Koi Bhi Sawaal Poochein
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Chat Board
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
            School ke baare mein koi bhi sawaal poochein — hamara AI assistant
            turant jawab dega.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="max-w-3xl mx-auto"
        >
          <div className="rounded-3xl border border-border bg-card shadow-xl overflow-hidden flex flex-col"
               style={{ minHeight: '480px', maxHeight: '600px' }}>

            {/* Toolbar */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-muted/40">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground leading-tight">BRDM Assistant</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <p className="text-xs text-muted-foreground">Online</p>
                  </div>
                </div>
              </div>
              {hasMessages && (
                <button
                  onClick={handleReset}
                  className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                  title="Clear chat"
                >
                  <RotateCcw size={15} />
                </button>
              )}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">

              {/* Welcome state */}
              <AnimatePresence>
                {!hasMessages && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-full pt-8 pb-4 text-center"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                      <Bot size={32} className="text-primary" />
                    </div>
                    <p className="font-semibold text-foreground mb-1">Namaste! 👋</p>
                    <p className="text-sm text-muted-foreground mb-6 max-w-xs">
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

              {/* Message bubbles */}
              {messages.map((msg, i) => {
                const isLast = i === messages.length - 1;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      'flex gap-2.5 items-end',
                      msg.role === 'user' ? 'justify-end' : 'justify-start',
                    )}
                  >
                    {msg.role === 'assistant' && (
                      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mb-0.5">
                        <Bot size={14} className="text-primary" />
                      </div>
                    )}
                    <div
                      className={cn(
                        'max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
                        msg.role === 'user'
                          ? 'bg-primary text-primary-foreground rounded-br-sm'
                          : 'bg-muted text-foreground rounded-bl-sm border border-border',
                      )}
                    >
                      {msg.content || (isLast && streaming ? <TypingDots /> : null)}
                    </div>
                    {msg.role === 'user' && (
                      <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center shrink-0 mb-0.5">
                        <User size={14} className="text-muted-foreground" />
                      </div>
                    )}
                  </motion.div>
                );
              })}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-border bg-background flex gap-2 items-center">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Apna sawaal yahan likhein..."
                disabled={streaming}
                className="flex-1 min-w-0 text-sm px-4 py-2.5 rounded-xl border border-border bg-muted/30 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary disabled:opacity-50 transition"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || streaming}
                className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 disabled:opacity-40 transition-opacity shrink-0"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
