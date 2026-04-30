import { useState, useRef, useEffect } from 'react';
import './AIChatPanel.css';

const SUGGESTIONS = {
  plan:   ['Suggest a differentiation strategy for Activity 2', 'What misconceptions should I watch for today?', 'Generate an alternate warm-up for this lesson'],
  teach:  ['How do I explain tiling vs. area to a struggling student?', 'Give me a quick formative check question', 'Summarize the key synthesis points so far'],
  assess: ['Which students need intervention support?', 'What patterns do you see in the Cool-Down responses?', 'Draft a note to parents for students who need review'],
};

const SEED_MESSAGES = [
  { role: 'assistant', text: "Hi Ms. Torres! I'm your Kiddom AI assistant. I can help you plan, facilitate, and assess this lesson. What would you like to explore?" },
];

export default function AIChatPanel({ onClose, mode }) {
  const [messages, setMessages] = useState(SEED_MESSAGES);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, thinking]);

  function sendMessage(text) {
    if (!text.trim()) return;
    setMessages(m => [...m, { role: 'user', text }]);
    setInput('');
    setThinking(true);
    setTimeout(() => {
      setThinking(false);
      setMessages(m => [...m, { role: 'assistant', text: getReply(text, mode) }]);
    }, 1200 + Math.random() * 600);
  }

  return (
    <aside className="ai-panel">
      <div className="ai-panel__header">
        <div className="ai-panel__title">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 1l1.5 3.5L13 6 9.5 8.5 11 12 8 10l-3 2 1.5-3.5L3 6l3.5-1.5L8 1z" fill="var(--purple)"/>
          </svg>
          Kiddom AI
        </div>
        <button className="ai-panel__close" onClick={onClose}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Message thread */}
      <div className="ai-panel__messages">
        {messages.map((msg, i) => (
          <div key={i} className={`ai-msg ai-msg--${msg.role}`}>
            {msg.role === 'assistant' && (
              <div className="ai-msg__avatar">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1l1.5 3.5L13 6 9.5 8.5 11 12 8 10l-3 2 1.5-3.5L3 6l3.5-1.5L8 1z" fill="#fff"/>
                </svg>
              </div>
            )}
            <div className="ai-msg__bubble">{msg.text}</div>
          </div>
        ))}
        {thinking && (
          <div className="ai-msg ai-msg--assistant">
            <div className="ai-msg__avatar">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M8 1l1.5 3.5L13 6 9.5 8.5 11 12 8 10l-3 2 1.5-3.5L3 6l3.5-1.5L8 1z" fill="#fff"/>
              </svg>
            </div>
            <div className="ai-msg__bubble ai-msg__bubble--thinking">
              <span /><span /><span />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      <div className="ai-panel__suggestions">
        {SUGGESTIONS[mode]?.map((s, i) => (
          <button key={i} className="ai-suggestion" onClick={() => sendMessage(s)}>
            {s}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="ai-panel__input-row">
        <input
          className="ai-panel__input"
          placeholder="Ask about this lesson…"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
        />
        <button
          className="ai-panel__send"
          onClick={() => sendMessage(input)}
          disabled={!input.trim()}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M14 8H2M10 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </aside>
  );
}

function getReply(input, mode) {
  const lower = input.toLowerCase();
  if (lower.includes('misconception') || lower.includes('watch for'))
    return 'The biggest risk in this lesson is students conflating area with count — they may say "Pattern A has more coverage because it has more shapes." Push them to ask: "But how big is each shape?" The trapezoid-triangle equivalence in Activity 2 is the conceptual crux.';
  if (lower.includes('differentiat'))
    return 'For students who are ready to extend: ask them to estimate what fraction of Pattern B is covered by blue. For students who need support: provide pre-cut pattern block cutouts so they can physically lay shapes on top of each other and compare sizes directly.';
  if (lower.includes('intervention') || lower.includes('support'))
    return 'Based on Cool-Down responses, I\'d prioritize Ben C., Finn G., and Yasmin Z. — all three are conflating area with perimeter or shape count. A small-group follow-up at the start of Lesson 2 with physical blocks would help ground their thinking.';
  if (lower.includes('pattern') || lower.includes('cool-down'))
    return 'Of the 9 flagged students, 6 are confusing area with either perimeter or shape count. Only 2 have incomplete definitions (general confusion). This suggests the Activity 2 discussion of trapezoid = 3 triangles didn\'t land for roughly 1 in 3 students — worth revisiting in Lesson 2 warm-up.';
  if (lower.includes('formative') || lower.includes('check'))
    return 'Quick check: "Hold up fingers — how many green triangles equal one red trapezoid?" If they hold up 3, they got the core idea. If you see 2 or 6, pause and do a quick physical demonstration with pattern blocks.';
  if (mode === 'plan')
    return "Great question! Based on the IM curriculum guide, this lesson connects directly to 6.G.A.1. I'd suggest giving students about 2–3 minutes of quiet work before partner discussion in Activity 1 — it leads to richer conversation.";
  return "That's a thoughtful question. Based on the lesson content and your class data, I'd focus on the key tension between counting shapes and measuring coverage. Want me to draft a specific prompt or activity modification?";
}
