import { apiUrl } from '@/lib/api';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export class ChatRequestError extends Error {
  status?: number;
  timedOut: boolean;

  constructor(message: string, options: { status?: number; timedOut?: boolean } = {}) {
    super(message);
    this.name = 'ChatRequestError';
    this.status = options.status;
    this.timedOut = options.timedOut ?? false;
  }
}

export interface StreamChatOptions {
  timeoutMs?: number;
  onChunk?: (text: string) => void;
  onFirstByte?: () => void;
  signal?: AbortSignal;
}

/**
 * Streams the BRDM AI chat response (SSE) from the API server.
 *
 * - Throws ChatRequestError for non-2xx responses (parses JSON error body).
 * - Aborts after `timeoutMs` (default 60s) so a cold-starting Render
 *   instance never leaves the UI hanging forever.
 * - An AbortSignal passed via `signal` aborts the request immediately
 *   (used when the user clears/closes the chat).
 * - Returns the full assistant reply.
 */
export async function streamChat(
  messages: ChatMessage[],
  options: StreamChatOptions = {},
): Promise<string> {
  const { timeoutMs = 60000, onChunk, onFirstByte, signal: externalSignal } = options;
  const controller = new AbortController();
  const timer =
    Number.isFinite(timeoutMs) && timeoutMs > 0
      ? setTimeout(() => controller.abort(), timeoutMs)
      : undefined;
  const onExternalAbort = () => controller.abort();
  externalSignal?.addEventListener('abort', onExternalAbort, { once: true });

  let firstByte = true;
  let full = '';

  try {
    const res = await fetch(apiUrl('/api/ai/chat'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
      signal: controller.signal,
    });

    if (!res.ok) {
      let message = `Request failed (${res.status})`;
      try {
        const data = (await res.json()) as { error?: string; message?: string };
        message = data.error || data.message || message;
      } catch {
        // Non-JSON error body — keep the generic message.
      }
      throw new ChatRequestError(message, { status: res.status });
    }

    if (!res.body) {
      throw new ChatRequestError('No response body', { status: res.status });
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      if (firstByte) {
        firstByte = false;
        onFirstByte?.();
      }

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
          throw new ChatRequestError(payload.error);
        }
        if (payload.content) {
          full += payload.content;
          onChunk?.(full);
        }
      }
    }

    return full;
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      if (externalSignal?.aborted) {
        // User cleared/closed the chat — rethrow so callers ignore it.
        throw new DOMException('The user aborted a request.', 'AbortError');
      }
      throw new ChatRequestError('Request timed out. Please try again.', { timedOut: true });
    }
    throw err;
  } finally {
    if (timer !== undefined) clearTimeout(timer);
    externalSignal?.removeEventListener('abort', onExternalAbort);
  }
}

/** Fires a warm-up request so a sleeping server boots while the user types. */
export function warmUpServer() {
  fetch(apiUrl('/api/healthz')).catch(() => {
    // Warm-up is best-effort; ignore failures.
  });
}