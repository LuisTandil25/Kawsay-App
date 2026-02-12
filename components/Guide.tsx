
import React from 'react';
import { Book, Droplets, Leaf, ShieldCheck, Thermometer } from 'lucide-react';

const Guide: React.FC = () => {
  const articles = [
    { title: "El Buffer de Coco: ¿Por qué es Vital?", icon: Droplets, category: "Química", color: "text-blue-400" },
    { title: "Podas: Apical vs FIM para Coco", icon: Leaf, category: "Técnica", color: "text-emerald-400" },
    { title: "Control de Plagas en el Cultivo en Coco", icon: ShieldCheck, category: "Salud", color: "text-red-400" },
    { title: "Manejo de VPD y Transpiración", icon: Thermometer, category: "Entorno", color: "text-orange-400" },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-emerald-600 to-teal-700 p-6 rounded-3xl shadow-xl">
        <h2 className="text-2xl font-bold mb-2">Escuela Kawsay</h2>
        <p className="text-emerald-100 text-sm opacity-80">Domina el arte del cultivo en sustrato inerte con nuestras guías expertas.</p>
      </div>

      <section>
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Lo más leído</h3>
        <div className="grid grid-cols-1 gap-4">
          {articles.map((art, i) => {
            const Icon = art.icon;
            return (
              <div key={i} className="bg-slate-800 p-4 rounded-2xl border border-slate-700 flex items-center gap-4 hover:border-emerald-500/50 transition-colors cursor-pointer group">
                <div className={`p-3 bg-slate-900 rounded-xl group-hover:scale-110 transition-transform ${art.color}`}>
                  <Icon size={24} />
                </div>
                <div className="flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{art.category}</span>
                  <h4 className="font-semibold text-slate-100">{art.title}</h4>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700 text-center">
        <Book className="mx-auto text-emerald-500 mb-3" size={32} />
        <h4 className="font-bold mb-1">Planilla J Kawsay PDF</h4>
        <p className="text-xs text-slate-400 mb-4">Descarga el calendario de nutrición completo para toda la temporada.</p>
        <button className="px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-full text-xs font-bold transition-all">
          DESCARGAR GUÍA
        </button>
      </div>
    </div>
  );
};

export default Guide;
