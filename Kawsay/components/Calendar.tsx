
import React from 'react';
import { DailyTask } from '../types';
import { Calendar as CalIcon, Droplets, Scissors, FlaskConical, AlertTriangle } from 'lucide-react';

interface CalendarProps {
  tasks: DailyTask[];
}

const Calendar: React.FC<CalendarProps> = ({ tasks }) => {
  const days = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
  const today = new Date().getDate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Calendario Nutricional</h2>
        <span className="text-xs font-bold bg-slate-800 px-3 py-1 rounded-full text-slate-400">Marzo 2024</span>
      </div>

      {/* Week View */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, i) => (
            <div key={i} className="text-center">
                <span className="text-[10px] font-bold text-slate-500 mb-1 block">{day}</span>
                <div className={`aspect-square flex items-center justify-center rounded-xl text-xs font-bold ${
                    i + 4 === today ? 'bg-emerald-500 text-slate-900' : 'bg-slate-800 text-slate-400'
                }`}>
                    {i + 4}
                </div>
            </div>
        ))}
      </div>

      {/* Schedule for the day */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Agenda para Hoy</h3>
        
        <div className="bg-slate-800 p-5 rounded-3xl border border-slate-700 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-cyan-500"></div>
            <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                    <Droplets className="text-cyan-400" size={20} />
                    <h4 className="font-bold">Fertirrigación AM</h4>
                </div>
                <span className="text-[10px] font-bold text-slate-500">08:30 AM</span>
            </div>
            <ul className="space-y-2 mb-4">
                <li className="flex justify-between text-xs text-slate-400 border-b border-slate-700/50 pb-1">
                    <span>Base A+B</span> <span>2.5ml / L</span>
                </li>
                <li className="flex justify-between text-xs text-slate-400 border-b border-slate-700/50 pb-1">
                    <span>Silicio</span> <span>0.5ml / L</span>
                </li>
                <li className="flex justify-between text-xs text-slate-400">
                    <span>Cal-Mag</span> <span>1ml / L</span>
                </li>
            </ul>
            <div className="flex gap-2">
                <div className="flex-1 bg-slate-900/50 p-2 rounded-xl text-center border border-slate-700/50">
                    <span className="block text-[8px] text-slate-500 font-bold uppercase">pH Sugerido</span>
                    <span className="text-sm font-bold text-cyan-400">6.0</span>
                </div>
                <div className="flex-1 bg-slate-900/50 p-2 rounded-xl text-center border border-slate-700/50">
                    <span className="block text-[8px] text-slate-500 font-bold uppercase">EC Sugerida</span>
                    <span className="text-sm font-bold text-amber-400">1.4</span>
                </div>
            </div>
        </div>

        <div className="bg-slate-800 p-5 rounded-3xl border border-slate-700 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500"></div>
            <div className="flex items-center gap-2 mb-2">
                <Scissors className="text-emerald-400" size={20} />
                <h4 className="font-bold">Poda de Bajos</h4>
            </div>
            <p className="text-xs text-slate-400">Limpieza de ramas inferiores para mejorar circulación de aire y concentrar energía en puntas.</p>
        </div>

        <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-2xl flex gap-3 items-center">
            <AlertTriangle className="text-orange-400 shrink-0" size={20} />
            <p className="text-[11px] text-orange-200">Recordatorio: En 2 días toca lavado de raíces según el calendario de J Kawsay para entrar en pre-floración.</p>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
