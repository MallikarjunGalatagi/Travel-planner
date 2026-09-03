import React, { useState, useEffect, useRef } from 'react';
import { sendMessageToGemini } from '../../services/geminiApi';
import {
  Sparkles,
  Send,
  Trash2,
  Bot,
  User,
  Loader2,
  Compass,
  ArrowRight,
  AlertCircle,
  HelpCircle
} from 'lucide-react';

export default function TravelChatbot({ destination }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const destName = destination ? destination.name : 'this destination';

  // Starter suggested prompts
  const suggestedPrompts = [
    `How many days should I spend in ${destName}?`,
    `What are the must-see landmarks in ${destName}?`,
    `Plan a 3-day travel itinerary for ${destName}`,
    `When is the best season to visit ${destName}?`
  ];

  // Auto-scroll to bottom of chat when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend) => {
    const query = textToSend || inputMessage;
    if (!query || query.trim() === '' || isLoading) return;

    setError(null);
    const userMsg = {
      id: Date.now(),
      role: 'user',
      text: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Build conversation history for API memory
      const historyPayload = messages.map((m) => ({
        role: m.role === 'user' ? 'user' : 'model',
        text: m.text
      }));

      const aiResponse = await sendMessageToGemini(historyPayload, query.trim(), destination);

      const aiMsg = {
        id: Date.now() + 1,
        role: 'assistant',
        text: aiResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error('Chatbot error:', err);
      setError("Sorry, I couldn't connect to the travel assistant right now. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    setError(null);
    setInputMessage('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Simple Markdown Formatter Helper for Chat Messages
  const renderMarkdown = (content) => {
    const lines = content.split('\n');
    return lines.map((line, i) => {
      let formatted = line;

      // Headers (###)
      if (line.startsWith('### ')) {
        return (
          <h4 key={i} className="text-base font-bold text-amber-300 mt-3 mb-1.5 font-serif">
            {line.replace('### ', '')}
          </h4>
        );
      }
      if (line.startsWith('## ')) {
        return (
          <h3 key={i} className="text-lg font-bold text-white mt-4 mb-2 font-serif">
            {line.replace('## ', '')}
          </h3>
        );
      }

      // Bullet points (* or -)
      if (line.startsWith('* ') || line.startsWith('- ')) {
        const bulletContent = line.substring(2);
        return (
          <li key={i} className="ml-4 list-disc text-slate-200 my-1 leading-relaxed">
            <span dangerouslySetInnerHTML={{ __html: formatInline(bulletContent) }} />
          </li>
        );
      }

      // Blockquotes (>)
      if (line.startsWith('> ')) {
        return (
          <blockquote key={i} className="pl-3 border-l-2 border-amber-400 text-amber-200/90 italic my-2 text-xs">
            {line.replace('> ', '')}
          </blockquote>
        );
      }

      // Empty line
      if (line.trim() === '') {
        return <div key={i} className="h-2" />;
      }

      // Paragraph
      return (
        <p key={i} className="my-1 text-slate-200 leading-relaxed">
          <span dangerouslySetInnerHTML={{ __html: formatInline(line) }} />
        </p>
      );
    });
  };

  const formatInline = (str) => {
    return str
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="text-amber-200">$1</em>');
  };

  return (
    <section id="ai-assistant" className="pt-12 pb-8 border-t border-white/10">
      
      {/* SECTION HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-bold tracking-[0.2em] uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>GEMINI AI TRAVEL ASSISTANT</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight serif-title">
            Ask Anything About {destName}<span className="text-amber-400">.</span>
          </h3>
        </div>

        {messages.length > 0 && (
          <button
            type="button"
            onClick={handleClearChat}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-rose-500/20 hover:text-rose-300 border border-white/10 text-slate-400 text-xs font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear conversation</span>
          </button>
        )}
      </div>

      {/* CHATBOT CONTAINER */}
      <div className="w-full rounded-3xl bg-slate-900/90 border border-white/15 shadow-2xl backdrop-blur-xl overflow-hidden flex flex-col h-[560px]">
        
        {/* CHAT MESSAGES SCROLL AREA */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 no-scrollbar">
          
          {/* WELCOME EMPTY STATE */}
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 my-auto">
              <div className="w-16 h-16 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 mb-4 shadow-lg">
                <Bot className="w-8 h-8" />
              </div>

              <h4 className="text-xl font-bold text-white mb-2">
                Hi! I'm your Travelia AI Travel Assistant
              </h4>
              <p className="text-sm text-slate-300 max-w-md mb-8 leading-relaxed">
                Ask me anything about <strong className="text-amber-300">{destName}</strong> — from ideal trip durations and top landmarks to 3-day itineraries and travel tips.
              </p>

              {/* STARTER SUGGESTED PROMPTS */}
              <div className="w-full max-w-lg">
                <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3 block flex items-center justify-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                  <span>SUGGESTED QUESTIONS</span>
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-left">
                  {suggestedPrompts.map((prompt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSendMessage(prompt)}
                      className="p-3 rounded-xl bg-white/5 hover:bg-amber-400/10 border border-white/10 hover:border-amber-400/30 text-xs text-slate-200 hover:text-amber-300 transition-all flex items-center justify-between group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer"
                    >
                      <span className="line-clamp-2">{prompt}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-amber-400 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* MESSAGE LIST */}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0 mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl text-sm shadow-md ${
                  msg.role === 'user'
                    ? 'bg-amber-400 text-slate-950 rounded-tr-none font-medium'
                    : 'bg-slate-800/90 text-slate-100 border border-white/10 rounded-tl-none'
                }`}
              >
                {msg.role === 'user' ? (
                  <p className="leading-relaxed font-semibold text-slate-950">{msg.text}</p>
                ) : (
                  <div>{renderMarkdown(msg.text)}</div>
                )}

                <span
                  className={`text-[10px] block text-right mt-2 font-mono ${
                    msg.role === 'user' ? 'text-slate-800' : 'text-slate-400'
                  }`}
                >
                  {msg.timestamp}
                </span>
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-amber-400 flex items-center justify-center text-slate-950 font-bold shrink-0 mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {/* LOADING / TYPING INDICATOR */}
          {isLoading && (
            <div className="flex items-start gap-3 justify-start">
              <div className="w-8 h-8 rounded-xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0 mt-1">
                <Bot className="w-4 h-4" />
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/90 border border-white/10 rounded-tl-none text-sm text-slate-300 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                <span>AI is thinking...</span>
              </div>
            </div>
          )}

          {/* ERROR BANNER */}
          {error && (
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-between gap-3 text-rose-300 text-xs">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{error}</span>
              </div>
              <button
                type="button"
                onClick={() => handleSendMessage()}
                className="text-amber-400 hover:text-amber-300 font-bold underline"
              >
                Retry
              </button>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* INPUT BAR */}
        <div className="p-4 border-t border-white/10 bg-slate-950/80">
          <div className="relative flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              placeholder={`Ask a question about ${destName}...`}
              className="w-full pl-4 pr-12 py-3.5 text-sm text-slate-100 bg-slate-900 border border-white/15 rounded-2xl placeholder-slate-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all disabled:opacity-60"
            />

            <button
              type="button"
              onClick={() => handleSendMessage()}
              disabled={!inputMessage.trim() || isLoading}
              className="absolute right-2.5 p-2 rounded-xl bg-amber-400 text-slate-950 hover:bg-amber-300 active:bg-amber-500 disabled:opacity-40 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

          <span className="text-[10px] text-slate-500 text-center block mt-2">
            Powered by Gemini AI • Structured for modern travel experiences
          </span>
        </div>

      </div>

    </section>
  );
}
