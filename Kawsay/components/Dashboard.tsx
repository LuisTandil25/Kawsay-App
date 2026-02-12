
import React from 'react';
import { Plant, DailyTask, GrowthStage } from '../types';
import { Droplets, Thermometer, Wind, CheckCircle2, ChevronRight, AlertCircle } from 'lucide-react';

interface DashboardProps {
  plants: Plant[];
  tasks: DailyTask[];
  onCompleteTask: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ plants, tasks, onCompleteTask }) => {
  return (
    <div className="space-y-6">
      {/* Active Plants Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Mis Cultivos</h2>
          <span className="text-sm text-slate-400">{plants.length} Activas</span>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {plants.length === 0 ? (
            <div className="w-full p-8 text-center bg-slate-800/50 rounded-2xl border border-dashed border-slate-700">
              <p className="text-slate-400 text-sm">No tienes plantas activas.</p>
            </div>
          ) : (
            plants.map(plant => (
              <div key={plant.id} className="min-w-[280px] bg-slate-800 rounded-3xl p-4 border border-slate-700 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-3">
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded-full uppercase tracking-wider">
                    {plant.stage}
                  </span>
                </div>
                <div className="flex gap-4 items-center">
                  <img src={plant.imageUrl} className="w-20 h-20 rounded-2xl object-cover border border-slate-600 shadow-lg" alt={plant.name} />
                  <div>
                    <h3 className="font-bold text-lg">{plant.name}</h3>
                    <p className="text-sm text-slate-400 italic">{plant.strain}</p>
                    <div className="mt-2 flex gap-3">
                      <div className="flex items-center gap-1 text-xs text-slate-400">
                        <Droplets size={12} className="text-cyan-400" /> 6.0 pH
                      </div>
                      <div className="flex items-center gap-1 text-xs text-slate-400">
                        <Wind size={12} className="text-amber-400" /> 1.2 EC
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Daily Tasks */}
      <section>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            Tareas de Hoy
            <span className="bg-emerald-500 text-slate-900 text-[10px] px-1.5 py-0.5 rounded-md font-bold">2</span>
        </h2>
        
        <div className="space-y-3">
          <div className="flex items-start gap-4 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl group transition-all">
            <div className="mt-1">
              <input type="checkbox" className="w-5 h-5 rounded-full accent-emerald-500 cursor-pointer" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <h4 className="font-semibold text-emerald-100">Fertirrigación Coco (Plan Kawsay)</h4>
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">ALTA</span>
              </div>
              <p className="text-sm text-emerald-300/70 mt-1">Añadir Cal-Mag (1ml/L) y Base A+B (2ml/L). pH 5.9, EC 1.4.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-slate-800 border border-slate-700 rounded-2xl opacity-60">
             <div className="mt-1">
              <CheckCircle2 className="text-slate-600" size={20} />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-slate-300 line-through">Check de Ventilación</h4>
              <p className="text-sm text-slate-500 mt-1">Limpiar filtros y verificar extracción.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Environment Stats */}
      <section className="grid grid-cols-2 gap-4">
        <div className="bg-slate-800 p-4 rounded-3xl border border-slate-700 flex flex-col items-center text-center">
            <Thermometer className="text-orange-400 mb-2" size={32} />
            <span className="text-2xl font-bold">24.5°C</span>
            <span className="text-xs text-slate-500">Temperatura Promedio</span>
        </div>
        <div className="bg-slate-800 p-4 rounded-3xl border border-slate-700 flex flex-col items-center text-center">
            <Droplets className="text-blue-400 mb-2" size={32} />
            <span className="text-2xl font-bold">62%</span>
            <span className="text-xs text-slate-500">Humedad Relativa</span>
        </div>
      </section>

      {/* Info Card */}
      <div className="bg-indigo-600/20 border border-indigo-500/30 p-4 rounded-3xl flex gap-4">
        <AlertCircle className="text-indigo-400 flex-shrink-0" />
        <div>
            <h4 className="font-bold text-sm text-indigo-100 italic">Tip de J Kawsay</h4>
            <p className="text-xs text-indigo-200/70 mt-1">En coco, nunca riegues solo con agua. Mantén la buffer de nutrientes estable para evitar bloqueos.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
