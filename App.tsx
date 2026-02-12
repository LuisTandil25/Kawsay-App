
import React, { useState, useEffect } from 'react';
import { View, Plant, GrowthStage, DailyTask, GrowthLog } from './types';
import { INITIAL_PLANTS } from './constants';
import Dashboard from './components/Dashboard';
import Navigation from './components/Navigation';
import Calendar from './components/Calendar';
import GrowthTracker from './components/GrowthTracker';
import Guide from './components/Guide';
import Community from './components/Community';
import AIExpert from './components/AIExpert';
import { Layout, PlusCircle } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [plants, setPlants] = useState<Plant[]>(INITIAL_PLANTS);
  const [tasks, setTasks] = useState<DailyTask[]>([]);
  const [logs, setLogs] = useState<GrowthLog[]>([]);

  // Local storage persistence
  useEffect(() => {
    const savedPlants = localStorage.getItem('kawsay_plants');
    const savedTasks = localStorage.getItem('kawsay_tasks');
    const savedLogs = localStorage.getItem('kawsay_logs');
    if (savedPlants) setPlants(JSON.parse(savedPlants));
    if (savedTasks) setTasks(JSON.parse(savedTasks));
    if (savedLogs) setLogs(JSON.parse(savedLogs));
  }, []);

  useEffect(() => {
    localStorage.setItem('kawsay_plants', JSON.stringify(plants));
    localStorage.setItem('kawsay_tasks', JSON.stringify(tasks));
    localStorage.setItem('kawsay_logs', JSON.stringify(logs));
  }, [plants, tasks, logs]);

  const addPlant = () => {
    const name = prompt("Nombre de la planta:");
    if (!name) return;
    const newPlant: Plant = {
      id: Date.now().toString(),
      name,
      strain: "Híbrida",
      startDate: new Date().toISOString(),
      stage: GrowthStage.SEEDLING,
      isAuto: false,
      imageUrl: 'https://picsum.photos/seed/' + Math.random() + '/400/400'
    };
    setPlants([...plants, newPlant]);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard plants={plants} tasks={tasks} onCompleteTask={(id) => {
            setTasks(tasks.map(t => t.id === id ? {...t, isCompleted: true} : t));
        }} />;
      case 'calendar':
        return <Calendar tasks={tasks} />;
      case 'logs':
        return <GrowthTracker plants={plants} logs={logs} onAddLog={(l) => setLogs([...logs, l])} />;
      case 'guide':
        return <Guide />;
      case 'community':
        return <Community />;
      case 'ai-expert':
        return <AIExpert activePlant={plants[0]} />;
      default:
        return <Dashboard plants={plants} tasks={tasks} onCompleteTask={() => {}} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-slate-100 max-w-lg mx-auto border-x border-slate-800 shadow-2xl overflow-hidden">
      {/* Header */}
      <header className="p-4 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 flex justify-between items-center border-b border-slate-800">
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs">JK</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Kawsay App
            </h1>
        </div>
        <button 
          onClick={addPlant}
          className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl hover:bg-emerald-500/20 transition-all active:scale-95"
        >
          <PlusCircle size={24} />
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-24 px-4 pt-4">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <Navigation currentView={currentView} setCurrentView={setCurrentView} />
    </div>
  );
};

export default App;
