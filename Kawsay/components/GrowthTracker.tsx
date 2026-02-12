
import React, { useState } from 'react';
import { Plant, GrowthLog } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Plus, Camera, Ruler, Activity } from 'lucide-react';

interface GrowthTrackerProps {
  plants: Plant[];
  logs: GrowthLog[];
  onAddLog: (log: GrowthLog) => void;
}

const GrowthTracker: React.FC<GrowthTrackerProps> = ({ plants, logs, onAddLog }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [newLog, setNewLog] = useState({ height: '', ph: '', ec: '', notes: '' });

  const activePlant = plants[0]; // Simplified for demo
  const plantLogs = logs.filter(l => l.plantId === activePlant?.id);

  const data = plantLogs.map(l => ({
    name: new Date(l.date).toLocaleDateString(),
    height: l.height,
    ec: l.ec,
    ph: l.ph
  }));

  const handleAdd = () => {
    if (!activePlant) return;
    const log: GrowthLog = {
      id: Date.now().toString(),
      plantId: activePlant.id,
      date: new Date().toISOString(),
      height: parseFloat(newLog.height) || 0,
      ph: parseFloat(newLog.ph) || 0,
      ec: parseFloat(newLog.ec) || 0,
      notes: newLog.notes,
    };
    onAddLog(log);
    setShowAdd(false);
    setNewLog({ height: '', ph: '', ec: '', notes: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Seguimiento</h2>
        <button 
            onClick={() => setShowAdd(!showAdd)}
            className="flex items-center gap-1 bg-emerald-500 text-slate-900 px-4 py-2 rounded-xl text-sm font-bold active:scale-95 transition-all"
        >
          {showAdd ? 'Cancelar' : <><Plus size={16} /> Nuevo Log</>}
        </button>
      </div>

      {showAdd && (
        <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700 animate-in slide-in-from-top-4">
          <h3 className="text-sm font-bold text-emerald-400 mb-4 uppercase tracking-widest">Registrar Datos</h3>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="space-y-2">
                <label className="text-[10px] text-slate-500 font-bold flex items-center gap-1"><Ruler size={10} /> ALTURA (cm)</label>
                <input 
                    type="number" 
                    value={newLog.height}
                    onChange={(e) => setNewLog({...newLog, height: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm focus:border-emerald-500 outline-none" 
                    placeholder="0"
                />
            </div>
            <div className="space-y-2">
                <label className="text-[10px] text-slate-500 font-bold flex items-center gap-1"><Activity size={10} /> PH</label>
                <input 
                    type="number" 
                    value={newLog.ph}
                    onChange={(e) => setNewLog({...newLog, ph: e.target.value})}
                    step="0.1"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm focus:border-emerald-500 outline-none"
                    placeholder="6.0"
                />
            </div>
            <div className="space-y-2">
                <label className="text-[10px] text-slate-500 font-bold flex items-center gap-1"><Activity size={10} /> EC (ms)</label>
                <input 
                    type="number" 
                    value={newLog.ec}
                    onChange={(e) => setNewLog({...newLog, ec: e.target.value})}
                    step="0.1"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm focus:border-emerald-500 outline-none"
                    placeholder="1.2"
                />
            </div>
          </div>
          <div className="space-y-2 mb-4">
            <label className="text-[10px] text-slate-500 font-bold">NOTAS / OBSERVACIONES</label>
            <textarea 
                value={newLog.notes}
                onChange={(e) => setNewLog({...newLog, notes: e.target.value})}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm focus:border-emerald-500 outline-none h-20"
                placeholder="Ej: Aparecieron ligeras manchas amarillas..."
            />
          </div>
          <button 
            onClick={handleAdd}
            className="w-full py-3 bg-emerald-500 text-slate-900 rounded-xl font-bold text-sm shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
          >
            Guardar Entrada
          </button>
        </div>
      )}

      {/* Charts Section */}
      <section className="bg-slate-800/50 p-4 rounded-3xl border border-slate-800">
        <h3 className="text-sm font-bold text-slate-400 mb-6 flex items-center gap-2">
            <Ruler size={14} className="text-emerald-500" /> Evolución de Altura
        </h3>
        <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={10} />
                    <YAxis stroke="#64748b" fontSize={10} />
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px' }}
                        itemStyle={{ color: '#10b981' }}
                    />
                    <Line type="monotone" dataKey="height" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
      </section>

      {/* Log History */}
      <section>
        <h3 className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-widest">Cronología</h3>
        <div className="space-y-4">
          {plantLogs.length === 0 ? (
            <p className="text-slate-500 text-sm text-center py-10">Aún no has registrado ningún seguimiento.</p>
          ) : (
            plantLogs.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(log => (
                <div key={log.id} className="bg-slate-800 p-4 rounded-2xl border border-slate-700 flex gap-4">
                    <div className="flex-shrink-0 flex flex-col items-center">
                        <span className="text-xs font-bold text-emerald-500">{new Date(log.date).getDate()}</span>
                        <span className="text-[10px] text-slate-500 uppercase">{new Date(log.date).toLocaleString('default', { month: 'short' })}</span>
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                            <h4 className="text-sm font-bold text-slate-200">Revisión Diaria</h4>
                            <span className="text-[10px] text-slate-400">{log.height}cm | pH {log.ph} | EC {log.ec}</span>
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-2">{log.notes || 'Sin notas adicionales.'}</p>
                    </div>
                </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default GrowthTracker;
