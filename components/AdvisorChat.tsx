
import React, { useState, useRef, useEffect } from 'react';
import { AppData } from '../types';
import { GeminiService } from '../services/gemini';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AdvisorChatProps {
  data: AppData;
}

const AdvisorChat: React.FC<AdvisorChatProps> = ({ data }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'As-salamu alaykum, Ahmed! I am your Sarmaya AI assistant. How can I help you manage your wealth in Pakistan today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const gemini = new GeminiService();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const response = await gemini.chatWithAdvisor(userMsg, data);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Mafi chahta hoon (Sorry), I'm having trouble processing that right now." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[70vh]">
      <div className="flex-1 overflow-y-auto space-y-4 pb-4" ref={scrollRef}>
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl text-sm ${
              m.role === 'user' 
                ? 'bg-emerald-600 text-white rounded-tr-none' 
                : 'bg-white border border-slate-100 shadow-sm rounded-tl-none text-slate-700'
            }`}>
              {m.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-tl-none text-slate-400 text-xs italic">
              Thinking based on latest economic trends...
            </div>
          </div>
        )}
      </div>

      <div className="p-2 bg-white border border-slate-200 rounded-2xl flex items-center gap-2 shadow-sm">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask about FBR taxes, savings, etc..."
          className="flex-1 bg-transparent px-2 py-2 outline-none text-sm text-slate-800"
        />
        <button 
          onClick={handleSend}
          disabled={isLoading}
          className="bg-emerald-600 text-white w-10 h-10 rounded-xl flex items-center justify-center hover:bg-emerald-700 transition-colors disabled:opacity-50"
        >
          <i className="fa-solid fa-paper-plane"></i>
        </button>
      </div>
      
      <div className="mt-4 flex flex-wrap gap-2">
        {["Calculate my Zakat", "Tips to save 50k", "FBR Tax Slabs 2024"].map(q => (
          <button 
            key={q}
            onClick={() => setInput(q)}
            className="text-[10px] bg-slate-100 text-slate-600 px-3 py-1 rounded-full hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdvisorChat;
