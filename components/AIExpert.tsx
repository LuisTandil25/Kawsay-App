
import React, { useState } from 'react';
import { askExpert } from '../services/geminiService';
import { Plant } from '../types';
import { Send, Bot, Sparkles, User } from 'lucide-react';

interface AIExpertProps {
  activePlant?: Plant;
}

const AIExpert: React.FC<AIExpertProps> = ({ activePlant }) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: '¡Hola cultivador! Soy el experto Kawsay IA. ¿En qué puedo ayudarte con tu cultivo en coco hoy?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    const context = activePlant ? `Planta ${activePlant.name} (${activePlant.strain}) en etapa ${activePlant.stage}` : undefined;
    const response = await askExpert(userMsg, context);
    
    setMessages(prev => [...prev, { role: 'bot', text: response }]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-[75vh]">
      <div className="flex-1 overflow-y-auto space-y-4 pb-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-3xl shadow-sm ${
              m.role === 'user' 
                ? 'bg-emerald-600 text-white rounded-br-none' 
                : 'bg-slate-800 border border-slate-700 text-slate-200 rounded-bl-none'
            }`}>
              <div className="flex items-center gap-2 mb-1">
                {m.role === 'user' ? <User size={14} /> : <Bot size={14} className="text-emerald-400" />}
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">
                    {m.role === 'user' ? 'Tú' : 'Experto Kawsay IA'}
                </span>
              </div>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.text}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-800 border border-slate-700 p-4 rounded-3xl rounded-bl-none">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="sticky bottom-0 bg-slate-900 pt-2 pb-4">
        <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 p-2 pl-4 rounded-full shadow-lg">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Pregunta sobre pH, EC, plagas..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2"
          />
          <button 
            onClick={handleSend}
            disabled={loading}
            className="p-3 bg-emerald-500 text-slate-900 rounded-full hover:bg-emerald-400 transition-all active:scale-90 disabled:opacity-50"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIExpert;
