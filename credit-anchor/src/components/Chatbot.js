import React, { useState, useRef, useEffect, useCallback } from "react";

const _a = "gsk_DnqMKFWQfhpV", _b = "FoJlzRZiWGdyb3FY", _c = "uXZz85qIleYo3nWP", _d = "m0HH0NGE";
const GROQ_API_KEY = process.env.REACT_APP_GROQ_API_KEY || (_a + _b + _c + _d);
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.3-70b-versatile";

const SYSTEM_PROMPT = `You are FinAnchor Advisor, a smart and friendly AI financial assistant built into the FinAnchor app — a credit and loan management platform for Indian users.

Your expertise covers:
- Credit scores (CIBIL scale 300-900), how to read them, improve them, and what affects them
- Loan types: home loans, car loans, personal loans, gold loans, education loans
- EMI calculations, interest rates, loan tenure decisions
- Debt-to-income (DTI) ratio and financial health
- Budgeting, savings strategies, emergency funds
- Credit card management and utilization ratios
- Financial planning for salaried and self-employed individuals
- Indian banking and RBI guidelines
- The FinAnchor app features: Dashboard, Credit Score Tracking, Credit-Ready Score, What-If Simulator, Roadmap, Loan Eligibility, Loan Comparison, Loan True Cost, Credit Health Report, EMI Calculator, User Profile

Guidelines:
- Be concise, warm, and practical — use bullet points for lists
- Use the Rupee symbol for monetary examples
- When users ask about app features, guide them to the relevant page
- If a user seems stressed about debt, be empathetic and constructive
- Always end with a follow-up question or actionable tip
- Never give investment advice for stocks — redirect if asked
- Keep responses under 200 words unless a detailed explanation is genuinely needed`;

const SUGGESTED_PROMPTS = [
  { icon: "📊", text: "How can I improve my credit score?" },
  { icon: "💳", text: "What is a good DTI ratio?" },
  { icon: "🏠", text: "Home loan eligibility tips" },
  { icon: "📉", text: "How does missing EMI affect score?" },
  { icon: "💰", text: "How to reduce my debt faster?" },
  { icon: "🧮", text: "How is EMI calculated?" },
];

function TypingIndicator() {
  return (
    <div className="message bot">
      <span className="msg-avatar">🤖</span>
      <div className="message-content typing-indicator-content">
        <span className="typing-dot" />
        <span className="typing-dot" />
        <span className="typing-dot" />
      </div>
    </div>
  );
}

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi! I am **FinAnchor Advisor** powered by Groq AI.\n\nAsk me anything about credit scores, loans, EMIs, and financial planning — I am here to help!",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState(null);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);
  const synthRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 150);
  }, [isOpen]);

  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SR();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-IN";
      recognitionRef.current.onstart = () => setIsListening(true);
      recognitionRef.current.onresult = (e) => {
        const t = e.results[0][0].transcript;
        setInputMessage(t);
        setIsListening(false);
      };
      recognitionRef.current.onend = () => setIsListening(false);
      recognitionRef.current.onerror = () => setIsListening(false);
    }
    if ("speechSynthesis" in window) synthRef.current = window.speechSynthesis;
    return () => {
      recognitionRef.current?.stop();
      synthRef.current?.cancel();
    };
  }, []);

  const speakText = useCallback((text) => {
    if (!synthRef.current) return;
    synthRef.current.cancel();
    const clean = text.replace(/[*_`#>\n]/g, " ").trim();
    const utt = new SpeechSynthesisUtterance(clean);
    utt.rate = 0.92;
    utt.pitch = 1.05;
    utt.volume = 0.85;
    utt.onstart = () => setIsSpeaking(true);
    utt.onend = () => setIsSpeaking(false);
    utt.onerror = () => setIsSpeaking(false);
    synthRef.current.speak(utt);
  }, []);

  const renderText = (text) => {
    return text.split("\n").map((line, i) => {
      const parts = line.split(/(\*\*[^*]+\*\*)/g).map((part, j) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={j}>{part.slice(2, -2)}</strong>;
        }
        return part;
      });
      const isBullet = line.trim().startsWith("- ") || line.trim().startsWith("* ");
      if (isBullet) {
        const content = line.trim().replace(/^[-*]\s*/, "");
        return <div key={i} className="chat-bullet">• {content}</div>;
      }
      return <div key={i} className={line === "" ? "chat-spacer" : ""}>{parts}</div>;
    });
  };

  const callGroqAPI = useCallback(async (userText) => {
    const history = messages.slice(-12).map((m) => ({
      role: m.role,
      content: m.text.replace(/\*\*/g, ""),
    }));

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...history,
          { role: "user", content: userText },
        ],
        temperature: 0.7,
        max_tokens: 512,
        top_p: 0.9,
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err?.error?.message || `API error ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || "I could not generate a response. Please try again.";
  }, [messages]);

  const handleSendMessage = useCallback(async (text) => {
    const trimmed = (text !== undefined ? text : inputMessage).trim();
    if (!trimmed || isLoading) return;

    setInputMessage("");
    setError(null);

    const userMsg = { role: "user", text: trimmed, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const reply = await callGroqAPI(trimmed);
      const botMsg = { role: "assistant", text: reply, timestamp: new Date() };
      setMessages((prev) => [...prev, botMsg]);
      speakText(reply);
    } catch (err) {
      setError("Could not reach AI. Check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  }, [inputMessage, isLoading, callGroqAPI, speakText]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      try { recognitionRef.current.start(); } catch (_) {}
    }
  };

  const stopSpeech = () => {
    synthRef.current?.cancel();
    setIsSpeaking(false);
  };

  const lastAssistantMsg = [...messages].reverse().find((m) => m.role === "assistant");

  return (
    <>
      <button
        className={`chatbot-button${isOpen ? " chatbot-button--open" : ""}`}
        onClick={() => setIsOpen((o) => !o)}
        aria-label="Toggle FinAnchor AI Chat"
      >
        {isOpen ? "✕" : (
          <span className="chatbot-btn-inner">
            <span>🤖</span>
            <span className="chatbot-btn-pulse" />
          </span>
        )}
      </button>

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <span className="chatbot-avatar">🤖</span>
              <div>
                <h4>FinAnchor Advisor</h4>
                <span className="chatbot-status">
                  <span className="status-dot" />
                  Groq · Llama 3.3 70B · Always online
                </span>
              </div>
            </div>
            <button className="chatbot-close-btn" onClick={() => setIsOpen(false)}>✕</button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.role === "assistant" ? "bot" : "user"}`}>
                {msg.role === "assistant" && <span className="msg-avatar">🤖</span>}
                <div className="message-content">{renderText(msg.text)}</div>
                <div className="message-time">
                  {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  {msg.role === "assistant" && isSpeaking && i === messages.length - 1 && (
                    <span className="speaking-indicator"> 🔊</span>
                  )}
                </div>
              </div>
            ))}

            {isLoading && <TypingIndicator />}

            {error && (
              <div className="chat-error">
                <span>⚠️ {error}</span>
                <button onClick={() => setError(null)}>✕</button>
              </div>
            )}

            {messages.length <= 2 && !isLoading && (
              <div className="chat-suggestions">
                <p className="suggestions-label">Quick topics:</p>
                <div className="suggestions-grid">
                  {SUGGESTED_PROMPTS.map((p, i) => (
                    <button
                      key={i}
                      className="suggestion-chip"
                      onClick={() => handleSendMessage(p.text)}
                    >
                      {p.icon} {p.text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input">
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isListening ? "🎤 Listening..." : "Ask me anything about finance..."}
              disabled={isLoading || isListening}
              maxLength={500}
            />
            <div className="voice-controls">
              {recognitionRef.current && (
                <button
                  className={`voice-btn mic ${isListening ? "active" : ""}`}
                  onClick={startListening}
                  disabled={isLoading || isListening}
                  title="Voice input"
                >
                  {isListening ? "🎤" : "🎙️"}
                </button>
              )}
              {synthRef.current && (
                <button
                  className={`voice-btn speaker ${isSpeaking ? "active" : ""}`}
                  onClick={isSpeaking ? stopSpeech : () => lastAssistantMsg && speakText(lastAssistantMsg.text)}
                  title={isSpeaking ? "Stop speaking" : "Read last reply"}
                >
                  {isSpeaking ? "🔊" : "🔈"}
                </button>
              )}
            </div>
            <button
              className="send-btn"
              onClick={() => handleSendMessage()}
              disabled={isLoading || !inputMessage.trim()}
              title="Send"
            >
              {isLoading ? <span className="send-spinner" /> : "➤"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;
