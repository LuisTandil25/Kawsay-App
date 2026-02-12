
import React from 'react';
import { View } from '../types';
import { Home, Calendar, BookOpen, Users, MessageSquareCode, BarChart2 } from 'lucide-react';

interface NavigationProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setCurrentView }) => {
  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Inicio' },
    { id: 'calendar', icon: Calendar, label: 'Plan' },
    { id: 'logs', icon: BarChart2, label: 'Seguimiento' },
    { id: 'ai-expert', icon: MessageSquareCode, label: 'IA' },
    { id: 'guide', icon: BookOpen, label: 'Guía' },
    { id: 'community', icon: Users, label: 'Red' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-slate-900/95 backdrop-blur-md border-t border-slate-800 py-3 px-6 flex justify-between items-center z-50">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentView === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id as View)}
            className={`flex flex-col items-center gap-1 transition-all ${
              isActive ? 'text-emerald-400 scale-110' : 'text-slate-500'
            }`}
          >
            <Icon size={isActive ? 24 : 20} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default Navigation;
